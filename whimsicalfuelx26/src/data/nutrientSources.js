const proteinSources = [
  {
    title: 'Chicken 🍗',
    value: 'Chicken',
    aliases: [
      'chicken breast',
      'chicken breast mince',
      'chicken thigh',
      'chicken fillet',
      'chicken pieces',
      'chicken mince',
      'minced chicken',
      'ground chicken',
      'rotisserie chicken',
      'shredded chicken',
    ],
  },
  {
    title: 'Beef 🥩',
    value: 'Beef',
    aliases: [
      'minced beef',
      'beef mince',
      'ground beef',
      'lean beef',
      'beef steak',
      'steak',
      'sirloin',
      'ribeye',
      'beef strips',
    ],
  },
  {
    title: 'Fish 🐟',
    value: 'Fish',
    aliases: [
      'lampuki',
      'lampuka',
      'sea bream',
      'sea bass',
      'cod',
      'hake',
      'tilapia',
      'white fish',
      'fish fillet',
      'fish fillets',
    ],
  },
  {
    title: 'Eggs 🥚',
    value: 'Eggs',
    aliases: [
      'egg',
      'egg whites',
      'egg white',
      'egg yolk',
      'egg yolks',
      'boiled egg',
      'scrambled eggs',
    ],
  },
  {
    title: 'Ham 🍖',
    value: 'Ham',
    aliases: [
      'sliced ham',
      'ham slices',
      'cooked ham',
      'smoked ham',
      'lean ham',
      'pork ham',
      'gammon',
      'prosciutto',
      'parma ham',
      'serrano ham',
      'bacon ham',
      'deli ham',
      'sandwich ham'
    ]
  },
  {
    title: 'Tuna 🐟',
    value: 'Tuna',
    aliases: [
      'canned tuna',
      'tinned tuna',
      'tuna chunks',
      'tuna flakes',
      'tuna steak',
      'tuna in brine',
      'tuna in olive oil',
    ],
  },
  {
    title: 'Turkey 🦃',
    value: 'Turkey',
    aliases: [
      'turkey breast',
      'turkey mince',
      'minced turkey',
      'ground turkey',
      'turkey slices',
      'turkey fillet',
    ],
  },
  {
    title: 'Plant-Based 🌱',
    value: 'Plant-Based',
    aliases: [
      'tofu',
      'tempeh',
      'seitan',
      'soy mince',
      'soya mince',
      'plant based mince',
      'plant-based mince',
      'vegan mince',
      'veggie mince',
      'quorn',
      'soy milk',
      'pea milk',
    ],
  },
];

const calciumSources = [
  {
    title: 'Milk 🥛',
    value: 'Milk',
    aliases: [
      'cow milk',
      'skimmed milk',
      'semi skimmed milk',
      'semi-skimmed milk',
      'whole milk',
      'low fat milk',
    ],
  },
  {
    title: 'Yoghurt 🥣🤍',
    value: 'Yoghurt',
    aliases: [
      'yogurt',
      'greek yoghurt',
      'greek yogurt',
      'plain yoghurt',
      'plain yogurt',
      'skyr',
    ],
  },
  {
    title: 'Cheese 🧀',
    value: 'Cheese',
    aliases: [
      'cheddar',
      'mozzarella',
      'edam',
      'gouda',
      'parmesan',
      'grated cheese',
      'light cheese',
    ],
  },
  {
    title: 'Ricotta 🧀🤍',
    value: 'Ricotta',
    aliases: ['irkotta', 'ricotta cheese', 'fresh ricotta'],
  },
  {
    title: 'Sardines with Bones 🐟🦴🥫',
    value: 'Sardines with bones',
    aliases: [
      'sardines',
      'canned sardines',
      'tinned sardines',
      'sardines in olive oil',
      'sardines in tomato sauce',
    ],
  },
  {
    title: 'Almonds 🌰🤎',
    value: 'Almonds',
    aliases: [
      'almond',
      'almond flakes',
      'flaked almonds',
      'ground almonds',
      'almond butter',
    ],
  },
  {
    title: 'Broccoli 🥦',
    value: 'Broccoli',
    aliases: ['broccoli florets', 'frozen broccoli'],
  },
  {
    title: 'Kale 🥬🌿',
    value: 'Kale',
    aliases: ['curly kale', 'baby kale'],
  },
];

