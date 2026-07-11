---
title: "Comment brancher un disque dur interne facilement"
description: "Comment brancher un disque dur interne facilement : repérez les câbles SATA, installez-le sans risque, vérifiez le BIOS et préparez-le sous Windows ou Mac."
pubDate: "2024-11-01T06:48:17"
updatedDate: "2026-07-11"
category: "Tech, Web & Numérique"
categorySlug: "tech-web-numerique"
cover: "/images/covers/comment-brancher-un-disque-dur-interne-facilement.webp"
coverAlt: "Disque dur SATA interne fixé dans une tour PC avec câbles de données et d’alimentation branchés"
takeaways: ["Identifiez le format et l’interface de votre disque avant d’ouvrir le boîtier pour éviter toute incompatibilité.","Branchez séparément le câble de données SATA et le câble d’alimentation, sans jamais forcer les connecteurs.","Contrôlez la détection dans le BIOS/UEFI avant d’initialiser et de formater le disque dans le système.","Distinguez l’ajout d’un disque de stockage du remplacement du disque système afin de préserver vos données et le démarrage."]
faq: [{"question":"Quels câbles faut-il pour brancher un disque dur interne SATA ?","answer":"Un disque dur SATA requiert deux branchements : un câble SATA de données relié à un port SATA de la carte mère, et un câble d’alimentation SATA venant du bloc d’alimentation. Le câble de données est étroit ; la prise d’alimentation est plus large. Un câble SATA de données n’est pas toujours fourni avec le disque."},{"question":"Pourquoi mon disque dur interne n’apparaît-il pas dans Windows ?","answer":"S’il est visible dans le BIOS/UEFI mais pas dans l’Explorateur de fichiers, il est probablement neuf et non initialisé. Ouvrez Gestion des disques, vérifiez soigneusement le bon support, initialisez-le puis créez et formatez un volume. S’il n’apparaît pas non plus dans le BIOS, contrôlez les câbles, le port SATA et l’alimentation."},{"question":"Peut-on brancher un disque dur interne sans câble SATA ?","answer":"Non pour un disque dur SATA classique : il lui faut un câble SATA de données et une alimentation SATA séparée. Un SSD M.2, en revanche, se fixe directement sur un port M.2 de la carte mère sans câble. Il ne faut pas confondre ces deux formats."},{"question":"Faut-il formater un nouveau disque dur interne ?","answer":"Oui, dans la plupart des cas. Un disque neuf doit être initialisé, partitionné et formaté avant de pouvoir stocker des fichiers. Le formatage efface les données présentes : ne formatez jamais un ancien disque contenant des fichiers que vous souhaitez conserver."},{"question":"Puis-je ajouter un disque dur interne sans réinstaller Windows ?","answer":"Oui. Pour ajouter un disque destiné au stockage, Windows reste installé sur le disque existant : il suffit de raccorder le nouveau disque, de vérifier sa détection et de l’initialiser. Une réinstallation ou un clonage n’est nécessaire que si vous remplacez le disque qui contient le système d’exploitation."},{"question":"Un disque dur de 2,5 pouces fonctionne-t-il dans une tour de PC ?","answer":"Oui, s’il utilise une interface SATA, ses câbles sont les mêmes que ceux d’un disque de 3,5 pouces. Il faut simplement un emplacement compatible 2,5 pouces ou un adaptateur de fixation vers une baie de 3,5 pouces. Ne le laissez pas non fixé dans le boîtier."}]
readingTime: 12
sourceId: 1775
---
Brancher un disque dur interne est une opération accessible, à condition de savoir reconnaître les bons connecteurs et de suivre un ordre précis. Dans la grande majorité des PC fixes récents, il s’agit d’un disque SATA : il doit recevoir **un câble de données relié à la carte mère** et **un câble d’alimentation venant du bloc d’alimentation**.

Le branchement ne suffit pas toujours : un disque neuf doit généralement être détecté, initialisé et formaté avant d’apparaître dans l’explorateur de fichiers. Voici comment installer un disque dur interne proprement, que vous ajoutiez de l’espace de stockage ou remplaciez un ancien disque.

## Identifier le type de disque et les connecteurs

Avant de démonter quoi que ce soit, examinez le disque que vous souhaitez installer. Le terme « disque dur interne » désigne souvent un HDD mécanique, mais certains points varient selon son format et son interface.

### Le cas le plus courant : le disque SATA 2,5 ou 3,5 pouces

Les disques durs internes actuels utilisent le plus souvent l’interface **SATA**. Sur la tranche arrière du disque, vous trouverez deux connecteurs en forme de L, placés côte à côte :

- le **connecteur SATA de données**, étroit, relié à la carte mère par un câble fin ;
- le **connecteur SATA d’alimentation**, plus large, relié au bloc d’alimentation du PC.

