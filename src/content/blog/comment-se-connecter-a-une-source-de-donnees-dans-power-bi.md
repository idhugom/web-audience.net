---
title: "Comment se connecter à une source de données dans Power BI ?"
description: "Connectez une source de données dans Power BI : fichiers, SQL, web et cloud, et maîtrisez accès, modèle, publication et actualisation fiable sans erreur."
pubDate: "2025-03-07T14:27:18"
updatedDate: "2026-07-11"
category: "Tech, Web & Numérique"
categorySlug: "tech-web-numerique"
cover: "/images/covers/comment-se-connecter-a-une-source-de-donnees-dans-power-bi.webp"
coverAlt: "Écran Power BI Desktop affichant le choix d’une source de données et une table de résultats"
takeaways: ["Choisissez le mode de connexion adapté entre importation, DirectQuery et connexion active selon le volume et le besoin de fraîcheur.","Configurez correctement l’authentification, les niveaux de confidentialité et les transformations avant de charger les données.","Publiez le rapport avec une passerelle de données locale si la source reste dans votre réseau d’entreprise.","Évitez les erreurs de modèle en contrôlant les types de données, les clés uniques et les relations avant de créer vos visuels."]
faq: [{"question":"Comment importer un fichier Excel dans Power BI ?","answer":"Dans Power BI Desktop, ouvrez Accueil > Obtenir des données > Excel, sélectionnez le fichier puis cochez la feuille ou le tableau souhaité dans le Navigateur. Choisissez de préférence Transformer les données pour contrôler les en-têtes et les types de colonnes avant de cliquer sur Fermer et appliquer."},{"question":"Quelle différence entre Importation et DirectQuery dans Power BI ?","answer":"L’importation copie les données dans le modèle Power BI et offre généralement de meilleures performances, mais nécessite une actualisation pour intégrer les nouveautés. DirectQuery interroge la source lors de la consultation du rapport ; il évite d’importer toutes les lignes, mais dépend fortement des performances de la base et du réseau."},{"question":"Pourquoi mon rapport Power BI ne s’actualise-t-il pas après publication ?","answer":"La cause la plus fréquente est une source locale, comme un dossier réseau ou un serveur SQL interne, accessible depuis Power BI Desktop mais pas depuis Power BI Service. Installez et configurez une passerelle de données locale, puis vérifiez les identifiants de la source dans les paramètres du modèle sémantique publié."},{"question":"Peut-on connecter Power BI à une base de données SQL Server ?","answer":"Oui. Dans Obtenir des données, choisissez SQL Server, saisissez le nom du serveur et éventuellement celui de la base, puis sélectionnez le mode Importation ou DirectQuery. Vous devez disposer d’un compte autorisé à lire les tables ou vues nécessaires, ainsi que d’une passerelle si la base est hébergée sur un réseau interne et que le rapport est publié."},{"question":"Comment modifier les identifiants d’une source de données Power BI ?","answer":"Dans Power BI Desktop, allez dans Fichier > Options et paramètres > Paramètres des sources de données pour modifier ou effacer les autorisations enregistrées. Après publication, contrôlez également les identifiants dans Power BI Service, car les informations utilisées par le service peuvent être distinctes de celles de votre ordinateur."},{"question":"Faut-il nettoyer les données avant de les charger dans Power BI ?","answer":"Oui, autant que possible. Power Query permet de supprimer les colonnes inutiles, définir les bons types, filtrer les lignes hors périmètre et standardiser les valeurs. Un nettoyage effectué avant le chargement rend le modèle plus léger, les mesures plus fiables et les actualisations plus robustes."}]
readingTime: 13
sourceId: 2228
---
Power BI ne se résume pas à créer de jolis graphiques : la qualité d’un rapport dépend d’abord de la façon dont il est relié à ses données. Une connexion mal configurée peut produire des chiffres incomplets, des actualisations en échec ou des performances décevantes.

Que vos données soient dans un fichier Excel, une base SQL, SharePoint, un site web ou un outil métier en ligne, la méthode suit une logique commune. Voici comment connecter une source de données dans Power BI, préparer les données, choisir le bon mode de stockage et automatiser leur mise à jour.

