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
        { name: { ar: "سوڤر تيركي", en: "Sover Turkey" }, desc: { ar: "قطع الحبش المدخن مع جبنة كازا وصوص السوڤر", en: "Smoked turkey slices with Kaza cheese and Sover sauce" }, price: 15, image: "assets/items/sover-turkey.webp" },
        { name: { ar: "سوڤر سلامي", en: "Sover Salami" }, desc: { ar: "قطع سلامي مع جبنة كازا وصوص السوڤر", en: "Salami slices with Kaza cheese and Sover sauce" }, price: 15, image: "assets/items/sover-salami.webp" },
        { name: { ar: "إيميك تشيز", en: "Emek Cheese" }, desc: { ar: "جبنة إيميك مع شرائح البندورة وصوص خاص", en: "Emek cheese with tomato slices and special sauce" }, price: 14, image: "assets/items/emek-cheese.webp" },
        { name: { ar: "كازا تشيز", en: "Kaza Cheese" }, desc: { ar: "جبنة كازا مع شرائح الزيتون وقطع الخس وصوص خاص", en: "Kaza cheese with olive slices, lettuce and special sauce" }, price: 12, image: "assets/items/kaza-cheese.webp" },
        { name: { ar: "ذا إيج", en: "The Egg" }, desc: { ar: "بيض أومليت بالزبدة وجبنة كازا وقطع السلامي", en: "Butter omelette with Kaza cheese and salami slices" }, price: 12, image: "assets/items/the-egg.webp" },
        { name: { ar: "كومبو فيتا", en: "Combo Feta" }, desc: { ar: "جبنة بيضاء مع الزيت والزعتر وشرائح الفلفل الحلو", en: "White cheese with olive oil, za'atar and sweet pepper slices" }, price: 10, image: "assets/items/combo-feta.webp" },
        { name: { ar: "بلدية", en: "Baladiya" }, desc: { ar: "قطع جبنة بيضاء مع شرائح البندورة والخيار وزيت الزيتون", en: "White cheese pieces with tomato and cucumber slices and olive oil" }, price: 10, image: "assets/items/baladiya.webp" },
      ],
    },
    {
      id: "light-lunch",
      name: { ar: "لايت لانش", en: "Light Lunch" },
      items: [
        { name: { ar: "فريدم", en: "Freedom" }, desc: { ar: "صدر دجاج مشوح بالبصل والفلفل وجبنة إيميك وصوص فريدم", en: "Sautéed chicken breast with onion and pepper, Emek cheese and Freedom sauce" }, price: 19, image: "assets/items/freedom.webp" },
        { name: { ar: "مكسيكانو", en: "Mexicano" }, desc: { ar: "صدر دجاج مشوح بخلطة مكسيكية وفلفل الهالبينو وجبنة كازا", en: "Sautéed chicken breast with Mexican seasoning, jalapeño and Kaza cheese" }, price: 19, image: "assets/items/mexicano.webp" },
        { name: { ar: "سوبر فلكسوس", en: "Super Flexos" }, desc: { ar: "صدر دجاج مشوح بجبنة كازا وقطع السلامي والتيركي وصوص الفلكسوس", en: "Sautéed chicken breast with Kaza cheese, salami and turkey slices and Flexos sauce" }, price: 19, image: "assets/items/super-flexos.webp" },
      ],
    },
  ],
};
