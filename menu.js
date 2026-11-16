// ====== بيانات المنيو ======
// كل التعديل على الأصناف والأسعار من هذا الملف بس.
// price: null = السعر لسا مش محدد (ما بيظهر). desc = المكونات.
// image: مسار الصورة داخل assets/items/ (اتركه فاضي "" لو ما في صورة).
// featured: true = الصنف بيظهر فوق بقسم "الأكثر طلباً".
window.MENU = {
  name: { ar: "كازا", en: "Kaza" },
  phone: "0593608095",
  currency: "₪",
  categories: [
    {
      id: "kaza-breakfast",
      name: { ar: "فطور كازا", en: "Kaza Breakfast" },
      items: [
        { name: { ar: "سوڤر تيركي", en: "Sover Turkey" }, desc: { ar: "قطع الحبش المدخن مع جبنة كازا وصوص السوڤر", en: "Smoked turkey slices with Kaza cheese and Sover sauce" }, price: 15, image: "assets/items/sover-turkey.webp?v=2" },
        { name: { ar: "سوڤر سلامي", en: "Sover Salami" }, desc: { ar: "قطع سلامي مع جبنة كازا وصوص السوڤر", en: "Salami slices with Kaza cheese and Sover sauce" }, price: 15, image: "assets/items/sover-salami.webp?v=2" },
        { name: { ar: "إيميك تشيز", en: "Emek Cheese" }, desc: { ar: "جبنة إيميك مع شرائح البندورة وصوص خاص", en: "Emek cheese with tomato slices and special sauce" }, price: 14, image: "assets/items/emek-cheese.webp?v=2" },
        { name: { ar: "كازا تشيز", en: "Kaza Cheese" }, desc: { ar: "جبنة كازا مع شرائح الزيتون وقطع الخس وصوص خاص", en: "Kaza cheese with olive slices, lettuce and special sauce" }, price: 12, image: "assets/items/kaza-cheese.webp?v=2" },
        { name: { ar: "ذا إيج", en: "The Egg" }, desc: { ar: "بيض أومليت بالزبدة وجبنة كازا وقطع السلامي", en: "Omelette cooked in butter with Kaza cheese and salami pieces" }, price: 12, image: "assets/items/the-egg.webp?v=2" },
        { name: { ar: "كومبو فيتا", en: "Combo Feta" }, desc: { ar: "جبنة بيضاء مع الزيت والزعتر وشرائح الفلفل الحلو", en: "White cheese with oil, za'atar and sweet pepper slices" }, price: 10, image: "assets/items/combo-feta.webp?v=2" },
        { name: { ar: "بلدية", en: "Baladiya" }, desc: { ar: "قطع جبنة بيضاء مع شرائح البندورة والخيار وزيت الزيتون", en: "White cheese pieces with tomato and cucumber slices and olive oil" }, price: 10, image: "assets/items/baladiya.webp?v=2" },
      ],
    },
    {
      id: "light-lunch",
      name: { ar: "لايت لانش", en: "Light Lunch" },
      items: [
        { name: { ar: "فريدم", en: "Freedom" }, desc: { ar: "صدر دجاج مشوح بالبصل والفلفل وجبنة إيميك وصوص فريدم", en: "Sautéed chicken breast with onions and peppers, Emek cheese and Freedom sauce" }, price: 19, image: "assets/items/freedom.webp?v=2" },
        { name: { ar: "مكسيكانو", en: "Mexicano" }, desc: { ar: "صدر دجاج مشوح بخلطة مكسيكية وفلفل الهالبينو وجبنة كازا", en: "Sautéed chicken breast with a Mexican spice mix, jalapeño peppers and Kaza cheese" }, price: 19, image: "assets/items/mexicano.webp?v=2" },
        { name: { ar: "سوبر فلكسوس", en: "Super Flexos" }, desc: { ar: "صدر دجاج مشوح بجبنة كازا وقطع السلامي والتيركي وصوص الفلكسوس", en: "Sautéed chicken breast with Kaza cheese, salami and turkey pieces and Flexos sauce" }, price: 19, image: "assets/items/super-flexos.webp?v=2" },
        { name: { ar: "مارينا", en: "Marina" }, desc: { ar: "صدر دجاج بالأعشاب وصوص مارينا وقطع الفلفل الحلو وجبنة كازا", en: "Herbed chicken breast with Marina sauce, sweet pepper pieces and Kaza cheese" }, price: 19, image: "assets/items/marina.webp?v=2" },
      ],
    },
    {
      id: "western-sandwiches",
      name: { ar: "ساندويشات غربي", en: "Western Sandwiches" },
      items: [
        { name: { ar: "دجاج بالذرة والكريمة", en: "Chicken with Corn & Cream" }, desc: { ar: "قطع صدر الدجاج مع خليط الكريمة بالجبنة والذرة", en: "Chicken breast pieces with a mix of cream, cheese and corn" }, price: 25, image: "assets/items/chicken-corn-cream.webp" },
        { name: { ar: "تشكن بيتزا", en: "Chicken Pizza" }, desc: { ar: "قطع صدر الدجاج مع صوص التشكن بيتزا والجبنة", en: "Chicken breast pieces with chicken pizza sauce and cheese" }, price: 25, image: "assets/items/chicken-pizza.webp" },
        { name: { ar: "ألا كينج", en: "À La King" }, desc: { ar: "قطع صدر الدجاج مع جبنة الموزاريلا والشبت", en: "Chicken breast pieces with mozzarella cheese and dill" }, price: 25, image: "assets/items/a-la-king.webp" },
        { name: { ar: "ستيك ستاك", en: "Steak Stack" }, desc: { ar: "قطع صدر الدجاج مع شرائح البندورة والجبنة وقطع الزيتون", en: "Chicken breast pieces with tomato slices, cheese and olive pieces" }, price: 25, image: "assets/items/steak-stack.webp" },
        { name: { ar: "تشكن بيكانتي", en: "Chicken Picante" }, desc: { ar: "قطع صدر الدجاج المقرمش مع الجبنة وصوص البيكانتي", en: "Crispy chicken breast pieces with cheese and Picante sauce" }, price: 25, image: "assets/items/chicken-picante.webp" },
        { name: { ar: "مشروم ميلت", en: "Mushroom Melt" }, desc: { ar: "قطع صدر الدجاج مع الكريمة والمشروم وصوص خاص وجبنة", en: "Chicken breast pieces with cream, mushrooms, special sauce and cheese" }, price: 25, image: "assets/items/mushroom-melt.webp" },
      ],
    },
    {
      id: "strips",
      name: { ar: "ستريبس", en: "Strips" },
      items: [
        { name: { ar: "ستريبس راب", en: "Strips Wrap" }, desc: { ar: "قطع صدر الدجاج المقرمش مع الخس وصوص رانش ومخلل الخيار", en: "Crispy chicken breast pieces with lettuce, ranch sauce and pickles" }, price: 20, image: "assets/items/strips-wrap.webp" },
        { name: { ar: "وجبة ستريبس", en: "Strips Meal" }, desc: { ar: "قطع صدر الدجاج مع البطاطا مع صوص رانش مع خبزة", en: "Chicken breast pieces with fries, ranch sauce and a bun" }, price: 25, image: "assets/items/strips-meal.webp" },
        { name: { ar: "تشيزي بوب فرايز", en: "Cheesy Pop Fries" }, desc: { ar: "قطع دجاج مقرمش مع بطاطا مقلية وصوص جبنة وقطع هالبينو", en: "Crispy chicken pieces with French fries, cheese sauce and jalapeño pieces" }, price: 25, image: "assets/items/cheesy-pop-fries.webp" },
        { name: { ar: "كريزي برجر", en: "Crazy Burger" }, desc: { ar: "قطع صدر الدجاج المقرمش مع شرائح البندورة والخس والجبنة", en: "Crispy chicken breast pieces with tomato slices, lettuce and cheese" }, price: 25, image: "assets/items/crazy-burger.webp" },
      ],
    },
    {
      id: "green-salads",
      name: { ar: "سلطات خضراء", en: "Green Salads" },
      items: [
        { name: { ar: "سانتافيه", en: "Santa Fe" }, desc: { ar: "", en: "" }, price: 25, image: "assets/items/santa-fe.webp" },
        { name: { ar: "رانشوس", en: "Ranchos" }, desc: { ar: "", en: "" }, price: 20, image: "assets/items/ranchos.webp" },
        { name: { ar: "سلطة يونانية", en: "Greek Salad" }, desc: { ar: "", en: "" }, price: 16, image: "assets/items/greek-salad.webp" },
        { name: { ar: "هيلثي جرين", en: "Healthy Green" }, desc: { ar: "", en: "" }, price: 23, image: "assets/items/healthy-green.webp" },
      ],
    },
  ],
};
