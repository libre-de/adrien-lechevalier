# Adrien Lechevalier

Site personnel en français : enseignement, direction marketing externalisée et agence web Solayia.

## Structure

- `index.html` : accueil et articulation des trois activités
- `enseignant.html` : intervention en école et formation
- `direction-marketing.html` : direction marketing et communication à temps partagé
- `agence-web.html` : offre web portée par Solayia
- `mentions-legales.html`, `confidentialite.html` : informations juridiques et données personnelles
- `assets/` : logo original non modifié, lion pour la favicon et photo d’Adrien en intervention
- `styles.css`, `script.js` : design partagé, menu mobile et envoi des formulaires

## Prévisualisation

Depuis ce dossier :

```bash
python3 -m http.server 8000
```

Ouvrir `http://localhost:8000/`.

## Mise en ligne sur GitHub Pages

Le site est statique et ne nécessite pas de compilation. Publier la branche principale depuis la racine du dépôt dans **Settings → Pages → Deploy from a branch**. L'adresse sera `https://<compte>.github.io/<depot>/` si le dépôt ne porte pas le nom `<compte>.github.io`.

Les liens internes sont relatifs pour fonctionner avec un chemin de dépôt GitHub Pages. Les quatre formulaires envoient les demandes via FormSubmit, qui les transmet à l'adresse destinataire sans que celle-ci soit publiée dans les fichiers du site. La première activation du service nécessite une vérification de la boîte de réception ; remplacer ensuite `FORM_ENDPOINT_PENDING` dans les quatre pages par la chaîne opaque envoyée par FormSubmit. Vérifier la réception d'une soumission de test. Les liens directs vers l'adresse personnelle ont été supprimés. Les polices système prennent le relais si Google Fonts ne charge pas.

Les mentions légales identifient Adrien Lechevalier comme éditeur à titre personnel et affichent une adresse fictive sous `.example`, sans informations juridiques de Solayia ni numéro de téléphone. Cette adresse ne reçoit pas de messages et ne rend pas les mentions légales conformes. La page de confidentialité reprend Adrien comme responsable du traitement et indique l'usage de FormSubmit. Mettre à jour les affirmations chiffrées si les chiffres définitifs du CV changent.
