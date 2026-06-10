const proteinSources = [
    { title: 'Chicken 🍗', value: 'Chicken' },
    { title: 'Beef 🥩', value: 'Beef' },
    { title: 'Fish 🐟', value: 'Fish' },
    { title: 'Eggs 🥚', value: 'Eggs' },
    { title: 'Tuna 🐟', value: 'Tuna' },
    { title: 'Turkey 🦃', value: 'Turkey' },
    { title: 'Plant-Based 🌱', value: 'Plant-Based' }
];

const calciumSources = [
    { title: 'Milk 🥛', value: 'Milk' },
    { title: 'Yoghurt 🥣🤍', value: 'Yoghurt' },
    { title: 'Cheese 🧀', value: 'Cheese' },
    { title: 'Ricotta 🧀🤍', value: 'Ricotta' },
    { title: 'Sardines with Bones 🐟🦴🥫', value: 'Sardines with bones' },
    { title: 'Almonds 🌰🤎', value: 'Almonds' },
    { title: 'Broccoli 🥦', value: 'Broccoli' },
    { title: 'Kale 🥬🌿', value: 'Kale' }
];

const fibreSources = [
    { title: 'Oats 🥣🌾', value: 'Oats' },
    { title: 'Wholegrain Bread 🍞🌾', value: 'Wholegrain Bread' },
    { title: 'Brown Rice 🍚🤎', value: 'Brown Rice' },
    { title: 'Beans 🫘', value: 'Beans' },
    { title: 'Lentils 🫘🟤', value: 'Lentils' },
    { title: 'Chickpeas 🫘🟡', value: 'Chickpeas' },
    { title: 'Apples 🍏', value: 'Apples' },
    { title: 'Berries 🫐🍒🍓', value: 'Berries' },
    { title: 'Broccoli 🥦', value: 'Broccoli' },
    { title: 'Carrots 🥕', value: 'Carrots' },
    { title: 'Nuts 🥜🌰', value: 'Nuts' },
    { title: 'Seeds 🌱⚪', value: 'Seeds' }
];

const vitaminASources = [
    { title: 'Carrots 🥕', value: 'Carrots' },
    { title: 'Sweet Potatoes 🍠', value: 'Sweet Potatoes' },
    { title: 'Pumpkin 🎃', value: 'Pumpkin' },
    { title: 'Spinach 🥬', value: 'Spinach' },
    { title: 'Kale 🥬', value: 'Kale' },
    { title: 'Eggs 🥚', value: 'Eggs' },
    { title: 'Liver 🥩', value: 'Liver' }
];

const vitaminBSources = [
    { title: 'Wholegrains 🌾', value: 'Wholegrains' },
    { title: 'Eggs 🥚', value: 'Eggs' },
    { title: 'Milk 🥛', value: 'Milk' },
    { title: 'Chicken 🍗', value: 'Chicken' },
    { title: 'Beef 🥩', value: 'Beef' },
    { title: 'Fish 🐟', value: 'Fish' },
    { title: 'Beans 🫘', value: 'Beans' },
    { title: 'Lentils 🫘🟤', value: 'Lentils' },
    { title: 'Leafy Greens 🥬', value: 'Leafy Greens' }
];

const vitaminCSources = [
    { title: 'Oranges 🍊', value: 'Oranges' },
    { title: 'Lemons 🍋', value: 'Lemons' },
    { title: 'Strawberries 🍓', value: 'Strawberries' },
    { title: 'Kiwi 🥝', value: 'Kiwi' },
    { title: 'Bell Peppers 🫑', value: 'Bell Peppers' },
    { title: 'Tomatoes 🍅', value: 'Tomatoes' },
    { title: 'Broccoli 🥦', value: 'Broccoli' },
    { title: 'Potatoes 🥔', value: 'Potatoes' }
];

const vitaminDSources = [
    { title: 'Salmon 🐟', value: 'Salmon' },
    { title: 'Tuna 🐟', value: 'Tuna' },
    { title: 'Sardines 🐟', value: 'Sardines' },
    { title: 'Egg Yolks 🥚', value: 'Egg Yolks' },
    { title: 'Fortified Milk 🥛', value: 'Fortified Milk' },
    { title: 'Fortified Cereals 🥣', value: 'Fortified Cereals' },
    { title: 'Sunlight Exposure ☀️', value: 'Sunlight Exposure' }
];

