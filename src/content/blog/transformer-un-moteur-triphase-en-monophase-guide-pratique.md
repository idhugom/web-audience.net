---
title: "Transformer un moteur triphasé en monophasé : guide pratique"
description: "Transformer un moteur triphasé en monophasé : choisissez variateur ou condensateur, vérifiez la plaque moteur et réalisez le câblage en sécurité chez vous."
pubDate: "2025-01-22T09:56:19"
updatedDate: "2026-07-11"
category: "Maison, Jardin & Bricolage"
categorySlug: "maison-jardin"
cover: "/images/covers/transformer-un-moteur-triphase-en-monophase-guide-pratique.webp"
coverAlt: "Moteur électrique triphasé avec bornier ouvert et variateur de fréquence dans un atelier"
takeaways: ["Identifiez la tension et le couplage inscrits sur la plaque moteur avant tout achat ou branchement.","Un variateur mono-tri est la solution la plus fiable pour conserver le couple, régler la vitesse et protéger le moteur.","Le montage à condensateur convient surtout aux faibles puissances et aux charges faciles à démarrer, avec une puissance réduite.","Un moteur marqué uniquement 400/690 V ne se raccorde pas directement à un variateur 230 V mono-tri standard.","Sécurisez l’installation : terre, protections adaptées, réglage du courant moteur et absence de coupure en sortie de variateur."]
faq: [{"question":"Peut-on brancher directement un moteur triphasé sur une prise 230 V monophasée ?","answer":"Non. Un moteur triphasé ne peut pas être raccordé directement entre phase et neutre comme un moteur monophasé. Il faut utiliser un variateur mono-tri, un montage à condensateur adapté ou remplacer le moteur par un modèle monophasé compatible."},{"question":"Comment savoir si mon moteur triphasé est compatible avec un variateur 230 V monophasé ?","answer":"Vérifiez la plaque signalétique. Un moteur indiqué 230/400 V Δ/Y est généralement compatible avec un variateur 230 V mono vers 230 V triphasé, à condition de le coupler en triangle. Vérifiez aussi que le courant de sortie maximal du variateur couvre le courant nominal du moteur en triangle."},{"question":"Quelle puissance perd-on avec un condensateur sur un moteur triphasé ?","answer":"La baisse dépend du moteur, du condensateur et surtout de la charge entraînée, mais elle est souvent importante. Le couple de démarrage est également nettement réduit. Cette solution convient donc mal aux machines qui démarrent en charge ou qui demandent un effort constant élevé."},{"question":"Peut-on utiliser un moteur 400/690 V avec un variateur mono-tri 230 V ?","answer":"Pas avec un variateur standard qui délivre seulement du 230 V triphasé. Un moteur 400/690 V est normalement prévu pour recevoir 400 V entre phases en couplage triangle. Il faut une solution fournissant la tension appropriée, une adaptation validée par un professionnel ou un changement de moteur."},{"question":"Faut-il installer un contacteur entre le variateur et le moteur ?","answer":"En principe, non pour assurer les manœuvres normales. Couper la sortie U/V/W d’un variateur en fonctionnement peut endommager l’électronique ou provoquer des défauts. Utilisez les bornes de commande du variateur et concevez l’arrêt d’urgence selon les exigences de sécurité de la machine."},{"question":"Un variateur permet-il d’augmenter la vitesse d’un moteur triphasé ?","answer":"Il peut augmenter la fréquence au-delà de 50 Hz, donc la vitesse, mais cela ne signifie pas que la machine peut le supporter. Au-delà de la fréquence nominale, le couple disponible peut diminuer et les roulements, poulies, l’outil ou le ventilateur moteur peuvent être soumis à des contraintes excessives. Respectez les limites du moteur et de la machine."}]
readingTime: 12
sourceId: 2056
---
Un atelier, un garage ou une maison disposent le plus souvent d’une alimentation **monophasée 230 V**, alors que de nombreuses machines d’occasion — perceuses à colonne, tours, pompes, compresseurs, ventilateurs ou scies — sont équipées d’un moteur triphasé. La bonne nouvelle : il est fréquemment possible de les utiliser sans faire installer le triphasé.

