---
title: "Gestion de licences Microsoft pour machines virtuelles Azure : guide débutant"
description: "Guide débutant de la gestion de licences Microsoft pour machines virtuelles Azure : modèles, Azure Hybrid Benefit et contrôles pour réduire les coûts."
pubDate: "2025-05-16T15:55:49"
updatedDate: "2026-07-11"
category: "Tech, Web & Numérique"
categorySlug: "tech-web-numerique"
cover: "/images/covers/licences-microsoft-azure.webp"
coverAlt: "Administrateur consultant le portail Azure et un tableau de licences pour des machines virtuelles"
takeaways: ["Distinguez le coût de calcul Azure des licences du système d’exploitation, de SQL Server et des droits d’accès utilisateurs.","Choisissez entre licence incluse à l’usage et Azure Hybrid Benefit selon les licences éligibles déjà détenues.","Évitez les erreurs de conformité grâce à un inventaire des éditions, cœurs, abonnements et CAL nécessaires.","Mettez en place des tags, des contrôles de configuration et une revue régulière pour conserver des preuves exploitables."]
faq: [{"question":"Azure Hybrid Benefit est-il gratuit ?","answer":"Azure Hybrid Benefit n’est pas une licence gratuite. C’est un avantage tarifaire qui permet de réduire la composante logicielle de certaines ressources Azure lorsque l’organisation possède déjà des licences Microsoft éligibles, généralement avec la couverture contractuelle requise. Le calcul, le stockage et les autres services Azure restent facturés."},{"question":"Ai-je besoin d’une licence Windows Server pour une VM Azure ?","answer":"Pas nécessairement. Une image Windows Server avec licence incluse permet de payer l’usage de Windows Server via Azure. Si vous activez Azure Hybrid Benefit, vous devez en revanche disposer de licences Windows Server éligibles et pouvoir en justifier l’affectation."},{"question":"Les CAL Windows Server sont-elles incluses dans Azure ?","answer":"En règle générale, non. Les droits d’accès utilisateurs ou appareils, tels que les CAL Windows Server et les CAL RDS pour les bureaux à distance, doivent être examinés séparément. Le fait d’héberger le serveur dans Azure ne fait pas disparaître automatiquement ces exigences."},{"question":"Comment savoir si une VM utilise Azure Hybrid Benefit ?","answer":"Vérifiez les paramètres de licence de la VM dans le portail Azure ou dans votre automatisation de déploiement, selon le type de ressource. Croisez ensuite cette information avec un registre interne indiquant les licences affectées, l’édition concernée et la validité de la couverture contractuelle."},{"question":"Puis-je utiliser mes licences SQL Server sur Azure ?","answer":"C’est possible dans certains scénarios, notamment via Azure Hybrid Benefit pour des licences SQL Server éligibles. Les règles varient selon l’édition, le nombre de cœurs, le service Azure choisi et les droits de haute disponibilité. Consultez les conditions Microsoft à jour avant de modifier la facturation ou de migrer une charge SQL."},{"question":"Une facture Azure suffit-elle pour prouver ma conformité logicielle ?","answer":"Non. La facture indique les ressources consommées et les options facturées par Azure, mais elle ne prouve pas que vos licences apportées sont éligibles ni correctement affectées. Conservez aussi les contrats, preuves d’achat, informations de couverture et votre registre d’affectation."}]
readingTime: 13
sourceId: 2302
---
Une machine virtuelle Azure ne se résume pas à une taille de VM et à un prix mensuel affiché dans le portail. Selon l’image utilisée, les logiciels installés et la façon dont les utilisateurs y accèdent, une même VM peut mobiliser des droits Windows Server, SQL Server, des CAL ou des licences Microsoft 365.

Pour débuter sans se tromper, il faut séparer deux sujets : **la facturation Azure** et **le droit d’utiliser un logiciel Microsoft**. Ce guide explique les principaux modèles de licences, la place d’Azure Hybrid Benefit et une méthode simple pour documenter vos choix avant de déployer ou de migrer vos machines virtuelles.

