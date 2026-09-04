import { useState, useMemo, useEffect, useRef } from "react";
const NT_LOGO = "data:image/png;base64,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";


// ═══════════════════════════════════════════════════════════════════
// NEW TOWER — ПРОЕКТ НОВ · PRICING SIMULATOR V8.7 (10.06.2026)
// Авто-изба + План на етажа + Резервация €5K + 2 схеми на плащане
// V7.2 конфигурация — 86 апт обезщ. + 45 изби обезщ. + 89 ПМ обезщ. | обновен 10.06.2026
// ═══════════════════════════════════════════════════════════════════

const C = {
  // V10 DARK THEME — navy background, warm-white text, gold accent (brand)
  navy: "#1A1F3D",   // main bg (deep navy)
  navyL: "#252B4D",  // card bg (lighter navy)
  navyM: "#1F2544",  // gradient mid
  navyD: "#12162E",  // darkest tone
  gold: "#E8C061",   // primary accent (brand gold — свети на тъмно)
  goldL: "#F2D488",  // bright gold
  goldD: "#C9A24A",  // dark gold
  wh: "#FAF7F0",     // primary text — warm white
  gr: "#A8AEC0",     // secondary text (light gray)
  grD: "#727890",    // tertiary text
  ok: "#4ADE80",     // зелено (светло за тъмен фон)
  err: "#F87171",    // червено (светло)
  bl: "#60A5FA",     // синьо
  pur: "#A78BFA",    // лилав
};


// ═══════════════════════════════════════════════════════════════════
// I18N — Многоезична поддръжка (БГ / EN / RU)
// ═══════════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════════
// I18N — Многоезична поддръжка (БГ / EN / RU)
// ═══════════════════════════════════════════════════════════════════
const T = {
  bg: {
    archCaption: "Архитектура: Urban Creative · арх. Д. Бояджиев · М 1:100",

    aggressiveSub: "50/20/20/10",
    standardSub: "30/10/10/20/20/10", deferred: "Промоционална",
    aptNo: "Апартамент №",
    sectionFloor: "Секция / Етаж",
    addToCompare: "+ Сравнение",
    addVariant: "+ Добави още вариант",
    addReservation: "+ Резервация",
    reservationRefundable: "(възстановима)",
    cumulative: "Кумулативно:",
    inclReserved: "(вкл. резерв.)",
    discount: "Отстъпка",
    variant: "Вариант",
    priceOnRequest: "Цена при запитване",
    onRequest: "запитване",
    aptHash: "АП. №",
    etShort: "ЕТ.",
    planFor: "План на ет.",
    archPlanFor: "Архитектурният план за",
    willBe: "ще бъде",
    footerNote: "· Data + Engine + Платежен график + Сравнение + Email оферта",
    m2: "м²",
    m2x1500: "м² × €1,500/м²",
    tooltipBuy: "(всеки м² × €1,500)",
    standardSubVal: "30/10/10/20/20/10",
    aggressiveSubVal: "50/20/20/10",
    inventory: "Инвентар", payment: "Плащания", compare: "Сравнение", inquiry: "Запитване",
    title: "NEW TOWER", subtitle: "ул. Девня 2, Център, Варна",
    expoTag: "● Вълна 1 · ПРОЕКТ НОВ · 04.05.2026",
    finalTag: "ФИНАЛНА", pricesWithVAT: "цени с ДДС",
    expoWave: "с ДДС · Вълна 1 EXPO цена",
    sectionA: "Секция А", sectionB: "Секция Б", section: "Секция",
    sectionFloors_A: "ет.3-25", sectionFloors_B: "ет.3-16",
    apartments: "АПАРТАМЕНТА",
    filters: "ФИЛТРИ", floor: "Етаж", type: "Тип", exposure: "Изложение",
    all: "Всички", from: "от", to: "до",
    apt: "Ап.", et: "Ет.", sec: "Сек.",
    netArea: "Чиста", netAreaSq: "Чиста (м²)",
    terrace: "Тераса", terraceSq: "Тераса (м²)",
    rzp: "РЗП", rzpSq: "РЗП (м²)",
    price: "Цена", pricePerM2: "Цена на м²", pricePerM2VAT: "Цена на м² (с ДДС)",
    aptPrice: "Цена апартамент", totalPrice: "Обща цена",
    catalogPrice: "Каталожна цена:", catalog: "Каталожна",
    studio: "Студио", type2: "2-стаен", type3: "3-стаен", type4: "4-стаен", penthouse: "Пентхаус",
    east: "Изток", west: "Запад", south: "Юг", north: "Север",
    eastSouth: "Изток/Юг", southWest: "Юг/Запад",
    eastNorth: "Изток/Север", westNorth: "Запад/Север",
    sold: "ПРОДАДЕН", reserved: "РЕЗЕРВИРАН", available: "Свободен", haltedSale: "СПРЯН ОТ ПРОДАЖБА",
    apartment: "АПАРТАМЕНТ", aptCap: "Апартамент",
    parking: "ПАРКОМЯСТО", parkingCap: "Паркомясто",
    cellar: "Изба", cellarCap: "ИЗБА",
    pkg: "ПАКЕТ", totalPackage: "ОБЩО ПАКЕТ", totalPackageCap: "Общо пакет",
    selectedPackage: "Избран пакет", aptOnly: "Само апартамент",
    addParking: "+ Избери паркомясто", changeParking: "⇄ Смени ПМ",
    removeParking: "✕ Премахни", parkingAttached: "Прикачена към апартамента",
    pickParking: "Избери първо апартамент", noParking: "Няма избрано паркомясто",
    noCellar: "Този апартамент няма прикачена изба",
    standard: "СТАНДАРТНА", aggressive: "АГРЕСИВНА −3%",
    standardName: "Стандартна схема", aggressiveName: "Агресивна схема", deferredName: "Промоция 30/70 (следващи 50)", promoTitle: "ПРОМОЦИЯ 30/70 · следващите 50 резервации", promoSub: "30% при предварителен договор · 70% на Акт 15 · стандартна цена", promoLeft: "остават от 50", promoEnded: "Промоцията приключи", priceOnRequest: "Цената не е налична за резервирани обекти",
    reservationFee: "Резервационна такса",
    reservationNote: "при подписване на резервационен договор",
    reservationDeduct: "↻ ВЪЗСТАНОВЯВА СЕ ПРИ ПРЕДВАРИТЕЛЕН ДОГОВОР",
    preliminary: "Предварителен договор",
    preliminaryNote: "минус €5,000 от резервацията",
    deduct5K: "−€5K рез.",
    kota0: "Кота 0", kota0Note: "груб изкоп и фундамент",
    kotaFloor: "Кота етаж", plochaOnFloor: "плоча на етаж ",
    sectionCalculated: " (Сек. изчислена)",
    akt14: "Акт 14", akt14Note: "груб строеж",
    akt15: "Акт 15", akt15Note: "готова сграда",
    akt16: "Акт 16", akt16Note: "нотариално прехвърляне",
    paymentSchedule: "ПЛАТЕЖЕН ГРАФИК", viewSchedule: "→ ВИЖ ПЛАТЕЖЕН ГРАФИК",
    total100: "ОБЩО (100%)", step0: "СТЪПКА 0", parameter: "Параметър",
    underground1: "подз.-1", underground2: "подз.-2",
    noApts: "Няма апартаменти по избраните филтри",
    pickApt: "Избери апартамент", closeList: "✕ Затвори списъка",
    toInventory: "→ Към инвентара",
    floorPlan: "ПЛАН НА ЕТАЖА", planComing: "План предстои",
    planNote: "публикуван при получаване от инвеститора",
    floor3Bonus: "✨ Ет.3 бонус: тераса включена с 30% коеф.",
    noVariants: "Няма варианти",
    compareTitle: "СРАВНИТЕЛНА ТАБЛИЦА",
    compareHint: 'От таба "Инвентар" избери апартамент и натисни "+ Сравнение". До 3 варианта.',
    compareEmpty: "Кликни ред от таблицата за детайли",
    aptPriceCap: "ЦЕНА НА АПАРТАМЕНТА",
    availableByFilters: "свободни по филтри",
    months: ["яну","фев","мар","апр","май","юни","юли","авг","сеп","окт","ное","дек"],
    fix35K: "ФИКС €35K", fix40K: "ФИКС €40K", fix52K: "ФИКС €52K",
  },
  en: {
    archCaption: "Architecture: Urban Creative · arch. D. Boyadzhiev · scale 1:100",

    aggressiveSub: "50/20/20/10",
    standardSub: "30/10/10/20/20/10",
    aptNo: "Apt. №",
    sectionFloor: "Section / Floor",
    addToCompare: "+ Compare",
    addVariant: "+ Add variant",
    addReservation: "+ Reservation",
    reservationRefundable: "(refundable)",
    cumulative: "Cumulative:",
    inclReserved: "(incl. reservation)",
    discount: "Discount",
    variant: "Variant",
    priceOnRequest: "Price on request",
    onRequest: "request",
    aptHash: "APT. №",
    etShort: "FL.",
    planFor: "Plan for floor",
    archPlanFor: "The architectural plan for",
    willBe: "will be",
    footerNote: "· Data + Engine + Payment schedule + Compare + Email offer",
    m2: "m²",
    m2x1500: "m² × €1,500/m²",
    tooltipBuy: "(every m² × €1,500)",
    standardSubVal: "30/10/10/20/20/10",
    aggressiveSubVal: "50/20/20/10",
    inventory: "Inventory", payment: "Payment", compare: "Compare", inquiry: "Inquiry",
    title: "NEW TOWER", subtitle: "Devnya 2, Center, Varna",
    expoTag: "● Wave 1 · NEW PROJECT · 04.05.2026",
    finalTag: "FINAL", pricesWithVAT: "prices incl. VAT",
    expoWave: "incl. VAT · Wave 1 EXPO price",
    sectionA: "Section A", sectionB: "Section B", section: "Section",
    sectionFloors_A: "fl.3-25", sectionFloors_B: "fl.3-16",
    apartments: "APARTMENTS",
    filters: "FILTERS", floor: "Floor", type: "Type", exposure: "Exposure",
    all: "All", from: "from", to: "to",
    apt: "Apt.", et: "Fl.", sec: "Sec.",
    netArea: "Net", netAreaSq: "Net (m²)",
    terrace: "Terrace", terraceSq: "Terrace (m²)",
    rzp: "GFA", rzpSq: "GFA (m²)",
    price: "Price", pricePerM2: "Price/m²", pricePerM2VAT: "Price/m² (incl. VAT)",
    aptPrice: "Apartment price", totalPrice: "Total price",
    catalogPrice: "Catalog price:", catalog: "Catalog",
    studio: "Studio", type2: "1-bedroom", type3: "2-bedroom", type4: "3-bedroom", penthouse: "Penthouse",
    east: "East", west: "West", south: "South", north: "North",
    eastSouth: "East/South", southWest: "South/West",
    eastNorth: "East/North", westNorth: "West/North",
    sold: "SOLD", reserved: "RESERVED", available: "Available", haltedSale: "WITHDRAWN",
    apartment: "APARTMENT", aptCap: "Apartment",
    parking: "PARKING", parkingCap: "Parking",
    cellar: "Storage", cellarCap: "STORAGE",
    pkg: "PACKAGE", totalPackage: "TOTAL PACKAGE", totalPackageCap: "Total package",
    selectedPackage: "Selected package", aptOnly: "Apartment only",
    addParking: "+ Add parking", changeParking: "⇄ Change parking",
    removeParking: "✕ Remove", parkingAttached: "Attached to apartment",
    pickParking: "First select an apartment", noParking: "No parking selected",
    noCellar: "This apartment has no storage attached",
    standard: "STANDARD", aggressive: "AGGRESSIVE −3%",
    standardName: "Standard scheme", aggressiveName: "Aggressive scheme", deferredName: "Promo 30/70 (next 50)", promoTitle: "PROMO 30/70 · next 50 reservations", promoSub: "30% at preliminary contract · 70% at Act 15 · standard price", promoLeft: "left of 50", promoEnded: "Promo ended", priceOnRequest: "Price not available for reserved units",
    reservationFee: "Reservation fee",
    reservationNote: "upon signing reservation agreement",
    reservationDeduct: "↻ DEDUCTED AT PRELIMINARY CONTRACT",
    preliminary: "Preliminary contract",
    preliminaryNote: "minus €5,000 from reservation",
    deduct5K: "−€5K res.",
    kota0: "Foundation (Kota 0)", kota0Note: "rough excavation and foundation",
    kotaFloor: "Floor slab", plochaOnFloor: "slab at floor ",
    sectionCalculated: " (sec. computed)",
    akt14: "Act 14", akt14Note: "rough construction",
    akt15: "Act 15", akt15Note: "completed building",
    akt16: "Act 16", akt16Note: "notary transfer",
    paymentSchedule: "PAYMENT SCHEDULE", viewSchedule: "→ VIEW PAYMENT SCHEDULE",
    total100: "TOTAL (100%)", step0: "STEP 0", parameter: "Parameter",
    underground1: "B1", underground2: "B2",
    noApts: "No apartments matching filters",
    pickApt: "Select an apartment", closeList: "✕ Close list",
    toInventory: "→ To inventory",
    floorPlan: "FLOOR PLAN", planComing: "Plan coming",
    planNote: "to be published once received from investor",
    floor3Bonus: "✨ Fl.3 bonus: terrace included at 30% coef.",
    noVariants: "No variants",
    compareTitle: "COMPARISON TABLE",
    compareHint: 'From "Inventory" tab pick an apartment and click "+ Compare". Up to 3 variants.',
    compareEmpty: "Click a table row for details",
    aptPriceCap: "APARTMENT PRICE",
    availableByFilters: "available by filters",
    months: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    fix35K: "FIXED €35K", fix40K: "FIXED €40K", fix52K: "FIXED €52K",
  },
  ru: {
    archCaption: "Архитектура: Urban Creative · арх. Д. Бояджиев · М 1:100",

    aggressiveSub: "50/20/20/10",
    standardSub: "30/10/10/20/20/10",
    aptNo: "Квартира №",
    sectionFloor: "Секция / Этаж",
    addToCompare: "+ Сравнение",
    addVariant: "+ Добавить вариант",
    addReservation: "+ Резервация",
    reservationRefundable: "(возвратный)",
    cumulative: "Накопительно:",
    inclReserved: "(вкл. бронь)",
    discount: "Скидка",
    variant: "Вариант",
    priceOnRequest: "Цена по запросу",
    onRequest: "запрос",
    aptHash: "КВ. №",
    etShort: "ЭТ.",
    planFor: "План этажа",
    archPlanFor: "Архитектурный план для",
    willBe: "будет",
    footerNote: "· Data + Engine + График платежей + Сравнение + Email оферта",
    m2: "м²",
    m2x1500: "м² × €1,500/м²",
    tooltipBuy: "(каждый м² × €1,500)",
    standardSubVal: "30/10/10/20/20/10",
    aggressiveSubVal: "50/20/20/10",
    inventory: "Каталог", payment: "Оплата", compare: "Сравнение", inquiry: "Запрос",
    title: "NEW TOWER", subtitle: "ул. Девня 2, Центр, Варна",
    expoTag: "● Волна 1 · ПРОЕКТ НОВ · 04.05.2026",
    finalTag: "ФИНАЛ", pricesWithVAT: "цены с НДС",
    expoWave: "с НДС · Волна 1 EXPO цена",
    sectionA: "Секция А", sectionB: "Секция Б", section: "Секция",
    sectionFloors_A: "эт.3-25", sectionFloors_B: "эт.3-16",
    apartments: "КВАРТИРЫ",
    filters: "ФИЛЬТРЫ", floor: "Этаж", type: "Тип", exposure: "Ориентация",
    all: "Все", from: "от", to: "до",
    apt: "Кв.", et: "Эт.", sec: "Сек.",
    netArea: "Чистая", netAreaSq: "Чистая (м²)",
    terrace: "Терраса", terraceSq: "Терраса (м²)",
    rzp: "Общая", rzpSq: "Общая (м²)",
    price: "Цена", pricePerM2: "Цена за м²", pricePerM2VAT: "Цена за м² (с НДС)",
    aptPrice: "Цена квартиры", totalPrice: "Общая цена",
    catalogPrice: "Каталожная цена:", catalog: "Каталог",
    studio: "Студия", type2: "1-комн.", type3: "2-комн.", type4: "3-комн.", penthouse: "Пентхаус",
    east: "Восток", west: "Запад", south: "Юг", north: "Север",
    eastSouth: "Восток/Юг", southWest: "Юг/Запад",
    eastNorth: "Восток/Север", westNorth: "Запад/Север",
    sold: "ПРОДАН", reserved: "БРОНЬ", available: "Свободна", haltedSale: "СНЯТА",
    apartment: "КВАРТИРА", aptCap: "Квартира",
    parking: "ПАРКОМЕСТО", parkingCap: "Паркоместо",
    cellar: "Кладовая", cellarCap: "КЛАДОВАЯ",
    pkg: "ПАКЕТ", totalPackage: "ОБЩИЙ ПАКЕТ", totalPackageCap: "Общий пакет",
    selectedPackage: "Выбранный пакет", aptOnly: "Только квартира",
    addParking: "+ Выбрать паркоместо", changeParking: "⇄ Сменить ПМ",
    removeParking: "✕ Убрать", parkingAttached: "Привязана к квартире",
    pickParking: "Сначала выберите квартиру", noParking: "Паркоместо не выбрано",
    noCellar: "У этой квартиры нет кладовой",
    standard: "СТАНДАРТНАЯ", aggressive: "АГРЕССИВНАЯ −3%",
    standardName: "Стандартная схема", aggressiveName: "Агрессивная схема", deferredName: "Промо 30/70 (следующие 50)", promoTitle: "ПРОМО 30/70 · следующие 50 броней", promoSub: "30% при предв. договоре · 70% на Акт 15 · стандартная цена", promoLeft: "осталось из 50", promoEnded: "Промо завершено", priceOnRequest: "Цена недоступна для забронированных объектов",
    reservationFee: "Регистрационный сбор",
    reservationNote: "при подписании договора брони",
    reservationDeduct: "↻ ВОЗВРАЩАЕТСЯ ПРИ ПРЕДВАР. ДОГОВОРЕ",
    preliminary: "Предварительный договор",
    preliminaryNote: "минус €5,000 из брони",
    deduct5K: "−€5K брони",
    kota0: "Нулевой этап", kota0Note: "котлован и фундамент",
    kotaFloor: "Плита этажа", plochaOnFloor: "плита на этаже ",
    sectionCalculated: " (сек. расчётная)",
    akt14: "Акт 14", akt14Note: "черновая отделка",
    akt15: "Акт 15", akt15Note: "готовое здание",
    akt16: "Акт 16", akt16Note: "нотариальная передача",
    paymentSchedule: "ГРАФИК ПЛАТЕЖЕЙ", viewSchedule: "→ ПОСМОТРЕТЬ ГРАФИК",
    total100: "ИТОГО (100%)", step0: "ШАГ 0", parameter: "Параметр",
    underground1: "подз.-1", underground2: "подз.-2",
    noApts: "Нет квартир по выбранным фильтрам",
    pickApt: "Выберите квартиру", closeList: "✕ Закрыть список",
    toInventory: "→ К каталогу",
    floorPlan: "ПЛАН ЭТАЖА", planComing: "План скоро",
    planNote: "будет опубликован после получения от инвестора",
    floor3Bonus: "✨ Эт.3 бонус: терраса с коэф. 30%",
    noVariants: "Нет вариантов",
    compareTitle: "ТАБЛИЦА СРАВНЕНИЯ",
    compareHint: 'В вкладке "Каталог" выберите квартиру и нажмите "+ Сравнение". До 3 вариантов.',
    compareEmpty: "Кликните на строку таблицы для деталей",
    aptPriceCap: "ЦЕНА КВАРТИРЫ",
    availableByFilters: "свободно по фильтрам",
    months: ["янв","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек"],
    fix35K: "ФИКС €35K", fix40K: "ФИКС €40K", fix52K: "ФИКС €52K",
  },
};

const TYPE_KEY_MAP = { "Студио": "studio", "2-стаен": "type2", "3-стаен": "type3", "4-стаен": "type4", "Пентхаус": "penthouse" };
const DIR_KEY_MAP = {
  "Изток": "east", "Запад": "west", "Юг": "south", "Север": "north",
  "Изток/Юг": "eastSouth", "Юг/Запад": "southWest",
  "Изток/Север": "eastNorth", "Запад/Север": "westNorth",
};
const tType = (typ, lang) => T[lang][TYPE_KEY_MAP[typ] || ""] || typ;
const tDir = (d, lang) => T[lang][DIR_KEY_MAP[d] || ""] || d;
const fmtMonth = (ymStr, lang) => {
  if (!ymStr || ymStr.length < 7) return ymStr;
  const [y, m] = ymStr.split("-");
  const idx = parseInt(m, 10) - 1;
  return T[lang].months[idx] + " " + y;
};