Il ne s’agit pas, à proprement parler, de transformer le moteur en moteur monophasé. On lui fournit plutôt une alimentation compatible, soit par un **variateur de fréquence mono-tri**, soit par un montage à **condensateur**. Le bon choix dépend d’abord de la plaque signalétique du moteur, puis de la machine entraînée et du couple nécessaire au démarrage.

## Ce que signifie réellement passer du triphasé au monophasé

Un moteur asynchrone triphasé fonctionne avec trois phases décalées, qui créent un champ magnétique tournant régulier. Une prise domestique ne fournit qu’une phase et un neutre. Il faut donc recréer, ou simuler, les trois phases nécessaires au moteur.

Deux méthodes sont principalement utilisées :

- **Le variateur de fréquence mono-tri** : il reçoit du 230 V monophasé et délivre du 230 V triphasé piloté. Le moteur reste bien un moteur triphasé.
- **Le condensateur de déphasage** : il crée un décalage de phase approximatif sur l’un des enroulements. Le moteur peut tourner, mais avec des compromis importants sur le couple et la puissance disponible.

Une troisième voie est parfois la plus logique : **remplacer le moteur** par un modèle monophasé adapté. Elle évite l’électronique et le montage à condensateur, mais impose de vérifier la fixation, l’arbre, la vitesse, le sens de rotation et la compatibilité mécanique avec la machine.

:::info[Le point clé]
Un variateur ne convertit pas le moteur en monophasé : il fabrique une alimentation triphasée à partir du réseau monophasé. C’est pourquoi il préserve bien mieux les performances du moteur qu’un simple condensateur.
:::

## Lire la plaque signalétique avant de choisir une solution

La plaque signalétique est votre document de référence. Elle se trouve généralement sur le flanc du moteur. Si elle est illisible ou absente, évitez tout branchement au hasard : il faut alors identifier précisément le moteur ou demander l’avis d’un électromécanicien.

Relevez au minimum :

- la **tension nominale** et le symbole associé : triangle Δ ou étoile Y ;
- la **puissance** exprimée en kW ;
- le **courant nominal**, souvent indiqué pour chaque tension ;
- la fréquence, généralement 50 Hz ;
- la vitesse nominale en tours par minute ;
- le type de service, par exemple S1 pour un fonctionnement continu ;
- la présence de **six bornes accessibles** dans le boîtier de raccordement.

### Le cas idéal : moteur 230/400 V Δ/Y

La mention **230/400 V Δ/Y** est la plus favorable pour un réseau domestique. Elle signifie en général :

- fonctionnement en **triangle (Δ)** avec une alimentation triphasée 230 V entre phases ;
- fonctionnement en **étoile (Y)** avec une alimentation triphasée 400 V entre phases.

Un variateur alimenté en 230 V monophasé fournit habituellement du **230 V triphasé en sortie**. Ce moteur doit donc être couplé en **triangle** pour être compatible avec ce type de variateur.

Sur un bornier à six plots, le schéma de barrettes est normalement imprimé dans le couvercle. Il faut suivre ce schéma, pas se fier à une disposition supposée universelle des bornes ou à la couleur des fils.

### Le cas à risque : moteur 400/690 V Δ/Y

Un moteur marqué **400/690 V Δ/Y** est prévu pour fonctionner en triangle sous 400 V triphasé, et en étoile sous 690 V triphasé. Il n’est donc **pas compatible directement** avec la sortie 230 V triphasée d’un variateur mono-tri standard.

Le raccorder en triangle sur du 230 V ne lui permettra pas de développer son fonctionnement nominal. Il risque de manquer fortement de couple, de chauffer, de décrocher sous charge ou de se mettre en défaut.

Les solutions possibles sont alors plus limitées :