const fibreSources = [
  {
    title: 'Oats 🥣🌾',
    value: 'Oats',
    aliases: ['rolled oats', 'porridge oats', 'instant oats', 'oatmeal'],
  },
  {
    title: 'Wholegrain Bread 🍞🌾',
    value: 'Wholegrain Bread',
    aliases: [
      'wholemeal bread',
      'brown bread',
      'whole wheat bread',
      'seeded bread',
      'multigrain bread',
    ],
  },
  {
    title: 'Brown Rice 🍚🤎',
    value: 'Brown Rice',
    aliases: ['wholegrain rice', 'whole grain rice'],
  },
  {
    title: 'Beans 🫘',
    value: 'Beans',
    aliases: [
      'kidney beans',
      'black beans',
      'red beans',
      'white beans',
      'cannellini beans',
      'butter beans',
      'baked beans',
    ],
  },
  {
    title: 'Lentils 🫘🟤',
    value: 'Lentils',
    aliases: [
      'red lentils',
      'green lentils',
      'brown lentils',
      'canned lentils',
      'tinned lentils',
    ],
  },
  {
    title: 'Chickpeas 🫘🟡',
    value: 'Chickpeas',
    aliases: [
      'chickpea',
      'garbanzo beans',
      'canned chickpeas',
      'tinned chickpeas',
      'hummus',
    ],
  },
  {
    title: 'Apples 🍏',
    value: 'Apples',
    aliases: ['apple', 'green apple', 'red apple'],
  },
  {
    title: 'Berries 🫐🍒🍓',
    value: 'Berries',
    aliases: [
      'strawberries',
      'blueberries',
      'raspberries',
      'blackberries',
      'mixed berries',
      'frozen berries',
    ],
  },
  {
    title: 'Broccoli 🥦',
    value: 'Broccoli',
    aliases: ['broccoli florets', 'frozen broccoli'],
  },
  {
    title: 'Carrots 🥕',
    value: 'Carrots',
    aliases: ['carrot', 'baby carrots', 'grated carrot'],
  },
  {
    title: 'Nuts 🥜🌰',
    value: 'Nuts',
    aliases: ['almonds', 'walnuts', 'cashews', 'peanuts', 'mixed nuts'],
  },
  {
    title: 'Seeds 🌱⚪',
    value: 'Seeds',
    aliases: [
      'chia seeds',
      'flax seeds',
      'pumpkin seeds',
      'sunflower seeds',
      'sesame seeds',
      'mixed seeds',
    ],
  },
];

const vitaminASources = [
  {
    title: 'Carrots 🥕',
    value: 'Carrots',
    aliases: ['carrot', 'baby carrots', 'grated carrot', 'shredded carrot'],
  },
  {
    title: 'Sweet Potatoes 🍠',
    value: 'Sweet Potatoes',
    aliases: ['sweet potato'],
  },
  {
    title: 'Pumpkin 🎃',
    value: 'Pumpkin',
    aliases: ['pumpkin puree', 'pumpkin purée', 'roasted pumpkin'],
  },
  {
    title: 'Spinach 🥬',
    value: 'Spinach',
    aliases: ['baby spinach', 'frozen spinach', 'spinach leaves'],
  },
  {
    title: 'Kale 🥬',
    value: 'Kale',
    aliases: ['curly kale', 'baby kale'],
  },
  {
    title: 'Eggs 🥚',
    value: 'Eggs',
    aliases: ['egg', 'egg yolk', 'egg yolks', 'boiled egg', 'scrambled eggs'],
  },
  {
    title: 'Liver 🥩',
    value: 'Liver',
    aliases: ['chicken liver', 'beef liver', 'lamb liver'],
  },
];