## Avant de connecter une source : clarifiez le besoin

Avant d’ouvrir Power BI Desktop, identifiez **où se trouvent les données**, qui les maintient et à quelle fréquence elles doivent être actualisées. Cette étape évite de bâtir un rapport sur un fichier local qui ne pourra jamais se mettre à jour une fois publié.

Préparez notamment les informations suivantes :

- le **type de source** : fichier Excel, CSV, dossier, serveur SQL, API web, SharePoint, Salesforce, Google Analytics, etc. ;
- l’adresse ou le chemin d’accès : URL, nom du serveur, nom de la base, dossier réseau ou emplacement SharePoint ;
- la méthode d’authentification : compte Microsoft, compte professionnel, identifiants de base de données, clé API ou authentification Windows ;
- les tables, feuilles ou vues réellement utiles ;
- la fréquence de mise à jour attendue : ponctuelle, quotidienne, plusieurs fois par jour ou quasi temps réel ;
- le niveau de sensibilité des données et les droits d’accès à respecter.

Un rapport Power BI fonctionne mieux quand la source est **stable, structurée et gouvernée**. Par exemple, un export Excel remplacé chaque semaine sans conserver le même nom de colonnes est plus fragile qu’une vue SQL dédiée ou qu’une liste SharePoint correctement structurée.

:::info[Power BI Desktop et Power BI Service]
**Power BI Desktop** sert à créer la connexion, transformer les données et construire le modèle. **Power BI Service**, accessible dans le navigateur, sert surtout à publier, partager et planifier l’actualisation des rapports.
:::

## Les trois modes de connexion à connaître

Lors de la connexion, Power BI propose plusieurs comportements. Le bon choix dépend moins du connecteur que de votre besoin de rapidité, de volume de données et de fraîcheur.

| Critère | Importation | DirectQuery | Connexion active |
|---|---|---|---|
| Où sont stockées les données ? | Copiées dans le modèle Power BI | Conservées dans la source | Conservées dans un modèle sémantique existant |
| Rapidité des visuels | Généralement élevée | Dépend de la source et du réseau | Dépend du modèle distant |
| Actualisation | Nécessaire pour voir les nouveautés | Les requêtes interrogent la source | Gérée par le modèle d’origine |
| Transformations dans Power Query | Très larges | Possibles, avec contraintes selon la source | Très limitées ou absentes |
| Cas d’usage typique | Fichiers, tables raisonnables, analyses riches | Très grosses bases ou données souvent modifiées | Réutiliser un jeu de données Power BI ou Analysis Services certifié |

### L’importation : le choix le plus courant

En mode **Importation**, Power BI copie les données dans son modèle. Les rapports sont en général plus réactifs, et vous bénéficiez de l’ensemble des possibilités de Power Query et de modélisation.

C’est souvent le meilleur choix pour un fichier Excel, un CSV, une liste SharePoint ou une table SQL de taille maîtrisée. En contrepartie, les données affichées ne changent qu’après une **actualisation** du modèle.

### DirectQuery : pour interroger la source sans importer toutes les lignes

Avec **DirectQuery**, Power BI envoie des requêtes à la source lorsque l’utilisateur consulte ou filtre un rapport. Ce mode peut convenir aux bases volumineuses et aux données qui évoluent fréquemment.

Il impose cependant une source bien optimisée : index, vues SQL propres, réseau fiable et requêtes rapides. Certains calculs ou transformations peuvent être limités. Un visuel complexe peut aussi déclencher plusieurs requêtes et ralentir l’expérience.

:::warning
DirectQuery ne transforme pas une base lente en base rapide. Avant de le retenir, testez les requêtes avec des utilisateurs réels et limitez les colonnes, filtres et visuels inutiles.
:::

### La connexion active à un modèle existant

Une **connexion active** permet de bâtir un rapport à partir d’un modèle sémantique Power BI déjà publié, ou d’un modèle Analysis Services. Elle est pertinente quand une équipe data fournit un référentiel central : chiffre d’affaires, calendrier, produits, clients et mesures sont déjà définis.