- utiliser un variateur capable de fournir la tension triphasée adaptée, dans une installation conçue pour cela ;
- faire modifier l’alimentation par un professionnel si le réseau le permet ;
- remplacer le moteur par un modèle 230/400 V compatible ;
- conserver ou installer une alimentation triphasée lorsque la puissance et l’usage le justifient.

:::warning[Ne confondez pas tension réseau et tension du moteur]
Le 230 V monophasé d’une prise domestique ne donne pas automatiquement du 230 V triphasé exploitable par n’importe quel moteur. La correspondance entre la sortie du variateur et le couplage Δ/Y de la plaque est indispensable.
:::

## Variateur mono-tri ou condensateur : quelle méthode choisir ?

Le variateur est, dans la plupart des cas, la solution technique à privilégier. Le condensateur reste intéressant pour des besoins simples, à condition d’accepter une baisse de performances et un réglage plus empirique.

| Critère | Variateur mono-tri | Montage à condensateur |
|---|---|---|
| Fonctionnement du moteur | Proche du triphasé d’origine | Déséquilibré, avec puissance réduite |
| Couple au démarrage | Généralement bon si bien paramétré | Limité, souvent insuffisant sous charge |
| Réglage de vitesse | Oui, par modification de fréquence | Non, vitesse presque fixe |
| Sens de rotation | Modifiable par commande ou réglage | Possible, mais câblage à modifier |
| Mise en œuvre | Paramétrage nécessaire | Câblage simple en apparence, réglage délicat |
| Usage conseillé | Machines-outils, pompes, ventilateurs, entraînements variés | Petits moteurs et charges faciles à lancer |

### Pourquoi le variateur est généralement la meilleure solution

Un variateur de fréquence redresse la tension monophasée, puis recompose trois phases pilotées. Il apporte plusieurs avantages utiles au quotidien :

- **démarrage progressif**, moins brutal pour la mécanique et le réseau ;
- réglage de la vitesse par la fréquence ;
- inversion de sens sans modifier les fils de puissance ;
- limitation et surveillance du courant selon les fonctions du modèle ;
- rampes d’accélération et de décélération ;
- meilleure conservation du couple qu’avec un condensateur, à paramètres adaptés.

Pour une perceuse, un tour, une fraiseuse légère, un ventilateur, une petite pompe ou une machine nécessitant un bon démarrage, c’est généralement le choix le plus durable. Le coût initial est plus élevé qu’un condensateur, mais il évite souvent les pertes de puissance et les difficultés d’utilisation.

### Quand un condensateur peut suffire

Le montage dit à condensateur permanent, parfois appelé montage Steinmetz, peut convenir lorsque :

- le moteur est de puissance modérée ;
- la charge démarre presque à vide ;
- la vitesse n’a pas besoin d’être réglée ;
- une baisse de puissance est acceptable ;
- la machine est utilisée de manière occasionnelle.

Un ventilateur, une petite meule ou une machine présentant peu de résistance au démarrage peuvent être de bons candidats. À l’inverse, évitez cette solution pour un compresseur, une pompe chargée, une scie sous effort, une machine-outil nécessitant du couple ou tout équipement qui démarre directement en charge.

Avec un condensateur, le moteur fonctionne avec des enroulements moins bien équilibrés. La puissance réellement exploitable est souvent sensiblement inférieure à celle inscrite sur la plaque. Le démarrage est le point le plus critique. Un condensateur de démarrage et un dispositif de coupure peuvent améliorer ce point, mais rendent le montage plus complexe.

:::tip[Choisissez le condensateur à partir de données fiables]
La valeur du condensateur dépend de la puissance, de la tension, du régime et de la charge. Utilisez les recommandations du fabricant du moteur, un kit dimensionné pour votre modèle ou le calcul validé par un professionnel. Une valeur choisie au hasard peut entraîner échauffement, faible couple ou démarrages aléatoires.
:::

## Comment choisir un variateur mono-tri compatible

Ne choisissez pas un variateur sur la seule base de sa puissance affichée. Vérifiez sa documentation technique et comparez-la aux données de la plaque moteur.

