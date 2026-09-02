import { useState, useMemo, useEffect, useRef } from "react";
const NT_LOGO = "data:image/png;base64,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";


// ═══════════════════════════════════════════════════════════════════
// NEW TOWER — ПРОЕКТ НОВ · PRICING SIMULATOR V8.7 (10.06.2026)
// Авто-изба + План на етажа + Резервация €5K + 2 схеми на плащане
// V7.2 конфигурация — 86 апт обезщ. + 45 изби обезщ. + 89 ПМ обезщ. | обновен 10.06.2026
// ═══════════════════════════════════════════════════════════════════

const C = {
  // V8.2 LIGHT THEME — cream background, navy text, gold accent
  navy: "#FAF7F0",   // main bg (warm off-white)
  navyL: "#EFE9DA",  // card bg (soft champagne)
  navyM: "#F5F0E2",  // gradient mid
  navyD: "#FFFFFF",  // pure white (darkest tone в light mode)
  gold: "#B58A2A",   // primary accent (saturated gold за четливост)
  goldL: "#E8C061",  // bright gold
  goldD: "#8A6820",  // dark gold
  wh: "#1A1F3D",     // primary text — deep navy
  gr: "#5C6378",     // secondary text
  grD: "#8B92A5",    // tertiary text
  ok: "#15803D",     // зелено
  err: "#B91C1C",    // червено
  bl: "#1D4ED8",     // синьо
  pur: "#6D28D9",    // лилав
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
    standardName: "Стандартна схема", aggressiveName: "Агресивна схема", deferredName: "Промоция 30/70 (следващи 50)", promoTitle: "ПРОМОЦИЯ 30/70 · следващите 50 резервации", promoSub: "30% при предварителен договор · 70% на Акт 15 · стандартна цена", promoLeft: "остават от 50", promoEnded: "Промоцията приключи",
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
    standardName: "Standard scheme", aggressiveName: "Aggressive scheme", deferredName: "Promo 30/70 (next 50)", promoTitle: "PROMO 30/70 · next 50 reservations", promoSub: "30% at preliminary contract · 70% at Act 15 · standard price", promoLeft: "left of 50", promoEnded: "Promo ended",
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
    standardName: "Стандартная схема", aggressiveName: "Агрессивная схема", deferredName: "Промо 30/70 (следующие 50)", promoTitle: "ПРОМО 30/70 · следующие 50 броней", promoSub: "30% при предв. договоре · 70% на Акт 15 · стандартная цена", promoLeft: "осталось из 50", promoEnded: "Промо завершено",
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



const INV = {"A":[{"s":"A","f":3,"n":1,"t":"3-стаен","e":"Запад/Север","c":102,"r":126.61,"tr":14.4,"iz":"A105","izr":2.7545},{"s":"A","f":3,"n":2,"t":"2-стаен","e":"Изток/Север","c":65.12,"r":80.62,"tr":24.3},{"s":"A","f":3,"n":3,"t":"2-стаен","e":"Изток","c":56.39,"r":70.03,"tr":20.5},{"s":"A","f":3,"n":4,"t":"2-стаен","e":"Изток","c":56.41,"r":70.05,"tr":20.4},{"s":"A","f":3,"n":5,"t":"3-стаен","e":"Изток/Юг","c":70.64,"r":91.51,"tr":57,"iz":"А8","izr":2.7861},{"s":"A","f":3,"n":6,"t":"2-стаен","e":"Юг","c":53.67,"r":66.81,"tr":20.8},{"s":"A","f":3,"n":7,"t":"3-стаен","e":"Юг/Запад","c":80.56,"r":103.54,"tr":60.6,"iz":"А50","izr":2.8283},{"s":"A","f":3,"n":8,"t":"2-стаен","e":"Запад","c":53.84,"r":66.95,"tr":19.8},{"s":"A","f":3,"n":9,"t":"2-стаен","e":"Запад","c":51.8,"r":64.56,"tr":20.4},{"s":"A","f":4,"n":10,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":132.33,"iz":"А81","izr":2.8283},{"s":"A","f":4,"n":11,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":127.93,"iz":"А77","izr":2.9128},{"s":"A","f":4,"n":12,"t":"2-стаен","e":"Изток","c":65.8,"r":78.43},{"s":"A","f":4,"n":13,"t":"2-стаен","e":"Изток","c":65.88,"r":78.53},{"s":"A","f":4,"n":14,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":115.78,"iz":"А13","izr":2.9444,"rez":true},{"s":"A","f":4,"n":15,"t":"2-стаен","e":"Юг","c":64.38,"r":76.74},{"s":"A","f":4,"n":16,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":130.45,"iz":"А65","izr":2.9866},{"s":"A","f":4,"n":17,"t":"2-стаен","e":"Запад","c":64.05,"r":76.35},{"s":"A","f":4,"n":18,"t":"2-стаен","e":"Запад","c":62.2,"r":74.14},{"s":"A","f":5,"n":19,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":129.5,"sold":true,"reason":"obez"},{"s":"A","f":5,"n":20,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":125.01,"sold":true,"reason":"obez"},{"s":"A","f":5,"n":21,"t":"2-стаен","e":"Изток","c":65.8,"r":78.43,"sold":true,"reason":"obez"},{"s":"A","f":5,"n":22,"t":"2-стаен","e":"Изток","c":65.88,"r":78.53,"sold":true,"reason":"obez"},{"s":"A","f":5,"n":23,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":112.83,"sold":true,"reason":"obez"},{"s":"A","f":5,"n":24,"t":"2-стаен","e":"Юг","c":64.38,"r":76.74,"sold":true,"reason":"obez"},{"s":"A","f":5,"n":25,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":127.46,"sold":true,"reason":"obez"},{"s":"A","f":5,"n":26,"t":"2-стаен","e":"Запад","c":64.05,"r":79.17,"sold":true,"reason":"obez"},{"s":"A","f":5,"n":27,"t":"2-стаен","e":"Запад","c":62.2,"r":74.14,"sold":true,"reason":"obez"},{"s":"A","f":6,"n":28,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":132.6,"iz":"А14","izr":3.1027},{"s":"A","f":6,"n":29,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":128.12,"iz":"A99","izr":3.1027},{"s":"A","f":6,"n":30,"t":"2-стаен","e":"Изток","c":65.8,"r":78.43},{"s":"A","f":6,"n":31,"t":"2-стаен","e":"Изток","c":65.88,"r":78.53},{"s":"A","f":6,"n":32,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":115.96,"iz":"А10","izr":3.1238},{"s":"A","f":6,"n":33,"t":"2-стаен","e":"Юг","c":64.38,"r":76.74},{"s":"A","f":6,"n":34,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":130.58,"iz":"А70","izr":3.1238},{"s":"A","f":6,"n":35,"t":"2-стаен","e":"Запад","c":64.05,"r":76.35},{"s":"A","f":6,"n":36,"t":"2-стаен","e":"Запад","c":62.2,"r":74.14},{"s":"A","f":7,"n":37,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":132.63,"iz":"А12","izr":3.1344},{"s":"A","f":7,"n":38,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":128.15,"iz":"А11","izr":3.1344},{"s":"A","f":7,"n":39,"t":"2-стаен","e":"Изток","c":65.8,"r":78.43},{"s":"A","f":7,"n":40,"t":"2-стаен","e":"Изток","c":65.88,"r":78.53},{"s":"A","f":7,"n":41,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":115.97,"iz":"A97","izr":3.1344},{"s":"A","f":7,"n":42,"t":"2-стаен","e":"Юг","c":64.38,"r":76.74},{"s":"A","f":7,"n":43,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":130.59,"iz":"A96","izr":3.1344},{"s":"A","f":7,"n":44,"t":"2-стаен","e":"Запад","c":64.05,"r":76.35},{"s":"A","f":7,"n":45,"t":"2-стаен","e":"Запад","c":62.2,"r":74.14},{"s":"A","f":8,"n":46,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":132.07,"sold":true,"reason":"obez"},{"s":"A","f":8,"n":47,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":125.01,"sold":true,"reason":"obez"},{"s":"A","f":8,"n":48,"t":"2-стаен","e":"Изток","c":65.8,"r":81.05,"sold":true,"reason":"obez"},{"s":"A","f":8,"n":49,"t":"2-стаен","e":"Изток","c":65.88,"r":78.53,"sold":true,"reason":"obez"},{"s":"A","f":8,"n":50,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":112.83,"sold":true,"reason":"obez"},{"s":"A","f":8,"n":51,"t":"2-стаен","e":"Юг","c":64.38,"r":79.75,"sold":true,"reason":"obez"},{"s":"A","f":8,"n":52,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":127.46,"sold":true,"reason":"obez"},{"s":"A","f":8,"n":53,"t":"2-стаен","e":"Запад","c":64.05,"r":79.89,"sold":true,"reason":"obez"},{"s":"A","f":8,"n":54,"t":"2-стаен","e":"Запад","c":62.2,"r":74.14,"sold":true,"reason":"obez"},{"s":"A","f":9,"n":55,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":132.44,"sold":true,"reason":"obezsht"},{"s":"A","f":9,"n":56,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":125.01,"sold":true,"reason":"obezsht"},{"s":"A","f":9,"n":57,"t":"2-стаен","e":"Изток","c":65.8,"r":81.23,"sold":true,"reason":"obezsht"},{"s":"A","f":9,"n":58,"t":"2-стаен","e":"Изток","c":65.88,"r":78.53,"sold":true,"reason":"obezsht"},{"s":"A","f":9,"n":59,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":115.97,"sold":true,"reason":"obezsht"},{"s":"A","f":9,"n":60,"t":"2-стаен","e":"Юг","c":64.38,"r":80.69,"sold":true,"reason":"obezsht"},{"s":"A","f":9,"n":61,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":127.46,"sold":true,"reason":"obezsht"},{"s":"A","f":9,"n":62,"t":"2-стаен","e":"Запад","c":64.05,"r":79.62,"sold":true,"reason":"obezsht"},{"s":"A","f":9,"n":63,"t":"2-стаен","e":"Запад","c":62.2,"r":74.14,"sold":true,"reason":"obezsht"},{"s":"A","f":10,"n":64,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":129.5,"sold":true,"reason":"obez"},{"s":"A","f":10,"n":65,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":128.35,"sold":true,"reason":"obez"},{"s":"A","f":10,"n":66,"t":"2-стаен","e":"Изток","c":65.8,"r":78.43,"sold":true,"reason":"obez"},{"s":"A","f":10,"n":67,"t":"2-стаен","e":"Изток","c":65.88,"r":81.5,"sold":true,"reason":"obez"},{"s":"A","f":10,"n":68,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":112.83,"sold":true,"reason":"obez"},{"s":"A","f":10,"n":69,"t":"2-стаен","e":"Юг","c":64.38,"r":76.74,"sold":true,"reason":"obez"},{"s":"A","f":10,"n":70,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":130.38,"sold":true,"reason":"obez"},{"s":"A","f":10,"n":71,"t":"2-стаен","e":"Запад","c":64.05,"r":76.35,"sold":true,"reason":"obez"},{"s":"A","f":10,"n":72,"t":"2-стаен","e":"Запад","c":62.2,"r":74.14,"sold":true,"reason":"obez"},{"s":"A","f":11,"n":73,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":133.34,"sold":true,"reason":"obez"},{"s":"A","f":11,"n":74,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":125.01,"sold":true,"reason":"obez"},{"s":"A","f":11,"n":75,"t":"2-стаен","e":"Изток","c":65.8,"r":81.44,"sold":true,"reason":"obez"},{"s":"A","f":11,"n":76,"t":"2-стаен","e":"Изток","c":65.88,"r":78.53,"sold":true,"reason":"obez"},{"s":"A","f":11,"n":77,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":116.75,"sold":true,"reason":"obez"},{"s":"A","f":11,"n":78,"t":"2-стаен","e":"Юг","c":64.38,"r":80.97,"sold":true,"reason":"obez"},{"s":"A","f":11,"n":79,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":147.11,"sold":true,"reason":"obez"},{"s":"A","f":11,"n":80,"t":"2-стаен","e":"Запад","c":64.05,"r":80.44,"sold":true,"reason":"obez"},{"s":"A","f":11,"n":81,"t":"2-стаен","e":"Запад","c":62.2,"r":74.14,"sold":true,"reason":"obez"},{"s":"A","f":12,"n":82,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":132.66,"iz":"А40","izr":3.166},{"s":"A","f":12,"n":83,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":128.23,"iz":"А42","izr":3.2188},{"s":"A","f":12,"n":84,"t":"2-стаен","e":"Изток","c":65.8,"r":78.43},{"s":"A","f":12,"n":85,"t":"2-стаен","e":"Изток","c":65.88,"r":78.53},{"s":"A","f":12,"n":86,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":116.06,"iz":"А38","izr":3.2294},{"s":"A","f":12,"n":87,"t":"2-стаен","e":"Юг","c":64.38,"r":76.74},{"s":"A","f":12,"n":88,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":130.72,"iz":"А41","izr":3.261},{"s":"A","f":12,"n":89,"t":"2-стаен","e":"Запад","c":64.05,"r":76.35},{"s":"A","f":12,"n":90,"t":"2-стаен","e":"Запад","c":62.2,"r":74.14},{"s":"A","f":13,"n":91,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":132.83,"iz":"А15","izr":3.3349},{"s":"A","f":13,"n":92,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":128.39,"iz":"А52","izr":3.3771},{"s":"A","f":13,"n":93,"t":"2-стаен","e":"Изток","c":65.8,"r":78.43},{"s":"A","f":13,"n":94,"t":"2-стаен","e":"Изток","c":65.88,"r":78.53},{"s":"A","f":13,"n":95,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":116.36,"iz":"А78","izr":3.5249},{"s":"A","f":13,"n":96,"t":"2-стаен","e":"Юг","c":64.38,"r":76.74},{"s":"A","f":13,"n":97,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":130.98,"iz":"А79","izr":3.5249},{"s":"A","f":13,"n":98,"t":"2-стаен","e":"Запад","c":64.05,"r":76.35},{"s":"A","f":13,"n":99,"t":"2-стаен","e":"Запад","c":62.2,"r":74.14},{"s":"A","f":14,"n":100,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":129.5,"sold":true,"reason":"obez"},{"s":"A","f":14,"n":101,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":125.01,"sold":true,"reason":"obez"},{"s":"A","f":14,"n":102,"t":"2-стаен","e":"Изток","c":65.8,"r":78.43,"sold":true,"reason":"obez"},{"s":"A","f":14,"n":103,"t":"2-стаен","e":"Изток","c":65.88,"r":80.85,"sold":true,"reason":"obez"},{"s":"A","f":14,"n":104,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":115.45,"sold":true,"reason":"obez"},{"s":"A","f":14,"n":105,"t":"2-стаен","e":"Юг","c":64.38,"r":80.64,"sold":true,"reason":"obez"},{"s":"A","f":14,"n":106,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":127.46,"sold":true,"reason":"obez"},{"s":"A","f":14,"n":107,"t":"2-стаен","e":"Запад","c":64.05,"r":76.35,"sold":true,"reason":"obez"},{"s":"A","f":14,"n":108,"t":"2-стаен","e":"Запад","c":62.2,"r":79.14,"sold":true,"reason":"obez"},{"s":"A","f":15,"n":109,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":133.08,"iz":"А72","izr":3.5776},{"s":"A","f":15,"n":110,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":128.6,"iz":"А51","izr":3.5882},{"s":"A","f":15,"n":111,"t":"2-стаен","e":"Изток","c":65.8,"r":78.43},{"s":"A","f":15,"n":112,"t":"2-стаен","e":"Изток","c":65.88,"r":78.53},{"s":"A","f":15,"n":113,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":116.65,"iz":"А71","izr":3.8204},{"s":"A","f":15,"n":114,"t":"2-стаен","e":"Юг","c":64.38,"r":76.74},{"s":"A","f":15,"n":115,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":131.3,"iz":"А39","izr":3.8415},{"s":"A","f":15,"n":116,"t":"2-стаен","e":"Запад","c":64.05,"r":76.35},{"s":"A","f":15,"n":117,"t":"2-стаен","e":"Запад","c":62.2,"r":74.14},{"s":"A","f":16,"n":118,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":133.34,"iz":"А74","izr":3.8415},{"s":"A","f":16,"n":119,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":128.87,"iz":"А45","izr":3.852},{"s":"A","f":16,"n":120,"t":"2-стаен","e":"Изток","c":65.8,"r":78.43},{"s":"A","f":16,"n":121,"t":"2-стаен","e":"Изток","c":65.88,"r":78.53},{"s":"A","f":16,"n":122,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":116.69,"iz":"А46","izr":3.852},{"s":"A","f":16,"n":123,"t":"2-стаен","e":"Юг","c":64.38,"r":76.74},{"s":"A","f":16,"n":124,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":131.31,"iz":"А47","izr":3.852},{"s":"A","f":16,"n":125,"t":"2-стаен","e":"Запад","c":64.05,"r":76.35},{"s":"A","f":16,"n":126,"t":"2-стаен","e":"Запад","c":62.2,"r":74.14},{"s":"A","f":17,"n":127,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":129.5,"sold":true,"reason":"obez"},{"s":"A","f":17,"n":128,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":129.25,"sold":true,"reason":"obez"},{"s":"A","f":17,"n":129,"t":"2-стаен","e":"Изток","c":65.8,"r":78.43,"sold":true,"reason":"obez"},{"s":"A","f":17,"n":130,"t":"2-стаен","e":"Изток","c":65.88,"r":84.49,"sold":true,"reason":"obez"},{"s":"A","f":17,"n":131,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":112.83,"sold":true,"reason":"obez"},{"s":"A","f":17,"n":132,"t":"2-стаен","e":"Юг","c":64.38,"r":79.58,"sold":true,"reason":"obez"},{"s":"A","f":17,"n":133,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":127.46,"sold":true,"reason":"obez"},{"s":"A","f":17,"n":134,"t":"2-стаен","e":"Запад","c":64.05,"r":76.35,"sold":true,"reason":"obez"},{"s":"A","f":17,"n":135,"t":"2-стаен","e":"Запад","c":62.2,"r":76.96,"sold":true,"reason":"obez"},{"s":"A","f":18,"n":136,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":133.38,"iz":"А19","izr":3.8837},{"s":"A","f":18,"n":137,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":128.9,"iz":"А73","izr":3.8837},{"s":"A","f":18,"n":138,"t":"2-стаен","e":"Изток","c":65.8,"r":78.43},{"s":"A","f":18,"n":139,"t":"2-стаен","e":"Изток","c":65.88,"r":78.53},{"s":"A","f":18,"n":140,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":115.67,"sold":true,"reason":"obezsht"},{"s":"A","f":18,"n":141,"t":"2-стаен","e":"Юг","c":64.38,"r":76.74,"sold":true,"reason":"obezsht"},{"s":"A","f":18,"n":142,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":127.46,"sold":true,"reason":"obezsht"},{"s":"A","f":18,"n":143,"t":"2-стаен","e":"Запад","c":64.05,"r":81.34,"sold":true,"reason":"obezsht"},{"s":"A","f":18,"n":144,"t":"2-стаен","e":"Запад","c":62.2,"r":74.14},{"s":"A","f":19,"n":145,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":129.5},{"s":"A","f":19,"n":146,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":128.91,"iz":"А26","izr":3.8942},{"s":"A","f":19,"n":147,"t":"2-стаен","e":"Изток","c":65.8,"r":78.43},{"s":"A","f":19,"n":148,"t":"2-стаен","e":"Изток","c":65.88,"r":78.53},{"s":"A","f":19,"n":149,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":116.76,"iz":"А44","izr":3.9259},{"s":"A","f":19,"n":150,"t":"2-стаен","e":"Юг","c":64.38,"r":76.74},{"s":"A","f":19,"n":151,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":131.41,"iz":"А23","izr":3.947},{"s":"A","f":19,"n":152,"t":"2-стаен","e":"Запад","c":64.05,"r":76.35},{"s":"A","f":19,"n":153,"t":"2-стаен","e":"Запад","c":62.2,"r":76.63,"iz":"А37","izr":2.4906},{"s":"A","f":20,"n":154,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":129.5,"sold":true,"reason":"obez"},{"s":"A","f":20,"n":155,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":127.59,"sold":true,"reason":"obez"},{"s":"A","f":20,"n":156,"t":"2-стаен","e":"Изток","c":65.8,"r":78.43,"sold":true,"reason":"obez"},{"s":"A","f":20,"n":157,"t":"2-стаен","e":"Изток","c":65.88,"r":81.02,"sold":true,"reason":"obez"},{"s":"A","f":20,"n":158,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":117.84,"sold":true,"reason":"obez"},{"s":"A","f":20,"n":159,"t":"2-стаен","e":"Юг","c":64.38,"r":79.39,"sold":true,"reason":"obez"},{"s":"A","f":20,"n":160,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":127.46,"sold":true,"reason":"obez"},{"s":"A","f":20,"n":161,"t":"2-стаен","e":"Запад","c":64.05,"r":81.77,"sold":true,"reason":"obez"},{"s":"A","f":20,"n":162,"t":"2-стаен","e":"Запад","c":62.2,"r":74.14,"sold":true,"reason":"obez"},{"s":"A","f":21,"n":163,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":133.47,"iz":"А49","izr":3.9681},{"s":"A","f":21,"n":164,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":129.11,"iz":"А18","izr":4.0947},{"s":"A","f":21,"n":165,"t":"2-стаен","e":"Изток","c":65.8,"r":80.94,"iz":"А69","izr":2.5117},{"s":"A","f":21,"n":166,"t":"2-стаен","e":"Изток","c":65.88,"r":81.1,"iz":"А54","izr":2.575},{"s":"A","f":21,"n":167,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":116.93,"iz":"А75","izr":4.0947,"rez":true},{"s":"A","f":21,"n":168,"t":"2-стаен","e":"Юг","c":64.38,"r":79.32,"iz":"А53","izr":2.575},{"s":"A","f":21,"n":169,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":131.6,"iz":"А17","izr":4.137},{"s":"A","f":21,"n":170,"t":"2-стаен","e":"Запад","c":64.05,"r":78.94,"iz":"А68","izr":2.5962},{"s":"A","f":21,"n":171,"t":"2-стаен","e":"Запад","c":62.2,"r":76.77,"iz":"А9","izr":2.6278},{"s":"A","f":22,"n":172,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":129.5},{"s":"A","f":22,"n":173,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":129.25,"iz":"А25","izr":4.2319},{"s":"A","f":22,"n":174,"t":"2-стаен","e":"Изток","c":65.8,"r":81.06,"iz":"A94","izr":2.6278},{"s":"A","f":22,"n":175,"t":"2-стаен","e":"Изток","c":65.88,"r":81.18,"iz":"А16","izr":2.6489},{"s":"A","f":22,"n":176,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":117.07,"iz":"А24","izr":4.2319},{"s":"A","f":22,"n":177,"t":"2-стаен","e":"Юг","c":64.38,"r":79.39,"iz":"A101","izr":2.6489},{"s":"A","f":22,"n":178,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":131.7,"iz":"А22","izr":4.2425},{"s":"A","f":22,"n":179,"t":"2-стаен","e":"Запад","c":64.05,"r":79.04,"iz":"А43","izr":2.6911},{"s":"A","f":22,"n":180,"t":"2-стаен","e":"Запад","c":62.2,"r":76.9,"iz":"А20","izr":2.7545},{"s":"A","f":23,"n":181,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":132.85,"sold":true,"reason":"obez"},{"s":"A","f":23,"n":182,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":127.63,"sold":true,"reason":"obez"},{"s":"A","f":23,"n":183,"t":"2-стаен","e":"Изток","c":65.8,"r":78.43,"sold":true,"reason":"obez"},{"s":"A","f":23,"n":184,"t":"2-стаен","e":"Изток","c":65.88,"r":81.18,"sold":true,"reason":"obez"},{"s":"A","f":23,"n":185,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":115.93,"sold":true,"reason":"obez"},{"s":"A","f":23,"n":186,"t":"2-стаен","e":"Юг","c":64.38,"r":79.62,"sold":true,"reason":"obez"},{"s":"A","f":23,"n":187,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":127.46,"sold":true,"reason":"obez"},{"s":"A","f":23,"n":188,"t":"2-стаен","e":"Запад","c":64.05,"r":79.19,"sold":true,"reason":"obez"},{"s":"A","f":23,"n":189,"t":"2-стаен","e":"Запад","c":62.2,"r":76.98,"sold":true,"reason":"obez"},{"s":"A","f":24,"n":190,"t":"3-стаен","e":"Запад/Север","c":108.64,"r":133.38,"sold":true,"reason":"halted","iz":"A104","izr":3.8837},{"s":"A","f":24,"n":191,"t":"3-стаен","e":"Изток/Север","c":104.88,"r":129.15,"sold":true,"reason":"halted","iz":"A102","izr":4.137},{"s":"A","f":24,"n":192,"t":"2-стаен","e":"Изток","c":65.8,"r":83.39,"sold":true,"reason":"halted","iz":"А48","izr":4.9601},{"s":"A","f":24,"n":193,"t":"2-стаен","e":"Изток","c":65.88,"r":85.21,"sold":true,"reason":"halted","iz":"А21","izr":6.6803},{"s":"A","f":24,"n":194,"t":"3-стаен","e":"Изток/Юг","c":94.66,"r":117.08,"sold":true,"reason":"halted","iz":"A107","izr":4.2425},{"s":"A","f":24,"n":195,"t":"2-стаен","e":"Юг","c":64.38,"r":81.44,"sold":true,"reason":"halted","iz":"А76","izr":4.6963},{"s":"A","f":24,"n":196,"t":"3-стаен","e":"Юг/Запад","c":106.93,"r":134.14,"sold":true,"reason":"halted","iz":"A106","izr":6.6803},{"s":"A","f":24,"n":197,"t":"2-стаен","e":"Запад","c":64.05,"r":80.93,"sold":true,"reason":"halted","iz":"А66","izr":4.5802},{"s":"A","f":24,"n":198,"t":"2-стаен","e":"Запад","c":62.2,"r":76.46,"sold":true,"reason":"halted","iz":"А27","izr":2.3218},{"s":"A","f":25,"n":199,"t":"Пентхаус","e":"Запад/Север","c":142.27,"r":196.33,"sold":true,"reason":"halted","iz":"А6 + А7","izr":20.4948,"pmDoor":"ПМ111 + ПМ112"},{"s":"A","f":25,"n":200,"t":"Пентхаус","e":"Изток/Север","c":104.88,"r":150.14,"sold":true,"reason":"halted","iz":"A86 + A87","izr":19.9346,"pmDoor":"ПМ249 + ПМ250"},{"s":"A","f":25,"n":201,"t":"2-стаен","e":"Изток","c":65.8,"r":89.16,"sold":true,"reason":"halted","iz":"А4","izr":10.7223,"pmDoor":"ПМ106"},{"s":"A","f":25,"n":202,"t":"2-стаен","e":"Изток","c":65.88,"r":87.16,"sold":true,"reason":"halted","iz":"А3","izr":8.6327,"pmDoor":"ПМ105"},{"s":"A","f":25,"n":203,"t":"Пентхаус","e":"Изток/Юг","c":132,"r":183.1,"sold":true,"reason":"halted","iz":"A91 + А92","izr":20.4948,"pmDoor":"ПМ257 + ПМ258"},{"s":"A","f":25,"n":204,"t":"Пентхаус","e":"Юг/Запад","c":134.35,"r":196.78,"sold":true,"reason":"obez"},{"s":"A","f":25,"n":205,"t":"3-стаен","e":"Запад","c":92.71,"r":123.03,"sold":true,"reason":"halted","iz":"А5","izr":12.5164,"pmDoor":"ПМ107"}],"B":[{"s":"B","f":3,"n":1,"t":"2-стаен","e":"Изток/Север","c":51.53,"r":64.45,"rez":true,"pmDoor":"ПМ175"},{"s":"B","f":3,"n":2,"t":"Студио","e":"Изток","c":40.78,"r":48.61},{"s":"B","f":3,"n":3,"t":"2-стаен","e":"Изток","c":54,"r":64.37},{"s":"B","f":3,"n":4,"t":"3-стаен","e":"Изток/Юг","c":83.8,"r":103.69,"iz":"Б41","izr":3.7992},{"s":"B","f":3,"n":5,"t":"3-стаен","e":"Юг/Запад","c":78.89,"r":97.84,"iz":"Б37","izr":3.7992},{"s":"B","f":3,"n":6,"t":"2-стаен","e":"Запад","c":57.07,"r":68.03},{"s":"B","f":3,"n":7,"t":"2-стаен","e":"Запад/Север","c":52.71,"r":62.83},{"s":"B","f":4,"n":8,"t":"2-стаен","e":"Изток/Север","c":51.53,"r":61.42},{"s":"B","f":4,"n":9,"t":"2-стаен","e":"Изток","c":56.45,"r":67.29},{"s":"B","f":4,"n":10,"t":"2-стаен","e":"Изток","c":54,"r":64.37},{"s":"B","f":4,"n":11,"t":"3-стаен","e":"Изток/Юг","c":83.8,"r":103.99,"iz":"Б40","izr":4.1053},{"s":"B","f":4,"n":12,"t":"3-стаен","e":"Юг/Запад","c":78.89,"r":98.15,"iz":"Б19","izr":4.1159},{"s":"B","f":4,"n":13,"t":"2-стаен","e":"Запад","c":57.07,"r":68.03},{"s":"B","f":4,"n":14,"t":"2-стаен","e":"Запад/Север","c":52.71,"r":62.83},{"s":"B","f":5,"n":15,"t":"2-стаен","e":"Изток/Север","c":51.53,"r":61.42},{"s":"B","f":5,"n":16,"t":"2-стаен","e":"Изток","c":56.45,"r":67.29},{"s":"B","f":5,"n":17,"t":"2-стаен","e":"Изток","c":54,"r":64.37},{"s":"B","f":5,"n":18,"t":"3-стаен","e":"Изток/Юг","c":83.8,"r":104.12,"iz":"Б39","izr":4.2319},{"s":"B","f":5,"n":19,"t":"3-стаен","e":"Юг/Запад","c":78.89,"r":98.28,"iz":"Б18","izr":4.2425},{"s":"B","f":5,"n":20,"t":"2-стаен","e":"Запад","c":57.07,"r":68.03},{"s":"B","f":5,"n":21,"t":"2-стаен","e":"Запад/Север","c":52.71,"r":62.83},{"s":"B","f":6,"n":22,"t":"2-стаен","e":"Изток/Север","c":51.53,"r":61.42},{"s":"B","f":6,"n":23,"t":"2-стаен","e":"Изток","c":56.45,"r":67.29},{"s":"B","f":6,"n":24,"t":"2-стаен","e":"Изток","c":54,"r":64.37},{"s":"B","f":6,"n":25,"t":"3-стаен","e":"Изток/Юг","c":83.8,"r":104.16,"iz":"Б15","izr":4.2742},{"s":"B","f":6,"n":26,"t":"3-стаен","e":"Юг/Запад","c":78.89,"r":94.03,"pmDoor":"ПМ168"},{"s":"B","f":6,"n":27,"t":"2-стаен","e":"Запад","c":57.07,"r":68.03,"rez":true},{"s":"B","f":6,"n":28,"t":"2-стаен","e":"Запад/Север","c":52.71,"r":62.83,"rez":true},{"s":"B","f":7,"n":29,"t":"2-стаен","e":"Изток/Север","c":51.53,"r":61.42},{"s":"B","f":7,"n":30,"t":"2-стаен","e":"Изток","c":56.45,"r":67.29},{"s":"B","f":7,"n":31,"t":"2-стаен","e":"Изток","c":54,"r":64.37},{"s":"B","f":7,"n":32,"t":"3-стаен","e":"Изток/Юг","c":83.8,"r":99.89,"pmDoor":"ПМ273"},{"s":"B","f":7,"n":33,"t":"3-стаен","e":"Юг/Запад","c":78.89,"r":94.03,"pmDoor":"ПМ21"},{"s":"B","f":7,"n":34,"t":"2-стаен","e":"Запад","c":57.07,"r":68.03},{"s":"B","f":7,"n":35,"t":"2-стаен","e":"Запад/Север","c":52.71,"r":62.83,"rez":true},{"s":"B","f":8,"n":36,"t":"2-стаен","e":"Изток/Север","c":51.53,"r":61.42},{"s":"B","f":8,"n":37,"t":"2-стаен","e":"Изток","c":56.45,"r":67.29},{"s":"B","f":8,"n":38,"t":"2-стаен","e":"Изток","c":54,"r":64.37},{"s":"B","f":8,"n":39,"t":"3-стаен","e":"Изток/Юг","c":83.8,"r":99.89,"pmDoor":"ПМ272"},{"s":"B","f":8,"n":40,"t":"3-стаен","e":"Юг/Запад","c":78.89,"r":94.03,"pmDoor":"ПМ275"},{"s":"B","f":8,"n":41,"t":"2-стаен","e":"Запад","c":57.07,"r":68.03},{"s":"B","f":8,"n":42,"t":"2-стаен","e":"Запад/Север","c":52.71,"r":62.83},{"s":"B","f":9,"n":43,"t":"2-стаен","e":"Изток/Север","c":51.53,"r":61.42},{"s":"B","f":9,"n":44,"t":"2-стаен","e":"Изток","c":56.45,"r":67.29},{"s":"B","f":9,"n":45,"t":"2-стаен","e":"Изток","c":54,"r":64.37},{"s":"B","f":9,"n":46,"t":"3-стаен","e":"Изток/Юг","c":83.8,"r":107.17,"iz":"Б31","izr":7.2819},{"s":"B","f":9,"n":47,"t":"3-стаен","e":"Юг/Запад","c":78.89,"r":101.34,"iz":"Б10","izr":7.303},{"s":"B","f":9,"n":48,"t":"2-стаен","e":"Запад","c":57.07,"r":68.03},{"s":"B","f":9,"n":49,"t":"2-стаен","e":"Запад/Север","c":52.71,"r":62.83,"rez":true},{"s":"B","f":10,"n":50,"t":"2-стаен","e":"Изток/Север","c":51.53,"r":61.42},{"s":"B","f":10,"n":51,"t":"2-стаен","e":"Изток","c":56.45,"r":67.29},{"s":"B","f":10,"n":52,"t":"2-стаен","e":"Изток","c":54,"r":64.37},{"s":"B","f":10,"n":53,"t":"3-стаен","e":"Изток/Юг","c":83.8,"r":99.89,"pmDoor":"ПМ23"},{"s":"B","f":10,"n":54,"t":"3-стаен","e":"Юг/Запад","c":78.89,"r":94.03,"pmDoor":"ПМ22"},{"s":"B","f":10,"n":55,"t":"2-стаен","e":"Запад","c":57.07,"r":68.03},{"s":"B","f":10,"n":56,"t":"2-стаен","e":"Запад/Север","c":52.71,"r":62.83},{"s":"B","f":11,"n":57,"t":"2-стаен","e":"Изток/Север","c":51.53,"r":61.42},{"s":"B","f":11,"n":58,"t":"2-стаен","e":"Изток","c":56.45,"r":67.29},{"s":"B","f":11,"n":59,"t":"2-стаен","e":"Изток","c":54,"r":64.37},{"s":"B","f":11,"n":60,"t":"3-стаен","e":"Изток/Юг","c":83.8,"r":99.89,"pmDoor":"ПМ276"},{"s":"B","f":11,"n":61,"t":"3-стаен","e":"Юг/Запад","c":78.89,"r":94.03,"pmDoor":"ПМ274"},{"s":"B","f":11,"n":62,"t":"2-стаен","e":"Запад","c":57.07,"r":68.03},{"s":"B","f":11,"n":63,"t":"2-стаен","e":"Запад/Север","c":52.71,"r":62.83},{"s":"B","f":12,"n":64,"t":"2-стаен","e":"Изток/Север","c":51.53,"r":61.42},{"s":"B","f":12,"n":65,"t":"2-стаен","e":"Изток","c":56.45,"r":67.29,"pmDoor":"ПМ167"},{"s":"B","f":12,"n":66,"t":"2-стаен","e":"Изток","c":54,"r":64.37},{"s":"B","f":12,"n":67,"t":"3-стаен","e":"Изток/Юг","c":83.8,"r":99.89,"pmDoor":"ПМ132"},{"s":"B","f":12,"n":68,"t":"3-стаен","e":"Юг/Запад","c":78.89,"r":94.03,"pmDoor":"ПМ129"},{"s":"B","f":12,"n":69,"t":"2-стаен","e":"Запад","c":57.07,"r":68.03},{"s":"B","f":12,"n":70,"t":"2-стаен","e":"Запад/Север","c":52.71,"r":62.83},{"s":"B","f":13,"n":71,"t":"2-стаен","e":"Изток/Север","c":51.53,"r":61.42},{"s":"B","f":13,"n":72,"t":"2-стаен","e":"Изток","c":56.45,"r":67.29},{"s":"B","f":13,"n":73,"t":"2-стаен","e":"Изток","c":54,"r":64.37},{"s":"B","f":13,"n":74,"t":"3-стаен","e":"Изток/Юг","c":83.8,"r":99.89,"pmDoor":"ПМ131"},{"s":"B","f":13,"n":75,"t":"3-стаен","e":"Юг/Запад","c":78.89,"r":102.18,"iz":"Б14","izr":8.1367},{"s":"B","f":13,"n":76,"t":"2-стаен","e":"Запад","c":57.07,"r":68.03},{"s":"B","f":13,"n":77,"t":"2-стаен","e":"Запад/Север","c":52.71,"r":62.83},{"s":"B","f":14,"n":78,"t":"2-стаен","e":"Изток/Север","c":51.53,"r":61.42},{"s":"B","f":14,"n":79,"t":"2-стаен","e":"Изток","c":56.45,"r":67.29},{"s":"B","f":14,"n":80,"t":"2-стаен","e":"Изток","c":54,"r":64.37,"pmDoor":"ПМ169"},{"s":"B","f":14,"n":81,"t":"3-стаен","e":"Изток/Юг","c":83.8,"r":108.08,"iz":"Б35","izr":8.1895},{"s":"B","f":14,"n":82,"t":"3-стаен","e":"Юг/Запад","c":78.89,"r":102.71,"iz":"Б17","izr":8.6749},{"s":"B","f":14,"n":83,"t":"2-стаен","e":"Запад","c":57.07,"r":71.04,"iz":"Б12","izr":3.0077},{"s":"B","f":14,"n":84,"t":"2-стаен","e":"Запад/Север","c":52.71,"r":65.84,"iz":"Б21","izr":3.0077},{"s":"B","f":15,"n":85,"t":"2-стаен","e":"Изток/Север","c":51.53,"r":65.72,"iz":"Б36","izr":4.2953},{"s":"B","f":15,"n":86,"t":"2-стаен","e":"Изток","c":56.45,"r":70.54,"iz":"Б11","izr":3.2505,"rez":true},{"s":"B","f":15,"n":87,"t":"2-стаен","e":"Изток","c":54,"r":67.79,"iz":"Б13","izr":3.4193,"rez":true},{"s":"B","f":15,"n":88,"t":"3-стаен","e":"Изток/Юг","c":83.8,"r":99.89,"pmDoor":"ПМ130"},{"s":"B","f":15,"n":89,"t":"3-стаен","e":"Юг/Запад","c":78.89,"r":102.77,"iz":"Б38","izr":8.7277},{"s":"B","f":15,"n":90,"t":"2-стаен","e":"Запад","c":57.07,"r":71.46,"iz":"Б32","izr":3.4299},{"s":"B","f":15,"n":91,"t":"2-стаен","e":"Запад/Север","c":52.71,"r":66.27,"iz":"Б34","izr":3.4404},{"s":"B","f":16,"n":92,"t":"2-стаен","e":"Изток/Север","c":51.53,"r":61.42,"pmDoor":"ПМ128"},{"s":"B","f":16,"n":93,"t":"2-стаен","e":"Изток","c":56.45,"r":70.75,"iz":"Б42","izr":3.4615},{"s":"B","f":16,"n":94,"t":"4-стаен","e":"Изток/Юг","c":144.54,"r":172.29,"pmDoor":"ПМ275а"},{"s":"B","f":16,"n":95,"t":"3-стаен","e":"Юг/Запад","c":78.89,"r":94.03,"pmDoor":"ПМ133"},{"s":"B","f":16,"n":96,"t":"2-стаен","e":"Запад","c":57.07,"r":71.57,"iz":"Б20","izr":3.546},{"s":"B","f":16,"n":97,"t":"2-стаен","e":"Запад/Север","c":52.71,"r":66.6,"iz":"Б16","izr":3.7676}],"P":[{"id":"ПМ1","lvl":"подз.-2","a":16.31,"g":"ФИКС €35K","p":35000},{"id":"ПМ2","lvl":"подз.-2","a":13.75,"g":"ФИКС €35K","p":35000},{"id":"ПМ3","lvl":"подз.-2","a":14.64,"g":"ФИКС €35K","p":35000},{"id":"ПМ4","lvl":"подз.-2","a":16.02,"g":"ФИКС €35K","p":35000},{"id":"ПМ5","lvl":"подз.-2","a":14.64,"g":"ФИКС €35K","p":35000},{"id":"ПМ6","lvl":"подз.-2","a":14.68,"g":"ФИКС €35K","p":35000},{"id":"ПМ7","lvl":"подз.-2","a":14.64,"g":"ФИКС €35K","p":35000},{"id":"ПМ8","lvl":"подз.-2","a":14.68,"g":"ФИКС €35K","p":35000},{"id":"ПМ9","lvl":"подз.-2","a":14.64,"g":"ФИКС €35K","p":35000},{"id":"ПМ10","lvl":"подз.-2","a":13.31,"g":"ФИКС €35K","p":35000},{"id":"ПМ11","lvl":"подз.-2","a":16.4,"g":"ФИКС €35K","p":35000},{"id":"ПМ12","lvl":"подз.-2","a":13.35,"g":"ФИКС €35K","p":35000},{"id":"ПМ24","lvl":"подз.-2","a":18.32,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ25","lvl":"подз.-2","a":12.5,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ26","lvl":"подз.-2","a":13.75,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ27","lvl":"подз.-2","a":13.75,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ28","lvl":"подз.-2","a":13.75,"g":"ФИКС €35K","p":35000},{"id":"ПМ29","lvl":"подз.-2","a":13.75,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ30","lvl":"подз.-2","a":13.75,"g":"ФИКС €35K","p":35000},{"id":"ПМ31","lvl":"подз.-2","a":15.0,"g":"ФИКС €35K","p":35000},{"id":"ПМ32","lvl":"подз.-2","a":13.75,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ33","lvl":"подз.-2","a":12.5,"g":"ФИКС €35K","p":35000},{"id":"ПМ34","lvl":"подз.-2","a":15.0,"g":"ФИКС €35K","p":35000},{"id":"ПМ35","lvl":"подз.-2","a":15.0,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ36","lvl":"подз.-2","a":12.5,"g":"ФИКС €35K","p":35000},{"id":"ПМ37","lvl":"подз.-2","a":13.75,"g":"ФИКС €35K","p":35000},{"id":"ПМ38","lvl":"подз.-2","a":15.0,"g":"ФИКС €35K","p":35000},{"id":"ПМ39","lvl":"подз.-2","a":13.75,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ40","lvl":"подз.-2","a":13.75,"g":"ФИКС €35K","p":35000},{"id":"ПМ41","lvl":"подз.-2","a":13.75,"g":"ФИКС €35K","p":35000},{"id":"ПМ42","lvl":"подз.-2","a":13.75,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ41А","lvl":"подз.-2","a":13.75,"g":"ФИКС €35K","p":35000},{"id":"ПМ43","lvl":"подз.-2","a":12.5,"g":"ФИКС €35K","p":35000},{"id":"ПМ44","lvl":"подз.-2","a":15.21,"g":"ФИКС €35K","p":35000},{"id":"ПМ45","lvl":"подз.-2","a":15.0,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ46","lvl":"подз.-2","a":12.5,"g":"ФИКС €35K","p":35000},{"id":"ПМ47","lvl":"подз.-2","a":15.0,"g":"ФИКС €35K","p":35000},{"id":"ПМ48","lvl":"подз.-2","a":14.0,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ49","lvl":"подз.-2","a":12.88,"g":"ФИКС €35K","p":35000},{"id":"ПМ50","lvl":"подз.-2","a":13.75,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ51","lvl":"подз.-2","a":13.1,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ52","lvl":"подз.-2","a":13.75,"g":"ФИКС €35K","p":35000},{"id":"ПМ53","lvl":"подз.-2","a":15.05,"g":"ФИКС €35K","p":35000},{"id":"ПМ54","lvl":"подз.-2","a":14.95,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ55","lvl":"подз.-2","a":13.7,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ56","lvl":"подз.-2","a":13.08,"g":"ФИКС €35K","p":35000},{"id":"ПМ57","lvl":"подз.-2","a":13.7,"g":"ФИКС €35K","p":35000},{"id":"ПМ58","lvl":"подз.-2","a":12.83,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ59","lvl":"подз.-2","a":14.03,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ60","lvl":"подз.-2","a":14.95,"g":"ФИКС €35K","p":35000},{"id":"ПМ61","lvl":"подз.-2","a":12.46,"g":"29166.67","p":35000},{"id":"ПМ62","lvl":"подз.-2","a":14.95,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ63","lvl":"подз.-2","a":12.46,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ64","lvl":"подз.-2","a":12.46,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ65","lvl":"подз.-2","a":13.46,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ66","lvl":"подз.-2","a":17.73,"g":"ФИКС €35K","p":35000},{"id":"ПМ67","lvl":"подз.-2","a":13.0,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ68","lvl":"подз.-2","a":13.0,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ69","lvl":"подз.-2","a":15.6,"g":"ФИКС €35K","p":35000},{"id":"ПМ70","lvl":"подз.-2","a":13.0,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ71","lvl":"подз.-2","a":15.6,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ72","lvl":"подз.-2","a":14.56,"g":"ФИКС €35K","p":35000},{"id":"ПМ73","lvl":"подз.-2","a":12.74,"g":"ФИКС €35K","p":35000},{"id":"ПМ74","lvl":"подз.-2","a":14.3,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ75","lvl":"подз.-2","a":14.3,"g":"ФИКС €35K","p":35000},{"id":"ПМ76","lvl":"подз.-2","a":14.3,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ77","lvl":"подз.-2","a":15.6,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ78","lvl":"подз.-2","a":15.0,"g":"ФИКС €35K","p":35000},{"id":"ПМ79","lvl":"подз.-2","a":13.75,"g":"ФИКС €35K","p":35000},{"id":"ПМ80","lvl":"подз.-2","a":13.75,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ81","lvl":"подз.-2","a":13.75,"g":"ФИКС €35K","p":35000},{"id":"ПМ82","lvl":"подз.-2","a":12.25,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ83","lvl":"подз.-2","a":14.0,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ84","lvl":"подз.-2","a":15.0,"g":"ФИКС €35K","p":35000},{"id":"ПМ85","lvl":"подз.-2","a":12.5,"g":"ФИКС €35K","p":35000},{"id":"ПМ86","lvl":"подз.-2","a":15.0,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ87","lvl":"подз.-2","a":12.5,"g":"ФИКС €35K","p":35000},{"id":"ПМ88","lvl":"подз.-2","a":12.5,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ89","lvl":"подз.-2","a":18.66,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ90","lvl":"подз.-2","a":24.03,"g":"ФИКС €35K","p":40000},{"id":"ПМ91","lvl":"подз.-2","a":18.15,"g":"ФИКС €35K","p":40000,"sold":true,"reason":"obez"},{"id":"ПМ92","lvl":"подз.-2","a":15.1,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ93","lvl":"подз.-2","a":16.99,"g":"ФИКС €35K","p":40000},{"id":"ПМ94","lvl":"подз.-2","a":12.65,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ95","lvl":"подз.-2","a":26.0,"g":"ФИКС €35K","p":40000},{"id":"ПМ96","lvl":"подз.-2","a":25.38,"g":"ФИКС €35K","p":40000},{"id":"ПМ97","lvl":"подз.-2","a":17.61,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ98","lvl":"подз.-2","a":13.72,"g":"ФИКС €35K","p":40000},{"id":"ПМ99","lvl":"подз.-2","a":13.16,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ100","lvl":"подз.-2","a":12.32,"g":"ФИКС €35K","p":35000},{"id":"ПМ101","lvl":"подз.-2","a":10.65,"g":"29166.67","p":35000},{"id":"ПМ102","lvl":"подз.-2","a":15.35,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ103","lvl":"подз.-2","a":19.74,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ104","lvl":"подз.-2","a":21.93,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ105","lvl":"подз.-2","a":18.46,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ106","lvl":"подз.-2","a":17.75,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ107","lvl":"подз.-2","a":23.28,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ108","lvl":"подз.-2","a":14.35,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ109","lvl":"подз.-2","a":15.7,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ110","lvl":"подз.-2","a":22.61,"g":"ФИКС €35K","p":35000},{"id":"ПМ111","lvl":"подз.-2","a":16.94,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ112","lvl":"подз.-2","a":17.35,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ113","lvl":"подз.-2","a":20.22,"g":"—","p":null},{"id":"ПМ114","lvl":"подз.-2","a":16.65,"g":"—","p":null},{"id":"ПМ115","lvl":"подз.-2","a":12.51,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ116","lvl":"подз.-2","a":14.4,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ117","lvl":"подз.-2","a":15.5,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ118","lvl":"подз.-2","a":12.55,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ119","lvl":"подз.-2","a":16.67,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ120","lvl":"подз.-2","a":16.67,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ121","lvl":"подз.-2","a":17.78,"g":"ФИКС €35K","p":40000},{"id":"ПМ122","lvl":"подз.-2","a":12.35,"g":"29166.67","p":35000},{"id":"ПМ123","lvl":"подз.-2","a":13.06,"g":"ФИКС €35K","p":35000},{"id":"ПМ124","lvl":"подз.-2","a":13.06,"g":"ФИКС €35K","p":35000},{"id":"ПМ125","lvl":"подз.-2","a":13.06,"g":"ФИКС €35K","p":35000},{"id":"ПМ126","lvl":"подз.-2","a":14.25,"g":"ФИКС €35K","p":35000},{"id":"ПМ127","lvl":"подз.-2","a":11.87,"g":"29166.67","p":35000},{"id":"ПМ128","lvl":"подз.-2","a":22.35,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ135","lvl":"подз.-2","a":13.3,"g":"ФИКС €35K","p":35000},{"id":"ПМ136","lvl":"подз.-2","a":14.16,"g":"ФИКС €35K","p":35000},{"id":"ПМ137","lvl":"подз.-2","a":13.3,"g":"ФИКС €35K","p":35000},{"id":"ПМ138","lvl":"подз.-2","a":13.59,"g":"ФИКС €35K","p":35000},{"id":"ПМ139","lvl":"подз.-2","a":13.59,"g":"ФИКС €35K","p":40000},{"id":"ПМ140","lvl":"подз.-2","a":13.59,"g":"ФИКС €35K","p":35000},{"id":"ПМ141","lvl":"подз.-2","a":13.59,"g":"ФИКС €35K","p":35000},{"id":"ПМ142","lvl":"подз.-2","a":13.59,"g":"ФИКС €35K","p":35000},{"id":"ПМ143","lvl":"подз.-2","a":13.59,"g":"ФИКС €35K","p":35000},{"id":"ПМ144","lvl":"подз.-2","a":13.59,"g":"ФИКС €35K","p":40000},{"id":"ПМ145","lvl":"подз.-2","a":13.59,"g":"ФИКС €35K","p":35000},{"id":"ПМ146","lvl":"подз.-2","a":13.02,"g":"ФИКС €35K","p":35000},{"id":"Г1","lvl":"подз.-2","a":20.66,"g":"Гараж 20.66м²","p":null,"isGarage":true},{"id":"Г2","lvl":"подз.-2","a":20.38,"g":"Гараж 20.38м²","p":null,"isGarage":true},{"id":"Г3","lvl":"подз.-2","a":16.52,"g":"Гараж 16.52м²","p":null,"isGarage":true},{"id":"Г4","lvl":"подз.-2","a":17.42,"g":"Гараж 17.42м²","p":null,"isGarage":true},{"id":"Г5","lvl":"подз.-2","a":15.23,"g":"Гараж 15.23м²","p":null,"isGarage":true},{"id":"Г6","lvl":"подз.-2","a":16.53,"g":"Гараж 16.53м²","p":null,"isGarage":true},{"id":"Г7","lvl":"подз.-2","a":32.85,"g":"Гараж 32.85м²","p":null,"isGarage":true},{"id":"Г8","lvl":"подз.-2","a":15.28,"g":"Гараж 15.28м² + изба Б9 3.26м² · обща 18.54м²","p":null,"isGarage":true,"iz":"Б9"},{"id":"Г9","lvl":"подз.-2","a":17.7,"g":"Гараж 17.70м² + изба Б8 4.67м² · обща 22.37м²","p":null,"isGarage":true,"iz":"Б8"},{"id":"Г10","lvl":"подз.-2","a":18.03,"g":"Гараж 18.03м² + изба Б7 2.26м² · обща 20.29м²","p":null,"isGarage":true,"iz":"Б7"},{"id":"Г11","lvl":"подз.-2","a":22.35,"g":"Гараж 22.35м² + изба Б6 5.76м² · обща 28.11м²","p":null,"isGarage":true,"iz":"Б6"},{"id":"Г12","lvl":"подз.-2","a":17.63,"g":"Гараж 17.63м² + изба Б5 4.4м² · обща 22.03м²","p":null,"isGarage":true,"iz":"Б5"},{"id":"Г13","lvl":"подз.-2","a":22.18,"g":"Гараж 22.18м² + изба Б4 6.84м² · обща 29.02м²","p":null,"isGarage":true,"iz":"Б4"},{"id":"Г14","lvl":"подз.-2","a":19.94,"g":"Гараж 19.94м² + изба Б3 6.15м² · обща 26.09м²","p":null,"isGarage":true,"iz":"Б3"},{"id":"Г15","lvl":"подз.-2","a":21.24,"g":"Гараж 21.24м² + изба Б2 8.6м² · обща 29.84м²","p":null,"isGarage":true,"iz":"Б2"},{"id":"Г16","lvl":"подз.-2","a":28.68,"g":"Гараж 28.68м² + изба Б1 6.81м² · обща 35.49м²","p":null,"isGarage":true,"iz":"Б1"},{"id":"ПМ147","lvl":"подз.-1","a":16.31,"g":"ФИКС €35K","p":40000},{"id":"ПМ148","lvl":"подз.-1","a":13.75,"g":"ФИКС €35K","p":35000},{"id":"ПМ149","lvl":"подз.-1","a":14.64,"g":"ФИКС €35K","p":35000},{"id":"ПМ150","lvl":"подз.-1","a":16.02,"g":"ФИКС €35K","p":35000},{"id":"ПМ151","lvl":"подз.-1","a":14.64,"g":"ФИКС €35K","p":35000,"rez":true},{"id":"ПМ152","lvl":"подз.-1","a":14.68,"g":"ФИКС €35K","p":35000,"rez":true},{"id":"ПМ153","lvl":"подз.-1","a":14.64,"g":"ФИКС €35K","p":35000},{"id":"ПМ154","lvl":"подз.-1","a":14.68,"g":"ФИКС €35K","p":35000},{"id":"ПМ155","lvl":"подз.-1","a":14.64,"g":"ФИКС €35K","p":35000},{"id":"ПМ156","lvl":"подз.-1","a":13.31,"g":"ФИКС €35K","p":35000},{"id":"ПМ157","lvl":"подз.-1","a":16.4,"g":"ФИКС €35K","p":40000},{"id":"ПМ158","lvl":"подз.-1","a":13.35,"g":"ФИКС €35K","p":35000},{"id":"ПМ170","lvl":"подз.-1","a":18.32,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ171","lvl":"подз.-1","a":12.5,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ172","lvl":"подз.-1","a":13.75,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ173","lvl":"подз.-1","a":13.75,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ174","lvl":"подз.-1","a":13.75,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ175","lvl":"подз.-1","a":13.75,"g":"—","p":null,"rez":true},{"id":"ПМ176","lvl":"подз.-1","a":13.75,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ177","lvl":"подз.-1","a":15.0,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ178","lvl":"подз.-1","a":13.75,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ179","lvl":"подз.-1","a":12.5,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ180","lvl":"подз.-1","a":15.0,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ181","lvl":"подз.-1","a":15.0,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ182","lvl":"подз.-1","a":12.5,"g":"29166.67","p":35000},{"id":"ПМ183","lvl":"подз.-1","a":13.75,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ184","lvl":"подз.-1","a":15.0,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ185","lvl":"подз.-1","a":13.75,"g":"ФИКС €35K","p":35000},{"id":"ПМ186","lvl":"подз.-1","a":13.75,"g":"ФИКС €35K","p":35000},{"id":"ПМ187","lvl":"подз.-1","a":13.75,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ188","lvl":"подз.-1","a":13.75,"g":"ФИКС €35K","p":35000},{"id":"ПМ189","lvl":"подз.-1","a":13.75,"g":"ФИКС €35K","p":35000},{"id":"ПМ190","lvl":"подз.-1","a":12.5,"g":"29166.67","p":35000},{"id":"ПМ191","lvl":"подз.-1","a":15.21,"g":"—","p":null,"sold":true,"reason":"stop"},{"id":"ПМ192","lvl":"подз.-1","a":15.0,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ193","lvl":"подз.-1","a":12.5,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ194","lvl":"подз.-1","a":15.0,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ195","lvl":"подз.-1","a":14.0,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ196","lvl":"подз.-1","a":12.88,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ197","lvl":"подз.-1","a":13.75,"g":"ФИКС €35K","p":35000},{"id":"ПМ198","lvl":"подз.-1","a":13.1,"g":"ФИКС €35K","p":35000},{"id":"ПМ199","lvl":"подз.-1","a":13.75,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ200","lvl":"подз.-1","a":15.05,"g":"ФИКС €35K","p":35000},{"id":"ПМ201","lvl":"подз.-1","a":14.95,"g":"ФИКС €35K","p":35000},{"id":"ПМ202","lvl":"подз.-1","a":13.7,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ203","lvl":"подз.-1","a":13.08,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ204","lvl":"подз.-1","a":13.7,"g":"ФИКС €35K","p":35000},{"id":"ПМ205","lvl":"подз.-1","a":12.83,"g":"ФИКС €35K","p":35000},{"id":"ПМ206","lvl":"подз.-1","a":14.03,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ207","lvl":"подз.-1","a":14.95,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ208","lvl":"подз.-1","a":12.46,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ209","lvl":"подз.-1","a":14.95,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ210","lvl":"подз.-1","a":12.46,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ211","lvl":"подз.-1","a":12.46,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ212","lvl":"подз.-1","a":13.46,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ213","lvl":"подз.-1","a":17.73,"g":"ФИКС €35K","p":40000,"sold":true,"reason":"obez"},{"id":"ПМ214","lvl":"подз.-1","a":13.0,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ215","lvl":"подз.-1","a":13.0,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ216","lvl":"подз.-1","a":15.6,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ217","lvl":"подз.-1","a":13.0,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ218","lvl":"подз.-1","a":15.6,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ219","lvl":"подз.-1","a":14.56,"g":"ФИКС €35K","p":35000},{"id":"ПМ220","lvl":"подз.-1","a":12.74,"g":"ФИКС €35K","p":35000},{"id":"ПМ221","lvl":"подз.-1","a":14.3,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ222","lvl":"подз.-1","a":14.3,"g":"ФИКС €35K","p":35000},{"id":"ПМ223","lvl":"подз.-1","a":14.3,"g":"ФИКС €35K","p":35000},{"id":"ПМ224","lvl":"подз.-1","a":15.6,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ225","lvl":"подз.-1","a":15.0,"g":"ФИКС €35K","p":35000},{"id":"ПМ226","lvl":"подз.-1","a":13.75,"g":"ФИКС €35K","p":35000},{"id":"ПМ227","lvl":"подз.-1","a":13.75,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ228","lvl":"подз.-1","a":13.75,"g":"ФИКС €35K","p":35000},{"id":"ПМ229","lvl":"подз.-1","a":12.25,"g":"ФИКС €35K","p":35000},{"id":"ПМ230","lvl":"подз.-1","a":14.0,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ231","lvl":"подз.-1","a":15.0,"g":"ФИКС €35K","p":35000},{"id":"ПМ232","lvl":"подз.-1","a":12.5,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ233","lvl":"подз.-1","a":15.0,"g":"ФИКС €35K","p":35000,"sold":true,"reason":"obez"},{"id":"ПМ234","lvl":"подз.-1","a":12.5,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ235","lvl":"подз.-1","a":12.5,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ236","lvl":"подз.-1","a":18.66,"g":"ФИКС €35K","p":40000,"sold":true,"reason":"obez"},{"id":"ПМ237","lvl":"подз.-1","a":24.03,"g":"ФИКС €35K","p":40000},{"id":"ПМ238","lvl":"подз.-1","a":18.15,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ239","lvl":"подз.-1","a":15.1,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ240","lvl":"подз.-1","a":16.99,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ241","lvl":"подз.-1","a":12.65,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ242","lvl":"подз.-1","a":26.0,"g":"ФИКС €35K","p":40000},{"id":"ПМ243","lvl":"подз.-1","a":25.38,"g":"ФИКС €35K","p":40000},{"id":"ПМ244","lvl":"подз.-1","a":17.61,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ245","lvl":"подз.-1","a":13.72,"g":"—","p":null,"rez":true},{"id":"ПМ246","lvl":"подз.-1","a":13.16,"g":"—","p":null,"rez":true},{"id":"ПМ247","lvl":"подз.-1","a":12.32,"g":"—","p":null,"rez":true},{"id":"ПМ248","lvl":"подз.-1","a":15.35,"g":"—","p":null,"rez":true},{"id":"ПМ249","lvl":"подз.-1","a":19.74,"g":"—","p":null,"rez":true},{"id":"ПМ250","lvl":"подз.-1","a":21.93,"g":"—","p":null,"rez":true},{"id":"ПМ251","lvl":"подз.-1","a":18.46,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ252","lvl":"подз.-1","a":17.75,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ253","lvl":"подз.-1","a":23.28,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ254","lvl":"подз.-1","a":14.35,"g":"—","p":null,"rez":true},{"id":"ПМ255","lvl":"подз.-1","a":15.7,"g":"—","p":null,"rez":true},{"id":"ПМ256","lvl":"подз.-1","a":22.61,"g":"ФИКС €35K","p":35000,"rez":true},{"id":"ПМ257","lvl":"подз.-1","a":16.94,"g":"—","p":null,"rez":true},{"id":"ПМ258","lvl":"подз.-1","a":17.35,"g":"—","p":null,"rez":true},{"id":"ПМ259","lvl":"подз.-1","a":20.22,"g":"—","p":null,"rez":true},{"id":"ПМ260","lvl":"подз.-1","a":16.65,"g":"—","p":null,"rez":true},{"id":"ПМ261","lvl":"подз.-1","a":12.51,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ262","lvl":"подз.-1","a":14.4,"g":"—","p":null,"sold":true,"reason":"obez"},{"id":"ПМ263","lvl":"подз.-1","a":15.5,"g":"—","p":null,"rez":true},{"id":"ПМ264","lvl":"подз.-1","a":12.55,"g":"—","p":null,"rez":true},{"id":"ПМ265","lvl":"подз.-1","a":17.78,"g":"ФИКС €35K","p":35000},{"id":"ПМ266","lvl":"подз.-1","a":12.35,"g":"29166.67","p":35000},{"id":"ПМ267","lvl":"подз.-1","a":13.06,"g":"ФИКС €35K","p":35000,"rez":true},{"id":"ПМ268","lvl":"подз.-1","a":13.06,"g":"ФИКС €35K","p":35000},{"id":"ПМ269","lvl":"подз.-1","a":13.06,"g":"ФИКС €35K","p":35000},{"id":"ПМ270","lvl":"подз.-1","a":14.25,"g":"ФИКС €35K","p":40000},{"id":"ПМ271","lvl":"подз.-1","a":11.87,"g":"29166.67","p":35000},{"id":"ПМ277","lvl":"подз.-1","a":14.34,"g":"ФИКС €35K","p":40000},{"id":"ПМ278","lvl":"подз.-1","a":13.3,"g":"ФИКС €35K","p":35000},{"id":"ПМ279","lvl":"подз.-1","a":14.16,"g":"ФИКС €35K","p":35000},{"id":"ПМ280","lvl":"подз.-1","a":13.3,"g":"ФИКС €35K","p":35000},{"id":"ПМ281","lvl":"подз.-1","a":13.59,"g":"ФИКС €35K","p":35000},{"id":"ПМ282","lvl":"подз.-1","a":13.59,"g":"ФИКС €35K","p":35000},{"id":"ПМ283","lvl":"подз.-1","a":13.59,"g":"ФИКС €35K","p":35000},{"id":"ПМ284","lvl":"подз.-1","a":13.59,"g":"ФИКС €35K","p":35000},{"id":"ПМ285","lvl":"подз.-1","a":13.59,"g":"ФИКС €35K","p":35000},{"id":"ПМ286","lvl":"подз.-1","a":13.59,"g":"ФИКС €35K","p":35000},{"id":"ПМ287","lvl":"подз.-1","a":13.59,"g":"ФИКС €35K","p":35000},{"id":"ПМ288","lvl":"подз.-1","a":13.59,"g":"ФИКС €35K","p":40000},{"id":"ПМ289","lvl":"подз.-1","a":13.02,"g":"ФИКС €35K","p":35000},{"id":"Г17","lvl":"подз.-1","a":20.66,"g":"Гараж 20.66м²","p":null,"isGarage":true},{"id":"Г18","lvl":"подз.-1","a":20.38,"g":"Гараж 20.38м²","p":null,"isGarage":true},{"id":"Г19","lvl":"подз.-1","a":16.52,"g":"Гараж 16.52м²","p":null,"isGarage":true},{"id":"Г20","lvl":"подз.-1","a":17.42,"g":"Гараж 17.42м²","p":null,"isGarage":true},{"id":"Г21","lvl":"подз.-1","a":15.23,"g":"Гараж 15.23м²","p":null,"isGarage":true},{"id":"Г22","lvl":"подз.-1","a":16.53,"g":"Гараж 16.53м²","p":null,"isGarage":true},{"id":"Г23","lvl":"подз.-1","a":32.97,"g":"Гараж 32.97м²","p":null,"isGarage":true},{"id":"Г24","lvl":"подз.-1","a":15.28,"g":"Гараж 15.28м² + изба Б30 3.26м² · обща 18.54м²","p":null,"isGarage":true,"iz":"Б30"},{"id":"Г25","lvl":"подз.-1","a":17.7,"g":"Гараж 17.70м² + изба Б29 4.67м² · обща 22.37м²","p":null,"isGarage":true,"iz":"Б29"},{"id":"Г26","lvl":"подз.-1","a":18.04,"g":"Гараж 18.04м² + изба Б28 2.46м² · обща 20.5м²","p":null,"isGarage":true,"iz":"Б28"},{"id":"Г27","lvl":"подз.-1","a":22.35,"g":"Гараж 22.35м² + изба Б27 5.76м² · обща 28.11м²","p":null,"isGarage":true,"iz":"Б27"},{"id":"Г28","lvl":"подз.-1","a":17.63,"g":"Гараж 17.63м² + изба Б26 4.4м² · обща 22.03м²","p":null,"isGarage":true,"iz":"Б26"},{"id":"Г29","lvl":"подз.-1","a":22.18,"g":"Гараж 22.18м² + изба Б25 7.33м² · обща 29.51м²","p":null,"isGarage":true,"iz":"Б25"},{"id":"Г30","lvl":"подз.-1","a":19.94,"g":"Гараж 19.94м² + изба Б24 6.59м² · обща 26.53м²","p":null,"isGarage":true,"iz":"Б24"},{"id":"Г31","lvl":"подз.-1","a":21.24,"g":"Гараж 21.24м² + изба Б23 9.2м² · обща 30.44м²","p":null,"isGarage":true,"iz":"Б23"},{"id":"Г32","lvl":"подз.-1","a":28.68,"g":"Гараж 28.68м² + изба Б22 7.27м² · обща 35.95м²","p":null,"isGarage":true,"iz":"Б22"}],"S":[{"id":"A96","s":"A","f":12,"ap":43,"r":3.13,"p":4695},{"id":"А71","s":"A","f":12,"ap":113,"r":3.82,"p":5730},{"id":"А79","s":"A","f":13,"ap":97,"r":3.52,"p":5280},{"id":"A102","s":"A","f":13,"ap":191,"r":4.14,"p":6210},{"id":"A99","s":"A","f":13,"ap":29,"r":3.1,"p":4650},{"id":"А76","s":"A","f":13,"ap":195,"r":4.7,"p":7050},{"id":"A105","s":"A","f":13,"ap":1,"r":2.75,"p":4125},{"id":"A101","s":"A","f":13,"ap":177,"r":2.65,"p":3975},{"id":"A106","s":"A","f":13,"ap":196,"r":6.68,"p":10020},{"id":"A107","s":"A","f":13,"ap":194,"r":4.24,"p":6360},{"id":"A104","s":"A","f":16,"ap":190,"r":3.88,"p":5820},{"id":"А74","s":"A","f":16,"ap":118,"r":3.84,"p":5760},{"id":"А75","s":"A","f":16,"ap":167,"r":4.09,"p":6135},{"id":"А49","s":"A","f":16,"ap":163,"r":3.97,"p":5955},{"id":"А77","s":"A","f":16,"ap":11,"r":2.91,"p":4365},{"id":"А73","s":"A","f":16,"ap":137,"r":3.88,"p":5820},{"id":"А78","s":"A","f":16,"ap":95,"r":3.52,"p":5280},{"id":"A97","s":"A","f":16,"ap":41,"r":3.13,"p":4695},{"id":"А81","s":"A","f":18,"ap":10,"r":2.83,"p":4245},{"id":"А65","s":"A","f":18,"ap":16,"r":2.99,"p":4485},{"id":"А66","s":"A","f":18,"ap":197,"r":4.58,"p":6870},{"id":"А40","s":"A","f":18,"ap":82,"r":3.17,"p":4755},{"id":"А44","s":"A","f":18,"ap":149,"r":3.93,"p":5895},{"id":"А70","s":"A","f":18,"ap":34,"r":3.12,"p":4680},{"id":"А72","s":"A","f":19,"ap":109,"r":3.58,"p":5370},{"id":"А47","s":"A","f":19,"ap":124,"r":3.85,"p":5775},{"id":"А48","s":"A","f":19,"ap":192,"r":4.96,"p":7440},{"id":"А22","s":"A","f":19,"ap":178,"r":4.24,"p":6360},{"id":"А50","s":"A","f":19,"ap":7,"r":2.83,"p":4245},{"id":"А26","s":"A","f":19,"ap":146,"r":3.89,"p":5835},{"id":"А46","s":"A","f":19,"ap":122,"r":3.85,"p":5775},{"id":"А51","s":"A","f":19,"ap":110,"r":3.59,"p":5385},{"id":"А52","s":"A","f":19,"ap":92,"r":3.38,"p":5070},{"id":"А39","s":"A","f":21,"ap":115,"r":3.84,"p":5760},{"id":"А13","s":"A","f":21,"ap":14,"r":2.94,"p":4410},{"id":"А41","s":"A","f":21,"ap":88,"r":3.26,"p":4890},{"id":"А17","s":"A","f":21,"ap":169,"r":4.14,"p":6210},{"id":"А42","s":"A","f":21,"ap":83,"r":3.22,"p":4830},{"id":"А43","s":"A","f":21,"ap":179,"r":2.69,"p":4035},{"id":"А45","s":"A","f":22,"ap":119,"r":3.85,"p":5775},{"id":"А20","s":"A","f":22,"ap":180,"r":2.75,"p":4125},{"id":"А21","s":"A","f":22,"ap":193,"r":6.68,"p":10020},{"id":"А8","s":"A","f":22,"ap":5,"r":2.79,"p":4185},{"id":"А19","s":"A","f":22,"ap":136,"r":3.88,"p":5820},{"id":"А24","s":"A","f":22,"ap":176,"r":4.23,"p":6345},{"id":"А25","s":"A","f":22,"ap":173,"r":4.23,"p":6345},{"id":"А11","s":"A","f":24,"ap":38,"r":3.13,"p":4695},{"id":"А14","s":"A","f":24,"ap":28,"r":3.1,"p":4650},{"id":"А10","s":"A","f":24,"ap":32,"r":3.12,"p":4680},{"id":"А12","s":"A","f":24,"ap":37,"r":3.13,"p":4695},{"id":"А16","s":"A","f":24,"ap":175,"r":2.65,"p":3975},{"id":"А18","s":"A","f":12,"ap":164,"r":4.09,"p":6135},{"id":"А15","s":"A","f":12,"ap":91,"r":3.33,"p":4995},{"id":"А9","s":"A","f":25,"ap":171,"r":2.63,"p":3945},{"id":"А23","s":"A","f":25,"ap":151,"r":3.95,"p":5925},{"id":"Б15","s":"B","f":9,"ap":46,"r":4.27,"p":6405},{"id":"Б42","s":"B","f":10,"ap":50,"r":3.46,"p":5190},{"id":"Б36","s":"B","f":10,"ap":51,"r":4.3,"p":6450},{"id":"Б39","s":"B","f":10,"ap":55,"r":4.23,"p":6345},{"id":"Б14","s":"B","f":10,"ap":56,"r":8.14,"p":12210},{"id":"Б31","s":"B","f":12,"ap":65,"r":7.28,"p":10920},{"id":"Б32","s":"B","f":12,"ap":66,"r":3.43,"p":5145},{"id":"Б21","s":"B","f":12,"ap":70,"r":3.01,"p":4515},{"id":"Б16","s":"B","f":13,"ap":71,"r":3.77,"p":5655},{"id":"Б18","s":"B","f":13,"ap":73,"r":4.24,"p":6360},{"id":"Б12","s":"B","f":13,"ap":75,"r":3.01,"p":4515},{"id":"Б37","s":"B","f":13,"ap":76,"r":3.8,"p":5700},{"id":"Б10","s":"B","f":15,"ap":86,"r":7.3,"p":10950},{"id":"Б11","s":"B","f":15,"ap":87,"r":3.25,"p":4875},{"id":"Б19","s":"B","f":15,"ap":89,"r":4.12,"p":6180},{"id":"Б40","s":"B","f":15,"ap":90,"r":4.11,"p":6165},{"id":"Б41","s":"B","f":15,"ap":91,"r":3.8,"p":5700},{"id":"Б13","s":"B","f":16,"ap":93,"r":3.42,"p":5130},{"id":"Б20","s":"B","f":16,"ap":94,"r":3.55,"p":5325},{"id":"Б33","s":"B","f":16,"ap":96,"r":3.03,"p":4545},{"id":"Б34","s":"B","f":16,"ap":97,"r":3.44,"p":5160},{"id":"А6 + А7","s":"А","f":25,"ap":199,"r":20.4948,"p":30742,"pmDoor":"ПМ111 + ПМ112"},{"id":"A86 + A87","s":"А","f":25,"ap":200,"r":19.9346,"p":29902,"pmDoor":"ПМ249 + ПМ250"},{"id":"A91 + А92","s":"А","f":25,"ap":203,"r":20.4948,"p":30742,"pmDoor":"ПМ257 + ПМ258"}]};

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
    background: "#FFFFFF", borderRadius: 14,
    padding: mob ? 14 : 18, border: "1px solid " + C.navyL, marginBottom: 14,
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
              V9.1 · Промоция 30/70 · Sky High Standards
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
          background: "#FFFFFF", borderRadius: 11, padding: 4,
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
                        const isLocked = isRez || isSold;
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
                        <span style={{ fontSize: 19, fontWeight: 800, color: C.gold, ...mono }}>{fmt(sel.calc.price)}</span>
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
                        <div style={{ fontSize: 19, fontWeight: 800, color: C.gold, ...mono }}>{fmt(sc.total)}</div>
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
                            { l: L.pricePerM2, f: (sc) => fmtN(calcAptPrice(sc.apt).eurM2) + ` €/${L.m2}` },
                            { l: L.aptPrice, f: (sc) => fmt(calcAptPrice(sc.apt).price) },
                            { l: L.cellar, f: (sc) => sc.izba ? `${sc.izba.id} (${fmt(sc.izba.p)})` : "—" },
                            { l: L.parkingCap, f: (sc) => sc.parking ? `${sc.parking.id} (${sc.parking.p ? fmt(sc.parking.p) : "запитване"})` : "—" },
                            { l: L.totalPackage, f: (sc) => fmt(sc.total), bold: true },
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