Son intérêt principal est la cohérence : les équipes réutilisent les mêmes indicateurs. En revanche, vous ne contrôlez pas librement le modèle source et devez demander les droits nécessaires à son propriétaire.

## Se connecter à une source dans Power BI Desktop : les étapes

La procédure varie légèrement selon le connecteur, mais le parcours reste similaire.

### 1. Ouvrir le catalogue de connecteurs

Dans Power BI Desktop, allez dans **Accueil > Obtenir des données**. Les sources courantes apparaissent directement ; cliquez sur **Plus** pour afficher le catalogue complet.

Les connecteurs sont regroupés par familles :

- **Fichier** : Excel, Texte/CSV, XML, JSON, PDF, dossier ;
- **Base de données** : SQL Server, Oracle, MySQL, PostgreSQL et autres moteurs compatibles ;
- **Power Platform** : flux de données, Dataverse, modèles sémantiques Power BI ;
- **Azure** : stockage, bases et services analytiques Azure ;
- **Services en ligne** : SharePoint, Dynamics, Salesforce et autres applications SaaS ;
- **Autres** : Web, OData, script R ou Python selon votre environnement.

Choisissez le connecteur correspondant à la source réelle. Préférez, par exemple, le connecteur **SharePoint Folder** à un simple chemin local lorsqu’un fichier est stocké dans une bibliothèque SharePoint : la publication et l’actualisation seront plus fiables.

### 2. Indiquer l’emplacement et les paramètres de connexion

Renseignez les informations demandées par le connecteur :

- pour Excel ou CSV : sélectionnez le fichier ;
- pour un dossier : indiquez le chemin du dossier contenant les fichiers ;
- pour SQL Server : saisissez le **serveur**, éventuellement la **base de données**, puis le mode de connexion ;
- pour le Web : collez l’URL de la ressource ou du point d’accès API ;
- pour SharePoint : utilisez l’URL du site ou de la bibliothèque demandée, pas forcément l’URL complète d’un fichier ouvert dans le navigateur.

Pour une base de données, l’option avancée permet parfois de définir une requête SQL. Cette possibilité est utile pour cibler une vue ou réduire les lignes remontées, mais elle doit rester maîtrisée par une personne qui connaît la base et ses règles de sécurité.

:::tip
Connectez-vous de préférence à une **vue SQL dédiée** ou à une table préparée par l’équipe data, plutôt qu’à une multitude de tables brutes. Vous simplifierez le modèle et réduirez les risques d’erreur de jointure.
:::

### 3. S’authentifier avec le bon compte

Power BI affiche ensuite la fenêtre d’authentification. Selon la source, vous pourrez choisir une connexion :

- **Anonyme**, pour certaines ressources publiques ;
- **Windows**, souvent pour un serveur interne ;
- **De base**, avec un identifiant et un mot de passe ;
- **Compte organisationnel** ou OAuth, fréquent pour Microsoft 365 et les services cloud ;
- **Clé API**, parfois demandée par un service web.

Utilisez un compte qui possède uniquement les droits nécessaires, idéalement en lecture seule pour un rapport d’analyse. Ne partagez jamais un fichier Power BI contenant des identifiants sensibles et évitez de stocker une clé API directement dans une requête ou un paramètre visible par des personnes non autorisées.

Si Power BI a mémorisé de mauvais identifiants, allez dans **Fichier > Options et paramètres > Paramètres des sources de données**. Vous pourrez y modifier les autorisations ou les effacer avant de vous reconnecter.

### 4. Choisir les données dans le Navigateur

Après la connexion, la fenêtre **Navigateur** liste les éléments disponibles : feuilles Excel, tables, vues SQL, fichiers d’un dossier ou objets d’un service en ligne.

Deux options sont proposées :

- **Charger** : importe directement les éléments sélectionnés ;
- **Transformer les données** : ouvre Power Query afin de nettoyer et préparer les données avant le chargement.

Dans la plupart des cas, choisissez **Transformer les données**. Même une source propre mérite une vérification des en-têtes, des formats de date, des valeurs vides et des colonnes inutiles.

## Préparer la source avec Power Query avant le chargement

