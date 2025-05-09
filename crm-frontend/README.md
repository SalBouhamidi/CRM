CRM Angular 19 - Documentation
Aperçu du projet
Ce projet est un système de gestion de la relation client (CRM) développé avec Angular 19 et Tailwind CSS. Il fournit une interface utilisateur moderne et responsive pour gérer les clients, les opportunités de vente, les tâches, et générer des rapports.
Technologies utilisées

Frontend : Angular 19
Styles : Tailwind CSS
Notifications : SweetAlert2
Architecture : Composants autonomes (standalone)
Authentification : Guard Angular avec stockage local

Fonctionnalités

✅ Authentification utilisateur
✅ Tableau de bord interactif
✅ Gestion des clients
✅ Suivi des opportunités de vente
✅ Gestion des tâches
✅ Génération de rapports
✅ Administration des utilisateurs
✅ Paramètres système

Prérequis

Node.js (v18 ou supérieur)
npm (v8 ou supérieur)
Angular CLI (v19)

Installation

Cloner le dépôt
bashgit clone https://github.com/votre-utilisateur/crm-frontend.git
cd crm-frontend

Installer les dépendances
bashnpm install

Générer les styles Tailwind CSS
bashnpm run tailwind:build

Démarrer le serveur de développement
bashnpm start

Accéder à l'application
L'application sera accessible à l'adresse http://localhost:4200/

Structure du projet
src/
├── app/
│   ├── customers/            # Gestion des clients
│   ├── dashboard/            # Tableau de bord
│   ├── guards/               # Guards d'authentification
│   ├── login/                # Page de connexion
│   ├── opportunities/        # Gestion des opportunités
│   ├── reports/              # Rapports et analyses
│   ├── services/             # Services API et utilitaires
│   ├── settings/             # Configuration du système
│   ├── shared/               # Composants partagés
│   │   ├── header/           # En-tête de l'application
│   │   └── sidebar/          # Barre latérale de navigation
│   ├── tasks/                # Gestion des tâches
│   ├── users/                # Administration des utilisateurs
│   ├── app.routes.ts         # Configuration des routes
│   ├── app.config.ts         # Configuration de l'application
│   └── app.component.ts      # Composant racine
└── styles/
    ├── tailwind-source.css   # Source des styles Tailwind
    └── tailwind-output.css   # Styles Tailwind compilés
Scripts disponibles

npm start : Génère les styles Tailwind et démarre le serveur de développement
npm run build : Compile l'application pour la production
npm run tailwind:build : Génère les styles Tailwind CSS
npm run tailwind:watch : Surveille et régénère les styles Tailwind lors des modifications
npm run dev : Exécute le serveur de développement avec auto-régénération des styles Tailwind

Authentification
Pour les besoins de développement, l'application utilise une authentification simulée avec stockage local. En production, vous devriez intégrer un backend d'authentification réel.
Identifiants de démonstration :

Email : admin@example.com
Mot de passe : password

Personnalisation
Thème Tailwind
Vous pouvez personnaliser les couleurs et autres aspects du thème dans le fichier tailwind.config.js.
Configuration de l'application
Les paramètres de l'application peuvent être modifiés dans le fichier src/app/app.config.ts.
Déploiement
Pour déployer l'application en production :

Construire l'application :
bashnpm run build

Déployer le contenu du dossier dist/crm-frontend sur votre serveur web.

Bonnes pratiques

Composants autonomes : Utilisez l'architecture de composants autonomes d'Angular 19 pour une meilleure modularité.
Lazy loading : Les modules sont chargés à la demande pour améliorer les performances.
Reactive Forms : Utilisez les formulaires réactifs pour la validation et la gestion d'état.
Services : Centralisez la logique métier dans des services.

Contribution

Fork le projet
Créez votre branche de fonctionnalité (git checkout -b feature/amazing-feature)
Committez vos changements (git commit -m 'Add some amazing feature')
Push vers la branche (git push origin feature/amazing-feature)
Ouvrez une Pull Request

Licence
Ce projet est sous licence MIT.


Développé avec ❤️ et ☕