const vitaminBSources = [
  {
    title: 'Wholegrains 🌾',
    value: 'Wholegrains',
    aliases: [
      'wholegrain bread',
      'wholemeal bread',
      'whole wheat bread',
      'brown bread',
      'wholegrain pasta',
      'whole wheat pasta',
      'brown rice',
      'oats',
      'rolled oats',
      'porridge oats',
    ],
  },
  {
    title: 'Eggs 🥚',
    value: 'Eggs',
    aliases: [
      'egg',
      'egg whites',
      'egg white',
      'egg yolk',
      'egg yolks',
      'boiled egg',
      'scrambled eggs',
    ],
  },
  {
    title: 'Milk 🥛',
    value: 'Milk',
    aliases: [
      'cow milk',
      'skimmed milk',
      'semi skimmed milk',
      'semi-skimmed milk',
      'whole milk',
      'low fat milk',
    ],
  },
  {
    title: 'Chicken 🍗',
    value: 'Chicken',
    aliases: [
      'chicken breast',
      'chicken thigh',
      'chicken fillet',
      'chicken pieces',
      'chicken mince',
      'minced chicken',
      'ground chicken',
      'shredded chicken',
    ],
  },
  {
    title: 'Beef 🥩',
    value: 'Beef',
    aliases: [
      'minced beef',
      'beef mince',
      'ground beef',
      'lean beef',
      'beef steak',
      'steak',
      'beef strips',
    ],
  },
  {
    title: 'Fish 🐟',
    value: 'Fish',
    aliases: [
      'lampuki',
      'lampuka',
      'sea bream',
      'sea bass',
      'cod',
      'hake',
      'white fish',
      'fish fillet',
      'fish fillets',
    ],
  },
  {
    title: 'Beans 🫘',
    value: 'Beans',
    aliases: [
      'kidney beans',
      'black beans',
      'white beans',
      'cannellini beans',
      'butter beans',
      'baked beans',
    ],
  },
  {
    title: 'Lentils 🫘🟤',
    value: 'Lentils',
    aliases: [
      'red lentils',
      'green lentils',
      'brown lentils',
      'canned lentils',
      'tinned lentils',
    ],
  },
  {
    title: 'Leafy Greens 🥬',
    value: 'Leafy Greens',
    aliases: [
      'spinach',
      'baby spinach',
      'kale',
      'lettuce',
      'rocket',
      'rucola',
      'cabbage',
    ],
  },
];

const vitaminCSources = [
  {
    title: 'Oranges 🍊',
    value: 'Oranges',
    aliases: ['orange', 'fresh orange', 'orange juice'],
  },
  {
    title: 'Lemons 🍋',
    value: 'Lemons',
    aliases: ['lemon', 'lemon juice', 'fresh lemon'],
  },
  {
    title: 'Strawberries 🍓',
    value: 'Strawberries',
    aliases: ['strawberry', 'frozen strawberries'],
  },
  {
    title: 'Kiwi 🥝',
    value: 'Kiwi',
    aliases: ['kiwis', 'kiwi fruit', 'kiwifruit'],
  },
  {
    title: 'Bell Peppers 🫑',
    value: 'Bell Peppers',
    aliases: [
      'pepper',
      'peppers',
      'red pepper',
      'yellow pepper',
      'green pepper',
      'capsicum',
    ],
  },
  {
    title: 'Tomatoes 🍅',
    value: 'Tomatoes',
    aliases: ['tomato', 'cherry tomatoes', 'tomato sauce', 'passata', 'polpa'],
  },
  {
    title: 'Broccoli 🥦',
    value: 'Broccoli',
    aliases: ['broccoli florets', 'frozen broccoli'],
  },
  {
    title: 'Potatoes 🥔',
    value: 'Potatoes',
    aliases: ['potato', 'white potato', 'baby potatoes'],
  },
];

const vitaminDSources = [
  {
    title: 'Salmon 🐟',
    value: 'Salmon',
    aliases: [
      'salmon fillet',
      'salmon steak',
      'smoked salmon',
      'canned salmon',
      'tinned salmon',
    ],
  },
  {
    title: 'Tuna 🐟',
    value: 'Tuna',
    aliases: [
      'canned tuna',
      'tinned tuna',
      'tuna chunks',
      'tuna flakes',
      'tuna steak',
      'tuna in brine',
      'tuna in olive oil',
    ],
  },
  {
    title: 'Sardines 🐟',
    value: 'Sardines',
    aliases: [
      'sardine',
      'canned sardines',
      'tinned sardines',
      'sardines in olive oil',
      'sardines in tomato sauce',
    ],
  },
  {
    title: 'Egg Yolks 🥚',
    value: 'Egg Yolks',
    aliases: ['egg yolk', 'egg yolks', 'eggs', 'egg', 'boiled egg'],
  },
  {
    title: 'Fortified Milk 🥛',
    value: 'Fortified Milk',
    aliases: [
      'vitamin d milk',
      'fortified dairy milk',
      'fortified cow milk',
      'soy milk',
      'pea milk',
    ],
  },
  {
    title: 'Fortified Cereals 🥣',
    value: 'Fortified Cereals',
    aliases: [
      'cereal',
      'breakfast cereal',
      'fortified cereal',
      'corn flakes',
      'cornflakes',
      'bran flakes',
    ],
  },
];

