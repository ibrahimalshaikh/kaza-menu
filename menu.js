// ====== بيانات المنيو ======
// كل التعديل على الأصناف والأسعار من هذا الملف بس.
// image: مسار الصورة داخل assets/items/ (اتركه فاضي "" لو ما في صورة).
// featured: true = الصنف بيظهر فوق بقسم "الأكثر طلباً".
window.MENU = {
  name: { ar: "كازا", en: "Kaza" },
  phone: "0593608095",
  currency: "₪",
  // أصناف تجريبية مؤقتة لحد ما ينضاف المنيو الحقيقي
  categories: [
    {
      id: "sample-1",
      name: { ar: "قسم تجريبي ١", en: "Sample Category 1" },
      items: [
        { name: { ar: "صنف تجريبي ١", en: "Sample Item 1" }, desc: { ar: "هنا بتنكتب مكونات الصنف، مثلاً: خبز طازج، جبنة، خضار مشكلة وزيت زيتون.", en: "Ingredients go here, e.g. fresh bread, cheese, mixed vegetables and olive oil." }, price: 25, image: "", featured: true },
        { name: { ar: "صنف تجريبي ٢", en: "Sample Item 2" }, desc: { ar: "هنا بتنكتب مكونات الصنف.", en: "Ingredients go here." }, price: 30, image: "", featured: true },
        { name: { ar: "صنف تجريبي ٣ باسم طويل شوي عشان نشوف السطرين", en: "Sample Item 3 With A Longer Name To Wrap" }, desc: { ar: "هنا بتنكتب مكونات الصنف.", en: "Ingredients go here." }, price: 18.5, image: "" },
      ],
    },
    {
      id: "sample-2",
      name: { ar: "قسم تجريبي ٢", en: "Sample Category 2" },
      items: [
        { name: { ar: "صنف تجريبي ٤", en: "Sample Item 4" }, desc: { ar: "هنا بتنكتب مكونات الصنف.", en: "Ingredients go here." }, price: 45, image: "", featured: true },
        { name: { ar: "صنف تجريبي ٥", en: "Sample Item 5" }, desc: { ar: "", en: "" }, price: 12, image: "" },
        { name: { ar: "صنف تجريبي ٦", en: "Sample Item 6" }, desc: { ar: "هنا بتنكتب مكونات الصنف.", en: "Ingredients go here." }, price: 60, image: "", featured: true },
      ],
    },
    {
      id: "sample-3",
      name: { ar: "قسم تجريبي ٣", en: "Sample Category 3" },
      items: [
        { name: { ar: "صنف تجريبي ٧", en: "Sample Item 7" }, desc: { ar: "هنا بتنكتب مكونات الصنف.", en: "Ingredients go here." }, price: 10, image: "" },
        { name: { ar: "صنف تجريبي ٨", en: "Sample Item 8" }, desc: { ar: "هنا بتنكتب مكونات الصنف.", en: "Ingredients go here." }, price: 15, image: "" },
        { name: { ar: "صنف تجريبي ٩", en: "Sample Item 9" }, desc: { ar: "هنا بتنكتب مكونات الصنف.", en: "Ingredients go here." }, price: 20, image: "" },
        { name: { ar: "صنف تجريبي ١٠", en: "Sample Item 10" }, desc: { ar: "هنا بتنكتب مكونات الصنف.", en: "Ingredients go here." }, price: 22, image: "" },
        { name: { ar: "صنف تجريبي ١١", en: "Sample Item 11" }, desc: { ar: "هنا بتنكتب مكونات الصنف.", en: "Ingredients go here." }, price: 28, image: "" },
      ],
    },
  ],
};
