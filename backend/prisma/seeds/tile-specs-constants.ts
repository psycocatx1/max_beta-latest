/**
 * Константы технических характеристик для керамогранита
 * Используются для генерации локализованных описаний
 */

export type TileSize = '600x600x9.5' | '595x595x9' | '607x607x9';
export type Languages = 'English' | 'Русский' | 'Українська' | 'Polski';

// Базовые технические характеристики по размерам
export const TILE_TECH_SPECS = {
  '600x600x9.5': {
    size: '600×600×9.5mm',
    weight_per_m2: 22,
    tiles_per_package: 5,
    coverage_per_package: 1.8,
    package_weight: 30
  },
  '595x595x9': {
    size: '595×595×9mm',
    weight_per_m2: 20,
    tiles_per_package: 4,
    coverage_per_package: 1.41,
    package_weight: 28
  },
  '607x607x9': {
    size: '607×607×9mm',
    weight_per_m2: 21,
    tiles_per_package: 4,
    coverage_per_package: 1.48,
    package_weight: 27
  }
} as const;

// Общие технические стандарты
export const COMMON_STANDARDS = {
  breaking_strength: '>1800N',
  modulus_of_rupture: '>35 MPa',
  water_absorption: '≤0.5%',
  wear_resistance: 'PEI IV',
  slip_resistance: 'R10',
  frost_cycles: '100+',
  thermal_expansion: '7×10⁻⁶°C⁻¹',
  chemical_resistance: 'Class A',
  stain_resistance: 'Class 5',
  fire_rating: 'A1fl',
  deep_abrasion: '≤145 mm³',
  mohs_hardness: '6-7'
} as const;

// Переводы технических терминов
export const TECH_TERMS = {
  'English': {
    size: 'Size',
    material: 'Material: Technical porcelain stoneware',
    surface: 'Surface: Matte finish',
    thickness_tolerance: 'Thickness tolerance: ±5%',
    weight_per_m2: 'Weight per m²',
    breaking_strength: 'Breaking strength',
    modulus_of_rupture: 'Modulus of rupture',
    water_absorption: 'Water absorption',
    wear_resistance: 'Wear resistance',
    slip_resistance: 'Slip resistance',
    frost_resistance: 'Frost resistance',
    thermal_expansion: 'Thermal expansion coefficient',
    chemical_resistance: 'Chemical resistance',
    stain_resistance: 'Stain resistance',
    fire_rating: 'Fire rating',
    deep_abrasion: 'Deep abrasion resistance',
    dimensional_tolerance: 'Length and width: ±0.6% max',
    rectified: 'Rectified edges for minimal joints',
    mohs_hardness: 'Mohs hardness',
    cycles: 'freeze-thaw cycles',
    kg: 'kg'
  },
  'Русский': {
    size: 'Размер',
    material: 'Материал: Технический керамогранит',
    surface: 'Поверхность: Матовая',
    thickness_tolerance: 'Отклонение толщины: ±5%',
    weight_per_m2: 'Вес на м²',
    breaking_strength: 'Разрывная нагрузка',
    modulus_of_rupture: 'Предел прочности на изгиб',
    water_absorption: 'Водопоглощение',
    wear_resistance: 'Износостойкость',
    slip_resistance: 'Противоскольжение',
    frost_resistance: 'Морозостойкость',
    thermal_expansion: 'Коэффициент теплового расширения',
    chemical_resistance: 'Химическая стойкость',
    stain_resistance: 'Стойкость к пятнам',
    fire_rating: 'Пожарный рейтинг',
    deep_abrasion: 'Стойкость к глубокому истиранию',
    dimensional_tolerance: 'Размерные отклонения: ±0,6% макс',
    rectified: 'Ректифицированные края',
    mohs_hardness: 'Твердость по Моосу',
    cycles: 'циклов',
    kg: 'кг'
  },
  'Українська': {
    size: 'Розмір',
    material: 'Матеріал: Технічний керамограніт',
    surface: 'Поверхня: Матова',
    thickness_tolerance: 'Відхилення товщини: ±5%',
    weight_per_m2: 'Вага на м²',
    breaking_strength: 'Розривне навантаження',
    modulus_of_rupture: 'Межа міцності на вигин',
    water_absorption: 'Водопоглинання',
    wear_resistance: 'Зносостійкість',
    slip_resistance: 'Протиковзання',
    frost_resistance: 'Морозостійкість',
    thermal_expansion: 'Коефіцієнт теплового розширення',
    chemical_resistance: 'Хімічна стійкість',
    stain_resistance: 'Стійкість до плям',
    fire_rating: 'Вогнетривкий рейтинг',
    deep_abrasion: 'Стійкість до глибокого стирання',
    dimensional_tolerance: 'Розмірні відхилення: ±0,6% макс',
    rectified: 'Ректифіковані краї',
    mohs_hardness: 'Твердість за Мооса',
    cycles: 'циклів',
    kg: 'кг'
  },
  'Polski': {
    size: 'Rozmiar',
    material: 'Materiał: Gres porcelanowy techniczny',
    surface: 'Powierzchnia: Matowa',
    thickness_tolerance: 'Tolerancja grubości: ±5%',
    weight_per_m2: 'Waga na m²',
    breaking_strength: 'Wytrzymałość na zginanie',
    modulus_of_rupture: 'Moduł pękania',
    water_absorption: 'Nasiąkliwość wodą',
    wear_resistance: 'Odporność na ścieranie',
    slip_resistance: 'Antypoślizgowość',
    frost_resistance: 'Mrozoodporność',
    thermal_expansion: 'Współczynnik rozszerzalności cieplnej',
    chemical_resistance: 'Odporność chemiczna',
    stain_resistance: 'Odporność na plamy',
    fire_rating: 'Klasa ogniowa',
    deep_abrasion: 'Odporność na głębokie ścieranie',
    dimensional_tolerance: 'Odchylenia wymiarowe: ±0,6% maks',
    rectified: 'Krawędzie rektyfikowane',
    mohs_hardness: 'Twardość Mohsa',
    cycles: 'cykle',
    kg: 'kg'
  }
} as const;