### Les critères essentiels

1. **Entrée monophasée compatible** : le variateur doit explicitement accepter une alimentation monophasée 200 à 240 V. Certains appareils prévus pour une entrée triphasée ne peuvent pas être alimentés en monophasé, ou seulement avec un déclassement précisé par leur fabricant.

2. **Sortie triphasée 230 V** : elle convient à un moteur 230/400 V couplé en triangle. C’est le cas de figure le plus courant en atelier domestique.

3. **Courant de sortie nominal suffisant** : le courant maximal du variateur doit être au moins égal au courant indiqué sur la plaque pour le couplage triangle. C’est un critère plus fiable que la seule puissance en kW.

4. **Type de charge** : un ventilateur demande moins d’effort au démarrage qu’un compresseur ou qu’une machine-outil. Pour une charge lourde, choisissez un variateur prévu pour un couple constant et suivez les éventuelles recommandations de surdimensionnement du constructeur.

5. **Commandes nécessaires** : potentiomètre de vitesse, boutons marche/arrêt, inversion, entrée pour contact de sécurité, commande déportée ou freinage sont à anticiper avant l’achat.

6. **Environnement d’installation** : indice de protection, poussière, humidité, température, ventilation du coffret et compatibilité électromagnétique comptent autant que la puissance.

### Budget et temps à prévoir

Le montage à condensateur est habituellement la solution la moins coûteuse en matériel, mais il peut demander plusieurs essais et ne donnera pas forcément un résultat satisfaisant. Un variateur de qualité, les protections, le coffret et la commande représentent un investissement plus conséquent, particulièrement sur les puissances élevées.

Côté temps, prévoyez davantage que le seul raccordement des fils : lecture de la plaque, sélection du matériel, câblage propre, paramétrage, essais à vide puis en charge. Pour une installation fixe, le temps consacré au coffret, à la ventilation et à la sécurité est rarement perdu.

## Câbler un variateur : les grandes étapes à respecter

Les schémas de bornier varient selon les marques. Le manuel du variateur reste prioritaire. Les principes suivants permettent néanmoins de préparer l’installation correctement.

### 1. Mettre le moteur dans le bon couplage

Pour un moteur **230/400 V Δ/Y** alimenté par un variateur qui sort du 230 V triphasé, placez les barrettes en **triangle**, conformément au diagramme du capot de bornier.

Vérifiez également que les six extrémités d’enroulement sont accessibles. Un moteur dont le couplage est interne et non modifiable peut nécessiter une autre solution.

### 2. Raccorder l’alimentation du variateur

L’arrivée 230 V monophasée se connecte sur les bornes d’entrée prévues, souvent repérées L et N, ou L1/L2 selon les appareils. La terre doit être raccordée à la borne de protection du variateur et à la carcasse du moteur.

Installez en amont une protection et un dispositif de coupure adaptés à l’installation et aux prescriptions du fabricant. Le calibre du disjoncteur ne se déduit pas uniquement de la puissance moteur : le variateur peut appeler un courant d’entrée différent, notamment lors de la charge de ses condensateurs internes.

### 3. Raccorder le moteur sur la sortie du variateur

Les trois fils moteur se branchent sur les bornes de sortie généralement marquées **U, V et W**. Si le sens de rotation ne convient pas lors du test, inversez deux conducteurs côté moteur après mise hors tension complète, ou utilisez le paramètre prévu par le variateur.

Le câble moteur doit être correctement dimensionné et posé proprement. Sur une installation fixe ou sensible aux perturbations, un câble blindé et une mise à la terre soignée peuvent être demandés par la notice du variateur.

### 4. Paramétrer avant le premier vrai essai

Entrez les valeurs présentes sur la plaque moteur :

- tension nominale correspondant au couplage choisi ;
- courant nominal ;
- fréquence nominale, généralement 50 Hz ;
- vitesse ou nombre de pôles si le variateur le demande ;
- temps d’accélération et de décélération ;
- mode de commande : clavier, bornier, potentiomètre ou commande externe.

