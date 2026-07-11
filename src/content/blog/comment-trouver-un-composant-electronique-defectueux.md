---
title: "Comment trouver un composant électronique défectueux"
description: "Comment trouver un composant électronique défectueux : diagnostic au multimètre, mesures fiables et méthodes pour réparer un circuit sans risque inutilement."
pubDate: "2024-02-06T09:13:16"
updatedDate: "2026-07-11"
category: "Tech, Web & Numérique"
categorySlug: "tech-web-numerique"
cover: "/images/covers/comment-trouver-un-composant-electronique-defectueux.webp"
coverAlt: "Technicien mesurant une carte électronique au multimètre près de composants CMS et condensateurs"
takeaways: ["Suivez le chemin de l’alimentation et les symptômes pour réduire rapidement la zone de recherche.","Utilisez le multimètre hors tension puis sous tension, sans confondre une mesure de circuit avec celle d’un composant isolé.","Repérez les courts-circuits par une méthode progressive : inspection, résistance à la masse, consommation et échauffement.","Remplacez un composant seulement après avoir vérifié sa référence, son environnement et la cause probable de sa panne."]
faq: [{"question":"Comment tester un composant électronique sans le dessouder ?","answer":"Un multimètre permet de réaliser un premier contrôle en circuit, notamment pour une continuité, un fusible, une diode ou un court-circuit vers la masse. Toutefois, les composants connectés en parallèle peuvent fausser la mesure. Si le résultat est ambigu ou important pour le diagnostic, dessoudez au moins une patte du composant avant de conclure."},{"question":"Comment savoir si une carte électronique est en court-circuit ?","answer":"Mesurez hors tension la résistance entre le rail d’alimentation suspect et la masse, puis observez son évolution. Une valeur durablement très basse peut signaler un court-circuit, mais certains circuits ont naturellement une faible résistance. Une consommation anormale ou un composant qui chauffe sous alimentation limitée permet de confirmer plus sûrement le diagnostic."},{"question":"Comment reconnaître un condensateur défectueux ?","answer":"Un condensateur gonflé, fuyant ou fissuré doit être remplacé, mais beaucoup de condensateurs défaillants paraissent normaux. Un capacimètre aide à contrôler la capacité, tandis qu’un testeur ESR ou un oscilloscope est souvent plus efficace pour révéler un condensateur vieillissant dans une alimentation. Une mesure hors circuit est généralement plus fiable."},{"question":"Quel mode du multimètre utiliser pour trouver une panne électronique ?","answer":"Utilisez le mode continuité pour les fusibles, pistes et câbles, le mode résistance pour rechercher un court-circuit hors tension, le mode diode pour les diodes et certaines jonctions, et le mode tension continue pour suivre l’alimentation sur une carte sous tension. Ne basculez jamais en résistance ou en diode sur un circuit alimenté."},{"question":"Pourquoi un composant électronique chauffe-t-il autant ?","answer":"Un échauffement peut être normal pour un régulateur, un processeur ou une résistance de puissance, mais il devient suspect s’il est très rapide, localisé et associé à une panne ou une surconsommation. Les causes fréquentes sont un court-circuit en aval, une surtension, une mauvaise régulation ou le composant lui-même en défaut. Comparez avec une carte saine ou avec les valeurs prévues par la documentation."},{"question":"Quand faut-il confier une carte électronique à un réparateur ?","answer":"Faites appel à un professionnel si l’appareil est relié au secteur, s’il contient une batterie lithium endommagée, si la panne concerne une alimentation haute tension ou si le remplacement exige du matériel de microsoudure. C’est aussi recommandé lorsque le diagnostic nécessite un oscilloscope, un schéma propriétaire ou la programmation d’un circuit intégré."}]
readingTime: 13
sourceId: 727
---
Une carte électronique qui ne démarre plus, un appareil qui chauffe anormalement ou une fonction qui disparaît sans raison ne révèlent presque jamais d’emblée le composant en cause. Un condensateur peut sembler intact tout en étant dégradé, et une diode peut donner une mesure trompeuse lorsqu’elle est encore montée sur le circuit.