Power Query est l’éditeur de préparation de données intégré à Power BI. Les transformations sont enregistrées sous forme d’étapes reproductibles : lors de la prochaine actualisation, Power BI rejouera la même séquence.

Les actions les plus utiles sont les suivantes :

1. **Promouvoir la première ligne en en-têtes** si nécessaire.
2. **Définir le type de chaque colonne** : texte, nombre entier, décimal, date, heure, booléen. Les types erronés sont une cause classique de calculs faux.
3. **Supprimer les colonnes non utilisées** dès le départ, notamment les champs techniques et les doublons inutiles.
4. **Filtrer les lignes hors périmètre** : périodes anciennes, statuts annulés, tests ou lignes vides.
5. **Nettoyer les valeurs texte** : espaces superflus, casse incohérente, caractères invisibles, codes produits mal formatés.
6. **Créer ou fusionner des requêtes** lorsque cela répond à une logique métier claire.
7. **Créer des paramètres** pour les URL, serveurs, dossiers ou périodes, afin de ne pas modifier les requêtes à la main à chaque changement d’environnement.

Lorsque plusieurs sources sont combinées, Power BI peut demander un niveau de confidentialité : Public, Organisationnel ou Privé. Indiquez le niveau qui correspond réellement à la donnée. Ces réglages aident Power BI à éviter la circulation non souhaitée d’informations entre des sources ayant des niveaux de confiance différents.

:::warning
Ne désactivez pas les contrôles de confidentialité uniquement pour faire disparaître une erreur de combinaison. Comprenez d’abord quelles données sont jointes, vers quelle destination et pourquoi. Dans un cadre professionnel, demandez conseil à l’administrateur Power BI ou à l’équipe sécurité.
:::

Terminez en cliquant sur **Fermer et appliquer**. Power BI charge alors les données dans le modèle, selon le mode de connexion choisi.

## Construire un modèle fiable après la connexion

Une connexion réussie ne garantit pas des résultats justes. Vérifiez le modèle dans la vue **Modèle** avant de concevoir les pages du rapport.

### Contrôler les relations entre les tables

Reliez les tables à l’aide de clés cohérentes : identifiant client, code produit, numéro de commande ou date. La configuration la plus robuste est souvent une relation **un-à-plusieurs**, avec une clé unique dans la table de référence et plusieurs lignes associées dans la table de faits.

Évitez les relations plusieurs-à-plusieurs si elles ne sont pas indispensables. Elles peuvent générer des totaux difficiles à interpréter. Évitez aussi les filtres bidirectionnels par défaut : ils sont parfois utiles, mais augmentent le risque de parcours de filtre ambigu.

### Vérifier les résultats avec des tests simples

Avant de diffuser le rapport :

- comparez un total avec la source d’origine sur un périmètre limité ;
- contrôlez le nombre de lignes après les filtres Power Query ;
- vérifiez qu’aucune date n’est chargée comme du texte ;
- cherchez les clés vides ou dupliquées dans les tables de référence ;
- testez les filtres croisés entre plusieurs visuels.

:::success
Un rapport solide repose sur un modèle simple : des tables de référence claires (dates, clients, produits) reliées à une ou plusieurs tables de faits (ventes, commandes, événements). Cette structure facilite les calculs et limite les incohérences.
:::

## Publier et actualiser la connexion dans Power BI Service

Une fois le rapport prêt, cliquez sur **Publier** dans Power BI Desktop et choisissez l’espace de travail approprié. La connexion ne s’arrête pas là : dans Power BI Service, configurez les informations d’identification et l’actualisation du modèle sémantique publié.

### Sources cloud : vérifier les identifiants dans le service

Pour une source accessible en ligne, comme SharePoint Online ou certains services SaaS, vous devrez généralement vous reconnecter dans les paramètres du modèle sémantique sur Power BI Service. Vérifiez que le compte utilisé dispose toujours des autorisations requises.

### Sources locales : installer une passerelle de données

Si la source se trouve sur un serveur SQL interne, un dossier réseau ou un poste de travail inaccessible depuis Internet, Power BI Service ne peut pas y accéder seul. Il faut une **passerelle de données locale** installée sur une machine allumée, stable et capable de joindre la source.