Effectuez ensuite un essai bref à faible vitesse, sans charge. Observez le sens de rotation, les vibrations, les bruits anormaux et l’intensité affichée. Testez ensuite la machine dans ses conditions d’usage réelles, en restant attentif à l’échauffement.

:::warning[Pas de contacteur entre variateur et moteur]
Ne coupez pas et ne réenclenchez pas habituellement la liaison U/V/W avec un contacteur pendant que le variateur fonctionne. La commande marche/arrêt doit passer par les entrées prévues par le fabricant. Un arrêt d’urgence doit être conçu comme une fonction de sécurité dédiée, et non comme un simple arrêt logiciel.
:::

## Sécurité électrique : les erreurs qui endommagent le moteur ou le variateur

Un moteur triphasé, un variateur et une machine tournante cumulent des risques électriques et mécaniques. Si vous n’êtes pas à l’aise avec le câblage, faites contrôler le montage par un électricien ou un électromécanicien qualifié.

Les erreurs les plus fréquentes sont les suivantes :

- raccorder un moteur 400/690 V à une sortie 230 V triphasée sans solution de tension adaptée ;
- oublier de passer un moteur 230/400 V en couplage triangle ;
- choisir le variateur selon les kW sans vérifier le **courant nominal** ;
- paramétrer un courant moteur trop élevé, ce qui réduit la protection contre les surcharges ;
- régler une fréquence excessive et faire tourner une machine au-delà de ce que sa mécanique supporte ;
- installer le variateur dans un boîtier fermé, poussiéreux ou mal ventilé ;
- supprimer la liaison de terre ou utiliser un câble endommagé ;
- ajouter un condensateur entre le variateur et le moteur ;
- conserver les anciens contacteurs de puissance en sortie du variateur sans revoir la commande.

Les variateurs peuvent aussi générer des courants de fuite et des perturbations. Le choix du dispositif différentiel, la longueur des câbles et le filtrage éventuel doivent suivre les indications du fabricant et les règles applicables à votre installation. C’est particulièrement important dans un atelier humide, dans un garage ou pour une machine métallique accessible.

## Dans quels cas vaut-il mieux changer le moteur ?

Le remplacement par un moteur monophasé est parfois plus simple et plus fiable, notamment si :

- le moteur d’origine est ancien, bruyant ou présente un défaut d’isolement ;
- il est marqué 400/690 V et l’installation ne permet pas de produire la bonne tension ;
- la machine n’a besoin que d’une vitesse fixe ;
- l’usage est simple et le coût du variateur ne se justifie pas ;
- vous souhaitez une commande électrique classique, sans paramétrage.

Avant de commander, comparez soigneusement la puissance, la vitesse, le diamètre et la longueur de l’arbre, le type de fixation, l’encombrement, le sens de montage et la compatibilité avec les poulies ou accouplements. Un moteur monophasé ne fournit pas toujours le même couple au démarrage qu’un moteur triphasé équivalent : ce point est essentiel sur une machine chargée.

## En pratique

Commencez par photographier lisiblement la plaque et le bornier. Si votre moteur est marqué **230/400 V Δ/Y** et possède six bornes, un **variateur acceptant le 230 V monophasé et délivrant du 230 V triphasé** est généralement la voie la plus sûre et la plus performante : couple préservé, démarrage progressif et réglage de vitesse.

Le condensateur reste une option de dépannage ou d’usage léger, à réserver aux moteurs modestes et aux charges qui démarrent facilement. Dans tous les cas, ne branchez jamais un moteur en vous fondant sur des suppositions : plaque signalétique, couplage, courant nominal, terre et notice du variateur déterminent la fiabilité de l’installation.

:::success
La meilleure décision n’est pas forcément la moins chère à l’achat : pour une machine régulièrement utilisée, un variateur correctement dimensionné protège mieux le moteur, améliore le confort d’utilisation et évite les pertes de performances liées au condensateur.
:::