Le format physique n’a pas d’incidence sur le branchement :

- un disque de **3,5 pouces** est le format habituel dans un PC de bureau ;
- un disque de **2,5 pouces** est plus compact, fréquent dans les ordinateurs portables et pour certains HDD ou SSD ; il peut nécessiter un adaptateur ou un emplacement dédié dans une tour.

| Élément à vérifier | Disque 3,5 pouces | Disque 2,5 pouces |
|---|---|---|
| Usage le plus courant | Tour de bureau, stockage volumineux | PC portable, SSD, baie compacte |
| Fixation | Baie ou tiroir 3,5 pouces | Baie 2,5 pouces ou adaptateur 2,5 vers 3,5 pouces |
| Alimentation SATA | Oui | Oui |
| Câble de données SATA | Oui | Oui |

:::info[Reconnaître les prises SATA]
La prise d’alimentation SATA est nettement plus large que celle des données. Le détrompeur en forme de L empêche normalement les erreurs de sens : si cela ne rentre pas sans effort, ne forcez pas.
:::

### Attention : un SSD M.2 ne se branche pas comme un disque SATA

Un SSD au format **M.2** ressemble à une petite barrette. Il s’insère directement dans un port M.2 de la carte mère et se fixe avec une vis ; il n’emploie généralement ni câble SATA de données ni câble d’alimentation SATA. Il peut utiliser le protocole SATA ou, plus souvent, NVMe selon le modèle et la carte mère.

Ce guide vise surtout les disques durs SATA classiques. Si votre support est M.2, consultez le manuel de la carte mère : tous les emplacements M.2 n’acceptent pas les mêmes types de SSD, et certaines configurations peuvent désactiver un port SATA voisin.

### Cas des anciens disques IDE/PATA

Un ancien disque IDE possède un long connecteur à broches et une prise d’alimentation Molex à quatre broches. Ce matériel n’est pas compatible directement avec les ports SATA modernes : il faut une carte mère ancienne, une carte contrôleur adaptée ou un adaptateur spécifique. Vérifiez également les réglages de cavalier (master, slave ou cable select) si votre matériel les utilise.

## Préparer le matériel et sécuriser l’intervention

Vous n’avez pas besoin d’outils complexes, mais une bonne préparation évite la plupart des problèmes. Prévoyez généralement :

- le disque dur interne ;
- un **câble SATA de données** si votre carte mère ou votre disque n’en fournit pas ;
- une prise d’alimentation SATA libre provenant du bloc d’alimentation ;
- des vis adaptées ou le tiroir de fixation du boîtier ;
- un tournevis cruciforme ;
- éventuellement un adaptateur 2,5 vers 3,5 pouces.

Si vous remplacez le disque qui contient Windows, macOS ou Linux, sauvegardez vos données avant toute manipulation. Le branchement d’un disque secondaire est peu risqué pour les fichiers existants, mais une erreur de formatage peut effacer le mauvais support.

:::warning[Ne travaillez jamais sous tension]
Éteignez complètement l’ordinateur, coupez l’interrupteur de l’alimentation s’il existe et débranchez le câble secteur. Sur un ordinateur portable, débranchez le chargeur ; si la batterie est amovible, retirez-la selon les recommandations du fabricant.
:::

### Réduire le risque d’électricité statique

L’électricité statique peut endommager des composants sensibles. Travaillez sur une surface stable, non recouverte de moquette si possible. Touchez quelques secondes une partie métallique non peinte du châssis avant de manipuler le disque et la carte mère. Évitez de toucher les connecteurs dorés ou les circuits imprimés.

Prenez aussi une photo de l’intérieur du boîtier avant de commencer. Elle sera utile pour retrouver le cheminement des câbles ou vérifier la position des anciens branchements.

## Brancher un disque dur SATA dans un PC fixe : les étapes

Dans une tour, l’opération se fait boîtier ouvert. Le disque doit être **fixé mécaniquement** avant ou pendant le raccordement, selon la disposition du boîtier.

### 1. Ouvrir le boîtier et repérer les emplacements libres

Retirez le panneau latéral, habituellement maintenu par deux vis à l’arrière. Cherchez une baie, une cage à disques ou un tiroir libre. Les boîtiers récents placent parfois les disques derrière le panneau de la carte mère ou dans une cage située sous le cache de l’alimentation.

Repérez ensuite :

- un port SATA libre sur la carte mère, souvent regroupé sur un bord de celle-ci ;
- un câble d’alimentation SATA libre venant du bloc d’alimentation ;
- une baie dont la taille correspond au disque.

### 2. Fixer le disque dans sa baie

Insérez le disque dans le tiroir ou la baie en orientant ses connecteurs vers le passage des câbles. Fixez-le avec les vis fournies ou le système sans outil du boîtier. Le disque ne doit pas bouger une fois installé.