const vitaminKSources = [
  {
    title: 'Spinach 🥬',
    value: 'Spinach',
    aliases: ['baby spinach', 'frozen spinach', 'spinach leaves'],
  },
  {
    title: 'Kale 🥬',
    value: 'Kale',
    aliases: ['curly kale', 'baby kale'],
  },
  {
    title: 'Broccoli 🥦',
    value: 'Broccoli',
    aliases: ['broccoli florets', 'frozen broccoli'],
  },
  {
    title: 'Cabbage 🥬',
    value: 'Cabbage',
    aliases: ['white cabbage', 'red cabbage', 'green cabbage', 'savoy cabbage'],
  },
  {
    title: 'Brussels Sprouts 🥬',
    value: 'Brussels Sprouts',
    aliases: ['brussels sprout', 'brussel sprouts', 'brussel sprout'],
  },
  {
    title: 'Lettuce 🥬',
    value: 'Lettuce',
    aliases: [
      'iceberg lettuce',
      'romaine lettuce',
      'cos lettuce',
      'mixed lettuce',
    ],
  },
  {
    title: 'Parsley 🌿',
    value: 'Parsley',
    aliases: [
      'fresh parsley',
      'flat leaf parsley',
      'flat-leaf parsley',
      'curly parsley',
    ],
  },
];

const healthyFatSources = [
  { title: 'Avocado 🥑', value: 'Avocado', aliases: ['avocados', 'avo'] },
  {
    title: 'Olive Oil 🫒',
    value: 'Olive Oil',
    aliases: ['extra virgin olive oil', 'evoo', 'olive oil spray'],
  },
  {
    title: 'Olives 🫒',
    value: 'Olives',
    aliases: ['black olives', 'green olives', 'kalamata olives'],
  },
  {
    title: 'Almonds 🌰',
    value: 'Almonds',
    aliases: ['almond', 'almond butter', 'flaked almonds'],
  },
  { title: 'Walnuts 🌰', value: 'Walnuts', aliases: ['walnut'] },
  { title: 'Cashews 🌰', value: 'Cashews', aliases: ['cashew'] },
  {
    title: 'Peanut Butter 🥜',
    value: 'Peanut Butter',
    aliases: ['peanut spread', 'pb'],
  },
  { title: 'Chia Seeds 🌱', value: 'Chia Seeds', aliases: ['chia'] },
  {
    title: 'Flax Seeds 🌱',
    value: 'Flax Seeds',
    aliases: ['flaxseed', 'linseed', 'ground flaxseed'],
  },
  { title: 'Pumpkin Seeds 🎃🌱', value: 'Pumpkin Seeds', aliases: ['pepitas'] },
  {
    title: 'Sunflower Seeds 🌻',
    value: 'Sunflower Seeds',
    aliases: ['sunflower kernels'],
  },
  {
    title: 'Salmon 🐟',
    value: 'Salmon',
    aliases: ['salmon fillet', 'smoked salmon'],
  },
  {
    title: 'Sardines 🐟',
    value: 'Sardines',
    aliases: ['canned sardines', 'tinned sardines'],
  },
  {
    title: 'Tuna 🐟',
    value: 'Tuna',
    aliases: ['canned tuna', 'tinned tuna', 'tuna chunks'],
  },
  {
    title: 'Eggs 🥚',
    value: 'Eggs',
    aliases: ['egg', 'egg yolks', 'egg yolk'],
  },
];