## Comprendre ce qui est licencié dans une VM Azure

Azure facture d’abord des ressources cloud : capacité de calcul, stockage des disques, réseau, sauvegarde et services associés. Les licences Microsoft peuvent s’ajouter à cette facture, ou être apportées par l’entreprise si elle y est autorisée.

Dans la pratique, il faut examiner **quatre couches distinctes** :

1. **L’infrastructure Azure** : nombre de vCPU, mémoire, disque, trafic sortant et disponibilité.
2. **Le système d’exploitation** : par exemple Windows Server ou une distribution Linux.
3. **Le logiciel serveur** : SQL Server, Remote Desktop Services, BizTalk Server ou une application métier Microsoft.
4. **Les droits d’accès** : CAL Windows Server, CAL RDS, droits d’accès à Azure Virtual Desktop, selon le scénario.

| Élément de la VM | Peut être inclus dans le prix Azure ? | Point à vérifier |
|---|---:|---|
| Calcul, disques et réseau | Oui, toujours facturés selon l’usage | Taille de VM, disques managés, trafic et services annexes |
| Windows Server | Oui, via une image avec licence incluse | Ou éligibilité à Azure Hybrid Benefit |
| SQL Server sur une VM | Oui, avec une image SQL Server à l’usage | Édition, nombre de vCores et licences existantes |
| CAL Windows Server / RDS | Généralement non | Nombre et type d’utilisateurs ou d’appareils accédant au serveur |
| Linux et logiciels tiers | Variable selon l’image | Éventuel coût de support de la distribution ou de l’éditeur |

:::key
Le fait qu’une VM fonctionne dans Azure ne signifie pas que toutes les licences sont incluses. **Le prix Azure et la conformité des licences sont deux contrôles complémentaires.**
:::

### Les termes à connaître avant de commencer

- **Licence incluse** : Azure facture l’usage du logiciel Microsoft avec la VM ou le service sélectionné. C’est le modèle le plus simple pour démarrer.
- **BYOL** (*Bring Your Own License*) : l’entreprise apporte une licence acquise auparavant. Ce terme ne constitue pas, à lui seul, un droit de réutilisation : il faut vérifier les conditions du produit.
- **Azure Hybrid Benefit** : avantage tarifaire Microsoft permettant, pour certains produits et sous conditions, d’utiliser des licences existantes éligibles dans Azure afin de réduire la composante logicielle de la facture.
- **Software Assurance (SA)** : couverture contractuelle qui donne notamment accès à certains avantages de mobilité ou de cloud. Des licences sous abonnement peuvent aussi ouvrir des droits comparables selon le contrat.
- **CAL** (*Client Access License*) : droit d’accès requis pour certains logiciels serveur. Une CAL n’est pas une licence de VM et n’est pas automatiquement fournie avec Azure.

## Choisir le bon modèle de licence

Pour une première VM Windows ou SQL Server, vous rencontrerez surtout deux options : payer la licence à l’usage dans Azure, ou déclarer Azure Hybrid Benefit avec des licences existantes éligibles.

### Option 1 : utiliser une image avec licence incluse

Avec une image Windows Server ou SQL Server proposée dans la Place de marché Azure, la composante logicielle est facturée avec l’utilisation de la ressource. Vous n’avez pas à affecter de licences Windows Server ou SQL Server préexistantes à cette VM pour ce logiciel précis.

Cette formule convient particulièrement si :

- vous lancez un **prototype**, un environnement temporaire ou une charge imprévisible ;
- vous ne disposez pas de licences éligibles et documentées ;
- vous voulez limiter la complexité administrative au démarrage ;
- vous avez besoin d’une édition ou d’une version sans parc de licences existant correspondant.

Elle ne dispense pas nécessairement de vérifier les droits d’accès, notamment pour Windows Server et Remote Desktop Services.

### Option 2 : activer Azure Hybrid Benefit

Azure Hybrid Benefit peut réduire le coût de Windows Server ou SQL Server dans Azure lorsque l’organisation possède des licences éligibles, généralement assorties d’une couverture active appropriée, telle que Software Assurance ou un abonnement admissible.

