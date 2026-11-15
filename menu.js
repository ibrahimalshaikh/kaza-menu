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
      ],
    },
  ],
};