// Генератор технических характеристик
export function generateTechSpecs(size: TileSize, lang: Languages, variant?: string): string {
  const specs = TILE_TECH_SPECS[size];
  const terms = TECH_TERMS[lang];
  const standards = COMMON_STANDARDS;

  const sizeVariant = variant ? `${specs.size} ${variant}` : specs.size;

  return [
    `${terms.size}: ${sizeVariant} (±0.1%)`,
    terms.material,
    terms.surface,
    terms.thickness_tolerance,
    `${terms.weight_per_m2}: ${specs.weight_per_m2} ${terms.kg}`,
    `${terms.breaking_strength}: ${standards.breaking_strength}`,
    `${terms.modulus_of_rupture}: ${standards.modulus_of_rupture}`,
    `${terms.water_absorption}: ${standards.water_absorption} (EN ISO 10545-3)`,
    `${terms.wear_resistance}: ${standards.wear_resistance} (EN ISO 10545-7)`,
    `${terms.slip_resistance}: ${standards.slip_resistance} (DIN 51130)`,
    `${terms.frost_resistance}: ${standards.frost_cycles} ${terms.cycles}`
  ].join(' | ');
}

// Генератор физико-химических свойств
export function generatePhysicalProps(lang: Languages): string {
  const terms = TECH_TERMS[lang];
  const standards = COMMON_STANDARDS;

  return [
    `${terms.thermal_expansion}: ${standards.thermal_expansion}`,
    `${terms.chemical_resistance}: ${standards.chemical_resistance} (EN ISO 10545-13)`,
    `${terms.stain_resistance}: ${standards.stain_resistance} (EN ISO 10545-14)`,
    `${terms.fire_rating}: ${standards.fire_rating} (EN 13501-1)`,
    `${terms.deep_abrasion}: ${standards.deep_abrasion}`,
    terms.dimensional_tolerance,
    terms.rectified,
    `${terms.mohs_hardness}: ${standards.mohs_hardness}`
  ].join(' | ');
}