const vitaminKSources = [
    { title: 'Spinach 🥬', value: 'Spinach' },
    { title: 'Kale 🥬', value: 'Kale' },
    { title: 'Broccoli 🥦', value: 'Broccoli' },
    { title: 'Cabbage 🥬', value: 'Cabbage' },
    { title: 'Brussels Sprouts 🥬', value: 'Brussels Sprouts' },
    { title: 'Lettuce 🥬', value: 'Lettuce' },
    { title: 'Parsley 🌿', value: 'Parsley' }
];

const healthyFatSources = [
    { title: 'Avocado 🥑', value: 'Avocado' },
    { title: 'Olive Oil 🫒', value: 'Olive Oil' },
    { title: 'Olives 🫒', value: 'Olives' },
    { title: 'Almonds 🌰', value: 'Almonds' },
    { title: 'Walnuts 🌰', value: 'Walnuts' },
    { title: 'Cashews 🌰', value: 'Cashews' },
    { title: 'Peanut Butter 🥜', value: 'Peanut Butter' },
    { title: 'Chia Seeds 🌱', value: 'Chia Seeds' },
    { title: 'Flax Seeds 🌱', value: 'Flax Seeds' },
    { title: 'Pumpkin Seeds 🎃🌱', value: 'Pumpkin Seeds' },
    { title: 'Sunflower Seeds 🌻', value: 'Sunflower Seeds' },
    { title: 'Salmon 🐟', value: 'Salmon' },
    { title: 'Sardines 🐟', value: 'Sardines' },
    { title: 'Tuna 🐟', value: 'Tuna' },
    { title: 'Eggs 🥚', value: 'Eggs' }
];

const magnesiumSources = [
    { title: 'Pumpkin Seeds 🎃🌱', value: 'Pumpkin Seeds' },
    { title: 'Chia Seeds 🌱', value: 'Chia Seeds' },
    { title: 'Almonds 🌰', value: 'Almonds' },
    { title: 'Cashews 🌰', value: 'Cashews' },
    { title: 'Peanuts 🥜', value: 'Peanuts' },
    { title: 'Spinach 🥬', value: 'Spinach' },
    { title: 'Kale 🥬', value: 'Kale' },
    { title: 'Black Beans 🫘', value: 'Black Beans' },
    { title: 'Lentils 🫘🟤', value: 'Lentils' },
    { title: 'Chickpeas 🫘🟡', value: 'Chickpeas' },
    { title: 'Oats 🥣🌾', value: 'Oats' },
    { title: 'Brown Rice 🍚🤎', value: 'Brown Rice' },
    { title: 'Dark Chocolate 🍫', value: 'Dark Chocolate' },
    { title: 'Avocado 🥑', value: 'Avocado' },
    { title: 'Bananas 🍌', value: 'Bananas' }
];

const carbohydrateSources = [
    { title: 'Oats 🥣🌾', value: 'Oats' },
    { title: 'Wholegrain Bread 🍞🌾', value: 'Wholegrain Bread' },
    { title: 'Brown Rice 🍚🤎', value: 'Brown Rice' },
    { title: 'White Rice 🍚', value: 'White Rice' },
    { title: 'Pasta 🍝', value: 'Pasta' },
    { title: 'Wholegrain Pasta 🍝🌾', value: 'Wholegrain Pasta' },
    { title: 'Potatoes 🥔', value: 'Potatoes' },
    { title: 'Sweet Potatoes 🍠', value: 'Sweet Potatoes' },
    { title: 'Corn 🌽', value: 'Corn' },
    { title: 'Beans 🫘', value: 'Beans' },
    { title: 'Lentils 🫘🟤', value: 'Lentils' },
    { title: 'Chickpeas 🫘🟡', value: 'Chickpeas' },
    { title: 'Quinoa 🍚', value: 'Quinoa' },
    { title: 'Bananas 🍌', value: 'Bananas' },
    { title: 'Apples 🍏', value: 'Apples' },
    { title: 'Berries 🫐🍓', value: 'Berries' }
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
    carbohydrateSources
};