# Guide d'installation et d'utilisation du CRM

Ce guide vous explique comment installer et exécuter le projet CRM développé avec Angular 19 et Tailwind CSS.

## Prérequis

- Node.js (version 18 ou supérieure)
- npm (version 9 ou supérieure)
- Angular CLI (version 19)

## Installation

1. Installez Angular CLI globalement si ce n'est pas déjà fait :

```bash
npm install -g @angular/cli
```

2. Créez un nouveau projet Angular en mode standalone :

```bash
ng new crm-project --standalone --routing --style=css
cd crm-project
```

3. Installez Tailwind CSS :

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

4. Configurez Tailwind CSS en modifiant le fichier `tailwind.config.js` avec le contenu fourni.

5. Modifiez le fichier `src/styles.css` pour inclure les directives Tailwind et les classes personnalisées.

6. Installez SweetAlert2 pour les notifications :

```bash
npm install sweetalert2
```

7. Copiez tous les fichiers fournis dans leurs dossiers respectifs.

## Structure du projet

Le projet suit une architecture par fonctionnalité avec des composants autonomes (standalone) :

```
src/
├── app/
│   ├── customers/           # Gestion des clients
│   ├── dashboard/           # Tableau de bord
│   ├── login/               # Page de connexion
│   ├── opportunities/       # Gestion des opportunités de vente
│   ├── reports/             # Rapports
│   ├── settings/            # Paramètres
│   ├── shared/              # Composants partagés (header, sidebar)
│   ├── tasks/               # Gestion des tâches
│   ├── users/               # Gestion des utilisateurs
│   ├── guards/              # Garde d'authentification
│   ├── services/            # Services (auth, etc.)
│   ├── app.component.ts     # Composant racine
│   ├── app.component.html   # Template du composant racine
│   ├── app.routes.ts        # Configuration des routes
│   └── app.config.ts        # Configuration de l'application
└── ...
```

## Fonctionnalités implémentées

- **Authentification** : Connexion/déconnexion avec système de garde pour protéger les routes
- **Tableau de bord** : Vue d'ensemble avec statistiques, graphiques et données récentes
- **Gestion des clients** : Liste, détails, ajout, modification et suppression
- **Gestion des opportunités de vente** : Suivi des opportunités de vente
- **Gestion des tâches** : Organisation et suivi des tâches
- **Rapports** : Visualisation et analyse des données
- **Gestion des utilisateurs** : Administration des utilisateurs du système
- **Paramètres** : Configuration du système

## Exécution du projet

Pour lancer le projet en mode développement :

```bash
ng serve
```

Ouvrez votre navigateur et accédez à `http://localhost:4200`.

## Identifiants de connexion (démo)

- **Email** : admin@example.com
- **Mot de passe** : password

## Personnalisation

Pour modifier les couleurs principales de l'application, vous pouvez ajuster les valeurs dans le fichier `tailwind.config.js` :

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Modifiez ces valeurs pour changer la couleur principale
      },
    },
  },
},
```

## Construction pour la production

Pour construire l'application pour la production :

```bash
ng build --production
```

Les fichiers générés seront stockés dans le dossier `dist/`.

## Notes supplémentaires

- Ce projet utilise des données statiques pour la démonstration. Dans un environnement de production, vous devriez implémenter des appels API vers un backend réel.
- Les fonctionnalités d'import/export, de graphiques en temps réel et d'autres fonctionnalités avancées nécessiteraient des bibliothèques supplémentaires.