const INV = {"A":[{"s":"A","f":3,"n":1,"t":"3-стаен","e":"Запад/Север","c":102,"r":126.61,"tr":14.4,"iz":"A105","izr":2.7545},{"s":"A","f":3,"n":2,"t":"2-стаен","e":"Изток/Север","c":65.12,"r":80.62,"tr":24.3},{"s":"A","f":3,"n":3,"t":"2-стаен","e":"Изток","c":56.39,"r":70.03,"tr":20.5},{"s":"A","f":3,"n":4,"t":"2-стаен","e":"Изток","c":56.41,"r":70.05,"tr":20.4},{"s":"A","f":3,"n":5,"t":"3-стаен","e":"Изток/Юг","c":70.64,"r":91.51,"tr":57,"iz":"А8","izr":2.7861},{"s":"A","f":3,"n":6,"t":"2-стаен","e":"Юг","c":53.67,"r":66.81,"tr":20.8},{"s":"A","f":3,"n":7,"t":"3-стаен","e":"Юг/Запад","c":80.56,"r":103.54,"tr":60.6,"iz":"А50","izr":2.8283},{"s":"A","f":3,"n":8,"t":"2-стаен","e":"Запад","c":53.84,"r":66.95,"tr":19.8},{"s":"A","f":3,"n":9,"t":"2-стаен","e":"Запад","c":51.8,"r":64.56,"tr":20.4},{"s":"A","f":4,"n":10,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":132.33,"iz":"А81","izr":2.8283},{"s":"A","f":4,"n":11,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":127.93,"iz":"А77","izr":2.9128},{"s":"A","f":4,"n":12,"t":"2-стаен","e":"Изток","c":65.8,"r":78.43},{"s":"A","f":4,"n":13,"t":"2-стаен","e":"Изток","c":65.88,"r":78.53},{"s":"A","f":4,"n":14,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":115.78,"iz":"А13","izr":2.9444,"rez":true},{"s":"A","f":4,"n":15,"t":"2-стаен","e":"Юг","c":64.38,"r":76.74},{"s":"A","f":4,"n":16,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":130.45,"iz":"А65","izr":2.9866},{"s":"A","f":4,"n":17,"t":"2-стаен","e":"Запад","c":64.05,"r":76.35},{"s":"A","f":4,"n":18,"t":"2-стаен","e":"Запад","c":62.2,"r":74.14},{"s":"A","f":5,"n":19,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":129.5,"sold":true,"reason":"obez"},{"s":"A","f":5,"n":20,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":125.01,"sold":true,"reason":"obez"},{"s":"A","f":5,"n":21,"t":"2-стаен","e":"Изток","c":65.8,"r":78.43,"sold":true,"reason":"obez"},{"s":"A","f":5,"n":22,"t":"2-стаен","e":"Изток","c":65.88,"r":78.53,"sold":true,"reason":"obez"},{"s":"A","f":5,"n":23,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":112.83,"sold":true,"reason":"obez"},{"s":"A","f":5,"n":24,"t":"2-стаен","e":"Юг","c":64.38,"r":76.74,"sold":true,"reason":"obez"},{"s":"A","f":5,"n":25,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":127.46,"sold":true,"reason":"obez"},{"s":"A","f":5,"n":26,"t":"2-стаен","e":"Запад","c":64.05,"r":79.17,"sold":true,"reason":"obez"},{"s":"A","f":5,"n":27,"t":"2-стаен","e":"Запад","c":62.2,"r":74.14,"sold":true,"reason":"obez"},{"s":"A","f":6,"n":28,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":132.6,"iz":"А14","izr":3.1027},{"s":"A","f":6,"n":29,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":128.12,"iz":"A99","izr":3.1027},{"s":"A","f":6,"n":30,"t":"2-стаен","e":"Изток","c":65.8,"r":78.43},{"s":"A","f":6,"n":31,"t":"2-стаен","e":"Изток","c":65.88,"r":78.53},{"s":"A","f":6,"n":32,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":115.96,"iz":"А10","izr":3.1238},{"s":"A","f":6,"n":33,"t":"2-стаен","e":"Юг","c":64.38,"r":76.74},{"s":"A","f":6,"n":34,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":130.58,"iz":"А70","izr":3.1238},{"s":"A","f":6,"n":35,"t":"2-стаен","e":"Запад","c":64.05,"r":76.35},{"s":"A","f":6,"n":36,"t":"2-стаен","e":"Запад","c":62.2,"r":74.14},{"s":"A","f":7,"n":37,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":132.63,"iz":"А12","izr":3.1344},{"s":"A","f":7,"n":38,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":128.15,"iz":"А11","izr":3.1344},{"s":"A","f":7,"n":39,"t":"2-стаен","e":"Изток","c":65.8,"r":78.43},{"s":"A","f":7,"n":40,"t":"2-стаен","e":"Изток","c":65.88,"r":78.53},{"s":"A","f":7,"n":41,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":115.97,"iz":"A97","izr":3.1344},{"s":"A","f":7,"n":42,"t":"2-стаен","e":"Юг","c":64.38,"r":76.74},{"s":"A","f":7,"n":43,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":130.59,"iz":"A96","izr":3.1344},{"s":"A","f":7,"n":44,"t":"2-стаен","e":"Запад","c":64.05,"r":76.35},{"s":"A","f":7,"n":45,"t":"2-стаен","e":"Запад","c":62.2,"r":74.14},{"s":"A","f":8,"n":46,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":132.07,"sold":true,"reason":"obez"},{"s":"A","f":8,"n":47,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":125.01,"sold":true,"reason":"obez"},{"s":"A","f":8,"n":48,"t":"2-стаен","e":"Изток","c":65.8,"r":81.05,"sold":true,"reason":"obez"},{"s":"A","f":8,"n":49,"t":"2-стаен","e":"Изток","c":65.88,"r":78.53,"sold":true,"reason":"obez"},{"s":"A","f":8,"n":50,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":112.83,"sold":true,"reason":"obez"},{"s":"A","f":8,"n":51,"t":"2-стаен","e":"Юг","c":64.38,"r":79.75,"sold":true,"reason":"obez"},{"s":"A","f":8,"n":52,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":127.46,"sold":true,"reason":"obez"},{"s":"A","f":8,"n":53,"t":"2-стаен","e":"Запад","c":64.05,"r":79.89,"sold":true,"reason":"obez"},{"s":"A","f":8,"n":54,"t":"2-стаен","e":"Запад","c":62.2,"r":74.14,"sold":true,"reason":"obez"},{"s":"A","f":9,"n":55,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":132.44,"sold":true,"reason":"obezsht"},{"s":"A","f":9,"n":56,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":125.01,"sold":true,"reason":"obezsht"},{"s":"A","f":9,"n":57,"t":"2-стаен","e":"Изток","c":65.8,"r":81.23,"sold":true,"reason":"obezsht"},{"s":"A","f":9,"n":58,"t":"2-стаен","e":"Изток","c":65.88,"r":78.53,"sold":true,"reason":"obezsht"},{"s":"A","f":9,"n":59,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":115.97,"sold":true,"reason":"obezsht"},{"s":"A","f":9,"n":60,"t":"2-стаен","e":"Юг","c":64.38,"r":80.69,"sold":true,"reason":"obezsht"},{"s":"A","f":9,"n":61,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":127.46,"sold":true,"reason":"obezsht"},{"s":"A","f":9,"n":62,"t":"2-стаен","e":"Запад","c":64.05,"r":79.62,"sold":true,"reason":"obezsht"},{"s":"A","f":9,"n":63,"t":"2-стаен","e":"Запад","c":62.2,"r":74.14,"sold":true,"reason":"obezsht"},{"s":"A","f":10,"n":64,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":129.5,"sold":true,"reason":"obez"},{"s":"A","f":10,"n":65,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":128.35,"sold":true,"reason":"obez"},{"s":"A","f":10,"n":66,"t":"2-стаен","e":"Изток","c":65.8,"r":78.43,"sold":true,"reason":"obez"},{"s":"A","f":10,"n":67,"t":"2-стаен","e":"Изток","c":65.88,"r":81.5,"sold":true,"reason":"obez"},{"s":"A","f":10,"n":68,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":112.83,"sold":true,"reason":"obez"},{"s":"A","f":10,"n":69,"t":"2-стаен","e":"Юг","c":64.38,"r":76.74,"sold":true,"reason":"obez"},{"s":"A","f":10,"n":70,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":130.38,"sold":true,"reason":"obez"},{"s":"A","f":10,"n":71,"t":"2-стаен","e":"Запад","c":64.05,"r":76.35,"sold":true,"reason":"obez"},{"s":"A","f":10,"n":72,"t":"2-стаен","e":"Запад","c":62.2,"r":74.14,"sold":true,"reason":"obez"},{"s":"A","f":11,"n":73,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":133.34,"sold":true,"reason":"obez"},{"s":"A","f":11,"n":74,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":125.01,"sold":true,"reason":"obez"},{"s":"A","f":11,"n":75,"t":"2-стаен","e":"Изток","c":65.8,"r":81.44,"sold":true,"reason":"obez"},{"s":"A","f":11,"n":76,"t":"2-стаен","e":"Изток","c":65.88,"r":78.53,"sold":true,"reason":"obez"},{"s":"A","f":11,"n":77,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":116.75,"sold":true,"reason":"obez"},{"s":"A","f":11,"n":78,"t":"2-стаен","e":"Юг","c":64.38,"r":80.97,"sold":true,"reason":"obez"},{"s":"A","f":11,"n":79,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":147.11,"sold":true,"reason":"obez"},{"s":"A","f":11,"n":80,"t":"2-стаен","e":"Запад","c":64.05,"r":80.44,"sold":true,"reason":"obez"},{"s":"A","f":11,"n":81,"t":"2-стаен","e":"Запад","c":62.2,"r":74.14,"sold":true,"reason":"obez"},{"s":"A","f":12,"n":82,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":132.66,"iz":"А40","izr":3.166},{"s":"A","f":12,"n":83,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":128.23,"iz":"А42","izr":3.2188},{"s":"A","f":12,"n":84,"t":"2-стаен","e":"Изток","c":65.8,"r":78.43},{"s":"A","f":12,"n":85,"t":"2-стаен","e":"Изток","c":65.88,"r":78.53},{"s":"A","f":12,"n":86,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":116.06,"iz":"А38","izr":3.2294},{"s":"A","f":12,"n":87,"t":"2-стаен","e":"Юг","c":64.38,"r":76.74},{"s":"A","f":12,"n":88,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":130.72,"iz":"А41","izr":3.261},{"s":"A","f":12,"n":89,"t":"2-стаен","e":"Запад","c":64.05,"r":76.35},{"s":"A","f":12,"n":90,"t":"2-стаен","e":"Запад","c":62.2,"r":74.14},{"s":"A","f":13,"n":91,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":132.83,"iz":"А15","izr":3.3349},{"s":"A","f":13,"n":92,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":128.39,"iz":"А52","izr":3.3771},{"s":"A","f":13,"n":93,"t":"2-стаен","e":"Изток","c":65.8,"r":78.43},{"s":"A","f":13,"n":94,"t":"2-стаен","e":"Изток","c":65.88,"r":78.53},{"s":"A","f":13,"n":95,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":116.36,"iz":"А78","izr":3.5249},{"s":"A","f":13,"n":96,"t":"2-стаен","e":"Юг","c":64.38,"r":76.74},{"s":"A","f":13,"n":97,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":130.98,"iz":"А79","izr":3.5249},{"s":"A","f":13,"n":98,"t":"2-стаен","e":"Запад","c":64.05,"r":76.35},{"s":"A","f":13,"n":99,"t":"2-стаен","e":"Запад","c":62.2,"r":74.14},{"s":"A","f":14,"n":100,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":129.5,"sold":true,"reason":"obez"},{"s":"A","f":14,"n":101,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":125.01,"sold":true,"reason":"obez"},{"s":"A","f":14,"n":102,"t":"2-стаен","e":"Изток","c":65.8,"r":78.43,"sold":true,"reason":"obez"},{"s":"A","f":14,"n":103,"t":"2-стаен","e":"Изток","c":65.88,"r":80.85,"sold":true,"reason":"obez"},{"s":"A","f":14,"n":104,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":115.45,"sold":true,"reason":"obez"},{"s":"A","f":14,"n":105,"t":"2-стаен","e":"Юг","c":64.38,"r":80.64,"sold":true,"reason":"obez"},{"s":"A","f":14,"n":106,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":127.46,"sold":true,"reason":"obez"},{"s":"A","f":14,"n":107,"t":"2-стаен","e":"Запад","c":64.05,"r":76.35,"sold":true,"reason":"obez"},{"s":"A","f":14,"n":108,"t":"2-стаен","e":"Запад","c":62.2,"r":79.14,"sold":true,"reason":"obez"},{"s":"A","f":15,"n":109,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":133.08,"iz":"А72","izr":3.5776},{"s":"A","f":15,"n":110,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":128.6,"iz":"А51","izr":3.5882},{"s":"A","f":15,"n":111,"t":"2-стаен","e":"Изток","c":65.8,"r":78.43},{"s":"A","f":15,"n":112,"t":"2-стаен","e":"Изток","c":65.88,"r":78.53},{"s":"A","f":15,"n":113,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":116.65,"iz":"А71","izr":3.8204},{"s":"A","f":15,"n":114,"t":"2-стаен","e":"Юг","c":64.38,"r":76.74},{"s":"A","f":15,"n":115,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":131.3,"iz":"А39","izr":3.8415},{"s":"A","f":15,"n":116,"t":"2-стаен","e":"Запад","c":64.05,"r":76.35},{"s":"A","f":15,"n":117,"t":"2-стаен","e":"Запад","c":62.2,"r":74.14},{"s":"A","f":16,"n":118,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":133.34,"iz":"А74","izr":3.8415},{"s":"A","f":16,"n":119,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":128.87,"iz":"А45","izr":3.852},{"s":"A","f":16,"n":120,"t":"2-стаен","e":"Изток","c":65.8,"r":78.43},{"s":"A","f":16,"n":121,"t":"2-стаен","e":"Изток","c":65.88,"r":78.53},{"s":"A","f":16,"n":122,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":116.69,"iz":"А46","izr":3.852},{"s":"A","f":16,"n":123,"t":"2-стаен","e":"Юг","c":64.38,"r":76.74},{"s":"A","f":16,"n":124,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":131.31,"iz":"А47","izr":3.852},{"s":"A","f":16,"n":125,"t":"2-стаен","e":"Запад","c":64.05,"r":76.35},{"s":"A","f":16,"n":126,"t":"2-стаен","e":"Запад","c":62.2,"r":74.14},{"s":"A","f":17,"n":127,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":129.5,"sold":true,"reason":"obez"},{"s":"A","f":17,"n":128,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":129.25,"sold":true,"reason":"obez"},{"s":"A","f":17,"n":129,"t":"2-стаен","e":"Изток","c":65.8,"r":78.43,"sold":true,"reason":"obez"},{"s":"A","f":17,"n":130,"t":"2-стаен","e":"Изток","c":65.88,"r":84.49,"sold":true,"reason":"obez"},{"s":"A","f":17,"n":131,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":112.83,"sold":true,"reason":"obez"},{"s":"A","f":17,"n":132,"t":"2-стаен","e":"Юг","c":64.38,"r":79.58,"sold":true,"reason":"obez"},{"s":"A","f":17,"n":133,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":127.46,"sold":true,"reason":"obez"},{"s":"A","f":17,"n":134,"t":"2-стаен","e":"Запад","c":64.05,"r":76.35,"sold":true,"reason":"obez"},{"s":"A","f":17,"n":135,"t":"2-стаен","e":"Запад","c":62.2,"r":76.96,"sold":true,"reason":"obez"},{"s":"A","f":18,"n":136,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":133.38,"iz":"А19","izr":3.8837},{"s":"A","f":18,"n":137,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":128.9,"iz":"А73","izr":3.8837},{"s":"A","f":18,"n":138,"t":"2-стаен","e":"Изток","c":65.8,"r":78.43},{"s":"A","f":18,"n":139,"t":"2-стаен","e":"Изток","c":65.88,"r":78.53},{"s":"A","f":18,"n":140,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":115.67,"sold":true,"reason":"obezsht"},{"s":"A","f":18,"n":141,"t":"2-стаен","e":"Юг","c":64.38,"r":76.74,"sold":true,"reason":"obezsht"},{"s":"A","f":18,"n":142,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":127.46,"sold":true,"reason":"obezsht"},{"s":"A","f":18,"n":143,"t":"2-стаен","e":"Запад","c":64.05,"r":81.34,"sold":true,"reason":"obezsht"},{"s":"A","f":18,"n":144,"t":"2-стаен","e":"Запад","c":62.2,"r":74.14},{"s":"A","f":19,"n":145,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":129.5},{"s":"A","f":19,"n":146,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":128.91,"iz":"А26","izr":3.8942},{"s":"A","f":19,"n":147,"t":"2-стаен","e":"Изток","c":65.8,"r":78.43},{"s":"A","f":19,"n":148,"t":"2-стаен","e":"Изток","c":65.88,"r":78.53},{"s":"A","f":19,"n":149,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":116.76,"iz":"А44","izr":3.9259},{"s":"A","f":19,"n":150,"t":"2-стаен","e":"Юг","c":64.38,"r":76.74},{"s":"A","f":19,"n":151,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":131.41,"iz":"А23","izr":3.947},{"s":"A","f":19,"n":152,"t":"2-стаен","e":"Запад","c":64.05,"r":76.35},{"s":"A","f":19,"n":153,"t":"2-стаен","e":"Запад","c":62.2,"r":76.63,"iz":"А37","izr":2.4906},{"s":"A","f":20,"n":154,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":129.5,"sold":true,"reason":"obez"},{"s":"A","f":20,"n":155,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":127.59,"sold":true,"reason":"obez"},{"s":"A","f":20,"n":156,"t":"2-стаен","e":"Изток","c":65.8,"r":78.43,"sold":true,"reason":"obez"},{"s":"A","f":20,"n":157,"t":"2-стаен","e":"Изток","c":65.88,"r":81.02,"sold":true,"reason":"obez"},{"s":"A","f":20,"n":158,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":117.84,"sold":true,"reason":"obez"},{"s":"A","f":20,"n":159,"t":"2-стаен","e":"Юг","c":64.38,"r":79.39,"sold":true,"reason":"obez"},{"s":"A","f":20,"n":160,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":127.46,"sold":true,"reason":"obez"},{"s":"A","f":20,"n":161,"t":"2-стаен","e":"Запад","c":64.05,"r":81.77,"sold":true,"reason":"obez"},{"s":"A","f":20,"n":162,"t":"2-стаен","e":"Запад","c":62.2,"r":74.14,"sold":true,"reason":"obez"},{"s":"A","f":21,"n":163,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":133.47,"iz":"А49","izr":3.9681},{"s":"A","f":21,"n":164,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":129.11,"iz":"А18","izr":4.0947},{"s":"A","f":21,"n":165,"t":"2-стаен","e":"Изток","c":65.8,"r":80.94,"iz":"А69","izr":2.5117},{"s":"A","f":21,"n":166,"t":"2-стаен","e":"Изток","c":65.88,"r":81.1,"iz":"А54","izr":2.575},{"s":"A","f":21,"n":167,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":116.93,"iz":"А75","izr":4.0947,"rez":true},{"s":"A","f":21,"n":168,"t":"2-стаен","e":"Юг","c":64.38,"r":79.32,"iz":"А53","izr":2.575},{"s":"A","f":21,"n":169,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":131.6,"iz":"А17","izr":4.137},{"s":"A","f":21,"n":170,"t":"2-стаен","e":"Запад","c":64.05,"r":78.94,"iz":"А68","izr":2.5962},{"s":"A","f":21,"n":171,"t":"2-стаен","e":"Запад","c":62.2,"r":76.77,"iz":"А9","izr":2.6278},{"s":"A","f":22,"n":172,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":129.5},{"s":"A","f":22,"n":173,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":129.25,"iz":"А25","izr":4.2319},{"s":"A","f":22,"n":174,"t":"2-стаен","e":"Изток","c":65.8,"r":81.06,"iz":"A94","izr":2.6278},{"s":"A","f":22,"n":175,"t":"2-стаен","e":"Изток","c":65.88,"r":81.18,"iz":"А16","izr":2.6489},{"s":"A","f":22,"n":176,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":117.07,"iz":"А24","izr":4.2319},{"s":"A","f":22,"n":177,"t":"2-стаен","e":"Юг","c":64.38,"r":79.39,"iz":"A101","izr":2.6489},{"s":"A","f":22,"n":178,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":131.7,"iz":"А22","izr":4.2425},{"s":"A","f":22,"n":179,"t":"2-стаен","e":"Запад","c":64.05,"r":79.04,"iz":"А43","izr":2.6911},{"s":"A","f":22,"n":180,"t":"2-стаен","e":"Запад","c":62.2,"r":76.9,"iz":"А20","izr":2.7545},{"s":"A","f":23,"n":181,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":132.85,"sold":true,"reason":"obez"},{"s":"A","f":23,"n":182,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":127.63,"sold":true,"reason":"obez"},{"s":"A","f":23,"n":183,"t":"2-стаен","e":"Изток","c":65.8,"r":78.43,"sold":true,"reason":"obez"},{"s":"A","f":23,"n":184,"t":"2-стаен","e":"Изток","c":65.88,"r":81.18,"sold":true,"reason":"obez"},{"s":"A","f":23,"n":185,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":115.93,"sold":true,"reason":"obez"},{"s":"A","f":23,"n":186,"t":"2-стаен","e":"Юг","c":64.38,"r":79.62,"sold":true,"reason":"obez"},{"s":"A","f":23,"n":187,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":127.46,"sold":true,"reason":"obez"},{"s":"A","f":23,"n":188,"t":"2-стаен","e":"Запад","c":64.05,"r":79.19,"sold":true,"reason":"obez"},{"s":"A","f":23,"n":189,"t":"2-стаен","e":"Запад","c":62.2,"r":76.98,"sold":true,"reason":"obez"},{"s":"A","f":24,"n":190,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":133.38,"sold":true,"reason":"halted","iz":"A104","izr":3.8837},{"s":"A","f":24,"n":191,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":129.15,"sold":true,"reason":"halted","iz":"A102","izr":4.137},{"s":"A","f":24,"n":192,"t":"2-стаен","e":"Изток","c":65.8,"r":83.39,"sold":true,"reason":"halted","iz":"А48","izr":4.9601},{"s":"A","f":24,"n":193,"t":"2-стаен","e":"Изток","c":65.88,"r":85.21,"sold":true,"reason":"halted","iz":"А21","izr":6.6803},{"s":"A","f":24,"n":194,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":117.08,"sold":true,"reason":"halted","iz":"A107","izr":4.2425},{"s":"A","f":24,"n":195,"t":"2-стаен","e":"Юг","c":64.38,"r":81.44,"sold":true,"reason":"halted","iz":"А76","izr":4.6963},{"s":"A","f":24,"n":196,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":134.14,"sold":true,"reason":"halted","iz":"A106","izr":6.6803},{"s":"A","f":24,"n":197,"t":"2-стаен","e":"Запад","c":64.05,"r":80.93,"sold":true,"reason":"halted","iz":"А66","izr":4.5802},{"s":"A","f":24,"n":198,"t":"2-стаен","e":"Запад","c":62.2,"r":76.46,"sold":true,"reason":"halted","iz":"А27","izr":2.3218},{"s":"A","f":25,"n":199,"t":"Пентхаус","e":"Запад/Север","c":142.27,"r":196.33,"sold":true,"reason":"halted","iz":"А6 + А7","izr":20.4948,"pmDoor":"ПМ111 + ПМ112"},{"s":"A","f":25,"n":200,"t":"Пентхаус","e":"Изток/Север","c":104.88,"r":150.14,"sold":true,"reason":"halted","iz":"A86 + A87","izr":19.9346,"pmDoor":"ПМ249 + ПМ250"},{"s":"A","f":25,"n":201,"t":"2-стаен","e":"Изток","c":65.8,"r":89.16,"sold":true,"reason":"halted","iz":"А4","izr":10.7223,"pmDoor":"ПМ106"},{"s":"A","f":25,"n":202,"t":"2-стаен","e":"Изток","c":65.88,"r":87.16,"sold":true,"reason":"halted","iz":"А3","izr":8.6327,"pmDoor":"ПМ105"},{"s":"A","f":25,"n":203,"t":"Пентхаус","e":"Изток/Юг","c":132,"r":183.1,"sold":true,"reason":"halted","iz":"A91 + А92","izr":20.4948,"pmDoor":"ПМ257 + ПМ258"},{"s":"A","f":25,"n":204,"t":"Пентхаус","e":"Юг/Запад","c":134.35,"r":196.78,"sold":true,"reason":"obez"},{"s":"A","f":25,"n":205,"t":"3-стаен","e":"Запад","c":92.71,"r":123.03,"sold":true,"reason":"halted","iz":"А5","izr":12.5164,"pmDoor":"ПМ107"}],"B":[{"s":"B","f":3,"n":1,"t":"2-стаен","e":"Изток/Север","c":51.53,"r":64.45,"rez":true,"pmDoor":"ПМ175"},{"s":"B","f":3,"n":2,"t":"Студио","e":"Изток","c":40.78,"r":48.61},{"s":"B","f":3,"n":3,"t":"2-стаен","e":"Изток","c":54,"r":64.37},{"s":"B","f":3,"n":4,"t":"3-стаен","e":"Изток/Юг","c":83.8,"r":103.69,"iz":"Б41","izr":3.7992},{"s":"B","f":3,"n":5,"t":"3-стаен","e":"Юг/Запад","c":78.89,"r":97.84,"iz":"Б37","izr":3.7992},{"s":"B","f":3,"n":6,"t":"2-стаен","e":"Запад","c":57.07,"r":68.03},{"s":"B","f":3,"n":7,"t":"2-стаен","e":"Запад/Север","c":52.71,"r":62.83},{"s":"B","f":4,"n":8,"t":"2-стаен","e":"Изток/Север","c":51.53,"r":61.42},{"s":"B","f":4,"n":9,"t":"2-стаен","e":"Изток","c":56.45,"r":67.29},{"s":"B","f":4,"n":10,"t":"2-стаен","e":"Изток","c":54,"r":64.37,"rez":true},{"s":"B","f":4,"n":11,"t":"3-стаен","e":"Изток/Юг","c":83.8,"r":103.99,"iz":"Б40","izr":4.1053},{"s":"B","f":4,"n":12,"t":"3-стаен","e":"Юг/Запад","c":78.89,"r":98.15,"iz":"Б19","izr":4.1159},{"s":"B","f":4,"n":13,"t":"2-стаен","e":"Запад","c":57.07,"r":68.03},{"s":"B","f":4,"n":14,"t":"2-стаен","e":"Запад/Север","c":52.71,"r":62.83},{"s":"B","f":5,"n":15,"t":"2-стаен","e":"Изток/Север","c":51.53,"r":61.42,"rez":true},{"s":"B","f":5,"n":16,"t":"2-стаен","e":"Изток","c":56.45,"r":67.29,"rez":true},{"s":"B","f":5,"n":17,"t":"2-стаен","e":"Изток","c":54,"r":64.37},{"s":"B","f":5,"n":18,"t":"3-стаен","e":"Изток/Юг","c":83.8,"r":104.12,"iz":"Б39","izr":4.2319},{"s":"B","f":5,"n":19,"t":"3-стаен","e":"Юг/Запад","c":78.89,"r":98.28,"iz":"Б18","izr":4.2425},{"s":"B","f":5,"n":20,"t":"2-стаен","e":"Запад","c":57.07,"r":68.03},{"s":"B","f":5,"n":21,"t":"2-стаен","e":"Запад/Север","c":52.71,"r":62.83},{"s":"B","f":6,"n":22,"t":"2-стаен","e":"Изток/Север","c":51.53,"r":61.42,"rez":true},{"s":"B","f":6,"n":23,"t":"2-стаен","e":"Изток","c":56.45,"r":67.29,"rez":true},{"s":"B","f":6,"n":24,"t":"2-стаен","e":"Изток","c":54,"r":64.37},{"s":"B","f":6,"n":25,"t":"3-стаен","e":"Изток/Юг","c":83.8,"r":104.16,"iz":"Б15","izr":4.2742},{"s":"B","f":6,"n":26,"t":"3-стаен","e":"Юг/Запад","c":78.89,"r":94.03,"pmDoor":"ПМ168"},{"s":"B","f":6,"n":27,"t":"2-стаен","e":"Запад","c":57.07,"r":68.03},{"s":"B","f":6,"n":28,"t":"2-стаен","e":"Запад/Север","c":52.71,"r":62.83,"rez":true},{"s":"B","f":7,"n":29,"t":"2-стаен","e":"Изток/Север","c":51.53,"r":61.42},{"s":"B","f":7,"n":30,"t":"2-стаен","e":"Изток","c":56.45,"r":67.29},{"s":"B","f":7,"n":31,"t":"2-стаен","e":"Изток","c":54,"r":64.37},{"s":"B","f":7,"n":32,"t":"3-стаен","e":"Изток/Юг","c":83.8,"r":99.89,"pmDoor":"ПМ273"},{"s":"B","f":7,"n":33,"t":"3-стаен","e":"Юг/Запад","c":78.89,"r":94.03,"pmDoor":"ПМ21"},{"s":"B","f":7,"n":34,"t":"2-стаен","e":"Запад","c":57.07,"r":68.03},{"s":"B","f":7,"n":35,"t":"2-стаен","e":"Запад/Север","c":52.71,"r":62.83,"rez":true},{"s":"B","f":8,"n":36,"t":"2-стаен","e":"Изток/Север","c":51.53,"r":61.42,"rez":true},{"s":"B","f":8,"n":37,"t":"2-стаен","e":"Изток","c":56.45,"r":67.29,"rez":true},{"s":"B","f":8,"n":38,"t":"2-стаен","e":"Изток","c":54,"r":64.37},{"s":"B","f":8,"n":39,"t":"3-стаен","e":"Изток/Юг","c":83.8,"r":99.89,"pmDoor":"ПМ272"},{"s":"B","f":8,"n":40,"t":"3-стаен","e":"Юг/Запад","c":78.89,"r":94.03,"pmDoor":"ПМ275"},{"s":"B","f":8,"n":41,"t":"2-стаен","e":"Запад","c":57.07,"r":68.03},{"s":"B","f":8,"n":42,"t":"2-стаен","e":"Запад/Север","c":52.71,"r":62.83},{"s":"B","f":9,"n":43,"t":"2-стаен","e":"Изток/Север","c":51.53,"r":61.42},{"s":"B","f":9,"n":44,"t":"2-стаен","e":"Изток","c":56.45,"r":67.29},{"s":"B","f":9,"n":45,"t":"2-стаен","e":"Изток","c":54,"r":64.37},{"s":"B","f":9,"n":46,"t":"3-стаен","e":"Изток/Юг","c":83.8,"r":107.17,"iz":"Б31","izr":7.2819},{"s":"B","f":9,"n":47,"t":"3-стаен","e":"Юг/Запад","c":78.89,"r":101.34,"iz":"Б10","izr":7.303},{"s":"B","f":9,"n":48,"t":"2-стаен","e":"Запад","c":57.07,"r":68.03},{"s":"B","f":9,"n":49,"t":"2-стаен","e":"Запад/Север","c":52.71,"r":62.83},{"s":"B","f":10,"n":50,"t":"2-стаен","e":"Изток/Север","c":51.53,"r":61.42},{"s":"B","f":10,"n":51,"t":"2-стаен","e":"Изток","c":56.45,"r":67.29},{"s":"B","f":10,"n":52,"t":"2-стаен","e":"Изток","c":54,"r":64.37},{"s":"B","f":10,"n":53,"t":"3-стаен","e":"Изток/Юг","c":83.8,"r":99.89,"pmDoor":"ПМ23"},{"s":"B","f":10,"n":54,"t":"3-стаен","e":"Юг/Запад","c":78.89,"r":94.03,"pmDoor":"ПМ22"},{"s":"B","f":10,"n":55,"t":"2-стаен","e":"Запад","c":57.07,"r":68.03},{"s":"B","f":10,"n":56,"t":"2-стаен","e":"Запад/Север","c":52.71,"r":62.83},{"s":"B","f":11,"n":57,"t":"2-стаен","e":"Изток/Север","c":51.53,"r":61.42},{"s":"B","f":11,"n":58,"t":"2-стаен","e":"Изток","c":56.45,"r":67.29},{"s":"B","f":11,"n":59,"t":"2-стаен","e":"Изток","c":54,"r":64.37},{"s":"B","f":11,"n":60,"t":"3-стаен","e":"Изток/Юг","c":83.8,"r":99.89,"pmDoor":"ПМ276"},{"s":"B","f":11,"n":61,"t":"3-стаен","e":"Юг/Запад","c":78.89,"r":94.03,"pmDoor":"ПМ274"},{"s":"B","f":11,"n":62,"t":"2-стаен","e":"Запад","c":57.07,"r":68.03},{"s":"B","f":11,"n":63,"t":"2-стаен","e":"Запад/Север","c":52.71,"r":62.83},{"s":"B","f":12,"n":64,"t":"2-стаен","e":"Изток/Север","c":51.53,"r":61.42},{"s":"B","f":12,"n":65,"t":"2-стаен","e":"Изток","c":56.45,"r":67.29,"pmDoor":"ПМ167"},{"s":"B","f":12,"n":66,"t":"2-стаен","e":"Изток","c":54,"r":64.37},{"s":"B","f":12,"n":67,"t":"3-стаен","e":"Изток/Юг","c":83.8,"r":99.89,"pmDoor":"ПМ132"},{"s":"B","f":12,"n":68,"t":"3-стаен","e":"Юг/Запад","c":78.89,"r":94.03,"pmDoor":"ПМ129"},{"s":"B","f":12,"n":69,"t":"2-стаен","e":"Запад","c":57.07,"r":68.03},{"s":"B","f":12,"n":70,"t":"2-стаен","e":"Запад/Север","c":52.71,"r":62.83},{"s":"B","f":13,"n":71,"t":"2-стаен","e":"Изток/Север","c":51.53,"r":61.42},{"s":"B","f":13,"n":72,"t":"2-стаен","e":"Изток","c":56.45,"r":67.29},{"s":"B","f":13,"n":73,"t":"2-стаен","e":"Изток","c":54,"r":64.37},{"s":"B","f":13,"n":74,"t":"3-стаен","e":"Изток/Юг","c":83.8,"r":99.89,"pmDoor":"ПМ131"},{"s":"B","f":13,"n":75,"t":"3-стаен","e":"Юг/Запад","c":78.89,"r":102.18,"iz":"Б14","izr":8.1367},{"s":"B","f":13,"n":76,"t":"2-стаен","e":"Запад","c":57.07,"r":68.03},{"s":"B","f":13,"n":77,"t":"2-стаен","e":"Запад/Север","c":52.71,"r":62.83},{"s":"B","f":14,"n":78,"t":"2-стаен","e":"Изток/Север","c":51.53,"r":61.42},{"s":"B","f":14,"n":79,"t":"2-стаен","e":"Изток","c":56.45,"r":67.29},{"s":"B","f":14,"n":80,"t":"2-стаен","e":"Изток","c":54,"r":64.37,"pmDoor":"ПМ169"},{"s":"B","f":14,"n":81,"t":"3-стаен","e":"Изток/Юг","c":83.8,"r":108.08,"iz":"Б35","izr":8.1895},{"s":"B","f":14,"n":82,"t":"3-стаен","e":"Юг/Запад","c":78.89,"r":102.71,"iz":"Б17","izr":8.6749},{"s":"B","f":14,"n":83,"t":"2-стаен","e":"Запад","c":57.07,"r":71.04,"iz":"Б12","izr":3.0077},{"s":"B","f":14,"n":84,"t":"2-стаен","e":"Запад/Север","c":52.71,"r":65.84,"iz":"Б21","izr":3.0077},{"s":"B","f":15,"n":85,"t":"2-стаен","e":"Изток/Север","c":51.53,"r":65.72,"iz":"Б36","izr":4.2953},{"s":"B","f":15,"n":86,"t":"2-стаен","e":"Изток","c":56.45,"r":70.54,"iz":"Б11","izr":3.2505,"rez":true},{"s":"B","f":15,"n":87,"t":"2-стаен","e":"Изток","c":54,"r":67.79,"iz":"Б13","izr":3.4193,"rez":true},{"s":"B","f":15,"n":88,"t":"3-стаен","e":"Изток/Юг","c":83.8,"r":99.89,"pmDoor":"ПМ130"},{"s":"B","f":15,"n":89,"t":"3-стаен","e":"Юг/Запад","c":78.89,"r":102.77,"iz":"Б38","izr":8.7277},{"s":"B","f":15,"n":90,"t":"2-стаен","e":"Запад","c":57.07,"r":71.46,"iz":"Б32","izr":3.4299},{"s":"B","f":15,"n":91,"t":"2-стаен","e":"Запад/Север","c":52.71,"r":66.27,"iz":"Б34","izr":3.4404},{"s":"B","f":16,"n":92,"t":"2-стаен","e":"Изток/Север","c":51.53,"r":61.42,"pmDoor":"ПМ128"},{"s":"B","f":16,"n":93,"t":"2-стаен","e":"Изток","c":56.45,"r":70.75,"iz":"Б42","izr":3.4615},{"s":"B","f":16,"n":94,"t":"4-стаен","e":"Изток/Юг","c":144.54,"r":172.29,"pmDoor":"ПМ275а"},{"s":"B","f":16,"n":95,"t":"3-стаен","e":"Юг/Запад","c":78.89,"r":94.03,"pmDoor":"ПМ133"},{"s":"B","f":16,"n":96,"t":"2-стаен","e":"Запад","c":57.07,"r":71.57,"iz":"Б20","izr":3.546},{"s":"B","f":16,"n":97,"t":"2-стаен","e":"Запад/Север","c":52.71,"r":66.6,"iz":"Б16","izr":3.7676}],"P":[{"id":"ПМ1","lvl":"подз.-2","a":16.31,"g":"ФИКС €35K","p":35000},{"id":"ПМ2","lvl":"подз.-2","a":13.75,"g":"ФИКС €35K","p":35000},{"id":"ПМ3","lvl":"подз.-2","a":14.64,"g":"ФИКС €35K","p":35000},{"id":"ПМ4","lvl":"подз.-2","a":16.02,"g":"ФИКС €35K","p":35000},{"id":"ПМ5","lvl":"подз.-2","a":14.64,"g":"ФИКС €35K","p":35000},{"id":"ПМ6","lvl":"подз.-2","a":14.68,"g":"ФИКС €35K","p":35000},{"id":"ПМ7","lvl":"подз.-2","a":14.64,"g":"ФИКС €35K","p":35000},{"id":"ПМ8","lvl":"подз.-2","a":14.68,"g":"ФИКС €35K","p":35000},{"id":"ПМ9","lvl":"подз.-2","a":14.64,"g":"ФИКС €35K","p":35000},{"id":"ПМ10","lvl":"подз.-2","a":13.31,"g":"ФИКС €35K","p":35000},{"id":"ПМ11","lvl":"подз.-2","a":16.4,"g":"ФИКС €35K","p":35000},{"id":"ПМ12","lvl":"подз.-2","a":13.35,"g":"ФИКС €35K","p":35000},{"id":"ПМ24","lvl":"подз.-2","a":18.32,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ25","lvl":"подз.-2","a":12.5,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ26","lvl":"подз.-2","a":13.75,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ27","lvl":"подз.-2","a":13.75,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ28","lvl":"подз.-2","a":13.75,"g":"ФИКС €35K","p":35000},{"id":"ПМ29","lvl":"подз.-2","a":13.75,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ30","lvl":"подз.-2","a":13.75,"g":"ФИКС €35K","p":35000},{"id":"ПМ31","lvl":"подз.-2","a":15.0,"g":"ФИКС €35K","p":35000},{"id":"ПМ32","lvl":"подз.-2","a":13.75,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ33","lvl":"подз.-2","a":12.5,"g":"ФИКС €35K","p":35000},{"id":"ПМ34","lvl":"подз.-2","a":15.0,"g":"ФИКС €35K","p":35000},{"id":"ПМ35","lvl":"подз.-2","a":15.0,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ36","lvl":"подз.-2","a":12.5,"g":"ФИКС €35K","p":35000},{"id":"ПМ37","lvl":"подз.-2","a":13.75,"g":"ФИКС €35K","p":35000},{"id":"ПМ38","lvl":"подз.-2","a":15.0,"g":"ФИКС €35K","p":35000},{"id":"ПМ39","lvl":"подз.-2","a":13.75,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ40","lvl":"подз.-2","a":13.75,"g":"ФИКС €35K","p":35000},{"id":"ПМ41","lvl":"подз.-2","a":13.75,"g":"ФИКС €35K","p":35000},{"id":"ПМ42","lvl":"подз.-2","a":13.75,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ41А","lvl":"подз.-2","a":13.75,"g":"ФИКС €35K","p":35000},{"id":"ПМ43","lvl":"подз.-2","a":12.5,"g":"ФИКС €35K","p":35000},{"id":"ПМ44","lvl":"подз.-2","a":15.21,"g":"ФИКС €35K","p":35000},{"id":"ПМ45","lvl":"подз.-2","a":15.0,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ46","lvl":"подз.-2","a":12.5,"g":"ФИКС €35K","p":35000},{"id":"ПМ47","lvl":"подз.-2","a":15.0,"g":"ФИКС €35K","p":35000},{"id":"ПМ48","lvl":"подз.-2","a":14.0,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ49","lvl":"подз.-2","a":12.88,"g":"ФИКС €35K","p":35000},{"id":"ПМ50","lvl":"подз.-2","a":13.75,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ51","lvl":"подз.-2","a":13.1,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ52","lvl":"подз.-2","a":13.75,"g":"ФИКС €35K","p":35000},{"id":"ПМ53","lvl":"подз.-2","a":15.05,"g":"ФИКС €35K","p":35000},{"id":"ПМ54","lvl":"подз.-2","a":14.95,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ55","lvl":"подз.-2","a":13.7,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ56","lvl":"подз.-2","a":13.08,"g":"ФИКС €35K","p":35000},{"id":"ПМ57","lvl":"подз.-2","a":13.7,"g":"ФИКС €35K","p":35000},{"id":"ПМ58","lvl":"подз.-2","a":12.83,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ59","lvl":"подз.-2","a":14.03,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ60","lvl":"подз.-2","a":14.95,"g":"ФИКС €35K","p":35000},{"id":"ПМ61","lvl":"подз.-2","a":12.46,"g":"29166.67","p":35000},{"id":"ПМ62","lvl":"подз.-2","a":14.95,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ63","lvl":"подз.-2","a":12.46,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ64","lvl":"подз.-2","a":12.46,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ65","lvl":"подз.-2","a":13.46,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ66","lvl":"подз.-2","a":17.73,"g":"ФИКС €35K","p":35000},{"id":"ПМ67","lvl":"подз.-2","a":13.0,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ68","lvl":"подз.-2","a":13.0,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ69","lvl":"подз.-2","a":15.6,"g":"ФИКС €35K","p":35000},{"id":"ПМ70","lvl":"подз.-2","a":13.0,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ71","lvl":"подз.-2","a":15.6,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ72","lvl":"подз.-2","a":14.56,"g":"ФИКС €35K","p":35000},{"id":"ПМ73","lvl":"подз.-2","a":12.74,"g":"ФИКС €35K","p":35000},{"id":"ПМ74","lvl":"подз.-2","a":14.3,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ75","lvl":"подз.-2","a":14.3,"g":"ФИКС €35K","p":35000},{"id":"ПМ76","lvl":"подз.-2","a":14.3,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ77","lvl":"подз.-2","a":15.6,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ78","lvl":"подз.-2","a":15.0,"g":"ФИКС €35K","p":35000},{"id":"ПМ79","lvl":"подз.-2","a":13.75,"g":"ФИКС €35K","p":35000},{"id":"ПМ80","lvl":"подз.-2","a":13.75,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ81","lvl":"подз.-2","a":13.75,"g":"ФИКС €35K","p":35000},{"id":"ПМ82","lvl":"подз.-2","a":12.25,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ83","lvl":"подз.-2","a":14.0,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ84","lvl":"подз.-2","a":15.0,"g":"ФИКС €35K","p":35000},{"id":"ПМ85","lvl":"подз.-2","a":12.5,"g":"ФИКС €35K","p":35000},{"id":"ПМ86","lvl":"подз.-2","a":15.0,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ87","lvl":"подз.-2","a":12.5,"g":"ФИКС €35K","p":35000},{"id":"ПМ88","lvl":"подз.-2","a":12.5,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ89","lvl":"подз.-2","a":18.66,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ90","lvl":"подз.-2","a":24.03,"g":"ФИКС €35K","p":40000},{"id":"ПМ91","lvl":"подз.-2","a":18.15,"g":"ФИКС €35K","p":40000,"sold":true,"reason":"obez"},{"id":"ПМ92","lvl":"подз.-2","a":15.1,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ93","lvl":"подз.-2","a":16.99,"g":"ФИКС €35K","p":40000},{"id":"ПМ94","lvl":"подз.-2","a":12.65,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ95","lvl":"подз.-2","a":26.0,"g":"ФИКС €35K","p":40000},{"id":"ПМ96","lvl":"подз.-2","a":25.38,"g":"ФИКС €35K","p":40000},{"id":"ПМ97","lvl":"подз.-2","a":17.61,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ98","lvl":"подз.-2","a":13.72,"g":"ФИКС €35K","p":40000},{"id":"ПМ99","lvl":"подз.-2","a":13.16,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ100","lvl":"подз.-2","a":12.32,"g":"ФИКС €35K","p":35000},{"id":"ПМ101","lvl":"подз.-2","a":10.65,"g":"29166.67","p":35000},{"id":"ПМ102","lvl":"подз.-2","a":15.35,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ103","lvl":"подз.-2","a":19.74,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ104","lvl":"подз.-2","a":21.93,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ105","lvl":"подз.-2","a":18.46,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ106","lvl":"подз.-2","a":17.75,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ107","lvl":"подз.-2","a":23.28,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ108","lvl":"подз.-2","a":14.35,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ109","lvl":"подз.-2","a":15.7,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ110","lvl":"подз.-2","a":22.61,"g":"ФИКС €35K","p":35000},{"id":"ПМ111","lvl":"подз.-2","a":16.94,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ112","lvl":"подз.-2","a":17.35,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ113","lvl":"подз.-2","a":20.22,"g":"—","p":null},{"id":"ПМ114","lvl":"подз.-2","a":16.65,"g":"—","p":null},{"id":"ПМ115","lvl":"подз.-2","a":12.51,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ116","lvl":"подз.-2","a":14.4,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ117","lvl":"подз.-2","a":15.5,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ118","lvl":"подз.-2","a":12.55,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ119","lvl":"подз.-2","a":16.67,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ120","lvl":"подз.-2","a":16.67,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ121","lvl":"подз.-2","a":17.78,"g":"ФИКС €35K","p":40000},{"id":"ПМ122","lvl":"подз.-2","a":12.35,"g":"29166.67","p":35000},{"id":"ПМ123","lvl":"подз.-2","a":13.06,"g":"ФИКС €35K","p":35000},{"id":"ПМ124","lvl":"подз.-2","a":13.06,"g":"ФИКС €35K","p":35000},{"id":"ПМ125","lvl":"подз.-2","a":13.06,"g":"ФИКС €35K","p":35000},{"id":"ПМ126","lvl":"подз.-2","a":14.25,"g":"ФИКС €35K","p":35000},{"id":"ПМ127","lvl":"подз.-2","a":11.87,"g":"29166.67","p":35000},{"id":"ПМ128","lvl":"подз.-2","a":22.35,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ135","lvl":"подз.-2","a":13.3,"g":"ФИКС €35K","p":35000},{"id":"ПМ136","lvl":"подз.-2","a":14.16,"g":"ФИКС €35K","p":35000},{"id":"ПМ137","lvl":"подз.-2","a":13.3,"g":"ФИКС €35K","p":35000},{"id":"ПМ138","lvl":"подз.-2","a":13.59,"g":"ФИКС €35K","p":35000},{"id":"ПМ139","lvl":"подз.-2","a":13.59,"g":"ФИКС €35K","p":40000},{"id":"ПМ140","lvl":"подз.-2","a":13.59,"g":"ФИКС €35K","p":35000},{"id":"ПМ141","lvl":"подз.-2","a":13.59,"g":"ФИКС €35K","p":35000},{"id":"ПМ142","lvl":"подз.-2","a":13.59,"g":"ФИКС €35K","p":35000},{"id":"ПМ143","lvl":"подз.-2","a":13.59,"g":"ФИКС €35K","p":35000},{"id":"ПМ144","lvl":"подз.-2","a":13.59,"g":"ФИКС €35K","p":40000},{"id":"ПМ145","lvl":"подз.-2","a":13.59,"g":"ФИКС €35K","p":35000},{"id":"ПМ146","lvl":"подз.-2","a":13.02,"g":"ФИКС €35K","p":35000},{"id":"Г1","lvl":"подз.-2","a":20.66,"g":"Гараж 20.66м²","p":null,"isGarage":true},{"id":"Г2","lvl":"подз.-2","a":20.38,"g":"Гараж 20.38м²","p":null,"isGarage":true},{"id":"Г3","lvl":"подз.-2","a":16.52,"g":"Гараж 16.52м²","p":null,"isGarage":true},{"id":"Г4","lvl":"подз.-2","a":17.42,"g":"Гараж 17.42м²","p":null,"isGarage":true},{"id":"Г5","lvl":"подз.-2","a":15.23,"g":"Гараж 15.23м²","p":null,"isGarage":true},{"id":"Г6","lvl":"подз.-2","a":16.53,"g":"Гараж 16.53м²","p":null,"isGarage":true},{"id":"Г7","lvl":"подз.-2","a":32.85,"g":"Гараж 32.85м²","p":null,"isGarage":true},{"id":"Г8","lvl":"подз.-2","a":15.28,"g":"Гараж 15.28м² + изба Б9 3.26м² · обща 18.54м²","p":null,"isGarage":true,"iz":"Б9"},{"id":"Г9","lvl":"подз.-2","a":17.7,"g":"Гараж 17.70м² + изба Б8 4.67м² · обща 22.37м²","p":null,"isGarage":true,"iz":"Б8"},{"id":"Г10","lvl":"подз.-2","a":18.03,"g":"Гараж 18.03м² + изба Б7 2.26м² · обща 20.29м²","p":null,"isGarage":true,"iz":"Б7"},{"id":"Г11","lvl":"подз.-2","a":22.35,"g":"Гараж 22.35м² + изба Б6 5.76м² · обща 28.11м²","p":null,"isGarage":true,"iz":"Б6"},{"id":"Г12","lvl":"подз.-2","a":17.63,"g":"Гараж 17.63м² + изба Б5 4.4м² · обща 22.03м²","p":null,"isGarage":true,"iz":"Б5"},{"id":"Г13","lvl":"подз.-2","a":22.18,"g":"Гараж 22.18м² + изба Б4 6.84м² · обща 29.02м²","p":null,"isGarage":true,"iz":"Б4"},{"id":"Г14","lvl":"подз.-2","a":19.94,"g":"Гараж 19.94м² + изба Б3 6.15м² · обща 26.09м²","p":null,"isGarage":true,"iz":"Б3"},{"id":"Г15","lvl":"подз.-2","a":21.24,"g":"Гараж 21.24м² + изба Б2 8.6м² · обща 29.84м²","p":null,"isGarage":true,"iz":"Б2"},{"id":"Г16","lvl":"подз.-2","a":28.68,"g":"Гараж 28.68м² + изба Б1 6.81м² · обща 35.49м²","p":null,"isGarage":true,"iz":"Б1"},{"id":"ПМ147","lvl":"подз.-1","a":16.31,"g":"ФИКС €35K","p":40000},{"id":"ПМ148","lvl":"подз.-1","a":13.75,"g":"ФИКС €35K","p":35000},{"id":"ПМ149","lvl":"подз.-1","a":14.64,"g":"ФИКС €35K","p":35000,"rez":true},{"id":"ПМ150","lvl":"подз.-1","a":16.02,"g":"ФИКС €35K","p":35000,"rez":true},{"id":"ПМ151","lvl":"подз.-1","a":14.64,"g":"ФИКС €35K","p":35000,"rez":true},{"id":"ПМ152","lvl":"подз.-1","a":14.68,"g":"ФИКС €35K","p":35000,"rez":true},{"id":"ПМ153","lvl":"подз.-1","a":14.64,"g":"ФИКС €35K","p":35000,"rez":true},{"id":"ПМ154","lvl":"подз.-1","a":14.68,"g":"ФИКС €35K","p":35000,"rez":true},{"id":"ПМ155","lvl":"подз.-1","a":14.64,"g":"ФИКС €35K","p":35000,"rez":true},{"id":"ПМ156","lvl":"подз.-1","a":13.31,"g":"ФИКС €35K","p":35000,"rez":true},{"id":"ПМ157","lvl":"подз.-1","a":16.4,"g":"ФИКС €35K","p":40000},{"id":"ПМ158","lvl":"подз.-1","a":13.35,"g":"ФИКС €35K","p":35000},{"id":"ПМ170","lvl":"подз.-1","a":18.32,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ171","lvl":"подз.-1","a":12.5,"g":"—","p":null,"rez":true},{"id":"ПМ172","lvl":"подз.-1","a":13.75,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ173","lvl":"подз.-1","a":13.75,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ174","lvl":"подз.-1","a":13.75,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ175","lvl":"подз.-1","a":13.75,"g":"—","p":null,"rez":true},{"id":"ПМ176","lvl":"подз.-1","a":13.75,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ177","lvl":"подз.-1","a":15.0,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ178","lvl":"подз.-1","a":13.75,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ179","lvl":"подз.-1","a":12.5,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ180","lvl":"подз.-1","a":15.0,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ181","lvl":"подз.-1","a":15.0,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ182","lvl":"подз.-1","a":12.5,"g":"29166.67","p":35000},{"id":"ПМ183","lvl":"подз.-1","a":13.75,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ184","lvl":"подз.-1","a":15.0,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ185","lvl":"подз.-1","a":13.75,"g":"ФИКС €35K","p":35000},{"id":"ПМ186","lvl":"подз.-1","a":13.75,"g":"ФИКС €35K","p":35000},{"id":"ПМ187","lvl":"подз.-1","a":13.75,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ188","lvl":"подз.-1","a":13.75,"g":"ФИКС €35K","p":35000},{"id":"ПМ189","lvl":"подз.-1","a":13.75,"g":"ФИКС €35K","p":35000},{"id":"ПМ190","lvl":"подз.-1","a":12.5,"g":"29166.67","p":35000},{"id":"ПМ191","lvl":"подз.-1","a":15.21,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ192","lvl":"подз.-1","a":15.0,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ193","lvl":"подз.-1","a":12.5,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ194","lvl":"подз.-1","a":15.0,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ195","lvl":"подз.-1","a":14.0,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ196","lvl":"подз.-1","a":12.88,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ197","lvl":"подз.-1","a":13.75,"g":"ФИКС €35K","p":35000},{"id":"ПМ198","lvl":"подз.-1","a":13.1,"g":"ФИКС €35K","p":35000},{"id":"ПМ199","lvl":"подз.-1","a":13.75,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ200","lvl":"подз.-1","a":15.05,"g":"ФИКС €35K","p":35000},{"id":"ПМ201","lvl":"подз.-1","a":14.95,"g":"ФИКС €35K","p":35000},{"id":"ПМ202","lvl":"подз.-1","a":13.7,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ203","lvl":"подз.-1","a":13.08,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ204","lvl":"подз.-1","a":13.7,"g":"ФИКС €35K","p":35000},{"id":"ПМ205","lvl":"подз.-1","a":12.83,"g":"ФИКС €35K","p":35000},{"id":"ПМ206","lvl":"подз.-1","a":14.03,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ207","lvl":"подз.-1","a":14.95,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ208","lvl":"подз.-1","a":12.46,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ209","lvl":"подз.-1","a":14.95,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ210","lvl":"подз.-1","a":12.46,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ211","lvl":"подз.-1","a":12.46,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ212","lvl":"подз.-1","a":13.46,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ213","lvl":"подз.-1","a":17.73,"g":"ФИКС €35K","p":40000,"sold":true,"reason":"obez"},{"id":"ПМ214","lvl":"подз.-1","a":13.0,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ215","lvl":"подз.-1","a":13.0,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ216","lvl":"подз.-1","a":15.6,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ217","lvl":"подз.-1","a":13.0,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ218","lvl":"подз.-1","a":15.6,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ219","lvl":"подз.-1","a":14.56,"g":"ФИКС €35K","p":35000},{"id":"ПМ220","lvl":"подз.-1","a":12.74,"g":"ФИКС €35K","p":35000},{"id":"ПМ221","lvl":"подз.-1","a":14.3,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ222","lvl":"подз.-1","a":14.3,"g":"ФИКС €35K","p":35000},{"id":"ПМ223","lvl":"подз.-1","a":14.3,"g":"ФИКС €35K","p":35000},{"id":"ПМ224","lvl":"подз.-1","a":15.6,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ225","lvl":"подз.-1","a":15.0,"g":"ФИКС €35K","p":35000},{"id":"ПМ226","lvl":"подз.-1","a":13.75,"g":"ФИКС €35K","p":35000},{"id":"ПМ227","lvl":"подз.-1","a":13.75,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ228","lvl":"подз.-1","a":13.75,"g":"ФИКС €35K","p":35000},{"id":"ПМ229","lvl":"подз.-1","a":12.25,"g":"ФИКС €35K","p":35000},{"id":"ПМ230","lvl":"подз.-1","a":14.0,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ231","lvl":"подз.-1","a":15.0,"g":"ФИКС €35K","p":35000},{"id":"ПМ232","lvl":"подз.-1","a":12.5,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ233","lvl":"подз.-1","a":15.0,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ234","lvl":"подз.-1","a":12.5,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ235","lvl":"подз.-1","a":12.5,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ236","lvl":"подз.-1","a":18.66,"g":"ФИКС €35K","p":40000,"sold":true,"reason":"obez"},{"id":"ПМ237","lvl":"подз.-1","a":24.03,"g":"ФИКС €35K","p":40000},{"id":"ПМ238","lvl":"подз.-1","a":18.15,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ239","lvl":"подз.-1","a":15.1,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ240","lvl":"подз.-1","a":16.99,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ241","lvl":"подз.-1","a":12.65,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ242","lvl":"подз.-1","a":26.0,"g":"ФИКС €35K","p":40000},{"id":"ПМ243","lvl":"подз.-1","a":25.38,"g":"ФИКС €35K","p":40000},{"id":"ПМ244","lvl":"подз.-1","a":17.61,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ245","lvl":"подз.-1","a":13.72,"g":"—","p":null,"rez":true},{"id":"ПМ246","lvl":"подз.-1","a":13.16,"g":"—","p":null,"rez":true},{"id":"ПМ247","lvl":"подз.-1","a":12.32,"g":"—","p":null,"rez":true},{"id":"ПМ248","lvl":"подз.-1","a":15.35,"g":"—","p":null,"rez":true},{"id":"ПМ249","lvl":"подз.-1","a":19.74,"g":"—","p":null,"rez":true},{"id":"ПМ250","lvl":"подз.-1","a":21.93,"g":"—","p":null,"rez":true},{"id":"ПМ251","lvl":"подз.-1","a":18.46,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ252","lvl":"подз.-1","a":17.75,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ253","lvl":"подз.-1","a":23.28,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ254","lvl":"подз.-1","a":14.35,"g":"—","p":null,"rez":true},{"id":"ПМ255","lvl":"подз.-1","a":15.7,"g":"—","p":null,"rez":true},{"id":"ПМ256","lvl":"подз.-1","a":22.61,"g":"ФИКС €35K","p":35000,"rez":true},{"id":"ПМ257","lvl":"подз.-1","a":16.94,"g":"—","p":null,"rez":true},{"id":"ПМ258","lvl":"подз.-1","a":17.35,"g":"—","p":null,"rez":true},{"id":"ПМ259","lvl":"подз.-1","a":20.22,"g":"—","p":null,"rez":true},{"id":"ПМ260","lvl":"подз.-1","a":16.65,"g":"—","p":null,"rez":true},{"id":"ПМ261","lvl":"подз.-1","a":12.51,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ262","lvl":"подз.-1","a":14.4,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ263","lvl":"подз.-1","a":15.5,"g":"—","p":null,"rez":true},{"id":"ПМ264","lvl":"подз.-1","a":12.55,"g":"—","p":null,"rez":true},{"id":"ПМ265","lvl":"подз.-1","a":17.78,"g":"ФИКС €35K","p":35000},{"id":"ПМ266","lvl":"подз.-1","a":12.35,"g":"29166.67","p":35000},{"id":"ПМ267","lvl":"подз.-1","a":13.06,"g":"ФИКС €35K","p":35000},{"id":"ПМ268","lvl":"подз.-1","a":13.06,"g":"ФИКС €35K","p":35000},{"id":"ПМ269","lvl":"подз.-1","a":13.06,"g":"ФИКС €35K","p":35000},{"id":"ПМ270","lvl":"подз.-1","a":14.25,"g":"ФИКС €35K","p":40000},{"id":"ПМ271","lvl":"подз.-1","a":11.87,"g":"29166.67","p":35000},{"id":"ПМ277","lvl":"подз.-1","a":14.34,"g":"ФИКС €35K","p":40000},{"id":"ПМ278","lvl":"подз.-1","a":13.3,"g":"ФИКС €35K","p":35000},{"id":"ПМ279","lvl":"подз.-1","a":14.16,"g":"ФИКС €35K","p":35000},{"id":"ПМ280","lvl":"подз.-1","a":13.3,"g":"ФИКС €35K","p":35000},{"id":"ПМ281","lvl":"подз.-1","a":13.59,"g":"ФИКС €35K","p":35000},{"id":"ПМ282","lvl":"подз.-1","a":13.59,"g":"ФИКС €35K","p":35000},{"id":"ПМ283","lvl":"подз.-1","a":13.59,"g":"ФИКС €35K","p":35000},{"id":"ПМ284","lvl":"подз.-1","a":13.59,"g":"ФИКС €35K","p":35000},{"id":"ПМ285","lvl":"подз.-1","a":13.59,"g":"ФИКС €35K","p":35000},{"id":"ПМ286","lvl":"подз.-1","a":13.59,"g":"ФИКС €35K","p":35000},{"id":"ПМ287","lvl":"подз.-1","a":13.59,"g":"ФИКС €35K","p":35000},{"id":"ПМ288","lvl":"подз.-1","a":13.59,"g":"ФИКС €35K","p":40000},{"id":"ПМ289","lvl":"подз.-1","a":13.02,"g":"ФИКС €35K","p":35000},{"id":"Г17","lvl":"подз.-1","a":20.66,"g":"Гараж 20.66м²","p":null,"isGarage":true},{"id":"Г18","lvl":"подз.-1","a":20.38,"g":"Гараж 20.38м²","p":null,"isGarage":true},{"id":"Г19","lvl":"подз.-1","a":16.52,"g":"Гараж 16.52м²","p":null,"isGarage":true},{"id":"Г20","lvl":"подз.-1","a":17.42,"g":"Гараж 17.42м²","p":null,"isGarage":true},{"id":"Г21","lvl":"подз.-1","a":15.23,"g":"Гараж 15.23м²","p":null,"isGarage":true},{"id":"Г22","lvl":"подз.-1","a":16.53,"g":"Гараж 16.53м²","p":null,"isGarage":true},{"id":"Г23","lvl":"подз.-1","a":32.97,"g":"Гараж 32.97м²","p":null,"isGarage":true},{"id":"Г24","lvl":"подз.-1","a":15.28,"g":"Гараж 15.28м² + изба Б30 3.26м² · обща 18.54м²","p":null,"isGarage":true,"iz":"Б30"},{"id":"Г25","lvl":"подз.-1","a":17.7,"g":"Гараж 17.70м² + изба Б29 4.67м² · обща 22.37м²","p":null,"isGarage":true,"iz":"Б29"},{"id":"Г26","lvl":"подз.-1","a":18.04,"g":"Гараж 18.04м² + изба Б28 2.46м² · обща 20.5м²","p":null,"isGarage":true,"iz":"Б28"},{"id":"Г27","lvl":"подз.-1","a":22.35,"g":"Гараж 22.35м² + изба Б27 5.76м² · обща 28.11м²","p":null,"isGarage":true,"iz":"Б27"},{"id":"Г28","lvl":"подз.-1","a":17.63,"g":"Гараж 17.63м² + изба Б26 4.4м² · обща 22.03м²","p":null,"isGarage":true,"iz":"Б26"},{"id":"Г29","lvl":"подз.-1","a":22.18,"g":"Гараж 22.18м² + изба Б25 7.33м² · обща 29.51м²","p":null,"isGarage":true,"iz":"Б25"},{"id":"Г30","lvl":"подз.-1","a":19.94,"g":"Гараж 19.94м² + изба Б24 6.59м² · обща 26.53м²","p":null,"isGarage":true,"iz":"Б24"},{"id":"Г31","lvl":"подз.-1","a":21.24,"g":"Гараж 21.24м² + изба Б23 9.2м² · обща 30.44м²","p":null,"isGarage":true,"iz":"Б23"},{"id":"Г32","lvl":"подз.-1","a":28.68,"g":"Гараж 28.68м² + изба Б22 7.27м² · обща 35.95м²","p":null,"isGarage":true,"iz":"Б22"}],"S":[{"id":"A96","s":"A","f":12,"ap":43,"r":3.13,"p":4695},{"id":"А71","s":"A","f":12,"ap":113,"r":3.82,"p":5730},{"id":"А79","s":"A","f":13,"ap":97,"r":3.52,"p":5280},{"id":"A102","s":"A","f":13,"ap":191,"r":4.14,"p":6210},{"id":"A99","s":"A","f":13,"ap":29,"r":3.1,"p":4650},{"id":"А76","s":"A","f":13,"ap":195,"r":4.7,"p":7050},{"id":"A105","s":"A","f":13,"ap":1,"r":2.75,"p":4125},{"id":"A101","s":"A","f":13,"ap":177,"r":2.65,"p":3975},{"id":"A106","s":"A","f":13,"ap":196,"r":6.68,"p":10020},{"id":"A107","s":"A","f":13,"ap":194,"r":4.24,"p":6360},{"id":"A104","s":"A","f":16,"ap":190,"r":3.88,"p":5820},{"id":"А74","s":"A","f":16,"ap":118,"r":3.84,"p":5760},{"id":"А75","s":"A","f":16,"ap":167,"r":4.09,"p":6135},{"id":"А49","s":"A","f":16,"ap":163,"r":3.97,"p":5955},{"id":"А77","s":"A","f":16,"ap":11,"r":2.91,"p":4365},{"id":"А73","s":"A","f":16,"ap":137,"r":3.88,"p":5820},{"id":"А78","s":"A","f":16,"ap":95,"r":3.52,"p":5280},{"id":"A97","s":"A","f":16,"ap":41,"r":3.13,"p":4695},{"id":"А81","s":"A","f":18,"ap":10,"r":2.83,"p":4245},{"id":"А65","s":"A","f":18,"ap":16,"r":2.99,"p":4485},{"id":"А66","s":"A","f":18,"ap":197,"r":4.58,"p":6870},{"id":"А40","s":"A","f":18,"ap":82,"r":3.17,"p":4755},{"id":"А44","s":"A","f":18,"ap":149,"r":3.93,"p":5895},{"id":"А70","s":"A","f":18,"ap":34,"r":3.12,"p":4680},{"id":"А72","s":"A","f":19,"ap":109,"r":3.58,"p":5370},{"id":"А47","s":"A","f":19,"ap":124,"r":3.85,"p":5775},{"id":"А48","s":"A","f":19,"ap":192,"r":4.96,"p":7440},{"id":"А22","s":"A","f":19,"ap":178,"r":4.24,"p":6360},{"id":"А50","s":"A","f":19,"ap":7,"r":2.83,"p":4245},{"id":"А26","s":"A","f":19,"ap":146,"r":3.89,"p":5835},{"id":"А46","s":"A","f":19,"ap":122,"r":3.85,"p":5775},{"id":"А51","s":"A","f":19,"ap":110,"r":3.59,"p":5385},{"id":"А52","s":"A","f":19,"ap":92,"r":3.38,"p":5070},{"id":"А39","s":"A","f":21,"ap":115,"r":3.84,"p":5760},{"id":"А13","s":"A","f":21,"ap":14,"r":2.94,"p":4410},{"id":"А41","s":"A","f":21,"ap":88,"r":3.26,"p":4890},{"id":"А17","s":"A","f":21,"ap":169,"r":4.14,"p":6210},{"id":"А42","s":"A","f":21,"ap":83,"r":3.22,"p":4830},{"id":"А43","s":"A","f":21,"ap":179,"r":2.69,"p":4035},{"id":"А45","s":"A","f":22,"ap":119,"r":3.85,"p":5775},{"id":"А20","s":"A","f":22,"ap":180,"r":2.75,"p":4125},{"id":"А21","s":"A","f":22,"ap":193,"r":6.68,"p":10020},{"id":"А8","s":"A","f":22,"ap":5,"r":2.79,"p":4185},{"id":"А19","s":"A","f":22,"ap":136,"r":3.88,"p":5820},{"id":"А24","s":"A","f":22,"ap":176,"r":4.23,"p":6345},{"id":"А25","s":"A","f":22,"ap":173,"r":4.23,"p":6345},{"id":"А11","s":"A","f":24,"ap":38,"r":3.13,"p":4695},{"id":"А14","s":"A","f":24,"ap":28,"r":3.1,"p":4650},{"id":"А10","s":"A","f":24,"ap":32,"r":3.12,"p":4680},{"id":"А12","s":"A","f":24,"ap":37,"r":3.13,"p":4695},{"id":"А16","s":"A","f":24,"ap":175,"r":2.65,"p":3975},{"id":"А18","s":"A","f":12,"ap":164,"r":4.09,"p":6135},{"id":"А15","s":"A","f":12,"ap":91,"r":3.33,"p":4995},{"id":"А9","s":"A","f":25,"ap":171,"r":2.63,"p":3945},{"id":"А23","s":"A","f":25,"ap":151,"r":3.95,"p":5925},{"id":"Б15","s":"B","f":9,"ap":46,"r":4.27,"p":6405},{"id":"Б42","s":"B","f":10,"ap":50,"r":3.46,"p":5190},{"id":"Б36","s":"B","f":10,"ap":51,"r":4.3,"p":6450},{"id":"Б39","s":"B","f":10,"ap":55,"r":4.23,"p":6345},{"id":"Б14","s":"B","f":10,"ap":56,"r":8.14,"p":12210},{"id":"Б31","s":"B","f":12,"ap":65,"r":7.28,"p":10920},{"id":"Б32","s":"B","f":12,"ap":66,"r":3.43,"p":5145},{"id":"Б21","s":"B","f":12,"ap":70,"r":3.01,"p":4515},{"id":"Б16","s":"B","f":13,"ap":71,"r":3.77,"p":5655},{"id":"Б18","s":"B","f":13,"ap":73,"r":4.24,"p":6360},{"id":"Б12","s":"B","f":13,"ap":75,"r":3.01,"p":4515},{"id":"Б37","s":"B","f":13,"ap":76,"r":3.8,"p":5700},{"id":"Б10","s":"B","f":15,"ap":86,"r":7.3,"p":10950},{"id":"Б11","s":"B","f":15,"ap":87,"r":3.25,"p":4875},{"id":"Б19","s":"B","f":15,"ap":89,"r":4.12,"p":6180},{"id":"Б40","s":"B","f":15,"ap":90,"r":4.11,"p":6165},{"id":"Б41","s":"B","f":15,"ap":91,"r":3.8,"p":5700},{"id":"Б13","s":"B","f":16,"ap":93,"r":3.42,"p":5130},{"id":"Б20","s":"B","f":16,"ap":94,"r":3.55,"p":5325},{"id":"Б33","s":"B","f":16,"ap":96,"r":3.03,"p":4545},{"id":"Б34","s":"B","f":16,"ap":97,"r":3.44,"p":5160},{"id":"А6 + А7","s":"А","f":25,"ap":199,"r":20.4948,"p":30742,"pmDoor":"ПМ111 + ПМ112"},{"id":"A86 + A87","s":"А","f":25,"ap":200,"r":19.9346,"p":29902,"pmDoor":"ПМ249 + ПМ250"},{"id":"A91 + А92","s":"А","f":25,"ap":203,"r":20.4948,"p":30742,"pmDoor":"ПМ257 + ПМ258"}]};

// ═══════════════════════════════════════════════════════════════════
// V5.1 PRICING ENGINE
// ═══════════════════════════════════════════════════════════════════
// Master file price overrides — authoritative цени от Master
const PRICE_OVERRIDES = {
  "A-3-1": {p:310278.75,e:2247.91},
  "A-3-2": {p:223433.44,e:2132.81},
  "A-3-3": {p:205593.15,e:2274.51},
  "A-3-4": {p:205566.11,e:2276.23},
  "A-3-5": {p:272023,e:1869.06},
  "A-3-6": {p:197130.41,e:2253.69},
  "A-3-7": {p:305626.75,e:1897.01},
  "A-3-8": {p:185265.15,e:2138.83},
  "A-3-9": {p:179637.94,e:2117.62},
  "A-4-10": {p:322909.12,e:2497.75},
  "A-4-11": {p:311744.18,e:2497.75},
  "A-4-12": {p:218054.73,e:2784.86},
  "A-4-13": {p:218333.22,e:2784.86},
  "A-4-14": {p:298775.96,e:2652.25},
  "A-4-15": {p:213348.32,e:2784.86},
  "A-4-16": {p:337498.81,e:2652.25},
  "A-4-17": {p:199897.43,e:2622.64},
  "A-4-18": {p:194127.63,e:2622.64},
  "A-5-19": {p:332314.24,e:2570.5},
  "A-5-20": {p:320824.1,e:2570.5},
  "A-5-21": {p:224405.84,e:2865.97},
  "A-5-22": {p:224692.44,e:2865.97},
  "A-5-23": {p:307478.17,e:2729.5},
  "A-5-24": {p:219562.34,e:2865.97},
  "A-5-25": {p:347328.88,e:2729.5},
  "A-5-26": {p:205719.69,e:2699.03},
  "A-5-27": {p:199781.83,e:2699.03},
  "A-6-28": {p:341719.36,e:2643.25},
  "A-6-29": {p:329904.03,e:2643.25},
  "A-6-30": {p:230756.95,e:2947.09},
  "A-6-31": {p:231051.66,e:2947.09},
  "A-6-32": {p:316180.39,e:2806.75},
  "A-6-33": {p:225776.37,e:2947.09},
  "A-6-34": {p:357158.94,e:2806.75},
  "A-6-35": {p:211541.94,e:2775.41},
  "A-6-36": {p:205436.03,e:2775.41},
  "A-7-37": {p:351124.48,e:2716},
  "A-7-38": {p:338983.96,e:2716},
  "A-7-39": {p:237108.06,e:3028.2},
  "A-7-40": {p:237410.88,e:3028.2},
  "A-7-41": {p:324882.6,e:2884},
  "A-7-42": {p:231990.4,e:3028.2},
  "A-7-43": {p:366989,e:2884},
  "A-7-44": {p:217364.2,e:2851.8},
  "A-7-45": {p:211090.24,e:2851.8},
  "A-8-46": {p:360529.6,e:2788.75},
  "A-8-47": {p:348063.89,e:2788.75},
  "A-8-48": {p:243459.17,e:3109.31},
  "A-8-49": {p:243770.1,e:3109.31},
  "A-8-50": {p:333584.81,e:2961.25},
  "A-8-51": {p:238204.43,e:3109.31},
  "A-8-52": {p:376819.06,e:2961.25},
  "A-8-53": {p:223186.45,e:2928.19},
  "A-8-54": {p:216744.44,e:2928.19},
  "A-9-55": {p:369934.72,e:2861.5},
  "A-9-56": {p:357143.82,e:2861.5},
  "A-9-57": {p:249810.28,e:3190.43},
  "A-9-58": {p:250129.32,e:3190.43},
  "A-9-59": {p:342287.03,e:3038.5},
  "A-9-60": {p:244418.46,e:3190.43},
  "A-9-61": {p:386649.12,e:3038.5},
  "A-9-62": {p:229008.71,e:3004.57},
  "A-9-63": {p:222398.64,e:3004.57},
  "A-10-64": {p:379339.84,e:2934.25},
  "A-10-65": {p:366223.74,e:2934.25},
  "A-10-66": {p:256161.39,e:3271.54},
  "A-10-67": {p:256488.54,e:3271.54},
  "A-10-68": {p:350989.24,e:3115.75},
  "A-10-69": {p:250632.49,e:3271.54},
  "A-10-70": {p:396479.19,e:3115.75},
  "A-10-71": {p:234830.96,e:3080.96},
  "A-10-72": {p:228052.84,e:3080.96},
  "A-11-73": {p:388744.96,e:3007},
  "A-11-74": {p:375303.67,e:3007},
  "A-11-75": {p:262512.49,e:3352.65},
  "A-11-76": {p:262847.76,e:3352.65},
  "A-11-77": {p:359691.45,e:3193},
  "A-11-78": {p:256846.52,e:3352.65},
  "A-11-79": {p:406309.25,e:3193},
  "A-11-80": {p:240653.22,e:3157.35},
  "A-11-81": {p:233707.05,e:3157.35},
  "A-12-82": {p:398150.08,e:3079.75},
  "A-12-83": {p:384383.6,e:3079.75},
  "A-12-84": {p:268863.6,e:3433.76},
  "A-12-85": {p:269206.98,e:3433.76},
  "A-12-86": {p:368393.66,e:3270.25},
  "A-12-87": {p:263060.55,e:3433.76},
  "A-12-88": {p:416139.31,e:3270.25},
  "A-12-89": {p:246475.47,e:3233.74},
  "A-12-90": {p:239361.25,e:3233.74},
  "A-13-91": {p:407555.2,e:3152.5},
  "A-13-92": {p:393463.53,e:3152.5},
  "A-13-93": {p:275214.71,e:3514.88},
  "A-13-94": {p:275566.2,e:3514.88},
  "A-13-95": {p:377095.88,e:3347.5},
  "A-13-96": {p:269274.57,e:3514.88},
  "A-13-97": {p:425969.38,e:3347.5},
  "A-13-98": {p:252297.73,e:3310.12},
  "A-13-99": {p:245015.45,e:3310.12},
  "A-14-100": {p:416960.32,e:3225.25},
  "A-14-101": {p:402543.45,e:3225.25},
  "A-14-102": {p:281565.82,e:3595.99},
  "A-14-103": {p:281925.42,e:3595.99},
  "A-14-104": {p:385798.09,e:3424.75},
  "A-14-105": {p:275488.6,e:3595.99},
  "A-14-106": {p:435799.44,e:3424.75},
  "A-14-107": {p:258119.98,e:3386.51},
  "A-14-108": {p:250669.66,e:3386.51},
  "A-15-109": {p:426365.44,e:3298},
  "A-15-110": {p:411623.38,e:3298},
  "A-15-111": {p:287916.93,e:3677.1},
  "A-15-112": {p:288284.64,e:3677.1},
  "A-15-113": {p:394500.3,e:3502},
  "A-15-114": {p:281702.63,e:3677.1},
  "A-15-115": {p:445629.5,e:3502},
  "A-15-116": {p:263942.24,e:3462.9},
  "A-15-117": {p:256323.86,e:3462.9},
  "A-16-118": {p:435770.56,e:3370.75},
  "A-16-119": {p:420703.31,e:3370.75},
  "A-16-120": {p:294268.04,e:3758.21},
  "A-16-121": {p:294643.86,e:3758.21},
  "A-16-122": {p:403202.51,e:3579.25},
  "A-16-123": {p:287916.66,e:3758.21},
  "A-16-124": {p:455459.56,e:3579.25},
  "A-16-125": {p:269764.49,e:3539.29},
  "A-16-126": {p:261978.06,e:3539.29},
  "A-17-127": {p:445175.68,e:3443.5},
  "A-17-128": {p:429783.23,e:3443.5},
  "A-17-129": {p:300619.15,e:3839.32},
  "A-17-130": {p:301003.08,e:3839.32},
  "A-17-131": {p:411904.72,e:3656.5},
  "A-17-132": {p:294130.69,e:3839.32},
  "A-17-133": {p:465289.62,e:3656.5},
  "A-17-134": {p:275586.75,e:3615.68},
  "A-17-135": {p:267632.26,e:3615.68},
  "A-18-136": {p:463985.92,e:3589},
  "A-18-137": {p:447943.09,e:3589},
  "A-18-138": {p:313321.36,e:4001.55},
  "A-18-139": {p:313721.52,e:4001.55},
  "A-18-140": {p:429309.15,e:3811},
  "A-18-141": {p:306558.75,e:4001.55},
  "A-18-142": {p:484949.75,e:3811},
  "A-18-143": {p:287231.26,e:3768.45},
  "A-18-144": {p:278940.67,e:3768.45},
  "A-19-145": {p:482796.16,e:3734.5},
  "A-19-146": {p:466102.95,e:3734.5},
  "A-19-147": {p:326023.58,e:4163.77},
  "A-19-148": {p:326439.96,e:4163.77},
  "A-19-149": {p:446713.58,e:3965.5},
  "A-19-150": {p:318986.8,e:4163.77},
  "A-19-151": {p:504609.88,e:3965.5},
  "A-19-152": {p:298875.77,e:3921.22},
  "A-19-153": {p:290249.07,e:3921.22},
  "A-20-154": {p:501606.4,e:3880},
  "A-20-155": {p:484262.8,e:3880},
  "A-20-156": {p:338725.8,e:4326},
  "A-20-157": {p:339158.4,e:4326},
  "A-20-158": {p:464118,e:4120},
  "A-20-159": {p:331414.86,e:4326},
  "A-20-160": {p:524270,e:4120},
  "A-20-161": {p:310520.28,e:4074},
  "A-20-162": {p:301557.48,e:4074},
  "A-21-163": {p:520416.64,e:4025.5},
  "A-21-164": {p:502422.66,e:4025.5},
  "A-21-165": {p:351428.02,e:4488.23},
  "A-21-166": {p:351876.84,e:4488.23},
  "A-21-167": {p:481522.42,e:4274.5},
  "A-21-168": {p:343842.92,e:4488.23},
  "A-21-169": {p:543930.12,e:4274.5},
  "A-21-170": {p:322164.79,e:4226.77},
  "A-21-171": {p:312865.89,e:4226.77},
  "A-22-172": {p:539226.88,e:4171},
  "A-22-173": {p:520582.51,e:4171},
  "A-22-174": {p:364130.23,e:4650.45},
  "A-22-175": {p:364595.28,e:4650.45},
  "A-22-176": {p:498926.85,e:4429},
  "A-22-177": {p:356270.97,e:4650.45},
  "A-22-178": {p:563590.25,e:4429},
  "A-22-179": {p:333809.3,e:4379.55},
  "A-22-180": {p:324174.29,e:4379.55},
  "A-23-181": {p:558037.12,e:4316.5},
  "A-23-182": {p:538742.36,e:4316.5},
  "A-23-183": {p:376832.45,e:4812.68},
  "A-23-184": {p:377313.72,e:4812.68},
  "A-23-185": {p:516331.28,e:4583.5},
  "A-23-186": {p:368699.03,e:4812.68},
  "A-23-187": {p:583250.38,e:4583.5},
  "A-23-188": {p:345453.81,e:4532.32},
  "A-23-189": {p:335482.7,e:4532.32},
  "A-24-190": {p:576847.36,e:4462},
  "A-24-191": {p:556902.22,e:4462},
  "A-24-192": {p:389534.67,e:4974.9},
  "A-24-193": {p:390032.16,e:4974.9},
  "A-24-194": {p:533735.7,e:4738},
  "A-24-195": {p:381127.09,e:4974.9},
  "A-24-196": {p:602910.5,e:4738},
  "A-24-197": {p:357098.32,e:4685.1},
  "A-24-198": {p:346791.1,e:4685.1},
  "A-25-199": {p:804175,e:4750},
  "A-25-200": {p:592847.5,e:4750},
  "A-25-201": {p:402236.89,e:5137.12},
  "A-25-202": {p:402750.6,e:5137.12},
  "A-25-203": {p:746130,e:4750},
  "A-25-204": {p:759430,e:4750},
  "A-25-205": {p:533762.75,e:4837.88},
  "B-3-1": {p:156136.05,e:2546.25},
  "B-3-2": {p:127391.25,e:2625},
  "B-3-3": {p:173742.98,e:2703.75},
  "B-3-4": {p:249300,e:2500},
  "B-3-5": {p:234700,e:2500},
  "B-3-6": {p:172915.84,e:2546.25},
  "B-3-7": {p:159726.26,e:2546.25},
  "B-4-8": {p:160820.13,e:2622.64},
  "B-4-9": {p:187087.06,e:2784.86},
  "B-4-10": {p:178955.26,e:2784.86},
  "B-4-11": {p:256779,e:2575},
  "B-4-12": {p:241741,e:2575},
  "B-4-13": {p:178103.31,e:2622.64},
  "B-4-14": {p:164518.05,e:2622.64},
  "B-5-15": {p:165504.21,e:2699.03},
  "B-5-16": {p:192536.2,e:2865.97},
  "B-5-17": {p:184167.55,e:2865.97},
  "B-5-18": {p:264258.0,e:2650.0},
  "B-5-19": {p:248782.0,e:2650.0},
  "B-5-20": {p:183290.79,e:2699.03},
  "B-5-21": {p:169309.84,e:2699.03},
  "B-6-22": {p:170188.29,e:2775.41},
  "B-6-23": {p:197985.34,e:2947.09},
  "B-6-24": {p:189379.84,e:2947.09},
  "B-6-25": {p:271737,e:2725},
  "B-6-26": {p:255823,e:2725},
  "B-6-27": {p:188478.26,e:2775.41},
  "B-6-28": {p:174101.63,e:2775.41},
  "B-7-29": {p:174872.38,e:2851.8},
  "B-7-30": {p:203434.48,e:3028.2},
  "B-7-31": {p:194592.13,e:3028.2},
  "B-7-32": {p:279216,e:2800},
  "B-7-33": {p:262864,e:2800},
  "B-7-34": {p:193665.74,e:2851.8},
  "B-7-35": {p:178893.41,e:2851.8},
  "B-8-36": {p:179556.46,e:2928.19},
  "B-8-37": {p:208883.61,e:3109.31},
  "B-8-38": {p:199804.42,e:3109.31},
  "B-8-39": {p:286695.0,e:2875.0},
  "B-8-40": {p:269905.0,e:2875.0},
  "B-8-41": {p:198853.21,e:2928.19},
  "B-8-42": {p:183685.2,e:2928.19},
  "B-9-43": {p:184240.54,e:3004.57},
  "B-9-44": {p:214332.75,e:3190.43},
  "B-9-45": {p:205016.71,e:3190.43},
  "B-9-46": {p:294174,e:2950},
  "B-9-47": {p:276946,e:2950},
  "B-9-48": {p:204040.69,e:3004.57},
  "B-9-49": {p:188476.99,e:3004.57},
  "B-10-50": {p:188924.62,e:3080.96},
  "B-10-51": {p:219781.89,e:3271.54},
  "B-10-52": {p:210229.0,e:3271.54},
  "B-10-53": {p:301653,e:3025},
  "B-10-54": {p:283987,e:3025},
  "B-10-55": {p:209228.16,e:3080.96},
  "B-10-56": {p:193268.78,e:3080.96},
  "B-11-57": {p:193608.7,e:3157.35},
  "B-11-58": {p:225231.03,e:3352.65},
  "B-11-59": {p:215441.29,e:3352.65},
  "B-11-60": {p:309132.0,e:3100.0},
  "B-11-61": {p:291028.0,e:3100.0},
  "B-11-62": {p:214415.64,e:3157.35},
  "B-11-63": {p:198060.57,e:3157.35},
  "B-12-64": {p:198292.78,e:3233.74},
  "B-12-65": {p:230680.16,e:3433.76},
  "B-12-66": {p:220653.58,e:3433.76},
  "B-12-67": {p:316611,e:3175},
  "B-12-68": {p:298069,e:3175},
  "B-12-69": {p:219603.11,e:3233.74},
  "B-12-70": {p:202852.35,e:3233.74},
  "B-13-71": {p:202976.86,e:3310.12},
  "B-13-72": {p:236129.3,e:3514.88},
  "B-13-73": {p:225865.87,e:3514.88},
  "B-13-74": {p:324090,e:3250},
  "B-13-75": {p:305110,e:3250},
  "B-13-76": {p:224790.59,e:3310.12},
  "B-13-77": {p:207644.14,e:3310.12},
  "B-14-78": {p:207660.95,e:3386.51},
  "B-14-79": {p:241578.44,e:3595.99},
  "B-14-80": {p:231078.16,e:3595.99},
  "B-14-81": {p:331569.0,e:3325.0},
  "B-14-82": {p:312151.0,e:3325.0},
  "B-14-83": {p:229978.06,e:3386.51},
  "B-14-84": {p:212435.93,e:3386.51},
  "B-15-85": {p:212345.03,e:3462.9},
  "B-15-86": {p:247027.58,e:3677.1},
  "B-15-87": {p:236290.45,e:3677.1},
  "B-15-88": {p:339048,e:3400},
  "B-15-89": {p:319192,e:3400},
  "B-15-90": {p:235165.54,e:3462.9},
  "B-15-91": {p:217227.72,e:3462.9},
  "B-16-92": {p:221713.19,e:3615.68},
  "B-16-93": {p:257925.85,e:3839.32},
  "B-16-94": {p:610635.5,e:3550},
  "B-16-95": {p:333274,e:3550},
  "B-16-96": {p:245540.49,e:3615.68},
  "B-16-97": {p:226811.29,e:3615.68}
};

const TYPE_MULT = { "2-стаен": 1.05, "3-стаен": 1.00, "Студио": 1.05, "4-стаен": 1.00 };
const EXP_ADJ_A = {
  "2-стаен": { "Изток": 0.03, "Юг": 0.03, "Запад": -0.03, "Изток/Север": -0.03 },
  "3-стаен": { "Изток/Юг": 0.03, "Юг/Запад": 0.03, "Запад/Север": -0.03, "Изток/Север": -0.03 },
};
const EXP_ADJ_B = {
  "2-стаен": { "Изток": 0.03, "Запад": -0.03, "Запад/Север": -0.03, "Изток/Север": -0.03 },
};

const baseByFloor = (sec, floor) => {
  if (sec === "A") return floor <= 17 ? 2500 + 75 * (floor - 3) : 3550 + 150 * (floor - 17);
  return floor <= 15 ? 2500 + 75 * (floor - 3) : 3550;
};
const expAdj = (sec, type, exp) => {
  const map = sec === "A" ? EXP_ADJ_A : EXP_ADJ_B;
  return (map[type] && map[type][exp]) || 0;
};
const calcAptPrice = (apt) => {
  const base = baseByFloor(apt.s, apt.f);
  const tm = TYPE_MULT[apt.t] || 1.00;
  const adj = expAdj(apt.s, apt.t, apt.e);
  const eurM2Raw = base * tm * (1 + adj);
  const hasT3 = apt.s === "A" && apt.f === 3 && apt.tr > 0;
  
  // Master price override — точни цени от Master файла
  const overrideKey = `${apt.s}-${apt.f}-${apt.n}`;
  const ovr = PRICE_OVERRIDES[overrideKey];
  
  if (ovr) {
    // Master authoritative цени — директно с ДДС включен
    return { 
      base, 
      eurM2: ovr.e,         // €/м² от Master (с включена тераса корекция)
      price: ovr.p,         // ЦЕНА С ДДС (директно от Master Col 13)
      hasTerraceDiscount: hasT3, 
      fromMaster: true 
    };
  }
  
  // Fallback (legacy formula) — добавя ДДС за consistency с Master
  const eurM2 = hasT3
    ? (apt.r * eurM2Raw + apt.tr * eurM2Raw * 0.30) / (apt.r + apt.tr)
    : eurM2Raw;
  return { base, eurM2, price: eurM2 * apt.r * 1.20, hasTerraceDiscount: hasT3, fromMaster: false };
};

// ═══════════════════════════════════════════════════════════════════
// HELPERS — секция-кирилица, дата, плоча по етаж
// ═══════════════════════════════════════════════════════════════════
// Секция-визуализация: JSON data e с латинско A/B → UI го показва на кирилица
const secL = (s) => (s === "A" ? "А" : "Б");

const MONTHS_BG = ["яну", "фев", "мар", "апр", "май", "юни", "юли", "авг", "сеп", "окт", "ное", "дек"];
const fmtDate = (yyyymm) => {
  const [y, m] = yyyymm.split("-").map(Number);
  return MONTHS_BG[m - 1] + " " + y;
};

// Месец на плочата за даден етаж: Кота нула = фев 2027 → 2 плочи/месец
// Ет.3 → яну 2027 (първа плоча), Ет.25 Сек.А → фев 2028
const plochaMonth = (floor) => {
  const monthsAfterKota0 = Math.ceil(floor / 2);
  const epoch = 2027 * 12 + 1 + monthsAfterKota0; // фев 2027 = кота нула, 2 плочи/месец
  const y = Math.floor(epoch / 12);
  const m = epoch % 12; // 0-indexed
  return y + "-" + String(m + 1).padStart(2, "0");
};

// ═══════════════════════════════════════════════════════════════════
// PAYMENT — Резервационна такса + 2 схеми на плащане
// ═══════════════════════════════════════════════════════════════════
const RESERVATION_FEE = 5000; // €, възстановима при предварителен договор

// Стъпките не зависят от апартамента, ОСВЕН "Кота етаж" чиято дата се изчислява.
// Връщаме функция, която взима floor и връща масив със стъпки.
const getScheme = (schemeId, floor, L) => {
  const pM = plochaMonth(floor);
  if (schemeId === "aggressive") {
    return {
      id: "aggressive",
      label: L.aggressiveName,
      subtitle: "50 / 20 / 20 / 10",
      discountPct: 3,
      steps: [
        { label: L.preliminary, pct: 50, when: "2026-08",
          note: L.preliminaryNote, deductReservation: true },
        { label: L.kota0, pct: 20, when: "2027-02", note: L.kota0Note },
        { label: L.kotaFloor, pct: 20, when: pM,
          note: L.plochaOnFloor + floor + L.sectionCalculated },
        { label: L.akt15, pct: 10, when: "2029-08", note: L.akt15Note },
      ],
    };
  }
  if (schemeId === "deferred") {
    return {
      id: "deferred",
      label: L.deferredName || "Промоция 30/70",
      subtitle: "30 / 70 · ПРОМО",
      discountPct: 0,
      isPromo: true,
      steps: [
        { label: L.preliminary, pct: 30, when: "2026-08",
          note: L.preliminaryNote, deductReservation: true },
        { label: L.akt15, pct: 70, when: "2029-08", note: L.akt15Note },
      ],
    };
  }
  // default: standard
  return {
    id: "standard",
    label: L.standardName,
    subtitle: "30 / 10 / 10 / 20 / 20 / 10",
    discountPct: 0,
    steps: [
      { label: L.preliminary, pct: 30, when: "2026-08",
        note: L.preliminaryNote, deductReservation: true },
      { label: L.kota0, pct: 10, when: "2027-02", note: L.kota0Note },
      { label: L.kotaFloor, pct: 10, when: pM,
        note: L.plochaOnFloor + floor },
      { label: L.akt14, pct: 20, when: "2028-08", note: L.akt14Note },
      { label: L.akt15, pct: 20, when: "2029-08", note: L.akt15Note },
      { label: L.akt16, pct: 10, when: "2029-12", note: L.akt16Note },
    ],
  };
};

// ═══════════════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════════════
const fmt = (n) => Math.round(n).toLocaleString("bg-BG") + " €";
const fmtN = (n) => Math.round(n).toLocaleString("bg-BG");

// ═══════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════
export default function App() {
  const [mob, setMob] = useState(false);
  const [lang, setLang] = useState("bg"); // bg | en | ru
  const L = T[lang]; // shortcut: L.inventory, L.payment, etc.
  const [tab, setTab] = useState("browse"); // browse | payment | compare
  const [showOffer, setShowOffer] = useState(false); // PDF export overlay
  const [sec, setSec] = useState("A");
  const [flMin, setFlMin] = useState(3);
  const [flMax, setFlMax] = useState(25);
  const [typeFilter, setTypeFilter] = useState("all");
  const [expFilter, setExpFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [chosenParking, setChosenParking] = useState(null); // parking choice
  const [showParkingPicker, setShowParkingPicker] = useState(false);
  const [scenarios, setScenarios] = useState([]); // compare list
  const [brokerEmail, setBrokerEmail] = useState("broker@newtower.bg");
  const [paymentScheme, setPaymentScheme] = useState("standard"); // standard | aggressive
  const [planError, setPlanError] = useState(false); // track floor plan image load state

  // Refs за auto-scroll на mobile при избор
  const detailsRef = useRef(null);

  useEffect(() => {
    const ck = () => setMob(window.innerWidth < 900);
    ck();
    window.addEventListener("resize", ck);
    return () => window.removeEventListener("resize", ck);
  }, []);

  useEffect(() => {
    const maxF = sec === "A" ? 25 : 16;
    if (flMax > maxF) setFlMax(maxF);
  }, [sec]);

  // EDIT C: При смяна на апартамент — нулирай паркинг + планов error + scroll на mobile
  useEffect(() => {
    setChosenParking(null);
    setShowParkingPicker(false);
    setPlanError(false);
    // EDIT B: scroll-to-details на mobile
    if (selected && detailsRef.current) {
      // малък таймаут за да се rendernat елементите първо
      setTimeout(() => {
        detailsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [selected]);

  // Filtered apartments
  const apts = useMemo(() => {
    const raw = sec === "A" ? INV.A : INV.B;
    return raw
      .filter((a) => a.f >= flMin && a.f <= flMax)
      .filter((a) => typeFilter === "all" || a.t === typeFilter)
      .filter((a) => expFilter === "all" || a.e === expFilter)
      .map((a) => ({ ...a, calc: calcAptPrice(a) }))
      .sort((a, b) => a.f - b.f || a.n - b.n);
  }, [sec, flMin, flMax, typeFilter, expFilter]);

  const typesAvail = useMemo(() => {
    const raw = sec === "A" ? INV.A : INV.B;
    return ["all", ...Array.from(new Set(raw.map((a) => a.t)))];
  }, [sec]);
  const expsAvail = useMemo(() => {
    const raw = sec === "A" ? INV.A : INV.B;
    return ["all", ...Array.from(new Set(raw.map((a) => a.e))).sort()];
  }, [sec]);

  const maxFl = sec === "A" ? 25 : 16;
  const totalInSec = sec === "A" ? INV.A.length : INV.B.length;
  const sel = selected ? { ...selected, calc: calcAptPrice(selected) } : null;

  // EDIT C: Авто-изба е единственият източник — без ръчен picker
  const activeIzba = sel && sel.iz ? INV.S.find((s) => s.id === sel.iz) : null;

  // Active parking
  const activeParking = chosenParking;

  // Total for selected apt + izba + parking (БЕЗ отстъпки)
  const totalPackage = useMemo(() => {
    if (!sel) return 0;
    let sum = sel.calc.price;
    if (activeIzba) sum += activeIzba.p;
    if (activeParking && activeParking.p) sum += activeParking.p;
    return sum;
  }, [sel, activeIzba, activeParking]);

  // EDIT F: Активна схема + total след отстъпка
  const scheme = useMemo(
    () => sel ? getScheme(paymentScheme, sel.f, L) : null,
    [paymentScheme, sel]
  );
  const totalAfterDiscount = useMemo(() => {
    if (!scheme) return totalPackage;
    return totalPackage * (1 - scheme.discountPct / 100);
  }, [totalPackage, scheme]);
  const discountSaving = totalPackage - totalAfterDiscount;

  // EDIT F: Изчислен график — всяка стъпка с eur сума, адаптирано за резервация и отстъпка
  const paymentSteps = useMemo(() => {
    if (!scheme) return [];
    return scheme.steps.map((s, i) => {
      let amt = totalAfterDiscount * (s.pct / 100);
      // Първата стъпка (Предварителен договор) се appropriate-ва с -5000 (резервация)
      if (s.deductReservation) amt -= RESERVATION_FEE;
      return { ...s, amt, idx: i };
    });
  }, [scheme, totalAfterDiscount]);

  // ═══════════════ PDF EXPORT ═══════════════
  const exportOfferPDF = () => {
    if (!sel) return;
    setShowOffer(true);
  };

  // Add to compare
  const addToCompare = () => {
    if (!sel || scenarios.length >= 3) return;
    const scen = {
      apt: sel,
      izba: activeIzba,
      parking: activeParking,
      total: totalPackage,
      scheme: scheme, // EDIT F: запазваме активната схема
      ts: Date.now(),
    };
    setScenarios([...scenarios, scen]);
  };

  // Email mailto link


  // Styles
  const mono = { fontFamily: "'Space Mono', monospace" };
  const card = {
    background: C.navyL, borderRadius: 14,
    padding: mob ? 14 : 18, border: "1px solid rgba(255,255,255,0.08)", marginBottom: 14,
  };

  const btn = (active) => ({
    padding: mob ? "10px 14px" : "11px 22px",
    borderRadius: 10, border: "none", cursor: "pointer", flex: mob ? 1 : "none",
    background: active ? C.gold : "transparent",
    color: active ? C.navy : C.gr,
    fontWeight: active ? 800 : 600, fontSize: mob ? 11 : 13,
    fontFamily: "'Montserrat', sans-serif",
    letterSpacing: 0.5,
  });

  // ═══════════════ RENDER ═══════════════
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg," + C.navy + "," + C.navyD + ")",
      color: C.wh, fontFamily: "'Montserrat', sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: 1250, margin: "0 auto", padding: mob ? "14px 10px" : "24px 20px" }}>

        {/* HEADER */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <img src={NT_LOGO} alt="NEW TOWER" style={{ height: mob ? 34 : 46, width: "auto" }} />
          <div>
            <div style={{ fontSize: 9, color: C.grD, letterSpacing: 2, textTransform: "uppercase" }}>
              V10.1 · Промоция 30/70 · Sky High Standards
            </div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
            {/* Lang switcher */}
            <div style={{
              display: "flex", background: C.navyL, borderRadius: 8, padding: 3, gap: 1,
            }}>
              {["bg","en","ru"].map(lc => (
                <button key={lc} onClick={() => setLang(lc)} style={{
                  padding: "5px 9px", fontSize: 10, fontWeight: 800, letterSpacing: 1,
                  background: lang === lc ? C.gold : "transparent",
                  color: lang === lc ? C.navy : C.gr,
                  border: "none", borderRadius: 6, cursor: "pointer",
                  textTransform: "uppercase", fontFamily: "'Montserrat', sans-serif",
                }}>{lc}</button>
              ))}
            </div>
            <div style={{ fontSize: 10, color: C.gr, textAlign: "right" }}>
              {!mob && <div>{L.subtitle}</div>}
              <div style={{ color: C.ok, fontWeight: 700 }}>{L.expoTag}</div>
            </div>
          </div>
        </div>

        {/* PROMO BANNER — брояч 30/70 */}
        {(() => {
          const rezCount = [...INV.A, ...INV.B].filter(a => a.rez).length;
          const promoLeft = Math.max(0, 50 - rezCount);
          return (
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              background: "linear-gradient(90deg," + C.gold + "22," + C.navyL + ")",
              border: "1px solid " + C.gold + "66", borderRadius: 12,
              padding: mob ? "10px 14px" : "12px 20px", marginTop: 12, marginBottom: 2,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: mob ? 20 : 24 }}>🔥</span>
                <div>
                  <div style={{ fontWeight: 800, fontSize: mob ? 12 : 15, color: C.gold, letterSpacing: 0.5 }}>
                    {L.promoTitle}
                  </div>
                  <div style={{ fontSize: mob ? 9 : 10, color: C.gr, marginTop: 2 }}>
                    {L.promoSub}
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "center", minWidth: 70 }}>
                {promoLeft > 0 ? (<>
                  <div style={{
                    fontSize: mob ? 26 : 36, fontWeight: 900, lineHeight: 1,
                    color: promoLeft <= 10 ? C.err : C.gold,
                    fontFamily: "'Space Mono', monospace",
                  }}>{promoLeft}</div>
                  <div style={{ fontSize: 8, color: C.gr, letterSpacing: 1.5, textTransform: "uppercase" }}>
                    {L.promoLeft}
                  </div>
                </>) : (
                  <div style={{ fontSize: mob ? 11 : 13, fontWeight: 800, color: C.err, fontFamily: "'Montserrat', sans-serif" }}>
                    {L.promoEnded}
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {/* TABS */}
        <div style={{
          display: "flex", gap: 2, marginTop: 16, marginBottom: 14,
          background: C.navyD, borderRadius: 11, padding: 4,
        }}>
          {[
            ["browse", L.inventory],
            ["payment", L.payment],
            ["compare", `${L.compare}${scenarios.length ? " (" + scenarios.length + ")" : ""}`],
          ].map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} style={btn(tab === k)}>{l}</button>
          ))}
        </div>

        {/* ═══════════════ TAB: BROWSE ═══════════════ */}
        {tab === "browse" && (
          <div style={{
            display: "grid",
            gridTemplateColumns: mob ? "1fr" : "240px 1fr 360px",
            gap: 14, alignItems: "start",
          }}>
            {/* FILTERS */}
            <div style={card}>
              <h3 style={{ margin: "0 0 12px", fontSize: 12, color: C.gold, letterSpacing: 1 }}>{L.filters}</h3>
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 10, color: C.grD, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>{L.section}</div>
                <div style={{ display: "flex", gap: 5 }}>
                  {[["A", L.sectionA, L.sectionFloors_A], ["B", L.sectionB, L.sectionFloors_B]].map(([k, l, d]) => (
                    <button key={k} onClick={() => setSec(k)} style={{
                      flex: 1, padding: "9px 8px", borderRadius: 9,
                      border: "1px solid " + (sec === k ? C.gold + "77" : C.navyL),
                      background: sec === k ? C.gold + "14" : "transparent",
                      color: sec === k ? C.gold : C.gr,
                      cursor: "pointer", textAlign: "left",
                    }}>
                      <div style={{ fontSize: 11, fontWeight: sec === k ? 700 : 500 }}>{l}</div>
                      <div style={{ fontSize: 8, color: C.grD, marginTop: 2 }}>{d}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 10, color: C.grD, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>
                  {L.floor}: {flMin}–{flMax}
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input type="number" value={flMin} min={3} max={maxFl}
                    onChange={(e) => setFlMin(Math.max(3, Math.min(maxFl, Number(e.target.value))))}
                    style={{ width: 60, padding: "6px 8px", borderRadius: 6, background: C.navyL, color: C.wh, border: "1px solid " + C.navyL, fontSize: 12, ...mono }} />
                  <span style={{ color: C.grD, fontSize: 10 }}>{L.to}</span>
                  <input type="number" value={flMax} min={3} max={maxFl}
                    onChange={(e) => setFlMax(Math.max(3, Math.min(maxFl, Number(e.target.value))))}
                    style={{ width: 60, padding: "6px 8px", borderRadius: 6, background: C.navyL, color: C.wh, border: "1px solid " + C.navyL, fontSize: 12, ...mono }} />
                </div>
              </div>

              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 10, color: C.grD, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>{L.type}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {typesAvail.map((t) => (
                    <button key={t} onClick={() => setTypeFilter(t)} style={{
                      padding: "7px 10px", borderRadius: 7,
                      border: "1px solid " + (typeFilter === t ? C.gold + "66" : C.navyL),
                      background: typeFilter === t ? C.gold + "12" : "transparent",
                      color: typeFilter === t ? C.gold : C.gr,
                      cursor: "pointer", fontSize: 11, fontWeight: typeFilter === t ? 700 : 500, textAlign: "left",
                    }}>{t === "all" ? L.all : tType(t, lang)}</button>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 10, color: C.grD, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>{L.exposure}</div>
                <select value={expFilter} onChange={(e) => setExpFilter(e.target.value)} style={{
                  width: "100%", padding: "8px 10px", borderRadius: 7,
                  background: C.navyL, color: C.wh, border: "1px solid " + C.navyL, fontSize: 11,
                }}>
                  {expsAvail.map((e) => <option key={e} value={e}>{e === "all" ? L.all : tDir(e, lang)}</option>)}
                </select>
              </div>

              <div style={{
                marginTop: 14, padding: 10, borderRadius: 8,
                background: C.navyD, border: "1px dashed " + C.navyL,
                fontSize: 10, color: C.gr, textAlign: "center",
              }}>
                <b style={{ color: C.gold, fontSize: 14, ...mono }}>{apts.length}</b> / {totalInSec}
                <div style={{ fontSize: 9, color: C.grD, marginTop: 2 }}>{L.availableByFilters}</div>
              </div>
            </div>

            {/* LIST */}
            <div style={card}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <h3 style={{ margin: 0, fontSize: 12, color: C.gold, letterSpacing: 1 }}>
                  {L.section.toUpperCase() + " " + secL(sec) + " · " + apts.length + " " + L.apartments}
                </h3>
                <span style={{ fontSize: 9, color: C.grD, ...mono }}>{L.pricesWithVAT}</span>
              </div>

              {apts.length === 0 ? (
                <div style={{ textAlign: "center", padding: 40, color: C.grD, fontSize: 12 }}>
                  Няма апартаменти по избраните филтри
                </div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: mob ? 10 : 11 }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid " + C.navyL }}>
                        {[L.apt, L.et, L.type, L.exposure, L.rzp, L.cellar, L.price].map((h) => (
                          <th key={h} style={{
                            padding: "8px 6px", textAlign: h === L.type || h === L.exposure ? "left" : "right",
                            color: C.grD, fontWeight: 600, fontSize: 9, letterSpacing: 1, textTransform: "uppercase",
                          }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {apts.map((a) => {
                        const isSel = selected && selected.s === a.s && selected.n === a.n;
                        const hasIz = !!a.iz;
                        const isRez = !!a.rez;
                        const isSold = !!a.sold;
                        const isLocked = isSold; // резервираните са избираеми, но без цена
                        return (
                          <tr key={a.s + "-" + a.n} onClick={() => { if (!isLocked) setSelected(a); }} style={{
                            borderBottom: "1px solid " + C.navyL + "33",
                            cursor: isLocked ? "not-allowed" : "pointer",
                            background: isRez ? "#B91C1C11" : (isSold ? "#9CA3AF22" : (isSel ? C.gold + "11" : "transparent")),
                            opacity: isLocked ? 0.55 : 1,
                          }}>
                            <td style={{ padding: "8px 6px", textAlign: "right", color: isRez ? "#B91C1C" : (isSold ? "#6B7280" : (isSel ? C.gold : C.wh)), fontWeight: 700, ...mono }}>{a.n}</td>
                            <td style={{ padding: "8px 6px", textAlign: "right", color: C.gr, ...mono }}>{a.f}</td>
                            <td style={{ padding: "8px 6px", color: isSold ? C.gr : C.wh, fontWeight: 500 }}>
                              {a.t}
                              {isRez && (
                                <span style={{
                                  marginLeft: 6, padding: "1px 6px", borderRadius: 3,
                                  background: "#B91C1C", color: "#FFFFFF",
                                  fontSize: 8, fontWeight: 800, letterSpacing: 1,
                                }}>{L.reserved}</span>
                              )}
                              {isSold && (
                                <span style={{
                                  marginLeft: 6, padding: "1px 6px", borderRadius: 3,
                                  background: "#6B7280", color: "#FFFFFF",
                                  fontSize: 8, fontWeight: 800, letterSpacing: 1,
                                }}>{L.sold}</span>
                              )}
                            </td>
                            <td style={{ padding: "8px 6px", color: C.gr, fontSize: 10 }}>{tDir(a.e, lang)}</td>
                            <td style={{ padding: "8px 6px", textAlign: "right", color: C.gr, ...mono }}>{a.r.toFixed(2)}</td>
                            <td style={{ padding: "8px 6px", textAlign: "right", color: hasIz ? C.ok : C.grD, fontSize: 10 }}>{hasIz ? "✓" : "—"}</td>
                            <td style={{ padding: "8px 6px", textAlign: "right", color: isLocked ? C.grD : C.gold, fontWeight: 800, ...mono, textDecoration: isRez ? "line-through" : "none" }}>{isSold ? "—" : fmt(a.calc.price)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* DETAILS — EDIT B: ref за scroll-to-details на mobile */}
            <div ref={detailsRef}>
              {!sel ? (
                <div style={{ ...card, textAlign: "center", padding: 40 }}>
                  <div style={{ fontSize: 30, marginBottom: 10, opacity: 0.3 }}>◉</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.gr, marginBottom: 5 }}>{L.pickApt}</div>
                  <div style={{ fontSize: 10, color: C.grD, lineHeight: 1.5 }}>{L.compareEmpty}</div>
                </div>
              ) : (
                <>
                  {/* APT HEADER */}
                  <div style={{
                    ...card,
                    background: "linear-gradient(135deg," + C.navyL + "," + C.navyM + ")",
                    border: "1px solid " + C.gold + "44", marginBottom: 10,
                  }}>
                    <div style={{ fontSize: 9, color: C.grD, letterSpacing: 1, textTransform: "uppercase" }}>
                      {L.section} {secL(sel.s)} · {L.aptCap} {sel.n}
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: C.gold, ...mono, margin: "4px 0" }}>{L.floor} {sel.f}</div>
                    <div style={{ fontSize: 11, color: C.wh, fontWeight: 600 }}>{tType(sel.t, lang)}</div>
                    <div style={{ fontSize: 10, color: C.gr, marginTop: 2 }}>{tDir(sel.e, lang)}</div>

                    <div style={{
                      marginTop: 10, paddingTop: 10, borderTop: "1px solid " + C.navyL,
                      display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6,
                    }}>
                      <div>
                        <div style={{ fontSize: 8, color: C.grD, textTransform: "uppercase" }}>{L.netArea}</div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: C.wh, ...mono }}>{sel.c.toFixed(2)} {L.m2}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 8, color: C.grD, textTransform: "uppercase" }}>{L.rzp}</div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: C.wh, ...mono }}>{sel.r.toFixed(2)} м²</div>
                      </div>
                      {sel.tr > 0 && (
                        <div style={{ gridColumn: "1 / -1" }}>
                          <div style={{ fontSize: 8, color: C.grD, textTransform: "uppercase" }}>{L.terrace}</div>
                          <div style={{ fontSize: 12, fontWeight: 700, color: C.pur, ...mono }}>{sel.tr.toFixed(2)} м²</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* EDIT D+E: FLOOR PLAN секция с banner */}
                  <div style={card}>
                    <h3 style={{ margin: "0 0 10px", fontSize: 11, color: C.gold, letterSpacing: 1 }}>{L.floorPlan}</h3>
                    {/* EDIT E: banner с Апартамент № и Етаж */}
                    <div style={{
                      padding: "10px 14px", borderRadius: 9, marginBottom: 10,
                      background: "linear-gradient(90deg," + C.gold + "22," + C.gold + "08)",
                      border: "1px solid " + C.gold + "66",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                    }}>
                      <span style={{ fontSize: 15, fontWeight: 900, color: C.gold, letterSpacing: 1, ...mono }}>
                        {L.aptHash}{sel.n} · {L.etShort}{sel.f}
                      </span>
                      <span style={{ fontSize: 9, color: C.grD, textTransform: "uppercase", letterSpacing: 1 }}>
                        Сек. {secL(sel.s)}
                      </span>
                    </div>
                    {/* План — с lazy loading и graceful fallback */}
                    {!planError ? (
                      <img
                        src={`/plans/sek-${sel.s.toLowerCase()}-${sel.f}.jpg`}
                        alt={`План на ет. ${sel.f}, Сек. ${secL(sel.s)}`}
                        loading="lazy"
                        onError={() => setPlanError(true)}
                        style={{
                          width: "100%", borderRadius: 8,
                          display: "block",
                          border: "1px solid " + C.navyL,
                          background: C.wh,
                        }}
                      />
                    ) : (
                      <div style={{
                        padding: "30px 16px", borderRadius: 9,
                        background: C.navyD, border: "1px dashed " + C.navyL,
                        textAlign: "center",
                      }}>
                        <div style={{ fontSize: 28, opacity: 0.25, marginBottom: 8 }}>▦</div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: C.gr, marginBottom: 4 }}>
                          План предстои
                        </div>
                        <div style={{ fontSize: 9, color: C.grD, lineHeight: 1.5 }}>
                          {L.archPlanFor} 
                        </div>
                      </div>
                    )}
                    <div style={{ fontSize: 8, color: C.grD, textAlign: "center", marginTop: 6, fontStyle: "italic" }}>
                      Архитектура: Urban Creative · арх. Д. Бояджиев · М 1:100
                    </div>
                  </div>

                  {sel.rez && (
                    <div style={{
                      display: "flex", alignItems: "center", gap: 10, marginBottom: 14,
                      padding: "12px 16px", borderRadius: 10,
                      background: C.err + "18", border: "1px solid " + C.err + "55",
                    }}>
                      <span style={{ fontSize: 20 }}>🔒</span>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: 13, color: C.err }}>{L.reserved}</div>
                        <div style={{ fontSize: 10, color: C.gr, marginTop: 2 }}>{L.priceOnRequest || "Цената не е налична за резервирани обекти"}</div>
                      </div>
                    </div>
                  )}
                  {/* PRICE BREAKDOWN (SIMPLIFIED — без изложение) */}
                  <div style={card}>
                    <h3 style={{ margin: "0 0 10px", fontSize: 11, color: C.gold, letterSpacing: 1 }}>{L.aptPriceCap}</h3>
                    <div style={{ fontSize: 10 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", color: C.gr }}>
                        <span>{L.pricePerM2VAT}</span>
                        <span style={{ color: C.wh, ...mono, fontWeight: 600 }}>{fmtN(sel.calc.eurM2)} €/м²</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", color: C.gr }}>
                        <span>{L.rzp}</span>
                        <span style={{ ...mono }}>{sel.r.toFixed(2)} м²</span>
                      </div>
                      {sel.calc.hasTerraceDiscount && (
                        <div style={{
                          display: "flex", justifyContent: "space-between", padding: "6px 8px",
                          background: C.pur + "11", borderRadius: 6, marginTop: 4,
                          color: C.pur, fontSize: 9,
                        }}>
                          <span>{L.floor3Bonus}</span>
                        </div>
                      )}
                      <div style={{
                        display: "flex", justifyContent: "space-between", alignItems: "baseline",
                        marginTop: 10, padding: "12px 10px", borderRadius: 9,
                        background: "linear-gradient(135deg," + C.gold + "11," + C.gold + "05)",
                        border: "1px solid " + C.gold + "55",
                      }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: C.wh }}>{L.apartment}</span>
                        <span style={{ fontSize: 19, fontWeight: 800, color: sel.rez ? C.err : C.gold, ...mono }}>{sel.rez ? "🔒 " + L.reserved : fmt(sel.calc.price)}</span>
                      </div>
                    </div>
                  </div>

                  {/* IZBA SECTION — EDIT C: БЕЗ ръчен picker, само авто */}
                  <div style={card}>
                    <h3 style={{ margin: "0 0 10px", fontSize: 11, color: C.gold, letterSpacing: 1 }}>{L.cellarCap}</h3>
                    {activeIzba ? (
                      <div style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        padding: "10px 12px", borderRadius: 9,
                        background: C.ok + "10", border: "1px solid " + C.ok + "44",
                      }}>
                        <div>
                          <div style={{ fontSize: 9, color: C.grD, textTransform: "uppercase" }}>
                            Прикачена към апартамента
                          </div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: C.ok, ...mono }}>{activeIzba.id}</div>
                          <div style={{ fontSize: 10, color: C.gr, marginTop: 2 }}>
                            {activeIzba.r.toFixed(2)} {L.m2x1500}
                          </div>
                          {sel.pmDoor && (
                            <div style={{ fontSize: 10, color: "#9333EA", marginTop: 2, fontWeight: 600 }}>
                              🚪 обща врата с {sel.pmDoor}
                            </div>
                          )}
                        </div>
                        <div style={{ fontSize: 15, fontWeight: 800, color: C.ok, ...mono }}>{fmt(activeIzba.p)}</div>
                      </div>
                    ) : (
                      <div style={{
                        padding: "10px 12px", borderRadius: 9,
                        background: C.navyD, border: "1px dashed " + C.navyL,
                        fontSize: 10, color: C.grD, textAlign: "center",
                      }}>
                        Този апартамент няма прикачена изба
                      </div>
                    )}
                  </div>

                  {/* PARKING */}
                  <div style={card}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                      <h3 style={{ margin: 0, fontSize: 11, color: C.gold, letterSpacing: 1 }}>{L.parking}</h3>
                      {activeParking && (
                        <button onClick={() => { setChosenParking(null); setShowParkingPicker(false); }}
                          style={{ background: "none", border: "none", color: C.err, cursor: "pointer", fontSize: 10 }}>{L.removeParking}</button>
                      )}
                    </div>
                    {activeParking ? (
                      <div style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        padding: "10px 12px", borderRadius: 9,
                        background: C.bl + "10", border: "1px solid " + C.bl + "44",
                      }}>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: C.bl, ...mono }}>{activeParking.id}</div>
                          <div style={{ fontSize: 10, color: C.gr, marginTop: 2 }}>
                            {activeParking.lvl} · {activeParking.a.toFixed(2)} {L.m2} · {activeParking.g}
                          </div>
                        </div>
                        <div style={{ fontSize: 15, fontWeight: 800, color: C.bl, ...mono }}>
                          {activeParking.p ? fmt(activeParking.p) : L.priceOnRequest}
                        </div>
                      </div>
                    ) : (
                      <div style={{
                        padding: "10px 12px", borderRadius: 9,
                        background: C.navyD, border: "1px dashed " + C.navyL,
                        fontSize: 10, color: C.grD, textAlign: "center",
                      }}>
                        Няма избрано паркомясто
                      </div>
                    )}
                    <button onClick={() => setShowParkingPicker(!showParkingPicker)} style={{
                      marginTop: 8, width: "100%", padding: "7px", borderRadius: 7,
                      background: "transparent", border: "1px solid " + C.bl + "33",
                      color: C.bl, fontSize: 10, cursor: "pointer", fontWeight: 600,
                    }}>
                      {showParkingPicker ? L.closeList : (activeParking ? L.changeParking : L.addParking)}
                    </button>
                    {showParkingPicker && (
                      <div style={{ marginTop: 10, maxHeight: 250, overflowY: "auto",
                        background: C.navyD, borderRadius: 7, padding: 6,
                      }}>
                        {INV.P.map((p) => {
                          const taken = p.sold || p.rez;
                          const tag = p.sold ? (p.reason === "stop" ? "СПРЯНО" : "ПРОДАДЕНО") : p.rez ? "РЕЗЕРВИРАНО" : null;
                          return (
                          <button key={p.id} disabled={taken}
                            onClick={() => { if (taken) return; setChosenParking(p); setShowParkingPicker(false); }} style={{
                            display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center",
                            padding: "6px 8px", margin: "2px 0", borderRadius: 5,
                            background: activeParking && activeParking.id === p.id ? C.gold + "15" : "transparent",
                            border: "1px solid transparent", cursor: taken ? "not-allowed" : "pointer",
                            color: C.wh, fontSize: 10, opacity: taken ? 0.42 : 1,
                          }}>
                            <span style={{ ...mono, minWidth: 55, textAlign: "left", textDecoration: taken ? "line-through" : "none" }}>{p.id}</span>
                            <span style={{ color: C.gr, fontSize: 9 }}>{p.lvl}</span>
                            {tag ? (
                              <span style={{ color: p.rez ? C.gold : C.err, fontSize: 8, fontWeight: 700, letterSpacing: 0.3 }}>{tag}</span>
                            ) : (
                              <span style={{ color: p.g === "TBD" ? C.err : p.g === "ПАКЕТ" ? C.pur : C.gr, fontSize: 9 }}>{p.isGarage ? "ГАРАЖ" : p.g}</span>
                            )}
                            <span style={{ color: p.p ? C.bl : C.err, ...mono }}>
                              {p.p ? fmt(p.p) : L.onRequest}
                            </span>
                          </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* TOTAL PACKAGE */}
                  <div style={{
                    ...card,
                    background: "linear-gradient(135deg," + C.gold + "14," + C.gold + "04)",
                    border: "1px solid " + C.gold + "66",
                  }}>
                    <div style={{ fontSize: 9, color: C.grD, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
                      Общо пакет
                    </div>
                    <div style={{ fontSize: 24, fontWeight: 900, color: C.gold, ...mono }}>
                      {fmt(totalPackage)}
                    </div>
                    <div style={{ fontSize: 9, color: C.gr, marginTop: 4 }}>{L.expoWave}</div>
                    <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
                      <button onClick={addToCompare} disabled={scenarios.length >= 3} style={{
                        flex: 1, padding: "9px", borderRadius: 8,
                        border: "1px solid " + (scenarios.length >= 3 ? C.navyL : C.gold + "44"),
                        background: scenarios.length >= 3 ? C.navyL : C.gold + "15",
                        color: scenarios.length >= 3 ? C.grD : C.gold,
                        cursor: scenarios.length >= 3 ? "not-allowed" : "pointer",
                        fontSize: 10, fontWeight: 700,
                      }}>{L.addToCompare} ({scenarios.length}/3)</button>
                    </div>
                    <button onClick={() => setTab("payment")} style={{
                      marginTop: 6, width: "100%", padding: "9px", borderRadius: 8,
                      border: "1px solid " + C.gold + "66", background: C.gold,
                      color: C.navy, cursor: "pointer", fontSize: 10, fontWeight: 800, letterSpacing: 0.5,
                    }}>{L.viewSchedule}</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* ═══════════════ TAB: PAYMENT ═══════════════ */}
        {tab === "payment" && (
          <div>
            {!sel ? (
              <div style={{ ...card, textAlign: "center", padding: 40 }}>
                <div style={{ fontSize: 13, color: C.gr, marginBottom: 10 }}>{L.pickParking}</div>
                <button onClick={() => setTab("browse")} style={{
                  padding: "10px 20px", borderRadius: 9,
                  border: "1px solid " + C.gold + "55", background: C.gold + "15",
                  color: C.gold, cursor: "pointer", fontSize: 11, fontWeight: 700,
                }}>{L.toInventory}</button>
              </div>
            ) : (
              <div style={{
                display: "grid",
                gridTemplateColumns: mob ? "1fr" : "1fr 360px", gap: 14,
              }}>
                {/* SCHEDULE */}
                <div style={card}>
                  {/* EDIT F: Schema toggle */}
                  <div style={{
                    display: "flex", gap: 6, marginBottom: 14,
                    background: C.navyD, borderRadius: 10, padding: 4,
                  }}>
                    {[
                      { id: "standard", label: L.standard, sub: L.standardSubVal },
                      { id: "aggressive", label: L.aggressive, sub: L.aggressiveSubVal },
                      ...([...INV.A, ...INV.B].filter(a => a.rez).length < 50
                        ? [{ id: "deferred", label: L.deferred || "Промо 30/70", sub: "30 / 70 · следващи 50" }]
                        : []),
                    ].map((s) => (
                      <button key={s.id} onClick={() => setPaymentScheme(s.id)} style={{
                        flex: 1, padding: "10px 8px", borderRadius: 8, border: "none", cursor: "pointer",
                        background: paymentScheme === s.id ? C.gold : "transparent",
                        color: paymentScheme === s.id ? C.navy : C.gr,
                        textAlign: "center",
                      }}>
                        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.5 }}>{s.label}</div>
                        <div style={{ fontSize: 8, opacity: 0.75, ...mono, marginTop: 2 }}>{s.sub}</div>
                      </button>
                    ))}
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
                    <h3 style={{ margin: 0, fontSize: 13, color: C.gold, letterSpacing: 1 }}>
                      ПЛАТЕЖЕН ГРАФИК
                    </h3>
                    <span style={{ fontSize: 9, color: C.grD }}>{scheme && scheme.label + " · " + scheme.subtitle}</span>
                  </div>

                  {/* EDIT F: Стъпка 0 — Резервационна такса */}
                  <div style={{
                    marginBottom: 14, padding: "12px 14px", borderRadius: 10,
                    background: "linear-gradient(135deg," + C.pur + "18," + C.pur + "06)",
                    border: "1px solid " + C.pur + "55",
                    position: "relative",
                  }}>
                    <div style={{
                      position: "absolute", top: -9, left: 12,
                      background: C.navy, padding: "0 6px",
                      fontSize: 8, color: C.pur, fontWeight: 800, letterSpacing: 1.5,
                    }}>{L.step0}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: C.wh }}>
                          Резервационна такса
                        </div>
                        <div style={{ fontSize: 9, color: C.grD, marginTop: 2 }}>
                          при подписване на резервационен договор
                        </div>
                      </div>
                      <div style={{ fontSize: 16, fontWeight: 900, color: C.pur, ...mono }}>
                        {fmt(RESERVATION_FEE)}
                      </div>
                    </div>
                    <div style={{
                      marginTop: 8, padding: "6px 10px", borderRadius: 6,
                      background: C.pur + "22", fontSize: 9, color: C.pur, fontWeight: 600,
                      textAlign: "center", letterSpacing: 0.5,
                    }}>
                      ↻ ВЪЗСТАНОВЯВА СЕ ПРИ ПРЕДВАРИТЕЛЕН ДОГОВОР
                    </div>
                  </div>

                  <div style={{ position: "relative", paddingLeft: 22 }}>
                    <div style={{
                      position: "absolute", left: 8, top: 8, bottom: 8, width: 2,
                      background: "linear-gradient(180deg," + C.gold + "," + C.bl + ")",
                    }} />
                    {paymentSteps.map((s, i) => {
                      const cum = paymentSteps.slice(0, i + 1).reduce((a, x) => a + x.amt, 0);
                      const palette = [C.gold, C.goldL, C.pur, C.bl, C.ok, C.goldD];
                      const cl = palette[i % palette.length];
                      return (
                        <div key={i} style={{ display: "flex", gap: 12, marginBottom: 16, position: "relative" }}>
                          <div style={{
                            position: "absolute", left: -16, top: 6,
                            width: 12, height: 12, borderRadius: "50%",
                            background: cl, border: "2px solid " + C.navy, zIndex: 1,
                          }} />
                          <div style={{ flex: 1, marginLeft: 6 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 4 }}>
                              <div>
                                <span style={{ fontSize: 12, fontWeight: 700, color: C.wh }}>{i + 1}. {s.label}</span>
                                <span style={{ fontSize: 10, color: C.grD, marginLeft: 6 }}>{s.pct}%</span>
                                {s.deductReservation && (
                                  <span style={{
                                    marginLeft: 6, padding: "1px 6px", borderRadius: 4,
                                    background: C.pur + "33", color: C.pur, fontSize: 8, fontWeight: 700,
                                  }}>{L.deduct5K}</span>
                                )}
                              </div>
                              <div style={{ textAlign: "right" }}>
                                <div style={{ fontSize: 14, fontWeight: 800, color: cl, ...mono }}>{fmt(s.amt)}</div>
                                <div style={{ fontSize: 9, color: C.grD }}>{fmtDate(s.when)}</div>
                              </div>
                            </div>
                            <div style={{ fontSize: 9, color: C.gr, marginTop: 2, fontStyle: "italic" }}>{s.note}</div>
                            <div style={{ height: 5, background: C.navyL, borderRadius: 3, overflow: "hidden", marginTop: 6 }}>
                              <div style={{
                                height: "100%", width: Math.min(100, (cum / totalAfterDiscount * 100)) + "%",
                                background: "linear-gradient(90deg," + cl + "," + cl + "88)",
                              }} />
                            </div>
                            <div style={{ fontSize: 8, color: C.grD, marginTop: 2, textAlign: "right", ...mono }}>
                              {L.cumulative} {fmt(cum + RESERVATION_FEE)} {L.inclReserved}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Total row + discount banner if aggressive */}
                  {scheme && scheme.discountPct > 0 && (
                    <div style={{
                      marginTop: 10, padding: "10px 14px", borderRadius: 9,
                      background: "linear-gradient(135deg," + C.ok + "22," + C.ok + "08)",
                      border: "1px solid " + C.ok + "66",
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                    }}>
                      <div>
                        <div style={{ fontSize: 10, color: C.grD, letterSpacing: 1 }}>
                          Каталожна цена: <span style={{ textDecoration: "line-through", color: C.gr, ...mono }}>{fmt(totalPackage)}</span>
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 800, color: C.ok, marginTop: 2 }}>
                          ✓ Спестявате {fmt(discountSaving)} ({scheme.discountPct}% отстъпка)
                        </div>
                      </div>
                    </div>
                  )}
                  <div style={{
                    marginTop: 10, padding: "12px 14px", borderRadius: 10,
                    background: "linear-gradient(135deg," + C.gold + "11," + C.gold + "05)",
                    border: "1px solid " + C.gold + "55",
                    display: "flex", justifyContent: "space-between", alignItems: "baseline",
                  }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: C.wh }}>{L.total100}</span>
                    <span style={{ fontSize: 20, fontWeight: 800, color: C.gold, ...mono }}>{fmt(totalAfterDiscount)}</span>
                  </div>
                </div>

                {/* SUMMARY */}
                <div>
                  <div style={{ ...card, background: "linear-gradient(135deg," + C.navyL + "," + C.navyM + ")", border: "1px solid " + C.gold + "44" }}>
                    <div style={{ fontSize: 9, color: C.grD, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>
                      Избран пакет
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.wh }}>
                      {L.sec}{secL(sel.s)} · {L.apt}{sel.n} · {L.et}{sel.f}
                    </div>
                    <div style={{ fontSize: 11, color: C.gr, marginTop: 2 }}>{sel.t} · {sel.e}</div>

                    <div style={{ marginTop: 14, fontSize: 11 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", color: C.gr }}>
                        <span>{L.aptCap}</span><span style={{ ...mono, color: C.wh }}>{fmt(sel.calc.price)}</span>
                      </div>
                      {activeIzba && (
                        <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", color: C.gr }}>
                          <span>{L.cellar} {activeIzba.id}{sel.pmDoor ? " 🚪" : ""}</span><span style={{ ...mono, color: C.ok }}>{fmt(activeIzba.p)}</span>
                        </div>
                      )}
                      {activeParking && activeParking.p && (
                        <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", color: C.gr }}>
                          <span>{L.parkingCap.split(" ")[0]} {activeParking.id}</span><span style={{ ...mono, color: C.bl }}>{fmt(activeParking.p)}</span>
                        </div>
                      )}
                      <div style={{
                        marginTop: 8, paddingTop: 8, borderTop: "1px solid " + C.navyL,
                        display: "flex", justifyContent: "space-between", color: C.gr,
                      }}>
                        <span>{L.catalog}</span>
                        <span style={{ ...mono, color: scheme && scheme.discountPct > 0 ? C.grD : C.wh,
                          textDecoration: scheme && scheme.discountPct > 0 ? "line-through" : "none" }}>
                          {fmt(totalPackage)}
                        </span>
                      </div>
                      {scheme && scheme.discountPct > 0 && (
                        <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", color: C.ok, fontSize: 10 }}>
                          <span>{L.discount} ({scheme.discountPct}%)</span>
                          <span style={{ ...mono }}>−{fmt(discountSaving)}</span>
                        </div>
                      )}
                      <div style={{
                        marginTop: 6, paddingTop: 8, borderTop: "1px solid " + C.gold + "44",
                        display: "flex", justifyContent: "space-between",
                      }}>
                        <span style={{ color: C.gold, fontWeight: 700 }}>{L.finalTag}</span>
                        <span style={{ color: C.gold, fontWeight: 800, fontSize: 16, ...mono }}>{fmt(totalAfterDiscount)}</span>
                      </div>
                      <div style={{
                        marginTop: 8, padding: "6px 10px", borderRadius: 6,
                        background: C.pur + "15", border: "1px solid " + C.pur + "44",
                        fontSize: 9, color: C.pur, textAlign: "center",
                      }}>
                        {L.addReservation} {fmt(RESERVATION_FEE)} {L.reservationRefundable}
                      </div>
                      <button onClick={exportOfferPDF} style={{
                        marginTop: 12, width: "100%", padding: "12px 16px", borderRadius: 8,
                        border: "1px solid " + C.gold, background: C.gold,
                        color: C.navy, fontSize: 12, fontWeight: 800, cursor: "pointer",
                        letterSpacing: 1, textTransform: "uppercase",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      }}>
                        <span style={{ fontSize: 14 }}>📄</span>
                        <span>Експорт оферта PDF</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══════════════ TAB: COMPARE ═══════════════ */}
        {tab === "compare" && (
          <div>
            {scenarios.length === 0 ? (
              <div style={{ ...card, textAlign: "center", padding: 40 }}>
                <div style={{ fontSize: 30, marginBottom: 10, opacity: 0.3 }}>⊟</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.gr, marginBottom: 5 }}>{L.noVariants}</div>
                <div style={{ fontSize: 10, color: C.grD, maxWidth: 340, margin: "0 auto", lineHeight: 1.5 }}>{L.compareHint}</div>
                <button onClick={() => setTab("browse")} style={{
                  marginTop: 14, padding: "9px 20px", borderRadius: 8,
                  border: "1px solid " + C.gold + "44", background: C.gold + "15",
                  color: C.gold, cursor: "pointer", fontSize: 11, fontWeight: 700,
                }}>{L.toInventory}</button>
              </div>
            ) : (
              <div>
                {/* CARDS */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: mob ? "1fr" : `repeat(${scenarios.length}, 1fr)`,
                  gap: 10, marginBottom: 14,
                }}>
                  {scenarios.map((sc, i) => (
                    <div key={i} style={{
                      ...card,
                      background: "linear-gradient(135deg," + C.navyL + "," + C.navyM + ")",
                      border: "1px solid " + C.gold + "33", marginBottom: 0,
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: C.gold }}>{L.variant} {i + 1}</span>
                        <button onClick={() => setScenarios(scenarios.filter((_, j) => j !== i))}
                          style={{ background: "none", border: "none", color: C.grD, cursor: "pointer", fontSize: 14 }}>✕</button>
                      </div>
                      <div style={{ fontSize: 10, color: C.gr, lineHeight: 1.7 }}>
                        <div><b style={{ color: C.wh }}>{L.sec}{secL(sc.apt.s)} · {L.apt}{sc.apt.n} · {L.et}{sc.apt.f}</b></div>
                        <div>{sc.apt.t} · {sc.apt.e}</div>
                        <div>{L.rzp}: {sc.apt.r.toFixed(2)} {L.m2}</div>
                        {sc.izba && <div style={{ color: C.ok }}>✓ {L.cellar} {sc.izba.id} ({fmt(sc.izba.p)})</div>}
                        {sc.parking && <div style={{ color: C.bl }}>✓ ПМ {sc.parking.id} ({sc.parking.p ? fmt(sc.parking.p) : L.onRequest})</div>}
                        {!sc.izba && !sc.parking && <div style={{ color: C.grD }}>{L.aptOnly}</div>}
                      </div>
                      <div style={{
                        marginTop: 10, padding: "10px 12px", borderRadius: 9,
                        background: C.gold + "12", border: "1px solid " + C.gold + "33",
                      }}>
                        <div style={{ fontSize: 8, color: C.grD, textTransform: "uppercase", letterSpacing: 1 }}>{L.totalPrice}</div>
                        <div style={{ fontSize: 19, fontWeight: 800, color: sc.apt.rez ? C.err : C.gold, ...mono }}>{sc.apt.rez ? "🔒 " + L.reserved : fmt(sc.total)}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* COMPARISON TABLE */}
                {scenarios.length >= 2 && (
                  <div style={card}>
                    <h3 style={{ margin: "0 0 10px", fontSize: 12, color: C.gold, letterSpacing: 1 }}>{L.compareTitle}</h3>
                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                        <thead>
                          <tr style={{ borderBottom: "1px solid " + C.navyL }}>
                            <th style={{ padding: "8px", textAlign: "left", color: C.grD, fontSize: 9 }}>{L.parameter}</th>
                            {scenarios.map((_, i) => (
                              <th key={i} style={{ padding: "8px", textAlign: "right", color: C.gold, fontSize: 10 }}>
                                {L.variant} {i + 1}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { l: L.sectionFloor, f: (sc) => `${L.sec}${sc.apt.s} / ${L.et}${sc.apt.f}` },
                            { l: L.aptNo, f: (sc) => sc.apt.n },
                            { l: L.type, f: (sc) => sc.apt.t },
                            { l: L.exposure, f: (sc) => sc.apt.e },
                            { l: L.rzpSq, f: (sc) => sc.apt.r.toFixed(2) },
                            { l: L.terraceSq, f: (sc) => sc.apt.tr ? sc.apt.tr.toFixed(2) : "—" },
                            { l: L.pricePerM2, f: (sc) => sc.apt.rez ? "🔒" : fmtN(calcAptPrice(sc.apt).eurM2) + ` €/${L.m2}` },
                            { l: L.aptPrice, f: (sc) => sc.apt.rez ? "🔒" : fmt(calcAptPrice(sc.apt).price) },
                            { l: L.cellar, f: (sc) => sc.izba ? `${sc.izba.id} (${fmt(sc.izba.p)})` : "—" },
                            { l: L.parkingCap, f: (sc) => sc.parking ? `${sc.parking.id} (${sc.parking.p ? fmt(sc.parking.p) : "запитване"})` : "—" },
                            { l: L.totalPackage, f: (sc) => sc.apt.rez ? "🔒 " + L.reserved : fmt(sc.total), bold: true },
                          ].map((r, ri) => (
                            <tr key={ri} style={{ borderBottom: "1px solid " + C.navyL + "33" }}>
                              <td style={{ padding: "7px 8px", color: r.bold ? C.gold : C.gr, fontWeight: r.bold ? 700 : 500, fontSize: 10 }}>{r.l}</td>
                              {scenarios.map((sc, si) => (
                                <td key={si} style={{
                                  padding: "7px 8px", textAlign: "right",
                                  color: r.bold ? C.gold : C.wh,
                                  fontWeight: r.bold ? 800 : 500,
                                  fontSize: r.bold ? 13 : 10,
                                  ...(r.bold ? mono : {}),
                                }}>{r.f(sc)}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Cheapest marker */}
                    {scenarios.length >= 2 && (
                      <div style={{ marginTop: 10, fontSize: 10, color: C.grD, textAlign: "center" }}>
                        {(() => {
                          const min = Math.min(...scenarios.map(s => s.total));
                          const idx = scenarios.findIndex(s => s.total === min);
                          const max = Math.max(...scenarios.map(s => s.total));
                          const diff = max - min;
                          return `💡 Най-изгоден: Вариант ${idx + 1} · Разлика спрямо най-скъпия: ${fmt(diff)}`;
                        })()}
                      </div>
                    )}
                  </div>
                )}

                {scenarios.length < 3 && (
                  <button onClick={() => setTab("browse")} style={{
                    width: "100%", padding: 12, borderRadius: 9,
                    border: "1px dashed " + C.gold + "44", background: "transparent",
                    color: C.gold, cursor: "pointer", fontSize: 11, fontWeight: 600,
                  }}>{L.addVariant} ({scenarios.length}/3)</button>
                )}
              </div>
            )}
          </div>
        )}

        {/* FOOTER */}
        <div style={{
          textAlign: "center", marginTop: 24, paddingTop: 14,
          borderTop: "1px solid " + C.navyL,
          fontSize: 9, color: C.grD, lineHeight: 1.7,
        }}>
          <b style={{ color: C.gold }}>V8.5</b> {L.footerNote.slice(2)}
          <br />
          NEW TOWER · {L.subtitle} · {L.pricesWithVAT} 20% · {L.expoTag.replace('● ', '')}
          <br />
          Sky High Standards
        </div>
      </div>
      
      {/* ═══════════════ OFFER PRINT OVERLAY ═══════════════ */}
      {showOffer && sel && (() => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        const validUntil = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        const vdd = String(validUntil.getDate()).padStart(2, '0');
        const vmm = String(validUntil.getMonth() + 1).padStart(2, '0');
        const vyyyy = validUntil.getFullYear();
        const offerNo = `${yyyy}-${mm}-${dd}-${sel.s}${sel.n}`;
        const totalSum = totalAfterDiscount;
        const aptPrice = sel.calc.price;
        const aptPerM2 = Math.round(aptPrice / sel.r);
        
        return (
          <>
            <style>{`
              @media print {
                body * { visibility: hidden !important; }
                #nt-offer-print, #nt-offer-print * { visibility: visible !important; }
                #nt-offer-print { position: absolute !important; left: 0; top: 0; width: 100%; }
                #nt-offer-controls { display: none !important; }
                @page { size: A4; margin: 12mm; }
              }
              #nt-offer-print .nt-o-row { display: flex; justify-content: space-between; gap: 12px; padding: 3px 0; }
              #nt-offer-print .nt-o-row .lbl { color: #6B7280; flex-shrink: 0; }
              #nt-offer-print .nt-o-row .val { font-weight: 700; text-align: right; }
              @media screen and (max-width: 640px) {
                #nt-offer-overlay { padding: 8px !important; padding-top: 64px !important; }
                #nt-offer-controls { top: 8px !important; right: 8px !important; left: 8px !important; }
                #nt-offer-controls button { flex: 1; padding: 10px 8px !important; font-size: 11px !important; }
                #nt-offer-print .nt-o-header { padding: 14px 16px !important; }
                #nt-offer-print .nt-o-header .nt-o-brand { font-size: 16px !important; letter-spacing: 1px !important; white-space: nowrap; }
                #nt-offer-print .nt-o-header .nt-o-mark { width: 38px !important; height: 38px !important; font-size: 16px !important; }
                #nt-offer-print .nt-o-offerno { font-size: 11px !important; white-space: nowrap; }
                #nt-offer-print .nt-o-section { padding: 12px 16px !important; }
                #nt-offer-print .nt-o-grid { grid-template-columns: 1fr !important; gap: 4px !important; }
                #nt-offer-print .nt-o-total { padding: 12px 16px !important; flex-wrap: nowrap !important; gap: 8px; }
                #nt-offer-print .nt-o-total .nt-o-total-lbl { font-size: 10px !important; }
                #nt-offer-print .nt-o-total .nt-o-total-val { font-size: 17px !important; white-space: nowrap; }
                #nt-offer-print table { font-size: 9px !important; }
                #nt-offer-print .nt-o-footer { padding: 12px 16px !important; flex-direction: column; gap: 12px; }
                #nt-offer-print .nt-o-footer > div:last-child { text-align: left !important; }
              }
            `}</style>
            <div id="nt-offer-overlay" style={{
              position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
              background: "rgba(0,0,0,0.6)", zIndex: 9999,
              display: "flex", alignItems: "flex-start", justifyContent: "center",
              padding: 20, paddingTop: 70, overflowY: "auto",
            }}>
              <div id="nt-offer-controls" style={{
                position: "fixed", top: 20, right: 20, zIndex: 10000,
                display: "flex", gap: 10,
              }}>
                <button onClick={() => window.print()} style={{
                  padding: "12px 20px", background: C.gold, color: C.navy,
                  border: "none", borderRadius: 8, fontWeight: 800, cursor: "pointer",
                  fontSize: 13, boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                }}>📄 Принтирай / Save as PDF</button>
                <button onClick={() => setShowOffer(false)} style={{
                  padding: "12px 20px", background: "white", color: C.navy,
                  border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer",
                  fontSize: 13, boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                }}>✕ Затвори</button>
              </div>
              
              <div id="nt-offer-print" style={{
                background: "white", width: "210mm", maxWidth: "100%",
                margin: "0 auto", fontFamily: "system-ui, -apple-system, sans-serif",
                color: "#1A1F3D", boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
              }}>
                {/* HEADER */}
                <div className="nt-o-header" style={{
                  background: "#1A1F3D", color: "white", padding: "20px 30px",
                  display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div className="nt-o-mark" style={{
                      width: 50, height: 50, background: "#E8C061", color: "#1A1F3D",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 900, fontSize: 22, borderRadius: 4, flexShrink: 0,
                    }}>NT</div>
                    <div>
                      <div className="nt-o-brand" style={{ fontSize: 22, letterSpacing: 2, fontWeight: 800, whiteSpace: "nowrap" }}>NEW TOWER</div>
                      <div style={{ color: "#E8C061", fontSize: 9, letterSpacing: 3, marginTop: 3 }}>SKY HIGH STANDARDS</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 8, color: "#E8C061", letterSpacing: 1 }}>ОФЕРТА №</div>
                    <div className="nt-o-offerno" style={{ fontSize: 14, fontWeight: 800, marginTop: 3, whiteSpace: "nowrap" }}>{offerNo}</div>
                    <div style={{ fontSize: 9, color: "#E8C061", marginTop: 6 }}>Валидна до {vdd}.{vmm}.{vyyyy}</div>
                  </div>
                </div>
                
                {/* TITLE BAR */}
                <div style={{
                  background: "#F5E6C8", padding: 7, textAlign: "center",
                  color: "#1A1F3D", fontWeight: 800, fontSize: 12, letterSpacing: 1,
                }}>ИНДИВИДУАЛНА ОФЕРТА · АПАРТАМЕНТ</div>
                
                {/* APARTMENT */}
                <div className="nt-o-section" style={{ padding: "15px 30px" }}>
                  <div style={{ fontSize: 10, letterSpacing: 1, fontWeight: 700, borderBottom: "1px solid #E8C061", paddingBottom: 4, marginBottom: 10 }}>АПАРТАМЕНТ</div>
                  <div className="nt-o-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 30px", fontSize: 11 }}>
                    <div className="nt-o-row">
                      <span className="lbl">Местоположение</span>
                      <span className="val">Сек.{sel.s} · Ап.{sel.n} · Ет.{sel.f}</span>
                    </div>
                    <div className="nt-o-row">
                      <span className="lbl">Чиста площ</span>
                      <span className="val">{sel.c} м²</span>
                    </div>
                    <div className="nt-o-row">
                      <span className="lbl">Тип</span>
                      <span className="val">{sel.t}</span>
                    </div>
                    <div className="nt-o-row">
                      <span className="lbl">РЗП</span>
                      <span className="val">{sel.r} м²</span>
                    </div>
                    <div className="nt-o-row">
                      <span className="lbl">Изложение</span>
                      <span className="val">{sel.e}</span>
                    </div>
                    <div className="nt-o-row">
                      <span className="lbl">Цена / м² (с ДДС)</span>
                      <span className="val">€{aptPerM2.toLocaleString('bg-BG')}</span>
                    </div>
                  </div>
                </div>
                
                {/* PACKAGE */}
                <div className="nt-o-section" style={{ padding: "15px 30px" }}>
                  <div style={{ fontSize: 10, letterSpacing: 1, fontWeight: 700, borderBottom: "1px solid #E8C061", paddingBottom: 4, marginBottom: 10 }}>ПАКЕТ</div>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tbody>
                      <tr><td style={{ padding: "8px 5px", borderBottom: "1px solid #F3F4F6" }}>
                        <div style={{ fontWeight: 700 }}>Ап.{sel.n}</div>
                        <div style={{ fontSize: 10, color: "#6B7280" }}>Сек.{sel.s} · Ет.{sel.f} · {sel.c} м²</div>
                      </td><td style={{ padding: "8px 5px", textAlign: "right", fontWeight: 700, borderBottom: "1px solid #F3F4F6" }}>{fmt(aptPrice)}</td></tr>
                      {activeIzba && (
                        <tr><td style={{ padding: "8px 5px", borderBottom: "1px solid #F3F4F6" }}>
                          <div style={{ fontWeight: 700 }}>Изба {activeIzba.id}</div>
                          <div style={{ fontSize: 10, color: "#6B7280" }}>подз.-1 · {activeIzba.r.toFixed(2)} м² · €1,500/м²{sel.pmDoor ? " · 🚪 " + sel.pmDoor : ""}</div>
                        </td><td style={{ padding: "8px 5px", textAlign: "right", fontWeight: 700, borderBottom: "1px solid #F3F4F6" }}>{fmt(activeIzba.p)}</td></tr>
                      )}
                      {activeParking && activeParking.p && (
                        <tr><td style={{ padding: "8px 5px", borderBottom: "1px solid #F3F4F6" }}>
                          <div style={{ fontWeight: 700 }}>Паркомясто {activeParking.id}</div>
                          <div style={{ fontSize: 10, color: "#6B7280" }}>{activeParking.lvl} · {activeParking.a} м² · {activeParking.g}</div>
                        </td><td style={{ padding: "8px 5px", textAlign: "right", fontWeight: 700, borderBottom: "1px solid #F3F4F6" }}>{fmt(activeParking.p)}</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
                
                {/* TOTAL */}
                <div className="nt-o-total" style={{
                  background: "linear-gradient(135deg, #1A1F3D, #2A3050)", color: "white",
                  padding: "14px 30px", display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <span className="nt-o-total-lbl" style={{ fontWeight: 700, fontSize: 12, letterSpacing: 1 }}>ОБЩА ЦЕНА (с ДДС 20%)</span>
                  <span className="nt-o-total-val" style={{ fontSize: 22, fontWeight: 900, color: "#E8C061", whiteSpace: "nowrap" }}>{fmt(totalSum)}</span>
                </div>
                
                {/* RESERVATION + SCHEDULE */}
                <div className="nt-o-section" style={{ padding: "15px 30px" }}>
                  <div style={{ fontSize: 10, letterSpacing: 1, fontWeight: 700, borderBottom: "1px solid #E8C061", paddingBottom: 4, marginBottom: 10 }}>
                    ПЛАТЕЖЕН ГРАФИК · {scheme && scheme.label}
                  </div>
                  <div style={{
                    background: "#F0E8F8", padding: "10px 15px", marginBottom: 10,
                    borderLeft: "4px solid #9333EA",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                  }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 11 }}>РЕЗЕРВАЦИОННА ТАКСА</div>
                      <div style={{ fontSize: 9, color: "#6B7280", marginTop: 2 }}>при подписване на резервационен договор · възстановима</div>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: 13, color: "#9333EA" }}>{fmt(5000)}</div>
                  </div>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10 }}>
                    <thead>
                      <tr style={{ background: "#1A1F3D", color: "white" }}>
                        <th style={{ padding: "7px 8px", textAlign: "left", fontSize: 9, letterSpacing: 1 }}>№</th>
                        <th style={{ padding: "7px 8px", textAlign: "left", fontSize: 9, letterSpacing: 1 }}>СТЪПКА</th>
                        <th style={{ padding: "7px 8px", textAlign: "left", fontSize: 9, letterSpacing: 1 }}>ОПИСАНИЕ</th>
                        <th style={{ padding: "7px 8px", textAlign: "left", fontSize: 9, letterSpacing: 1 }}>СРОК</th>
                        <th style={{ padding: "7px 8px", textAlign: "right", fontSize: 9, letterSpacing: 1 }}>%</th>
                        <th style={{ padding: "7px 8px", textAlign: "right", fontSize: 9, letterSpacing: 1 }}>СУМА</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentSteps.map((s, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? "#F9FAFB" : "white" }}>
                          <td style={{ padding: "8px", fontWeight: 700 }}>{i + 1}</td>
                          <td style={{ padding: "8px", fontWeight: 700 }}>{s.label}</td>
                          <td style={{ padding: "8px", fontSize: 9, color: "#6B7280" }}>{s.note || ""}</td>
                          <td style={{ padding: "8px", color: "#6B7280" }}>{s.when ? fmtDate(s.when) : ""}</td>
                          <td style={{ padding: "8px", textAlign: "right", fontWeight: 700 }}>{s.pct}%</td>
                          <td style={{ padding: "8px", textAlign: "right", fontWeight: 800 }}>{fmt(s.amt)}</td>
                        </tr>
                      ))}
                      <tr style={{ background: "#E8C061", color: "#1A1F3D", fontWeight: 800 }}>
                        <td style={{ padding: "10px 8px" }}></td>
                        <td colSpan="3" style={{ padding: "10px 8px" }}>ОБЩО (без резерв. такса)</td>
                        <td style={{ padding: "10px 8px", textAlign: "right" }}>100%</td>
                        <td style={{ padding: "10px 8px", textAlign: "right" }}>{fmt(totalSum)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                {/* CONDITIONS */}
                <div className="nt-o-section" style={{ padding: "0 30px 15px 30px" }}>
                  <div style={{ fontSize: 10, letterSpacing: 1, fontWeight: 700, borderBottom: "1px solid #E8C061", paddingBottom: 4, marginBottom: 8 }}>УСЛОВИЯ</div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 10, color: "#374151" }}>
                    <li style={{ padding: "3px 0" }}><span style={{ color: "#E8C061", fontWeight: 800 }}>• </span>Цените са с включен ДДС 20%</li>
                    <li style={{ padding: "3px 0" }}><span style={{ color: "#E8C061", fontWeight: 800 }}>• </span>Без индексация на цените до Акт 16</li>
                    <li style={{ padding: "3px 0" }}><span style={{ color: "#E8C061", fontWeight: 800 }}>• </span>Резервационна такса €5,000 — възстановима при подписване на предварителен договор</li>
                    <li style={{ padding: "3px 0" }}><span style={{ color: "#E8C061", fontWeight: 800 }}>• </span>При неподписване — резервационната такса остава за инвеститора</li>
                    <li style={{ padding: "3px 0" }}><span style={{ color: "#E8C061", fontWeight: 800 }}>• </span>Предложението е валидно 7 дни от датата на изготвяне ({dd}.{mm}.{yyyy})</li>
                  </ul>
                </div>
                
                {/* FOOTER */}
                <div className="nt-o-footer" style={{ background: "#F5E6C8", padding: "15px 30px", display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: 10, letterSpacing: 1, fontWeight: 700 }}>ВАШИЯТ БРОКЕР</div>
                    <div style={{ fontWeight: 800, fontSize: 13, marginTop: 4 }}>[Брокер]</div>
                    <div style={{ fontSize: 10, color: "#374151", marginTop: 3 }}>Имоти Премиер · Партньор продажби NEW TOWER</div>
                    <div style={{ fontSize: 10, color: "#374151", marginTop: 3 }}>📞 [Тел] · ✉ [Email]</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 800, fontSize: 11 }}>NEW TOWER</div>
                    <div style={{ fontSize: 10, color: "#374151", marginTop: 3 }}>ул. Девня 2, Център, Варна</div>
                    <div style={{ fontSize: 10, color: "#374151", marginTop: 3 }}>sales@newtower.bg · newtower.bg</div>
                    <div style={{ color: "#E8C061", fontSize: 9, fontWeight: 800, letterSpacing: 1, marginTop: 4 }}>Sky High Standards</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })()}
    </div>
  );
}
