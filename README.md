# IndustrialCostMaster

Plateforme intelligente de gestion des coûts industriels avec analyses prédictives et reporting automatisé.

## Description

IndustrialCostMaster est une solution digitale conçue pour optimiser le contrôle de gestion industriel à travers une interface moderne et des fonctionnalités avancées d'analyse et de reporting. Cette application permet aux gestionnaires de projets et aux équipes financières de suivre en temps réel les coûts, de générer des rapports automatisés et de collaborer efficacement sur les décisions budgétaires.

## Fonctionnalités Clés

### Dashboard Temps Réel
- Visualisations interactives des coûts par projet/département
- Alertes intelligentes basées sur l'IA
- Prédictions de fin de projet avec intervalles de confiance
- Comparaisons budgétaires avec drill-down détaillé

### Système de Reporting Automatisé
- Génération automatique de rapports depuis l'ERP
- Templates personnalisables par niveau hiérarchique
- Distribution automatique par email/Slack/Teams
- Rapports mobiles optimisés pour tablettes/smartphones

### Module de Collaboration
- Workspaces partagés par projet
- Workflow d'approbation automatisé
- Commentaires et annotations sur les écarts
- Historique complet des décisions et modifications

## Architecture Technique

### Frontend
- React.js avec Next.js
- Material UI pour l'interface utilisateur
- Chart.js pour les visualisations de données
- Progressive Web App (PWA) pour l'accès mobile

### Backend
- API RESTful avec Next.js API Routes
- MongoDB pour le stockage de données
- JWT pour l'authentification

## Installation

```bash
# Installer les dépendances
npm install
# ou
pnpm install

# Lancer le serveur de développement
npm run dev
# ou
pnpm dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) avec votre navigateur pour voir l'application.

## Identifiants de Démonstration

```
Email: demo@example.com
Mot de passe: password
```

## Structure du Projet

```
/src
  /app
    /api          # API endpoints
    /auth         # Pages d'authentification
    /components   # Composants réutilisables
    /dashboard    # Dashboard principal
    /reporting    # Module de reporting
    /collaboration # Module de collaboration
    /lib          # Utilitaires et services
```

## Déploiement

Cette application peut être déployée sur n'importe quelle plateforme supportant Next.js, comme Vercel, Netlify ou un serveur personnalisé.