La méthode la plus efficace consiste à **réduire progressivement la zone de recherche**, plutôt qu’à tester tous les composants au hasard. Avec une inspection attentive, un multimètre et quelques mesures prises dans le bon ordre, il est souvent possible d’identifier la famille de composants fautive, puis de confirmer le diagnostic sans endommager davantage la carte.

## Commencer par la sécurité et le bon diagnostic de panne

Avant toute mesure, identifiez le type d’appareil et sa source d’énergie : pile, batterie, alimentation basse tension, secteur, alimentation à découpage ou convertisseur haute tension. Les cartes reliées au secteur, les chargeurs, les micro-ondes, les téléviseurs et certaines alimentations peuvent conserver une tension dangereuse dans leurs condensateurs même après débranchement.

Débranchez l’appareil, retirez sa batterie amovible si possible et attendez avant de manipuler la carte. Vérifiez l’absence de tension avec un multimètre lorsque vous savez le faire. Ne mesurez **jamais une résistance, une continuité ou une diode sur une carte alimentée** : ces modes injectent leur propre faible courant et peuvent fausser la mesure, voire endommager le multimètre ou le circuit.

:::warning
N’intervenez pas sur une partie reliée directement au secteur sans compétences adaptées, schéma fiable et matériel isolé. Si la panne concerne une alimentation secteur ou un appareil de sécurité, l’intervention d’un réparateur qualifié est préférable.
:::

Avant de chercher le composant défectueux, décrivez précisément le symptôme : l’appareil est-il totalement mort, fonctionne-t-il par intermittence, affiche-t-il une erreur, se coupe-t-il à chaud, consomme-t-il trop ou seulement une fonction est-elle en panne ? Cette observation oriente le contrôle vers l’alimentation, un connecteur, une commande, un capteur ou un étage de puissance.

| Symptôme observé | Zone à suspecter en priorité | Premier contrôle utile |
|---|---|---|
| L’appareil ne s’allume pas | Entrée d’alimentation, fusible, interrupteur, régulateurs | Tension à l’entrée et continuité du chemin d’alimentation |
| Il s’allume puis s’éteint | Protection, batterie, régulateur, court-circuit partiel | Consommation et tensions des rails d’alimentation |
| Une fonction seule ne marche plus | Connecteur, capteur, bouton, transistor ou circuit dédié | Inspection des soudures et comparaison avec une fonction similaire |
| Une zone chauffe vite | Court-circuit, composant de puissance, régulateur | Recherche thermique sous alimentation limitée |
| La panne apparaît après un choc ou de l’humidité | Soudures, pistes, connecteurs, corrosion | Observation à la loupe et test de continuité |

## Réunir les outils qui évitent les faux diagnostics

Un multimètre numérique fiable est l’outil de base. Il doit au minimum proposer les modes tension continue, résistance, continuité et test de diode. Une loupe, une lumière rasante et des pointes de touche fines sont tout aussi utiles : de nombreuses pannes sont visibles avant même la première mesure.

| Outil | Ce qu’il permet de vérifier | Limite à connaître |
|---|---|---|
| Multimètre | Tension, continuité, résistance, diodes, parfois capacité | Il ne diagnostique pas à lui seul tous les circuits intégrés ni tous les condensateurs |
| Alimentation de laboratoire limitée en courant | Alimenter une carte de manière contrôlée et révéler une surconsommation | À utiliser seulement si la tension et la polarité attendues sont connues |
| Loupe ou microscope USB | Fissures, corrosion, soudures sèches, composants brûlés | N’indique pas si un composant visuellement sain fonctionne réellement |
| Caméra thermique ou thermomètre infrarouge | Localiser une zone qui chauffe anormalement | L’échauffement est parfois une conséquence, pas la cause |
| Oscilloscope | Observer horloges, signaux, ondulation d’alimentation et communications | Demande de savoir ce que le signal devrait être |

Un schéma électronique, une vue éclatée ou la documentation technique de l’appareil accélèrent énormément le dépannage. À défaut, relevez les inscriptions sur les composants et cherchez leur fiche technique. Elle donne le brochage, le rôle des broches, les tensions admissibles et parfois les conditions de test.

:::info[Une mesure n’a de sens qu’avec une référence]
Une tension ou une résistance n’est pas « bonne » ou « mauvaise » par nature. Il faut la comparer à une valeur attendue : sérigraphie de la carte, fiche technique, schéma, carte identique fonctionnelle ou zone symétrique du même circuit.
:::

