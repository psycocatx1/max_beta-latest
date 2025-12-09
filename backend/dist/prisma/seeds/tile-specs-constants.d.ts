export type TileSize = '600x600x9.5' | '595x595x9' | '607x607x9';
export type Languages = 'English' | 'Русский' | 'Українська' | 'Polski';
export declare const TILE_TECH_SPECS: {
    readonly '600x600x9.5': {
        readonly size: "600×600×9.5mm";
        readonly weight_per_m2: 22;
        readonly tiles_per_package: 5;
        readonly coverage_per_package: 1.8;
        readonly package_weight: 30;
    };
    readonly '595x595x9': {
        readonly size: "595×595×9mm";
        readonly weight_per_m2: 20;
        readonly tiles_per_package: 4;
        readonly coverage_per_package: 1.41;
        readonly package_weight: 28;
    };
    readonly '607x607x9': {
        readonly size: "607×607×9mm";
        readonly weight_per_m2: 21;
        readonly tiles_per_package: 4;
        readonly coverage_per_package: 1.48;
        readonly package_weight: 27;
    };
};
export declare const COMMON_STANDARDS: {
    readonly breaking_strength: ">1800N";
    readonly modulus_of_rupture: ">35 MPa";
    readonly water_absorption: "≤0.5%";
    readonly wear_resistance: "PEI IV";
    readonly slip_resistance: "R10";
    readonly frost_cycles: "100+";
    readonly thermal_expansion: "7×10⁻⁶°C⁻¹";
    readonly chemical_resistance: "Class A";
    readonly stain_resistance: "Class 5";
    readonly fire_rating: "A1fl";
    readonly deep_abrasion: "≤145 mm³";
    readonly mohs_hardness: "6-7";
};
export declare const TECH_TERMS: {
    readonly English: {
        readonly size: "Size";
        readonly material: "Material: Technical porcelain stoneware";
        readonly surface: "Surface: Matte finish";
        readonly thickness_tolerance: "Thickness tolerance: ±5%";
        readonly weight_per_m2: "Weight per m²";
        readonly breaking_strength: "Breaking strength";
        readonly modulus_of_rupture: "Modulus of rupture";
        readonly water_absorption: "Water absorption";
        readonly wear_resistance: "Wear resistance";
        readonly slip_resistance: "Slip resistance";
        readonly frost_resistance: "Frost resistance";
        readonly thermal_expansion: "Thermal expansion coefficient";
        readonly chemical_resistance: "Chemical resistance";
        readonly stain_resistance: "Stain resistance";
        readonly fire_rating: "Fire rating";
        readonly deep_abrasion: "Deep abrasion resistance";
        readonly dimensional_tolerance: "Length and width: ±0.6% max";
        readonly rectified: "Rectified edges for minimal joints";
        readonly mohs_hardness: "Mohs hardness";
        readonly cycles: "freeze-thaw cycles";
        readonly kg: "kg";
    };
    readonly Русский: {
        readonly size: "Размер";
        readonly material: "Материал: Технический керамогранит";
        readonly surface: "Поверхность: Матовая";
        readonly thickness_tolerance: "Отклонение толщины: ±5%";
        readonly weight_per_m2: "Вес на м²";
        readonly breaking_strength: "Разрывная нагрузка";
        readonly modulus_of_rupture: "Предел прочности на изгиб";
        readonly water_absorption: "Водопоглощение";
        readonly wear_resistance: "Износостойкость";
        readonly slip_resistance: "Противоскольжение";
        readonly frost_resistance: "Морозостойкость";
        readonly thermal_expansion: "Коэффициент теплового расширения";
        readonly chemical_resistance: "Химическая стойкость";
        readonly stain_resistance: "Стойкость к пятнам";
        readonly fire_rating: "Пожарный рейтинг";
        readonly deep_abrasion: "Стойкость к глубокому истиранию";
        readonly dimensional_tolerance: "Размерные отклонения: ±0,6% макс";
        readonly rectified: "Ректифицированные края";
        readonly mohs_hardness: "Твердость по Моосу";
        readonly cycles: "циклов";
        readonly kg: "кг";
    };
    readonly Українська: {
        readonly size: "Розмір";
        readonly material: "Матеріал: Технічний керамограніт";
        readonly surface: "Поверхня: Матова";
        readonly thickness_tolerance: "Відхилення товщини: ±5%";
        readonly weight_per_m2: "Вага на м²";
        readonly breaking_strength: "Розривне навантаження";
        readonly modulus_of_rupture: "Межа міцності на вигин";
        readonly water_absorption: "Водопоглинання";
        readonly wear_resistance: "Зносостійкість";
        readonly slip_resistance: "Протиковзання";
        readonly frost_resistance: "Морозостійкість";
        readonly thermal_expansion: "Коефіцієнт теплового розширення";
        readonly chemical_resistance: "Хімічна стійкість";
        readonly stain_resistance: "Стійкість до плям";
        readonly fire_rating: "Вогнетривкий рейтинг";
        readonly deep_abrasion: "Стійкість до глибокого стирання";
        readonly dimensional_tolerance: "Розмірні відхилення: ±0,6% макс";
        readonly rectified: "Ректифіковані краї";
        readonly mohs_hardness: "Твердість за Мооса";
        readonly cycles: "циклів";
        readonly kg: "кг";
    };
    readonly Polski: {
        readonly size: "Rozmiar";
        readonly material: "Materiał: Gres porcelanowy techniczny";
        readonly surface: "Powierzchnia: Matowa";
        readonly thickness_tolerance: "Tolerancja grubości: ±5%";
        readonly weight_per_m2: "Waga na m²";
        readonly breaking_strength: "Wytrzymałość na zginanie";
        readonly modulus_of_rupture: "Moduł pękania";
        readonly water_absorption: "Nasiąkliwość wodą";
        readonly wear_resistance: "Odporność na ścieranie";
        readonly slip_resistance: "Antypoślizgowość";
        readonly frost_resistance: "Mrozoodporność";
        readonly thermal_expansion: "Współczynnik rozszerzalności cieplnej";
        readonly chemical_resistance: "Odporność chemiczna";
        readonly stain_resistance: "Odporność na plamy";
        readonly fire_rating: "Klasa ogniowa";
        readonly deep_abrasion: "Odporność na głębokie ścieranie";
        readonly dimensional_tolerance: "Odchylenia wymiarowe: ±0,6% maks";
        readonly rectified: "Krawędzie rektyfikowane";
        readonly mohs_hardness: "Twardość Mohsa";
        readonly cycles: "cykle";
        readonly kg: "kg";
    };
};
export declare function generateTechSpecs(size: TileSize, lang: Languages, variant?: string): string;
export declare function generatePhysicalProps(lang: Languages): string;
export declare const INSTALLATION_TERMS: {
    readonly English: {
        readonly commercial_traffic: "Recommended for heavy commercial traffic areas";
        readonly underfloor_heating: "Suitable for underfloor heating systems (max 27°C)";
        readonly adhesive: "Install with C2TE adhesive for large format tiles";
        readonly joint_width: "Joint width: 2-4mm";
        readonly wall_installation: "Can be installed on walls with proper support";
        readonly wet_areas: "Suitable for swimming pools and wet areas";
    };
    readonly Русский: {
        readonly commercial_traffic: "Рекомендуется для зон интенсивного коммерческого трафика";
        readonly underfloor_heating: "Совместим с системами теплого пола (макс 27°C)";
        readonly adhesive: "Укладка клеем класса C2TE для крупноформатной плитки";
        readonly joint_width: "Ширина шва: 2-4мм";
        readonly wall_installation: "Возможна укладка на стены с надлежащей поддержкой";
        readonly wet_areas: "Подходит для бассейнов и влажных зон";
    };
    readonly Українська: {
        readonly commercial_traffic: "Рекомендується для зон інтенсивного комерційного трафіку";
        readonly underfloor_heating: "Сумісний з системами теплої підлоги (макс 27°C)";
        readonly adhesive: "Укладання клеєм класу C2TE для великоформатної плитки";
        readonly joint_width: "Ширина шва: 2-4мм";
        readonly wall_installation: "Можлива укладання на стіни з належною підтримкою";
        readonly wet_areas: "Підходить для басейнів і вологих зон";
    };
    readonly Polski: {
        readonly commercial_traffic: "Zalecane do stref intensywnego ruchu komercyjnego";
        readonly underfloor_heating: "Kompatybilne z systemami ogrzewania podłogowego (maks 27°C)";
        readonly adhesive: "Montaż klejem klasy C2TE dla płytek wielkoformatowych";
        readonly joint_width: "Szerokość fugi: 2-4mm";
        readonly wall_installation: "Można montować na ścianach z odpowiednim wsparciem";
        readonly wet_areas: "Nadaje się do basenów i stref mokrych";
    };
};
export declare const ECO_SAFETY_TERMS: {
    readonly English: {
        readonly greenguard: "GREENGUARD Gold certified for indoor air quality";
        readonly recycled_content: "Contains 20% recycled materials";
        readonly low_voc: "Low VOC emissions";
        readonly heavy_metals: "Lead and cadmium free";
        readonly antimicrobial: "Antimicrobial surface treatment";
        readonly maintenance: "Easy maintenance with standard pH neutral cleaners";
        readonly recyclable: "Recyclable at end of life";
    };
    readonly Русский: {
        readonly greenguard: "Сертификат GREENGUARD Gold для качества воздуха";
        readonly recycled_content: "Содержит 20% вторичных материалов";
        readonly low_voc: "Низкие выбросы ЛОС";
        readonly heavy_metals: "Без свинца и кадмия";
        readonly antimicrobial: "Антимикробная обработка поверхности";
        readonly maintenance: "Простое обслуживание нейтральными чистящими средствами";
        readonly recyclable: "Полная переработка в конце срока службы";
    };
    readonly Українська: {
        readonly greenguard: "Сертифікат GREENGUARD Gold для якості повітря";
        readonly recycled_content: "Містить 20% вторинних матеріалів";
        readonly low_voc: "Низькі викиди ЛОС";
        readonly heavy_metals: "Без свинцю та кадмію";
        readonly antimicrobial: "Антимікробна обробка поверхні";
        readonly maintenance: "Просте обслуговування нейтральними засобами";
        readonly recyclable: "Повна переробка в кінці терміну служби";
    };
    readonly Polski: {
        readonly greenguard: "Certyfikat GREENGUARD Gold dla jakości powietrza";
        readonly recycled_content: "Zawiera 20% materiałów z recyklingu";
        readonly low_voc: "Niskie emisje VOC";
        readonly heavy_metals: "Bez ołowiu i kadmu";
        readonly antimicrobial: "Antymikrobowa obróbka powierzchni";
        readonly maintenance: "Łatwa konserwacja neutralnymi środkami czyszczącymi";
        readonly recyclable: "Pełny recykling na końcu okresu użytkowania";
    };
};
