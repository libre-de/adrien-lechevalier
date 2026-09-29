# Adrien Lechevalier

Site personnel en français : enseignement, direction marketing externalisée et agence web Solayia.

## Structure

- `index.html` : accueil et articulation des trois activités
- `enseignant.html` : intervention en école et formation
- `direction-marketing.html` : direction marketing et communication à temps partagé
- `agence-web.html` : offre web portée par Solayia
- `mentions-legales.html`, `confidentialite.html` : informations juridiques et données personnelles
- `assets/` : signature Lechevalier, lion pour la favicon et photo d’Adrien en intervention
- `styles.css`, `script.js` : design partagé, menu mobile et préparation des e-mails de contact

## Prévisualisation

Depuis ce dossier :

```bash
python3 -m http.server 8000
```

Ouvrir `http://localhost:8000/`.

## Mise en ligne sur GitHub Pages

Le site est statique et ne nécessite ni compilation ni clés d'API. Publier la branche principale depuis la racine du dépôt dans **Settings → Pages → Deploy from a branch**. L'adresse sera `https://<compte>.github.io/<depot>/` si le dépôt ne porte pas le nom `<compte>.github.io`.

Les liens internes sont relatifs pour fonctionner avec un chemin de dépôt GitHub Pages. Les formulaires préparent un e-mail vers `adrien.lechevalier@solayia.fr` dans la messagerie du visiteur : l'envoi final doit y être confirmé. Les liens directs vers cette adresse et l'agenda restent disponibles. Il n'y a pas de service de formulaire côté serveur ni de traqueur ajouté par ce site. Les polices système prennent le relais si Google Fonts ne charge pas.

Les mentions légales identifient Adrien Lechevalier comme éditeur à titre personnel, sans informations juridiques de Solayia ni numéro de téléphone. La page de confidentialité reprend Adrien comme responsable du traitement. Mettre à jour les affirmations chiffrées si les chiffres définitifs du CV changent.