## Examiner la carte avant de sortir le multimètre

Commencez par une inspection méthodique, idéalement après avoir nettoyé la poussière et les résidus non conducteurs. Cherchez les indices suivants :

- **condensateur gonflé, fendu ou ayant coulé** ;
- résistance noircie, fissurée ou dont le marquage a disparu ;
- diode, transistor ou circuit intégré marqué par une surchauffe ;
- soudure terne, craquelée ou décollée autour d’un connecteur et des composants lourds ;
- piste coupée après un choc, une chute ou une corrosion ;
- traces blanchâtres, vertes ou noires liées à une infiltration de liquide ;
- connecteur desserré, oxydé, tordu ou mal enfiché ;
- odeur de composant brûlé, particulièrement autour des régulateurs et des étages de puissance.

Inspectez aussi le dessous de la carte. Les pannes de soudure sont fréquentes sur les prises d’alimentation, relais, boutons, bobines et connecteurs, car ces éléments subissent des contraintes mécaniques. Une soudure sèche forme parfois un anneau fin autour de la patte du composant ; elle peut provoquer une panne intermittente selon la pression ou la température.

Un défaut visuel est un **indice fort**, mais pas une preuve définitive. Une résistance brûlée, par exemple, a souvent souffert d’un problème situé en aval : remplacer uniquement la résistance peut conduire à la voir griller à nouveau au redémarrage.

## Tester hors tension : la méthode la plus sûre pour isoler une zone

Une fois la carte totalement hors tension, commencez par le chemin de l’alimentation. Repérez la borne positive, la masse ou le négatif, le fusible éventuel, la diode de protection, les bobines, puis les régulateurs. Le but est de savoir si un court-circuit bloque un rail d’alimentation ou si un élément coupe le passage du courant.

### Vérifier fusibles, pistes et connecteurs

En mode continuité ou faible résistance, contrôlez un fusible entre ses deux extrémités. Un fusible intact présente normalement une continuité très faible. Faites de même avec les pistes suspectes, les interrupteurs et les câbles. Pour un connecteur, testez à la fois la continuité du câble et l’état mécanique des contacts.

Attention : un bip de continuité ne signifie pas toujours que le composant est sain. Certains circuits, bobines ou semi-conducteurs peuvent faire sonner le multimètre selon le sens des pointes. Consultez donc la mesure chiffrée et, si nécessaire, comparez-la à une partie identique du circuit.

### Chercher un court-circuit vers la masse

Mesurez la résistance entre chaque rail d’alimentation identifiable et la masse. Une valeur très basse et stable peut révéler un court-circuit, mais elle n’est pas systématiquement anormale : les circuits numériques modernes et certains étages de puissance ont naturellement une faible résistance à froid.

Observez surtout le comportement de la mesure :

- une valeur qui commence basse puis augmente peut correspondre à la charge d’un condensateur ;
- une valeur durablement très faible sur un rail qui ne devrait alimenter que peu de composants mérite une investigation ;
- une valeur différente entre deux rails semblables ou deux canaux identiques est un signal utile ;
- une mesure ambiguë impose d’isoler la branche concernée, par exemple en retirant un cavalier, un fusible de carte ou un composant prévu pour séparer l’alimentation.

Ne déduisez pas qu’un condensateur est coupable seulement parce qu’il est relié au rail en court-circuit. Il peut être en parallèle avec le véritable fautif : régulateur, diode de protection, circuit intégré ou transistor de puissance.

### Utiliser le mode diode pour les semi-conducteurs

Le mode diode est particulièrement utile pour vérifier une diode de redressement, une diode de protection et, avec prudence, certaines jonctions de transistors. Une diode saine conduit généralement dans un sens et bloque dans l’autre. Une lecture identique dans les deux sens, une absence totale de conduction ou une valeur quasi nulle dans les deux sens peuvent indiquer un défaut, selon le montage.

Pour les transistors et MOSFET, repérez impérativement le brochage dans la fiche technique. Un MOSFET peut présenter des lectures attendues liées à sa diode interne ; un test improvisé entre deux pattes conduit facilement à une mauvaise conclusion. Vérifiez aussi qu’il n’existe pas de court-circuit évident entre les broches de puissance et la masse, puis comparez avec un exemplaire identique s’il y en a un sur la carte.

