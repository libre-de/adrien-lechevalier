# Libre de

Copie statique éditable du frontend public de https://libre-de.com/, récupéré le 2 octobre 2026. Le projet source React/Hostinger Horizons et son backend ne sont pas accessibles via le site public ; cette version reprend le HTML rendu, le style original, les visuels et les interactions.

## Prévisualisation

Depuis ce dossier : `python3 -m http.server 8000`, puis ouvrir http://localhost:8000/.
Aucune compilation ni dépendance requise. Transférer le contenu de ce dossier à la racine du domaine pour publier.

## Changements

- Vidéo fournie en fond de la première vue, muette, en boucle, avec affiche de secours et bouton pause. Compression web : environ 0,94 Mo au lieu de 7,86 Mo.
- Rotation : réussir, briller, oser, créer, entreprendre.
- Mention latérale : Conseil en communication.
- Nouveau manifeste centré dans la section noire ; suppression de sa répétition dans la section précédente.
- Texte « Libre de, conseil en communication, marketing et web. » conservé.

## Formulaire

La route `/hcgi/platform/api/collections/contact_messages/records` reprend le backend PocketBase du site Hostinger. Ce service n’est pas copié sur GitHub. Le formulaire nécessite cette route sur l’hébergement final ou une nouvelle intégration. Aucun envoi réel n’a été effectué pendant la vérification. Le lien mail reste disponible.

## Fichiers

`index.html`, `styles.css`, `script.js` sont éditables ; `assets/original.css` conserve le style public original ; vidéo, affiche et portrait sont stockés localement.