Concrètement, l’administrateur indique dans Azure que la VM utilise cet avantage. Azure adapte alors la facturation applicable. **Cette déclaration est une attestation de votre part** : elle ne crée pas les licences requises et ne remplace pas la vérification contractuelle.

Les règles dépendent notamment :

- du produit concerné : Windows Server, SQL Server et certains autres produits n’ont pas tous les mêmes droits ;
- de l’édition et de la version détenues ;
- du mode de licence, par cœur ou par serveur et CAL ;
- du nombre de vCores de la VM ou du service managé ;
- de la couverture active au moment de l’utilisation ;
- des droits de migration, de reprise après sinistre ou d’usage parallèle éventuellement prévus.

:::info[Azure Hybrid Benefit n’est pas une licence]
Il s’agit d’un mécanisme de facturation fondé sur des droits existants. Conservez donc la preuve d’achat, l’édition, le nombre de cœurs licenciés, la période de couverture et l’affectation des licences aux ressources Azure.
:::

### Comparaison rapide des approches

| Critère | Licence incluse à l’usage | Azure Hybrid Benefit |
|---|---|---|
| Mise en route | Très simple | Nécessite une validation préalable |
| Coût logiciel Azure | Inclus dans la tarification de la ressource | Réduit lorsque les droits sont réellement éligibles |
| Licences existantes | Non nécessaires pour l’OS ou SQL inclus | Indispensables et à documenter |
| Risque principal | Payer plus cher sur une charge durable | Déclarer un avantage sans droits suffisants |
| Meilleur usage | Test, besoin ponctuel, absence de parc éligible | Migration ou charge pérenne avec licences éligibles |

### Le cas particulier des logiciels apportés dans Azure

Tous les logiciels Microsoft ne se gèrent pas comme Windows Server. Certains produits peuvent bénéficier de **droits de mobilité de licence**, d’autres sont liés à des règles spécifiques dans Azure, et certaines licences ne peuvent pas être simplement transférées vers une VM partagée.

Ne déduisez jamais qu’une licence installée sur un serveur local peut être déployée à l’identique dans le cloud. Consultez les **Microsoft Product Terms**, votre contrat de licences et, si besoin, votre revendeur ou spécialiste des licences. Cette précaution est essentielle pour les logiciels métier, les éditions Datacenter, les produits avec des droits par utilisateur et les architectures de haute disponibilité.

## Faire l’inventaire avant de créer ou migrer une VM

La meilleure gestion de licences commence par un inventaire court, mais fiable. Ne partez pas de la liste des machines Azure uniquement : partez des logiciels et des droits détenus par l’organisation.

### Les informations à réunir

Pour chaque VM concernée, consignez au minimum :

- le nom de la ressource, l’environnement et le propriétaire ;
- le système d’exploitation, son édition et son mode d’acquisition ;
- les logiciels serveur installés, notamment SQL Server ;
- la taille de la VM et son nombre de vCores ;
- le modèle choisi : licence incluse, Azure Hybrid Benefit ou autre droit validé ;
- le nombre de licences disponibles et leur type ;
- la date de fin de Software Assurance ou de l’abonnement si applicable ;
- les utilisateurs ou appareils accédant au service, lorsque des CAL sont requises ;
- les éléments de preuve : facture, contrat, portail de gestion des licences, bon de commande ou attestation interne.

Un simple tableau partagé peut suffire au début. Dans une organisation plus structurée, alimentez plutôt une CMDB, un outil SAM (*Software Asset Management*) ou un registre de licences relié aux tags Azure.

:::tip
Attribuez des tags cohérents aux VM : `Environnement`, `Proprietaire`, `CentreDeCout`, `ModeLicence` et `Application`. Ils facilitent les revues de coûts et permettent d’identifier rapidement les ressources déclarées avec Azure Hybrid Benefit.
:::

### Ne pas oublier les droits d’accès