:::tip
Quand une mesure paraît incohérente, dessoudez une patte du composant ou retirez-le complètement avant de conclure. Les composants montés en parallèle et les chemins internes de la carte faussent très souvent les tests effectués en circuit.
:::

## Mettre sous tension avec méthode pour suivre la panne

Si aucun défaut évident n’apparaît hors tension, la mesure sous tension devient nécessaire. Procédez avec une alimentation adaptée, des pointes de touche bien positionnées et sans laisser glisser les sondes entre deux broches. Sur une carte sensible, utilisez si possible une alimentation de laboratoire avec limitation de courant : elle limite les dégâts en cas de court-circuit et renseigne sur une consommation anormale.

Commencez à l’entrée, puis remontez le chemin de l’énergie : prise ou batterie, fusible, protection contre l’inversion de polarité, convertisseur, régulateur, puis circuits alimentés. Mesurez chaque point par rapport à la masse, sauf indication contraire du schéma.

| Résultat de mesure | Interprétation probable | Action suivante |
|---|---|---|
| La tension d’entrée est absente | Câble, chargeur, batterie, prise, interrupteur ou fusible en cause | Tester en amont, hors tension si nécessaire |
| L’entrée est correcte mais le régulateur n’a pas de sortie | Régulateur non activé, endommagé ou sortie en surcharge | Vérifier broche d’activation, court-circuit sur la sortie et échauffement |
| Une tension est présente mais instable | Protection qui se déclenche, condensateur dégradé, régulation défaillante | Mesurer la consommation, contrôler les condensateurs et observer à l’oscilloscope si possible |
| Une seule branche n’est pas alimentée | Fusible de carte, bobine, interrupteur électronique ou piste coupée | Suivre la continuité et les chutes de tension sur cette branche |
| Toutes les alimentations sont correctes | Défaut de commande, signal, mémoire, capteur ou logiciel | Comparer les signaux et les entrées/sorties concernées |

Mesurez également les chutes de tension dans le chemin d’alimentation. Un fusible, un connecteur, une piste ou un interrupteur électronique peut sembler continu hors tension mais présenter une résistance anormale sous charge. Une différence de potentiel notable entre l’entrée et la sortie d’un élément censé être passant indique qu’il devient suspect.

## Localiser un composant qui chauffe ou provoque une surconsommation

Une alimentation qui se met en sécurité, une batterie qui se vide rapidement ou une carte qui chauffe au repos orientent souvent vers un court-circuit partiel. Dans ce cas, le composant fautif dissipe parfois plus de chaleur que son voisinage.

La caméra thermique est la méthode la plus simple. Sans cet outil, une petite quantité d’alcool isopropylique appliquée sur une carte **hors tension**, puis l’observation de son évaporation après remise sous tension contrôlée, peut révéler une zone chaude. Cette technique demande prudence, ventilation et une parfaite maîtrise des risques liés à l’appareil ; elle ne doit jamais être utilisée près d’une source d’étincelle ou sur un équipement secteur ouvert.

Une autre approche consiste à injecter une alimentation limitée en courant sur le rail en défaut, uniquement après avoir identifié sa tension nominale, sa polarité et son isolement du reste du montage. Commencez de façon conservatrice et surveillez la consommation. N’injectez pas une tension au hasard sur un rail de processeur, une batterie, une ligne de données ou une entrée inconnue : vous pourriez détruire plusieurs composants au lieu d’en localiser un seul.

:::warning
Un composant chaud n’est pas forcément défectueux. Un processeur, un régulateur ou une résistance de puissance peuvent chauffer normalement. Le critère utile est un échauffement anormalement rapide, localisé et cohérent avec le symptôme ou avec une consommation excessive.
:::

## Ne pas oublier les pannes intermittentes et les composants difficiles à tester

Les pannes les plus frustrantes apparaissent avec les vibrations, la chaleur, l’humidité ou après plusieurs minutes de fonctionnement. Elles concernent souvent :