const magnesiumSources = [
  {
    title: 'Pumpkin Seeds 🎃🌱',
    value: 'Pumpkin Seeds',
    aliases: ['pumpkin seed', 'pepitas'],
  },
  {
    title: 'Chia Seeds 🌱',
    value: 'Chia Seeds',
    aliases: ['chia seed', 'chia'],
  },
  {
    title: 'Almonds 🌰',
    value: 'Almonds',
    aliases: [
      'almond',
      'ground almonds',
      'flaked almonds',
      'almond flakes',
      'almond butter',
    ],
  },
  {
    title: 'Cashews 🌰',
    value: 'Cashews',
    aliases: ['cashew', 'cashew nuts', 'cashew butter'],
  },
  {
    title: 'Peanuts 🥜',
    value: 'Peanuts',
    aliases: ['peanut', 'roasted peanuts', 'peanut butter', 'powdered peanut butter'],
  },
  {
    title: 'Spinach 🥬',
    value: 'Spinach',
    aliases: ['baby spinach', 'frozen spinach', 'spinach leaves'],
  },
  {
    title: 'Kale 🥬',
    value: 'Kale',
    aliases: ['curly kale', 'baby kale'],
  },
  {
    title: 'Black Beans 🫘',
    value: 'Black Beans',
    aliases: ['black bean', 'canned black beans', 'tinned black beans'],
  },
  {
    title: 'Lentils 🫘🟤',
    value: 'Lentils',
    aliases: [
      'lentil',
      'red lentils',
      'green lentils',
      'brown lentils',
      'canned lentils',
      'tinned lentils',
    ],
  },
  {
    title: 'Chickpeas 🫘🟡',
    value: 'Chickpeas',
    aliases: [
      'chickpea',
      'garbanzo beans',
      'canned chickpeas',
      'tinned chickpeas',
      'hummus',
    ],
  },
  {
    title: 'Oats 🥣🌾',
    value: 'Oats',
    aliases: ['rolled oats', 'porridge oats', 'instant oats', 'oatmeal'],
  },
  {
    title: 'Brown Rice 🍚🤎',
    value: 'Brown Rice',
    aliases: ['wholegrain rice', 'whole grain rice'],
  },
  {
    title: 'Dark Chocolate 🍫',
    value: 'Dark Chocolate',
    aliases: [
      'cocoa',
      'cacao',
      'dark cocoa powder',
      'cocoa powder',
      '70% chocolate',
      '85% chocolate',
    ],
  },
  {
    title: 'Avocado 🥑',
    value: 'Avocado',
    aliases: ['avocados', 'avo'],
  },
  {
    title: 'Bananas 🍌',
    value: 'Bananas',
    aliases: ['banana'],
  },
];

const carbohydrateSources = [
  {
    title: 'Oats 🥣🌾',
    value: 'Oats',
    aliases: ['rolled oats', 'porridge oats', 'oatmeal'],
  },
  {
    title: 'Wholegrain Bread 🍞🌾',
    value: 'Wholegrain Bread',
    aliases: ['wholemeal bread', 'brown bread', 'whole wheat bread'],
  },
  {
    title: 'Brown Rice 🍚🤎',
    value: 'Brown Rice',
    aliases: ['wholegrain rice', 'whole grain rice'],
  },
  {
    title: 'White Rice 🍚',
    value: 'White Rice',
    aliases: ['rice', 'basmati rice', 'jasmine rice', 'long grain rice'],
  },
  {
    title: 'Pasta 🍝',
    value: 'Pasta',
    aliases: ['spaghetti', 'penne', 'fusilli', 'rigatoni', 'macaroni'],
  },
  {
    title: 'Wholegrain Pasta 🍝🌾',
    value: 'Wholegrain Pasta',
    aliases: ['whole wheat pasta', 'wholemeal pasta', 'brown pasta'],
  },
  {
    title: 'Potatoes 🥔',
    value: 'Potatoes',
    aliases: ['potato', 'white potato', 'baby potatoes'],
  },
  {
    title: 'Sweet Potatoes 🍠',
    value: 'Sweet Potatoes',
    aliases: ['sweet potato'],
  },
  {
    title: 'Corn 🌽',
    value: 'Corn',
    aliases: [
      'sweetcorn',
      'corn kernels',
      'maize',
      'corn flakes',
      'cornflakes',
    ],
  },
  {
    title: 'Beans 🫘',
    value: 'Beans',
    aliases: [
      'kidney beans',
      'black beans',
      'white beans',
      'cannellini beans',
      'butter beans',
    ],
  },
  {
    title: 'Lentils 🫘🟤',
    value: 'Lentils',
    aliases: ['red lentils', 'green lentils', 'brown lentils'],
  },
  {
    title: 'Chickpeas 🫘🟡',
    value: 'Chickpeas',
    aliases: ['garbanzo beans', 'hummus'],
  },
  { title: 'Quinoa 🍚', value: 'Quinoa', aliases: ['keenwah'] },
  { title: 'Bananas 🍌', value: 'Bananas', aliases: ['banana'] },
  {
    title: 'Apples 🍏',
    value: 'Apples',
    aliases: ['apple', 'green apple', 'red apple'],
  },
  {
    title: 'Berries 🫐🍓',
    value: 'Berries',
    aliases: ['strawberries', 'blueberries', 'raspberries', 'mixed berries'],
  },
];

export {
  proteinSources,
  calciumSources,
  fibreSources,
  vitaminASources,
  vitaminBSources,
  vitaminCSources,
  vitaminDSources,
  vitaminKSources,
  healthyFatSources,
  magnesiumSources,
  carbohydrateSources,
};