Une erreur fréquente consiste à ne comptabiliser que Windows Server ou SQL Server. Or, si des collaborateurs accèdent à un serveur Windows, des **CAL Windows Server** peuvent être nécessaires. Si des utilisateurs ouvrent des sessions de bureau à distance sur Windows Server, des **CAL RDS** peuvent également s’appliquer.

Pour Azure Virtual Desktop, les droits d’accès dépendent du système d’exploitation, du profil des utilisateurs et de la licence qualifiante détenue, par exemple certaines offres Microsoft 365 ou Windows. Les conditions diffèrent aussi pour des utilisateurs externes. Vérifiez le scénario exact avant d’ouvrir l’accès à un grand nombre de personnes.

## Configurer Azure sans perdre la trace des licences

Une fois la stratégie décidée, la configuration technique doit refléter votre registre de licences. La procédure varie selon le produit et le service, mais la logique reste la même.

### Déployer une nouvelle VM

1. **Choisissez l’image** : Windows Server, SQL Server, Linux ou image personnalisée.
2. **Sélectionnez la taille de VM** adaptée au besoin réel, car le nombre de vCores influence la capacité de licences à affecter dans de nombreux scénarios.
3. **Choisissez le mode de licence** dans les options prévues par Azure. Pour les produits pris en charge, le portail propose notamment une option Azure Hybrid Benefit.
4. **Appliquez les tags** avant ou pendant le déploiement.
5. **Archivez la décision** dans votre registre : produit, édition, date, responsable et justification des droits utilisés.

Pour les déploiements industrialisés, ce choix peut être géré dans les modèles d’infrastructure as code et dans les scripts d’automatisation. L’objectif est d’éviter qu’une VM soit créée avec un réglage différent de la règle approuvée.

### Modifier une VM existante avec prudence

Une VM existante peut souvent être mise à jour depuis le portail Azure ou par automatisation pour indiquer son mode de licence, lorsque ce scénario est pris en charge. Mais ne basculez pas une flotte entière en Azure Hybrid Benefit sans validation : la modification de l’option dans Azure est rapide, tandis que la vérification des droits l’est beaucoup moins.

Avant tout changement, contrôlez :

- que la licence est encore éligible à la date du changement ;
- que le nombre de cœurs ou de vCores est correctement couvert ;
- que la licence n’est pas déjà affectée à un autre usage incompatible ;
- que le bon produit et la bonne édition sont déclarés ;
- que les règles temporaires de migration, si elles sont invoquées, sont bien respectées.

| Contrôle opérationnel | Action concrète | Fréquence conseillée |
|---|---|---|
| Inventaire des VM | Exporter les VM Windows et SQL, tailles et tags | Mensuelle ou à chaque changement majeur |
| Éligibilité des licences | Vérifier contrats, SA, abonnements et éditions | À chaque activation d’avantage et au renouvellement |
| Paramètres Azure | Comparer le mode de licence déclaré au registre | Mensuelle |
| Accès utilisateurs | Revoir CAL, RDS et droits Azure Virtual Desktop | À chaque nouveau périmètre d’utilisateurs |
| Preuves | Centraliser contrats, captures de configuration et validations | En continu |

## Cas pratiques : Windows Server, SQL Server et postes virtualisés

### Windows Server dans une VM Azure

Avec une image Windows Server standard, vous pouvez conserver la **licence incluse à l’usage**. Si votre organisation possède des licences Windows Server éligibles avec les couvertures requises, Azure Hybrid Benefit peut être plus adapté à une migration durable.

Le calcul des droits tient compte des cœurs licenciés et des vCores utilisés dans Azure. Les règles exactes, y compris les minimums applicables, les droits d’usage parallèle et les particularités de certaines éditions, doivent être vérifiées dans les conditions Microsoft en vigueur. Ne vous fiez pas uniquement au nombre de VM : **une petite VM et une VM très dimensionnée ne mobilisent pas nécessairement la même capacité de licences**.

### SQL Server sur une VM ou dans un service Azure

SQL Server mérite une revue séparée, car son coût de licence peut être significatif et les choix d’architecture sont nombreux : VM SQL Server, Azure SQL Database ou Azure SQL Managed Instance, notamment.

