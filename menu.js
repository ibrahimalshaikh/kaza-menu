// ====== بيانات المنيو ======
// كل التعديل على الأصناف والأسعار من هذا الملف بس.
// price: null = السعر لسا مش محدد (ما بيظهر). desc = المكونات.
// image: مسار الصورة داخل assets/items/ (اتركه فاضي "" لو ما في صورة).
// id: معرّف الصنف الثابت. ما يتغيّر بعد النشر لأن السلة والطلبات بتعتمد عليه.
// sizes: للصنف الي إله أحجام (سنجل/دبل). بتنكتب بدل price، وكل حجم إله id وسعر.
// featured: true = الصنف بيظهر فوق بقسم "الأكثر طلباً".
window.MENU = {
  name: { ar: "كازا", en: "Kaza" },
  phone: "0593608095",
  currency: "₪",
  // صور الغلاف المتحركة بالترتيب. item = الصنف الي بيفتح لما الزبون يكبس على الصورة
  slides: [
    { image: "assets/slides/crazy-burger.webp", item: "crazy-burger" },
    { image: "assets/slides/greek-salad.webp", item: "greek-salad" },
    { image: "assets/slides/chicken-corn-cream.webp", item: "chicken-corn-cream" },
    { image: "assets/slides/strips-meal.webp", item: "strips-meal" },
    { image: "assets/slides/healthy-green.webp", item: "healthy-green" },
  ],
  // الطلب والسلة: false = منيو عرض بس. للتجربة قبل التشغيل افتح الرابط مع ?preview بآخره
  ordering: false,
  categories: [
    {
      id: "kaza-breakfast",
      name: { ar: "فطور كازا", en: "Kaza Breakfast" },
      items: [
        { id: "sover-turkey", name: { ar: "سوڤر تيركي", en: "Sover Turkey" }, desc: { ar: "قطع الحبش المدخن مع جبنة كازا وصوص السوڤر", en: "Smoked turkey slices with Kaza cheese and Sover sauce" }, price: 15, image: "assets/items/sover-turkey.webp?v=2" },
        { id: "sover-salami", name: { ar: "سوڤر سلامي", en: "Sover Salami" }, desc: { ar: "قطع سلامي مع جبنة كازا وصوص السوڤر", en: "Salami slices with Kaza cheese and Sover sauce" }, price: 15, image: "assets/items/sover-salami.webp?v=2" },
        { id: "emek-cheese", name: { ar: "إيميك تشيز", en: "Emek Cheese" }, desc: { ar: "جبنة إيميك مع شرائح البندورة وصوص خاص", en: "Emek cheese with tomato slices and special sauce" }, price: 14, image: "assets/items/emek-cheese.webp?v=2" },
        { id: "kaza-cheese", name: { ar: "كازا تشيز", en: "Kaza Cheese" }, desc: { ar: "جبنة كازا مع شرائح الزيتون وقطع الخس وصوص خاص", en: "Kaza cheese with olive slices, lettuce and special sauce" }, price: 12, image: "assets/items/kaza-cheese.webp?v=2" },
        { id: "the-egg", name: { ar: "ذا إيج", en: "The Egg" }, desc: { ar: "بيض أومليت بالزبدة وجبنة كازا وقطع السلامي", en: "Omelette cooked in butter with Kaza cheese and salami pieces" }, price: 12, image: "assets/items/the-egg.webp?v=2" },
        { id: "combo-feta", name: { ar: "كومبو فيتا", en: "Combo Feta" }, desc: { ar: "جبنة بيضاء مع الزيت والزعتر وشرائح الفلفل الحلو", en: "White cheese with oil, za'atar and sweet pepper slices" }, price: 10, image: "assets/items/combo-feta.webp?v=2" },
        { id: "baladiya", name: { ar: "بلدية", en: "Baladiya" }, desc: { ar: "قطع جبنة بيضاء مع شرائح البندورة والخيار وزيت الزيتون", en: "White cheese pieces with tomato and cucumber slices and olive oil" }, price: 10, image: "assets/items/baladiya.webp?v=2" },
      ],
    },
    {
      id: "light-lunch",
      name: { ar: "لايت لانش", en: "Light Lunch" },
      items: [
        { id: "freedom", name: { ar: "فريدم", en: "Freedom" }, desc: { ar: "صدر دجاج مشوح بالبصل والفلفل وجبنة إيميك وصوص فريدم", en: "Sautéed chicken breast with onions and peppers, Emek cheese and Freedom sauce" }, price: 19, image: "assets/items/freedom.webp?v=2" },
        { id: "mexicano", name: { ar: "مكسيكانو", en: "Mexicano" }, desc: { ar: "صدر دجاج مشوح بخلطة مكسيكية وفلفل الهالبينو وجبنة كازا", en: "Sautéed chicken breast with a Mexican spice mix, jalapeño peppers and Kaza cheese" }, price: 19, image: "assets/items/mexicano.webp?v=2" },
        { id: "super-flexos", name: { ar: "سوبر فلكسوس", en: "Super Flexos" }, desc: { ar: "صدر دجاج مشوح بجبنة كازا وقطع السلامي والتيركي وصوص الفلكسوس", en: "Sautéed chicken breast with Kaza cheese, salami and turkey pieces and Flexos sauce" }, price: 19, image: "assets/items/super-flexos.webp?v=2" },
        { id: "marina", name: { ar: "مارينا", en: "Marina" }, desc: { ar: "صدر دجاج بالأعشاب وصوص مارينا وقطع الفلفل الحلو وجبنة كازا", en: "Herbed chicken breast with Marina sauce, sweet pepper pieces and Kaza cheese" }, price: 19, image: "assets/items/marina.webp?v=2" },
      ],
    },
    {
      id: "western-sandwiches",
      name: { ar: "ساندويشات غربي", en: "Western Sandwiches" },
      items: [
        { id: "chicken-corn-cream", name: { ar: "دجاج بالذرة والكريمة", en: "Chicken with Corn & Cream" }, desc: { ar: "قطع صدر الدجاج مع خليط الكريمة بالجبنة والذرة", en: "Chicken breast pieces with a mix of cream, cheese and corn" }, price: 25, image: "assets/items/chicken-corn-cream.webp?v=2" },
        { id: "chicken-pizza", name: { ar: "تشكن بيتزا", en: "Chicken Pizza" }, desc: { ar: "قطع صدر الدجاج مع صوص التشكن بيتزا والجبنة", en: "Chicken breast pieces with chicken pizza sauce and cheese" }, price: 25, image: "assets/items/chicken-pizza.webp?v=2" },
        { id: "a-la-king", name: { ar: "ألا كينج", en: "À La King" }, desc: { ar: "قطع صدر الدجاج مع جبنة الموزاريلا والشبت", en: "Chicken breast pieces with mozzarella cheese and dill" }, price: 25, image: "assets/items/a-la-king.webp?v=2" },
        { id: "steak-stack", name: { ar: "ستيك ستاك", en: "Steak Stack" }, desc: { ar: "قطع صدر الدجاج مع شرائح البندورة والجبنة وقطع الزيتون", en: "Chicken breast pieces with tomato slices, cheese and olive pieces" }, price: 25, image: "assets/items/steak-stack.webp?v=2" },
        { id: "chicken-picante", name: { ar: "تشكن بيكانتي", en: "Chicken Picante" }, desc: { ar: "قطع صدر الدجاج المقرمش مع الجبنة وصوص البيكانتي", en: "Crispy chicken breast pieces with cheese and Picante sauce" }, price: 25, image: "assets/items/chicken-picante.webp?v=2" },
        { id: "mushroom-melt", name: { ar: "مشروم ميلت", en: "Mushroom Melt" }, desc: { ar: "قطع صدر الدجاج مع الكريمة والمشروم وصوص خاص وجبنة", en: "Chicken breast pieces with cream, mushrooms, special sauce and cheese" }, price: 25, image: "assets/items/mushroom-melt.webp?v=2" },
      ],
    },
    {
      id: "strips",
      name: { ar: "ستريبس", en: "Strips" },
      items: [
        { id: "strips-wrap", name: { ar: "ستريبس راب", en: "Strips Wrap" }, desc: { ar: "قطع صدر الدجاج المقرمش مع الخس وصوص رانش ومخلل الخيار", en: "Crispy chicken breast pieces with lettuce, ranch sauce and pickles" }, price: 20, image: "assets/items/strips-wrap.webp?v=2" },
        { id: "strips-meal", name: { ar: "وجبة ستريبس", en: "Strips Meal" }, desc: { ar: "قطع صدر الدجاج مع البطاطا مع صوص رانش مع خبزة", en: "Chicken breast pieces with fries, ranch sauce and a bun" }, price: 25, image: "assets/items/strips-meal.webp?v=2" },
        { id: "cheesy-pop-fries", name: { ar: "تشيزي بوب فرايز", en: "Cheesy Pop Fries" }, desc: { ar: "قطع دجاج مقرمش مع بطاطا مقلية وصوص جبنة وقطع هالبينو", en: "Crispy chicken pieces with French fries, cheese sauce and jalapeño pieces" }, price: 25, image: "assets/items/cheesy-pop-fries.webp?v=2" },
        { id: "crazy-burger", name: { ar: "كريزي برجر", en: "Crazy Burger" }, desc: { ar: "قطع صدر الدجاج المقرمش مع شرائح البندورة والخس والجبنة", en: "Crispy chicken breast pieces with tomato slices, lettuce and cheese" }, price: 25, image: "assets/items/crazy-burger.webp?v=2" },
      ],
    },
    {
      id: "green-salads",
      name: { ar: "سلطات خضراء", en: "Green Salads" },
      items: [
        { id: "santa-fe", name: { ar: "سانتافيه", en: "Santa Fe" }, desc: { ar: "", en: "" }, price: 25, image: "assets/items/santa-fe.webp?v=2" },
        { id: "ranchos", name: { ar: "رانشوس", en: "Ranchos" }, desc: { ar: "", en: "" }, price: 20, image: "assets/items/ranchos.webp?v=2" },
        { id: "greek-salad", name: { ar: "سلطة يونانية", en: "Greek Salad" }, desc: { ar: "", en: "" }, price: 16, image: "assets/items/greek-salad.webp?v=2" },
        { id: "healthy-green", name: { ar: "هيلثي جرين", en: "Healthy Green" }, desc: { ar: "", en: "" }, price: 23, image: "assets/items/healthy-green.webp?v=2" },
      ],
    },
    {
      id: "hot-drinks",
      name: { ar: "المشروبات الساخنة", en: "Hot Drinks" },
      items: [
        { id: "turkish-coffee", name: { ar: "قهوة تركي", en: "Turkish Coffee" }, desc: { ar: "", en: "" }, sizes: [{ id: "single", name: { ar: "سنجل", en: "Single" }, price: 3 }, { id: "double", name: { ar: "دبل", en: "Double" }, price: 5 }], image: "assets/items/espresso.webp" },
        { id: "espresso", name: { ar: "قهوة اسبريسو", en: "Espresso" }, desc: { ar: "", en: "" }, sizes: [{ id: "single", name: { ar: "سنجل", en: "Single" }, price: 7 }, { id: "double", name: { ar: "دبل", en: "Double" }, price: 10 }], image: "assets/items/espresso.webp" },
        { id: "americano", name: { ar: "امريكانو", en: "Americano" }, desc: { ar: "", en: "" }, price: 8, image: "assets/items/americano.webp" },
        { id: "nescafe", name: { ar: "نسكافيه", en: "Nescafé" }, desc: { ar: "", en: "" }, price: 5, image: "assets/items/nescafe.webp" },
        { id: "nescafe-milk", name: { ar: "نسكافيه بالحليب", en: "Nescafé with Milk" }, desc: { ar: "", en: "" }, price: 6, image: "assets/items/nescafe.webp" },
        { id: "tea", name: { ar: "شاي", en: "Tea" }, desc: { ar: "", en: "" }, price: 3, image: "assets/items/tea.webp" },
        { id: "green-tea", name: { ar: "شاي اخضر", en: "Green Tea" }, desc: { ar: "", en: "" }, price: 4, image: "assets/items/green-tea.webp" },
        { id: "herbal-tea", name: { ar: "زهورات واعشاب", en: "Herbal Tea" }, desc: { ar: "", en: "" }, price: 5, image: "assets/items/herbal-tea.webp" },
        { id: "cafe-latte", name: { ar: "كافيه لاتيه", en: "Caffè Latte" }, desc: { ar: "", en: "" }, price: 8, image: "assets/items/cafe-latte.webp" },
        { id: "nutella-cafe", name: { ar: "نوتيلا كافيه", en: "Nutella Caffè" }, desc: { ar: "", en: "" }, price: 10, image: "assets/items/nutella-cafe.webp" },
        { id: "hot-chocolate", name: { ar: "هوت شوكليت", en: "Hot Chocolate" }, desc: { ar: "", en: "" }, price: 8, image: "assets/items/hot-chocolate.webp" },
        { id: "cafe-mocha", name: { ar: "موكا كافيه", en: "Caffè Mocha" }, desc: { ar: "", en: "" }, price: 10, image: "assets/items/cafe-mocha.webp" },
      ],
    },
    {
      id: "cold-drinks",
      name: { ar: "مشروبات باردة", en: "Cold Drinks" },
      items: [
        { id: "mango-juice", name: { ar: "عصير مانجا", en: "Mango Juice" }, desc: { ar: "", en: "" }, price: 12, image: "assets/items/mango-juice.webp" },
        { id: "orange-juice", name: { ar: "عصير برتقال", en: "Orange Juice" }, desc: { ar: "", en: "" }, price: 12, image: "assets/items/orange-juice.webp" },
        { id: "lemon-mint", name: { ar: "ليمون بالنعنع", en: "Lemon with Mint" }, desc: { ar: "", en: "" }, price: 12, image: "assets/items/lemon-mint.webp" },
        { id: "iced-spanish-latte", name: { ar: "ايس سبانيش لاتيه", en: "Iced Spanish Latte" }, desc: { ar: "", en: "" }, price: 15, image: "assets/items/iced-spanish-latte.webp" },
        { id: "iced-americano", name: { ar: "ايس امريكانو", en: "Iced Americano" }, desc: { ar: "", en: "" }, price: 10, image: "assets/items/iced-americano.webp" },
        { id: "iced-cafe-latte", name: { ar: "ايس كافيه لاتيه", en: "Iced Caffè Latte" }, desc: { ar: "", en: "" }, price: 15, image: "assets/items/iced-cafe-latte.webp" },
      ],
    },
    {
      id: "desserts",
      name: { ar: "حلويات", en: "Desserts" },
      items: [
        { id: "mini-pancake", name: { ar: "ميني بان كيك", en: "Mini Pancakes" }, desc: { ar: "", en: "" }, price: 18, image: "assets/items/mini-pancake.webp" },
        { id: "crepe", name: { ar: "كريب", en: "Crêpe" }, desc: { ar: "", en: "" }, price: 18, image: "assets/items/crepe.webp" },
        { id: "pancake", name: { ar: "بان كيك", en: "Pancakes" }, desc: { ar: "", en: "" }, price: 18, image: "assets/items/pancake.webp" },
        { id: "fettuccine-crepe", name: { ar: "فوتتشيني كريب", en: "Fettuccine Crêpe" }, desc: { ar: "", en: "" }, price: 18, image: "assets/items/fettuccine-crepe.webp" },
        { id: "waffle-stick", name: { ar: "وافل ستيك", en: "Waffle Stick" }, desc: { ar: "", en: "" }, price: 18, image: "assets/items/waffle-stick.webp" },
      ],
    },
  ],
};