// Применение и установка (переводы)
export const INSTALLATION_TERMS = {
  'English': {
    commercial_traffic: 'Recommended for heavy commercial traffic areas',
    underfloor_heating: 'Suitable for underfloor heating systems (max 27°C)',
    adhesive: 'Install with C2TE adhesive for large format tiles',
    joint_width: 'Joint width: 2-4mm',
    wall_installation: 'Can be installed on walls with proper support',
    wet_areas: 'Suitable for swimming pools and wet areas'
  },
  'Русский': {
    commercial_traffic: 'Рекомендуется для зон интенсивного коммерческого трафика',
    underfloor_heating: 'Совместим с системами теплого пола (макс 27°C)',
    adhesive: 'Укладка клеем класса C2TE для крупноформатной плитки',
    joint_width: 'Ширина шва: 2-4мм',
    wall_installation: 'Возможна укладка на стены с надлежащей поддержкой',
    wet_areas: 'Подходит для бассейнов и влажных зон'
  },
  'Українська': {
    commercial_traffic: 'Рекомендується для зон інтенсивного комерційного трафіку',
    underfloor_heating: 'Сумісний з системами теплої підлоги (макс 27°C)',
    adhesive: 'Укладання клеєм класу C2TE для великоформатної плитки',
    joint_width: 'Ширина шва: 2-4мм',
    wall_installation: 'Можлива укладання на стіни з належною підтримкою',
    wet_areas: 'Підходить для басейнів і вологих зон'
  },
  'Polski': {
    commercial_traffic: 'Zalecane do stref intensywnego ruchu komercyjnego',
    underfloor_heating: 'Kompatybilne z systemami ogrzewania podłogowego (maks 27°C)',
    adhesive: 'Montaż klejem klasy C2TE dla płytek wielkoformatowych',
    joint_width: 'Szerokość fugi: 2-4mm',
    wall_installation: 'Można montować na ścianach z odpowiednim wsparciem',
    wet_areas: 'Nadaje się do basenów i stref mokrych'
  }
} as const;

// Экология и безопасность (переводы)
export const ECO_SAFETY_TERMS = {
  'English': {
    greenguard: 'GREENGUARD Gold certified for indoor air quality',
    recycled_content: 'Contains 20% recycled materials',
    low_voc: 'Low VOC emissions',
    heavy_metals: 'Lead and cadmium free',
    antimicrobial: 'Antimicrobial surface treatment',
    maintenance: 'Easy maintenance with standard pH neutral cleaners',
    recyclable: 'Recyclable at end of life'
  },
  'Русский': {
    greenguard: 'Сертификат GREENGUARD Gold для качества воздуха',
    recycled_content: 'Содержит 20% вторичных материалов',
    low_voc: 'Низкие выбросы ЛОС',
    heavy_metals: 'Без свинца и кадмия',
    antimicrobial: 'Антимикробная обработка поверхности',
    maintenance: 'Простое обслуживание нейтральными чистящими средствами',
    recyclable: 'Полная переработка в конце срока службы'
  },
  'Українська': {
    greenguard: 'Сертифікат GREENGUARD Gold для якості повітря',
    recycled_content: 'Містить 20% вторинних матеріалів',
    low_voc: 'Низькі викиди ЛОС',
    heavy_metals: 'Без свинцю та кадмію',
    antimicrobial: 'Антимікробна обробка поверхні',
    maintenance: 'Просте обслуговування нейтральними засобами',
    recyclable: 'Повна переробка в кінці терміну служби'
  },
  'Polski': {
    greenguard: 'Certyfikat GREENGUARD Gold dla jakości powietrza',
    recycled_content: 'Zawiera 20% materiałów z recyklingu',
    low_voc: 'Niskie emisje VOC',
    heavy_metals: 'Bez ołowiu i kadmu',
    antimicrobial: 'Antymikrobowa obróbka powierzchni',
    maintenance: 'Łatwa konserwacja neutralnymi środkami czyszczącymi',
    recyclable: 'Pełny recykling na końcu okresu użytkowania'
  }
} as const;
