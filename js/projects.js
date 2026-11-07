/* ─────────────────────────────────────────────
   PROJECTS — portfolio data with RU/EN translations.

   • Put images in assets/images/ and reference them by path.
   • `ratio` controls the card shape in the grid (width / height).
   • A project with `placeholder: true` renders an intentional frame.
     Remove that flag and add `images` when the real work is ready.
   • `size` sets the grid span on desktop (12-column grid).
   ───────────────────────────────────────────── */
window.WEAREKID_PROJECTS = [
  {
    id: "supra",
    no: "01",
    category: {
      ru: "3D визуализация / Концепция интерьера",
      en: "3D Visualization / Interior Concept",
    },
    title: {
      ru: "SUPRA — Georgian Restaurant Concept",
      en: "SUPRA — Georgian Restaurant Concept",
    },
    description: {
      ru: "Интерьерная концепция и 3D-визуализация современной интерпретации грузинского гостеприимства.",
      en: "Interior concept and 3D visualization exploring a contemporary interpretation of Georgian hospitality.",
    },
    detail: {
      ru: "Визуальное исследование грузинского гостеприимства через архитектурную визуализацию и цифровую презентацию. Концепция ресторана SUPRA сочетает национальные мотивы с современным дизайном интерьера.",
      en: "A visual exploration of Georgian hospitality through architectural visualization and digital presentation. The SUPRA restaurant concept blends national motifs with a contemporary interior design language.",
    },
    services: {
      ru: ["Интерьерная концепция", "3D визуализация", "Цифровая презентация"],
      en: ["Interior concept", "3D visualization", "Digital presentation"],
    },
    images: [
      { src: "assets/images/supra-hero.webp", alt: { ru: "SUPRA — широкий вид зала с подвесными лампами", en: "SUPRA — wide view of the dining hall with pendant lamps" }, ratio: "16 / 7.8", w: 1920, h: 1080 },
      { src: "assets/images/supra-detail.webp", alt: { ru: "SUPRA — длинный общий стол и бордовый диван", en: "SUPRA — long communal table and burgundy banquette" }, ratio: "4 / 5", w: 1100, h: 1363 },
      { src: "assets/images/supra-table.webp", alt: { ru: "SUPRA — сервировка стола в свете свечей", en: "SUPRA — table setting in warm candlelight" }, ratio: "16 / 10", w: 1200, h: 735 },
    ],
  },
  {
    id: "web",
    no: "02",
    category: {
      ru: "Веб / Адаптив",
      en: "Website / Responsive",
    },
    title: {
      ru: "Веб-разработка",
      en: "Website Development",
    },
    description: {
      ru: "Место зарезервировано для предстоящего веб-проекта.",
      en: "Space reserved for an upcoming website project.",
    },
    placeholder: "web",
    ratio: "16 / 11",
  },
  {
    id: "design",
    no: "03",
    category: {
      ru: "Презентация / Бренд-визуал",
      en: "Presentation / Brand visuals",
    },
    title: {
      ru: "Цифровой дизайн / Презентация",
      en: "Digital Design / Presentation",
    },
    description: {
      ru: "Место зарезервировано для предстоящего проекта презентации или бренд-дизайна.",
      en: "Space reserved for an upcoming presentation or brand design project.",
    },
    placeholder: "design",
    ratio: "4 / 5",
  },
  {
    id: "branding",
    no: "04",
    category: {
      ru: "Бренд / Визуальная идентичность",
      en: "Brand / Visual identity",
    },
    title: {
      ru: "Бренд-презентация",
      en: "Brand Presentation",
    },
    description: {
      ru: "Место зарезервировано для предстоящего проекта бренд-презентации.",
      en: "Space reserved for an upcoming brand presentation project.",
    },
    placeholder: "design",
    ratio: "4 / 5",
  },
];