Pour un disque de 2,5 pouces dans une baie de 3,5 pouces, utilisez le support prévu par le boîtier ou un adaptateur. Ne laissez pas un disque posé librement au fond du boîtier : les vibrations, un câble tiré ou un déplacement du PC pourraient l’endommager.

### 3. Raccorder le câble SATA de données à la carte mère

Enfoncez une extrémité du câble SATA fin dans le petit connecteur du disque. Reliez l’autre extrémité à un port SATA libre de la carte mère. Certains câbles possèdent un petit loquet métallique : appuyez dessus pour les retirer, mais ne forcez jamais lors de l’insertion.

Le numéro du port SATA (SATA0, SATA1, etc.) n’a généralement pas d’importance pour un disque de données. Si vous installez ou réinstallez un disque système, suivre les indications du manuel de la carte mère peut simplifier le diagnostic.

### 4. Raccorder le câble d’alimentation SATA

Connectez la large prise plate venant de l’alimentation au grand connecteur du disque. Là encore, le détrompeur impose le bon sens. Une alimentation modulaire exige parfois de brancher d’abord le câble SATA approprié côté bloc d’alimentation : utilisez uniquement les câbles fournis avec **ce modèle précis** d’alimentation.

:::warning[Câbles modulaires : ne les mélangez pas]
Les connecteurs côté périphérique peuvent se ressembler, mais le câblage côté bloc d’alimentation n’est pas universel entre marques, ni toujours entre gammes d’une même marque. Réutiliser un câble provenant d’une autre alimentation peut abîmer le disque et les composants.
:::

### 5. Ranger les câbles et refermer

Assurez-vous que les câbles ne touchent pas un ventilateur et ne tirent pas sur les prises. Évitez de plier fortement le câble SATA. Refermez le boîtier, rebranchez le câble secteur, puis allumez le PC.

:::tip[Avant de revisser le panneau]
Effectuez un premier démarrage avec le panneau encore ouvert, en gardant les mains hors du boîtier. Vous pourrez vérifier plus vite qu’aucun ventilateur n’est gêné et que le disque est bien reconnu. Éteignez ensuite le PC avant de refermer définitivement.
:::

## Installer un disque dans un ordinateur portable

Sur un ordinateur portable, l’installation dépend entièrement du modèle. Certains possèdent une trappe dédiée à un disque SATA de 2,5 pouces ; d’autres exigent le retrait du capot inférieur ; beaucoup de machines fines récentes n’acceptent qu’un SSD M.2, voire ne permettent aucune évolution du stockage.

Avant d’acheter ou d’ouvrir l’appareil, consultez le manuel de maintenance du constructeur et vérifiez :

- la présence d’un emplacement libre ou la nécessité de remplacer le disque existant ;
- le format accepté : 2,5 pouces SATA, M.2 SATA ou M.2 NVMe ;
- l’épaisseur maximale autorisée pour un disque 2,5 pouces ;
- la présence d’une nappe ou d’un berceau parfois vendu séparément ;
- les conséquences éventuelles sur la garantie ou les interventions autorisées.

Un disque de 2,5 pouces dans un portable se branche souvent sur une petite nappe SATA propriétaire plutôt que directement sur la carte mère. Ne tirez jamais sur cette nappe : déverrouillez son connecteur selon le mécanisme prévu. Si le démontage impose de déconnecter une batterie interne, suivez strictement la documentation du fabricant ou confiez l’opération à un réparateur.

## Vérifier que le disque est détecté dans le BIOS ou l’UEFI

Au premier démarrage, le disque peut ne pas apparaître directement dans Windows ou macOS. Commencez par vérifier sa présence au niveau matériel.

Accédez au BIOS/UEFI au démarrage de l’ordinateur, avec la touche indiquée à l’écran ou dans le manuel de la carte mère. Cherchez une rubrique telle que stockage, SATA, périphériques ou informations système. Le nouveau disque devrait figurer avec sa capacité et sa référence.

| Situation constatée | Cause probable | Action à entreprendre |
|---|---|---|
| Le disque apparaît dans le BIOS, mais pas dans l’explorateur | Il n’est pas initialisé ou formaté | Préparez-le dans l’outil de gestion des disques |
| Le disque n’apparaît pas dans le BIOS | Câble, port ou alimentation mal connecté | Éteignez, puis vérifiez les deux branchements |
| Le disque fait des bruits anormaux ou s’arrête | Alimentation insuffisante ou disque défectueux | Coupez l’alimentation et testez avec un autre câble/port |
| Le PC ne démarre plus sur le bon système | Ordre de démarrage modifié | Replacez le disque système en tête dans l’UEFI |

