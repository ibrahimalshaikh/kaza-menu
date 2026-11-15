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
      id: "breakfast-sandwiches",
      name: { ar: "ساندويشات الفطور", en: "Breakfast Sandwiches" },
      items: [
        { name: { ar: "نيو فلسكوس", en: "New Felescos" }, desc: { ar: "", en: "" }, price: null, image: "assets/items/new-felescos.webp", featured: true },
        { name: { ar: "ايميك تشيز", en: "Emek Cheese" }, desc: { ar: "", en: "" }, price: null, image: "assets/items/emek-cheese.webp", featured: true },
        { name: { ar: "كازا تشيز", en: "Kaza Cheese" }, desc: { ar: "", en: "" }, price: null, image: "assets/items/kaza-cheese.webp", featured: true },
        { name: { ar: "فريدم", en: "Freedom" }, desc: { ar: "", en: "" }, price: null, image: "assets/items/freedom.webp", featured: true },
        { name: { ar: "سان تشيز", en: "Sun Cheese" }, desc: { ar: "", en: "" }, price: null, image: "assets/items/sun-cheese.webp", featured: true },
        { name: { ar: "مارينا تشيكن", en: "Marina Chicken" }, desc: { ar: "", en: "" }, price: null, image: "assets/items/marina-chicken.webp" },
        { name: { ar: "ذا ايج", en: "The Egg" }, desc: { ar: "", en: "" }, price: null, image: "assets/items/the-egg.webp" },
        { name: { ar: "كومبو فيتا", en: "Combo Feta" }, desc: { ar: "", en: "" }, price: null, image: "assets/items/combo-feta.webp" },
        { name: { ar: "بلدي", en: "Baladi" }, desc: { ar: "", en: "" }, price: null, image: "assets/items/baladi.webp" },
      ],
    },
    {
      id: "western-sandwiches",
      name: { ar: "ساندويشات غربي", en: "Western Sandwiches" },
      items: [
        { name: { ar: "دجاج بالجبنة والذرة", en: "Chicken with Cheese & Corn" }, desc: { ar: "", en: "" }, price: null, image: "assets/items/chicken-cheese-corn.webp" },
        { name: { ar: "تشكين بيتزا", en: "Chicken Pizza" }, desc: { ar: "", en: "" }, price: null, image: "assets/items/chicken-pizza.webp" },
        { name: { ar: "الا كينج", en: "À La King" }, desc: { ar: "", en: "" }, price: null, image: "assets/items/a-la-king.webp" },
        { name: { ar: "ستيك ستاك", en: "Steak Stack" }, desc: { ar: "", en: "" }, price: null, image: "assets/items/steak-stack.webp" },
      ],
    },
    {
      id: "strips",
      name: { ar: "ستريبس", en: "Strips" },
      items: [
        { name: { ar: "ستربس راب", en: "Strips Wrap" }, desc: { ar: "", en: "" }, price: null, image: "assets/items/strips-wrap.webp" },
        { name: { ar: "وجبة ستربس راب", en: "Strips Wrap Meal" }, desc: { ar: "", en: "" }, price: null, image: "assets/items/strips-wrap-meal.webp" },
      ],
    },
  ],
};
