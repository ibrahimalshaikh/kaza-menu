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
      id: "sandwiches",
      name: { ar: "الساندويشات", en: "Sandwiches" },
      items: [
        { name: { ar: "فلسكوس الجديد", en: "New Felescos" }, desc: { ar: "", en: "" }, price: null, image: "assets/items/new-felescos.webp", featured: true },
        { name: { ar: "جبنة إيميك", en: "Emek Cheese" }, desc: { ar: "", en: "" }, price: null, image: "assets/items/emek-cheese.webp", featured: true },
        { name: { ar: "جبنة كازا", en: "Kaza Cheese" }, desc: { ar: "", en: "" }, price: null, image: "assets/items/kaza-cheese.webp", featured: true },
        { name: { ar: "الحرية", en: "Freedom" }, desc: { ar: "", en: "" }, price: null, image: "assets/items/freedom.webp", featured: true },
        { name: { ar: "جبنة الشمس", en: "Sun Cheese" }, desc: { ar: "", en: "" }, price: null, image: "assets/items/sun-cheese.webp", featured: true },
      ],
    },
  ],
};