La passerelle doit être configurée par une personne autorisée, puis associée à la source publiée. Vérifiez notamment :

- que le serveur de la passerelle peut atteindre la base ou le partage réseau ;
- que le nom du serveur, le chemin et la base correspondent exactement à ceux utilisés dans le rapport ;
- que les identifiants enregistrés dans Power BI Service sont valides ;
- que la machine ne se met pas en veille pendant les créneaux d’actualisation ;
- que les droits de la passerelle et ceux de la source sont correctement séparés et documentés.

Les possibilités de partage, de fréquence d’actualisation et de capacité de stockage dépendent de la licence Power BI et de la configuration de l’organisation. Consultez les paramètres de votre tenant ou votre administrateur avant de promettre une fréquence précise aux utilisateurs.

## Cas particuliers : Excel, dossier, API et données métiers

### Connecter un fichier Excel

Pour un fichier utilisé par une seule personne, le connecteur Excel est simple et rapide. En revanche, un chemin local tel que `C:\Utilisateurs\...` ne sera pas utilisable par le service en ligne sans passerelle. Pour un travail collaboratif, stocker le fichier dans **SharePoint Online ou OneDrive professionnel** est souvent plus adapté.

Préservez une structure stable : mêmes noms de colonnes, même feuille ou, mieux, un tableau Excel nommé. Évitez les cellules fusionnées, les lignes de titre décoratives et les sous-totaux au milieu des données.

### Combiner les fichiers d’un dossier

Le connecteur **Dossier** est pratique pour consolider des exports périodiques. Tous les fichiers doivent avoir une structure homogène. Power BI utilise un fichier d’exemple pour définir les étapes de transformation ; une colonne renommée dans un export futur peut donc interrompre l’actualisation.

### Interroger une API ou une URL web

Le connecteur Web peut lire un fichier JSON, un CSV exposé en ligne ou une API. Vérifiez la pagination, les limites d’usage, l’expiration des jetons et le format de réponse. Pour une API métier, documentez la clé utilisée, le propriétaire de l’accès et la procédure de renouvellement.

## Résoudre les erreurs de connexion les plus fréquentes

| Symptôme | Cause probable | Action à effectuer |
|---|---|---|
| Identifiants refusés | Mauvais type d’authentification ou autorisation expirée | Effacer les autorisations de la source et se reconnecter avec le bon compte |
| Actualisation impossible après publication | Source locale non accessible depuis le service | Configurer ou corriger la passerelle de données locale |
| Colonnes introuvables | Structure du fichier source modifiée | Stabiliser le modèle de fichier et ajuster les étapes Power Query |
| Erreur de confidentialité | Sources combinées avec des niveaux incompatibles | Vérifier les niveaux et la nécessité réelle de la fusion |
| Rapport lent | Trop de données, modèle complexe ou requêtes DirectQuery coûteuses | Réduire les colonnes, filtrer à la source et optimiser le modèle |

Un autre point de vigilance concerne les pilotes de base de données. Si un connecteur ne trouve pas une base spécifique ou renvoie une erreur de fournisseur, le pilote nécessaire peut manquer sur le poste qui exécute Power BI Desktop — et parfois sur celui qui héberge la passerelle. Faites valider l’installation par l’équipe informatique.

## En pratique

Pour connecter une source de données dans Power BI sans fragiliser votre rapport, suivez cette séquence : **choisissez le connecteur natif, authentifiez-vous avec un compte adapté, transformez les données dans Power Query, vérifiez les relations, puis configurez l’actualisation après publication**.

Commencez par une source simple et un périmètre limité. Une fois les chiffres validés, industrialisez la connexion : fichier partagé correctement structuré, vue SQL dédiée, paramètres d’environnement, passerelle surveillée et droits documentés. C’est cette préparation qui transforme un tableau de bord ponctuel en outil de pilotage fiable.

:::key
La meilleure connexion Power BI n’est pas seulement celle qui fonctionne aujourd’hui : c’est celle qui reste **sécurisée, compréhensible et actualisable** quand le rapport est partagé à toute une équipe.
:::