Si le disque reste invisible, testez successivement un autre port SATA de la carte mère, un autre câble SATA de données et une autre prise d’alimentation SATA. Un disque peut aussi être testé dans un boîtier USB-SATA compatible ou sur un autre ordinateur afin d’isoler l’origine de la panne.

## Initialiser, partitionner et formater le nouveau disque

Un disque neuf détecté par le BIOS n’est pas forcément prêt à l’emploi. Il doit recevoir une table de partition, une ou plusieurs partitions, puis un système de fichiers.

### Sous Windows

Faites un clic droit sur le menu Démarrer et ouvrez **Gestion des disques**. Lors de la première détection, Windows peut proposer d’initialiser le disque.

Pour un ordinateur récent, choisissez généralement **GPT**. Le format MBR reste utile dans certains contextes de compatibilité ancienne, mais il est plus limité. Créez ensuite un nouveau volume simple, choisissez sa taille, attribuez une lettre de lecteur et formatez-le, le plus souvent en NTFS pour un usage interne sous Windows.

Vérifiez soigneusement la capacité et le numéro du disque avant de cliquer sur initialiser, supprimer ou formater. Ces opérations détruisent les données présentes sur le disque ciblé.

### Sous macOS et Linux

Sur un Mac compatible avec l’ajout d’un disque, utilisez **Utilitaire de disque** pour identifier le support, l’effacer puis sélectionner le format adapté à votre usage. Sur Linux, des outils graphiques de gestion des disques ou des utilitaires en ligne de commande permettent de créer la table de partitions et de formater le volume.

Si le disque doit circuler entre plusieurs systèmes, le choix du système de fichiers mérite réflexion. Pour un disque interne destiné à un seul PC, privilégiez le format natif du système. Pour les échanges réguliers entre environnements différents, renseignez-vous sur les compatibilités en lecture et écriture avant de formater.

:::success[Le bon signe]
Quand le disque est visible dans le BIOS puis dans l’outil de gestion du système, avec une capacité cohérente et une lettre de lecteur ou un point de montage, l’installation est terminée. Créez un dossier de test et copiez un fichier pour valider son fonctionnement.
:::

## Ajouter un disque de stockage ou remplacer le disque système ?

Ces deux usages n’impliquent pas la même préparation. Ajouter un disque est simple : le système existant reste sur son support actuel, et le nouveau disque sert aux documents, jeux, sauvegardes ou médias. Remplacer le disque de démarrage demande davantage de précautions.

| Projet | Préparation recommandée | Point de vigilance |
|---|---|---|
| Ajouter du stockage | Installer, initialiser et formater le nouveau disque | Ne pas formater le disque déjà utilisé |
| Remplacer un disque défaillant | Sauvegarder les fichiers et prévoir une réinstallation si nécessaire | Un disque très dégradé peut devenir illisible rapidement |
| Migrer vers un SSD | Cloner le disque ou réinstaller le système | Vérifier que les données tiennent sur le nouveau support |
| Créer un disque de sauvegarde interne | Définir une sauvegarde automatique régulière | Une sauvegarde dans le même PC ne protège pas d’un vol ou d’un sinistre |

Pour une migration, le clonage peut être pratique, mais il ne remplace pas une sauvegarde indépendante. Conservez l’ancien disque intact jusqu’à ce que le nouveau système démarre correctement et que vos fichiers importants aient été vérifiés.

## Les erreurs fréquentes à éviter

Quelques erreurs expliquent la plupart des installations qui échouent :

- **confondre SATA et M.2** et acheter un support incompatible avec l’emplacement disponible ;
- brancher seulement le câble de données ou seulement l’alimentation ;
- oublier de fixer le disque dans le boîtier ;
- forcer une prise mal orientée ;
- utiliser un câble modulaire issu d’une autre alimentation ;
- s’étonner que le disque neuf n’apparaisse pas avant son initialisation ;
- modifier l’ordre de démarrage alors que le disque système existant fonctionne ;
- formater le mauvais disque sans avoir identifié sa capacité et son contenu.

## En pratique

Pour brancher facilement un disque dur interne SATA, retenez cette séquence : **ordinateur hors tension, disque fixé, câble SATA fin vers la carte mère, prise SATA large vers l’alimentation, vérification dans le BIOS, puis initialisation dans le système**.

Avant l’achat, contrôlez surtout le format accepté par votre ordinateur et le nombre de ports disponibles. En cas de doute sur un PC portable, un disque ancien ou une alimentation modulaire, le manuel du fabricant reste la source la plus sûre. Une fois le disque opérationnel, activez une stratégie de sauvegarde : plus d’espace de stockage ne protège pas à lui seul vos fichiers importants.

:::key
Un disque SATA a toujours besoin de **deux connexions** : données vers la carte mère et alimentation vers le bloc d’alimentation. S’il est détecté mais invisible dans l’explorateur, il doit probablement être initialisé et formaté.
:::