Vous pouvez choisir une offre avec SQL Server facturé à l’usage ou utiliser Azure Hybrid Benefit avec des licences SQL Server éligibles. Le mode de déploiement, l’édition SQL Server, la puissance allouée et les éventuels environnements secondaires modifient les droits nécessaires.

:::warning
Ne transposez pas automatiquement les règles SQL Server d’une VM vers Azure SQL Database ou Azure SQL Managed Instance. Les options de calcul, les ratios de conversion et les avantages possibles sont propres au service choisi. Validez le scénario avant la migration, surtout pour la haute disponibilité et la reprise après sinistre.
:::

### Azure Virtual Desktop et Windows client

Un environnement Azure Virtual Desktop ajoute une couche de droits utilisateurs. Il faut distinguer la VM hôte, le système Windows utilisé et les licences des personnes qui s’y connectent. Certaines licences Microsoft 365 ou Windows peuvent donner accès à Azure Virtual Desktop pour des utilisateurs éligibles, mais ce n’est pas universel.

Documentez donc le groupe d’utilisateurs autorisés, leur type de licence et les éventuels utilisateurs externes. Ce contrôle doit être coordonné entre les équipes cloud, postes de travail, identité et achats.

## Les erreurs les plus coûteuses à éviter

- **Cocher Azure Hybrid Benefit par défaut** sur toutes les VM Windows ou SQL sans rapprocher les licences disponibles.
- **Oublier les CAL** parce que la VM est hébergée dans Azure plutôt que dans un datacenter interne.
- **Confondre licence par cœur, licence par serveur et licence par utilisateur**.
- **Laisser expirer Software Assurance ou un abonnement** sans réexaminer les VM qui s’appuient sur les avantages associés.
- **Agrandir une VM** sans vérifier l’effet du nouveau nombre de vCores sur la couverture de licences.
- **Utiliser une licence de production pour un environnement de développement ou de test** sans contrôler les droits spécifiques, notamment ceux liés aux abonnements Visual Studio.
- **Considérer une facture Azure comme une preuve de conformité** : elle prouve une consommation facturée, pas la détention de vos licences apportées.

:::success
Une gestion saine repose sur une règle simple : chaque VM Microsoft doit avoir un propriétaire, un mode de licence déclaré et une preuve associée. Cette discipline réduit à la fois le risque de conformité et les dépenses inutiles.
:::

## Estimer le budget sans se limiter au prix de la VM

Pour comparer deux options, estimez le coût complet sur la durée prévue d’utilisation :

**Coût Azure de calcul + stockage + réseau + sauvegarde + licence à l’usage éventuelle + coûts de support et d’exploitation.**

Si vous envisagez Azure Hybrid Benefit, comparez ce coût avec le coût résiduel dans Azure **et** le coût déjà engagé pour conserver les licences et leur couverture. Une licence déjà détenue n’est pas toujours gratuite à mobiliser : elle peut être affectée à une autre charge, soumise à un renouvellement ou nécessaire pour un plan de continuité.

Utilisez le calculateur de prix Azure pour une première estimation technique, puis faites valider les hypothèses de licences par les achats, le responsable SAM ou votre partenaire Microsoft. Pour une migration importante, une revue préalable est généralement bien moins risquée qu’une correction a posteriori.

## En pratique

Avant de créer votre prochaine VM Azure, appliquez cette checklist :

1. Identifiez précisément l’OS, les logiciels serveur et les utilisateurs concernés.
2. Décidez si vous payez la licence à l’usage ou si vous utilisez des licences éligibles existantes.
3. Vérifiez les droits dans les conditions Microsoft et les documents contractuels à jour.
4. Configurez le bon mode de licence dans Azure, puis ajoutez un tag explicite.
5. Archivez la preuve et programmez une revue après les changements de taille, de périmètre ou de contrat.

Cette méthode est volontairement simple, mais elle pose les fondations indispensables : **un inventaire fiable, des réglages Azure cohérents et des droits démontrables**.
