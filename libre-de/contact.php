<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
function reply(int $status, bool $ok, string $message): never {
    http_response_code($status);
    echo json_encode(['ok' => $ok, 'message' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') reply(405, false, 'Méthode non autorisée.');
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !in_array($origin, ['https://libre-de.com', 'https://www.libre-de.com'], true)) reply(403, false, 'Origine non autorisée.');
if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 16000) reply(413, false, 'Message trop long.');
$data = json_decode(file_get_contents('php://input'), true);
if (!is_array($data)) reply(400, false, 'Données invalides.');
foreach (['name','email','subject','message','website'] as $key) {
    if (isset($data[$key]) && !is_string($data[$key])) reply(400, false, 'Données invalides.');
}
if (!empty($data['website'])) reply(200, true, 'Message reçu.');
$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$subject = trim($data['subject'] ?? '');
$message = trim($data['message'] ?? '');
if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) reply(422, false, 'Vérifiez votre nom, votre email et votre message.');
if (strlen($name)>480 || strlen($subject)>800 || strlen($message)>20000 || strlen($email)>254 || preg_match('/[\r\n]/', $email)) reply(422, false, 'Un champ est trop long ou invalide.');
// Keep only a hashed IP and a timestamp outside the public website.
$rateDir = sys_get_temp_dir() . '/libre-de-contact';
if (!is_dir($rateDir) && !@mkdir($rateDir, 0700, true) && !is_dir($rateDir)) reply(503, false, 'Service temporairement indisponible.');
$rateKey = hash('sha256', $_SERVER['REMOTE_ADDR'] ?? 'unknown');
$lock = @fopen($rateDir . '/' . $rateKey, 'c+');
if (!$lock || !flock($lock, LOCK_EX)) reply(503, false, 'Service temporairement indisponible.');
$last = (int)stream_get_contents($lock);
if ($last > time()-30) { fclose($lock); reply(429, false, 'Patientez 30 secondes avant un nouvel envoi.'); }
$subject = preg_replace('/[\r\n]+/', ' ', $subject);
$mailSubject = 'Libre de — ' . ($subject !== '' ? $subject : 'Nouveau message du site');
$body = "Nouveau message depuis libre-de.com\n\nNom : $name\nEmail : $email\nObjet : $subject\n\n$message\n";
$headers = [
    'From' => 'Libre de <contact@libre-de.com>',
    'Reply-To' => $email,
    'MIME-Version' => '1.0',
    'Content-Type' => 'text/plain; charset=UTF-8',
    'Content-Transfer-Encoding' => '8bit',
];
$encodedSubject = '=?UTF-8?B?' . base64_encode($mailSubject) . '?=';
$sent = mail('adrien.lechevalier@libre-de.com', $encodedSubject, $body, $headers);
if ($sent) { rewind($lock); ftruncate($lock,0); fwrite($lock,(string)time()); }
flock($lock,LOCK_UN); fclose($lock);
if (!$sent) reply(503, false, 'L’envoi est temporairement indisponible.');
reply(200, true, 'Merci. Votre message a bien été envoyé.');