- les soudures fissurées et les connecteurs ;
- les condensateurs électrolytiques ayant perdu leurs caractéristiques ;
- les boutons et relais aux contacts usés ;
- les régulateurs instables à chaud ;
- les capteurs, nappes et câbles soumis aux mouvements ;
- certains circuits intégrés dont le défaut ne se révèle qu’en fonctionnement.

Pour les rechercher, reproduisez le symptôme de manière contrôlée. Manipulez très légèrement les connecteurs hors tension, observez si une pression sur la carte modifie la panne, ou utilisez avec précaution un spray refroidissant destiné à l’électronique sur une zone ciblée. Une variation nette lorsque la température change fournit un indice, mais doit être confirmée par des mesures ou un remplacement d’essai.

Les condensateurs méritent une attention particulière. Un capacimètre peut détecter une capacité hors tolérance, mais un condensateur peut conserver une capacité proche de sa valeur nominale tout en ayant une résistance série interne trop élevée. Un testeur ESR ou l’observation de l’ondulation de l’alimentation à l’oscilloscope est alors plus pertinent. Là encore, une mesure fiable nécessite souvent de dessouder au moins une patte.

Les circuits intégrés sont rarement vérifiables complètement avec un simple multimètre. On les diagnostique souvent **par leur environnement** : bonnes alimentations, signal d’horloge présent, entrées cohérentes, sortie absente, échauffement anormal et comparaison avec une carte fonctionnelle. Avant de remplacer un circuit intégré coûteux ou difficile à souder, éliminez les causes plus fréquentes : alimentation, condensateurs, reset, connecteurs et court-circuits périphériques.

## Confirmer avant de remplacer le composant

Un composant est raisonnablement identifié lorsqu’au moins deux éléments concordent : mesure anormale, symptôme cohérent, comparaison avec une zone saine, échauffement localisé, ou retour à la normale après isolement. Ne remplacez pas une pièce uniquement parce qu’elle « semble » suspecte.

Au moment de commander la pièce, vérifiez :

- la **référence exacte** ou un équivalent validé par la fiche technique ;
- le boîtier, le brochage et l’orientation ;
- les caractéristiques électriques réellement nécessaires : tension, courant, puissance, polarité, seuil ou type de composant ;
- la qualité et la provenance de la pièce ;
- l’état des composants autour, surtout si le premier a grillé.

Après remplacement, inspectez les soudures à la loupe pour exclure un pont d’étain ou une patte non soudée. Pour le premier démarrage, une alimentation limitée en courant reste la meilleure protection lorsqu’elle est adaptée au circuit. Vérifiez ensuite que la consommation, les tensions et la fonction en panne sont redevenues normales.

:::success
La réparation la plus durable ne consiste pas seulement à changer la pièce défaillante : elle consiste à comprendre pourquoi elle a lâché. Une surtension, un liquide, une ventilation obstruée ou un composant en aval en court-circuit peut provoquer une récidive.
:::

## Les erreurs qui font perdre du temps

Évitez ces réflexes courants :

- tester des résistances ou diodes alors que la carte est encore sous tension ;
- conclure à partir d’une seule mesure faite en circuit ;
- remplacer plusieurs composants au hasard, ce qui complique ensuite le diagnostic ;
- utiliser une alimentation sans limitation de courant sur une carte suspectée d’être en court-circuit ;
- confondre masse, négatif de batterie et terre de protection sans avoir étudié le montage ;
- court-circuiter des points de test avec des sondes trop épaisses ;
- oublier la polarité d’un condensateur électrolytique, d’une diode ou d’un transistor ;
- négliger les câbles, prises, fusibles, boutons et soudures, pourtant responsables d’une grande part des pannes simples.

## En pratique

Adoptez un ordre fixe : **observer le symptôme, sécuriser l’appareil, inspecter la carte, tester hors tension, suivre les tensions sous alimentation contrôlée, puis confirmer par comparaison ou isolement**. Cette démarche évite de dessouder inutilement et transforme une recherche aléatoire en diagnostic reproductible.

Si la carte est reliée au secteur, si le défaut touche une batterie lithium, si les pistes sont fortement endommagées ou si le composant est un circuit intégré à boîtier très fin, confiez la réparation à un professionnel. Dans les autres cas, la patience, des mesures documentées et le respect du schéma électrique restent les meilleurs outils pour trouver un composant électronique défectueux.
