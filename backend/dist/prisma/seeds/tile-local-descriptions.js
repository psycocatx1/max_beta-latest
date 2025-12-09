"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedTileLocalDescriptions = void 0;
const client_1 = require("@prisma/client");
const tile_specs_constants_1 = require("./tile-specs-constants");
const seedTileLocalDescriptions = async (prisma) => {
    const targetLocaleSymbols = ['UK', 'RU', 'UA', 'PL'];
    const generateTileDescriptions = (size, lang, variant) => {
        const installation = tile_specs_constants_1.INSTALLATION_TERMS[lang];
        const ecoSafety = tile_specs_constants_1.ECO_SAFETY_TERMS[lang];
        const titles = {
            'English': {
                tech: 'Technical Specifications',
                physical: 'Physical & Chemical Properties',
                installation: 'Installation & Application',
                eco: 'Environmental & Safety'
            },
            'Русский': {
                tech: 'Технические характеристики',
                physical: 'Физико-химические свойства',
                installation: 'Укладка и применение',
                eco: 'Экология и безопасность'
            },
            'Українська': {
                tech: 'Технічні характеристики',
                physical: 'Фізико-хімічні властивості',
                installation: 'Укладання та застосування',
                eco: 'Екологія та безпека'
            },
            'Polski': {
                tech: 'Specyfikacje techniczne',
                physical: 'Właściwości fizyczno-chemiczne',
                installation: 'Montaż i zastosowanie',
                eco: 'Środowisko i bezpieczeństwo'
            }
        };
        return [
            {
                type: client_1.LocalItemDescriptionType.TEXT,
                title: titles[lang].tech,
                order: 1,
                content: (0, tile_specs_constants_1.generateTechSpecs)(size, lang, variant)
            },
            {
                type: client_1.LocalItemDescriptionType.TEXT,
                title: titles[lang].physical,
                order: 2,
                content: (0, tile_specs_constants_1.generatePhysicalProps)(lang)
            },
            {
                type: client_1.LocalItemDescriptionType.TEXT,
                title: titles[lang].installation,
                order: 3,
                content: Object.values(installation).join('. ')
            },
            {
                type: client_1.LocalItemDescriptionType.TEXT,
                title: titles[lang].eco,
                order: 4,
                content: Object.values(ecoSafety).join(' | ')
            }
        ];
    };
    const tileDescriptions = {
        'Керамограніт Atem Yankee BCM 600×600×9,5 мм, бежевий, матовий': {
            'English': [
                {
                    type: client_1.LocalItemDescriptionType.TEXT,
                    title: 'Technical Specifications',
                    order: 1,
                    content: 'Size: 600×600×9.5mm (±0.1%) | Material: Technical porcelain stoneware | Surface: Matte finish | Thickness tolerance: ±5% | Weight per m²: 22 kg | Breaking strength: >1800N | Modulus of rupture: >35 MPa | Water absorption: ≤0.5% (EN ISO 10545-3) | Wear resistance: PEI IV (EN ISO 10545-7) | Slip resistance: R10 (DIN 51130) | Frost resistance: 100+ freeze-thaw cycles'
                },
                {
                    type: client_1.LocalItemDescriptionType.TEXT,
                    title: 'Physical & Chemical Properties',
                    order: 2,
                    content: 'Thermal expansion coefficient: 7×10⁻⁶°C⁻¹ | Chemical resistance: Class A (EN ISO 10545-13) | Stain resistance: Class 5 (EN ISO 10545-14) | Fire rating: A1fl (EN 13501-1) | Deep abrasion resistance: ≤145 mm³ | Length and width: ±0.6% max | Rectified edges for minimal joints | Mohs hardness: 6-7'
                },
                {
                    type: client_1.LocalItemDescriptionType.TEXT,
                    title: 'Installation & Application',
                    order: 3,
                    content: 'Recommended for heavy commercial traffic areas. Suitable for underfloor heating systems (max 27°C). Install with C2TE adhesive for large format tiles. Joint width: 2-4mm. Can be installed on walls with proper support. Suitable for swimming pools and wet areas'
                },
                {
                    type: client_1.LocalItemDescriptionType.TEXT,
                    title: 'Environmental & Safety',
                    order: 4,
                    content: 'GREENGUARD Gold certified for indoor air quality | Contains 20% recycled materials | Low VOC emissions | Lead and cadmium free | Antimicrobial surface treatment | Easy maintenance with standard pH neutral cleaners | Recyclable at end of life'
                }
            ],
            'Русский': [
                {
                    type: client_1.LocalItemDescriptionType.TEXT,
                    title: 'Технические характеристики',
                    order: 1,
                    content: 'Размер: 600×600×9,5мм (±0,1%) | Материал: Технический керамогранит | Поверхность: Матовая | Отклонение толщины: ±5% | Вес на м²: 22 кг | Разрывная нагрузка: >1800Н | Предел прочности на изгиб: >35 МПа | Водопоглощение: ≤0,5% (EN ISO 10545-3) | Износостойкость: PEI IV (EN ISO 10545-7) | Противоскольжение: R10 (DIN 51130) | Морозостойкость: 100+ циклов'
                },
                {
                    type: client_1.LocalItemDescriptionType.TEXT,
                    title: 'Физико-химические свойства',
                    order: 2,
                    content: 'Коэффициент теплового расширения: 7×10⁻⁶°C⁻¹ | Химическая стойкость: Класс А (EN ISO 10545-13) | Стойкость к пятнам: Класс 5 (EN ISO 10545-14) | Пожарный рейтинг: A1fl (EN 13501-1) | Стойкость к глубокому истиранию: ≤145 мм³ | Размерные отклонения: ±0,6% макс | Ректифицированные края | Твердость по Моосу: 6-7'
                },
                {
                    type: client_1.LocalItemDescriptionType.TEXT,
                    title: 'Укладка и применение',
                    order: 3,
                    content: 'Рекомендуется для зон интенсивного коммерческого трафика. Совместим с системами теплого пола (макс 27°C). Укладка клеем класса C2TE для крупноформатной плитки. Ширина шва: 2-4мм. Возможна укладка на стены с надлежащей поддержкой. Подходит для бассейнов и влажных зон'
                },
                {
                    type: client_1.LocalItemDescriptionType.TEXT,
                    title: 'Экология и безопасность',
                    order: 4,
                    content: 'Сертификат GREENGUARD Gold для качества воздуха | Содержит 20% вторичных материалов | Низкие выбросы ЛОС | Без свинца и кадмия | Антимикробная обработка поверхности | Простое обслуживание нейтральными чистящими средствами | Полная переработка в конце срока службы'
                }
            ],
            'Українська': [
                {
                    type: client_1.LocalItemDescriptionType.TEXT,
                    title: 'Технічні характеристики',
                    order: 1,
                    content: 'Розмір: 600×600×9,5мм (±0,1%) | Матеріал: Технічний керамограніт | Поверхня: Матова | Відхилення товщини: ±5% | Вага на м²: 22 кг | Розривне навантаження: >1800Н | Межа міцності на вигин: >35 МПа | Водопоглинання: ≤0,5% (EN ISO 10545-3) | Зносостійкість: PEI IV (EN ISO 10545-7) | Протиковзання: R10 (DIN 51130) | Морозостійкість: 100+ циклів'
                },
                {
                    type: client_1.LocalItemDescriptionType.TEXT,
                    title: 'Фізико-хімічні властивості',
                    order: 2,
                    content: 'Коефіцієнт теплового розширення: 7×10⁻⁶°C⁻¹ | Хімічна стійкість: Клас А (EN ISO 10545-13) | Стійкість до плям: Клас 5 (EN ISO 10545-14) | Вогнетривкий рейтинг: A1fl (EN 13501-1) | Стійкість до глибокого стирання: ≤145 мм³ | Розмірні відхилення: ±0,6% макс | Ректифіковані краї | Твердість за Мооса: 6-7'
                },
                {
                    type: client_1.LocalItemDescriptionType.TEXT,
                    title: 'Укладання та застосування',
                    order: 3,
                    content: 'Рекомендується для зон інтенсивного комерційного трафіку. Сумісний з системами теплої підлоги (макс 27°C). Укладання клеєм класу C2TE для великоформатної плитки. Ширина шва: 2-4мм. Можлива укладання на стіни з належною підтримкою. Підходить для басейнів і вологих зон'
                },
                {
                    type: client_1.LocalItemDescriptionType.TEXT,
                    title: 'Екологія та безпека',
                    order: 4,
                    content: 'Сертифікат GREENGUARD Gold для якості повітря | Містить 20% вторинних матеріалів | Низькі викиди ЛОС | Без свинцю та кадмію | Антимікробна обробка поверхні | Просте обслуговування нейтральними засобами | Повна переробка в кінці терміну служби'
                }
            ],
            'Polski': [
                {
                    type: client_1.LocalItemDescriptionType.TEXT,
                    title: 'Specyfikacje techniczne',
                    order: 1,
                    content: 'Rozmiar: 600×600×9,5mm (±0,1%) | Materiał: Gres porcelanowy techniczny | Powierzchnia: Matowa | Tolerancja grubości: ±5% | Waga na m²: 22 kg | Wytrzymałość na zginanie: >1800N | Moduł pękania: >35 MPa | Nasiąkliwość wodą: ≤0,5% (EN ISO 10545-3) | Odporność na ścieranie: PEI IV (EN ISO 10545-7) | Antypoślizgowość: R10 (DIN 51130) | Mrozoodporność: 100+ cykle'
                },
                {
                    type: client_1.LocalItemDescriptionType.TEXT,
                    title: 'Właściwości fizyczno-chemiczne',
                    order: 2,
                    content: 'Współczynnik rozszerzalności cieplnej: 7×10⁻⁶°C⁻¹ | Odporność chemiczna: Klasa A (EN ISO 10545-13) | Odporność na plamy: Klasa 5 (EN ISO 10545-14) | Klasa ogniowa: A1fl (EN 13501-1) | Odporność na głębokie ścieranie: ≤145 mm³ | Odchylenia wymiarowe: ±0,6% maks | Krawędzie rektyfikowane | Twardość Mohsa: 6-7'
                },
                {
                    type: client_1.LocalItemDescriptionType.TEXT,
                    title: 'Montaż i zastosowanie',
                    order: 3,
                    content: 'Zalecane do stref intensywnego ruchu komercyjnego. Kompatybilne z systemami ogrzewania podłogowego (maks 27°C). Montaż klejem klasy C2TE dla płytek wielkoformatowych. Szerokość fugi: 2-4mm. Można montować na ścianach z odpowiednim wsparciem. Nadaje się do basenów i stref mokrych'
                },
                {
                    type: client_1.LocalItemDescriptionType.TEXT,
                    title: 'Środowisko i bezpieczeństwo',
                    order: 4,
                    content: 'Certyfikat GREENGUARD Gold dla jakości powietrza | Zawiera 20% materiałów z recyklingu | Niskie emisje VOC | Bez ołowiu i kadmu | Antymikrobowa obróbka powierzchni | Łatwa konserwacja neutralnymi środkami czyszczącymi | Pełny recykling na końcu okresu użytkowania'
                }
            ]
        },
        'Керамограніт Atem Yankee BM 600×600×9,5 мм, бежевий, матовий': {
            'English': generateTileDescriptions('600x600x9.5', 'English', 'beige'),
            'Русский': generateTileDescriptions('600x600x9.5', 'Русский', 'бежевый'),
            'Українська': generateTileDescriptions('600x600x9.5', 'Українська', 'бежевий'),
            'Polski': generateTileDescriptions('600x600x9.5', 'Polski', 'beżowy')
        },
        'Керамограніт Atem Yankee GRCM 600×600×9,5 мм, бежевий, матовий': {
            'English': generateTileDescriptions('600x600x9.5', 'English', 'beige'),
            'Русский': generateTileDescriptions('600x600x9.5', 'Русский', 'бежевый'),
            'Українська': generateTileDescriptions('600x600x9.5', 'Українська', 'бежевий'),
            'Polski': generateTileDescriptions('600x600x9.5', 'Polski', 'beżowy')
        },
        'Керамограніт Atem Yankee BCM 600×600×9,5 мм, матовий': {
            'English': generateTileDescriptions('600x600x9.5', 'English'),
            'Русский': generateTileDescriptions('600x600x9.5', 'Русский'),
            'Українська': generateTileDescriptions('600x600x9.5', 'Українська'),
            'Polski': generateTileDescriptions('600x600x9.5', 'Polski')
        },
        'Керамограніт Atem Zulu BCM 600×600×9,5 мм, сірий, матовий': {
            'English': generateTileDescriptions('600x600x9.5', 'English', 'grey'),
            'Русский': generateTileDescriptions('600x600x9.5', 'Русский', 'серый'),
            'Українська': generateTileDescriptions('600x600x9.5', 'Українська', 'сірий'),
            'Polski': generateTileDescriptions('600x600x9.5', 'Polski', 'szary')
        },
        'Керамограніт Atem Zulu GRM 600×600×9,5 мм, матовий': {
            'English': generateTileDescriptions('600x600x9.5', 'English'),
            'Русский': generateTileDescriptions('600x600x9.5', 'Русский'),
            'Українська': generateTileDescriptions('600x600x9.5', 'Українська'),
            'Polski': generateTileDescriptions('600x600x9.5', 'Polski')
        },
        'Керамограніт Atem Zulu GRCM 600×600×9,5 мм, матовий': {
            'English': generateTileDescriptions('600x600x9.5', 'English'),
            'Русский': generateTileDescriptions('600x600x9.5', 'Русский'),
            'Українська': generateTileDescriptions('600x600x9.5', 'Українська'),
            'Polski': generateTileDescriptions('600x600x9.5', 'Polski')
        },
        'Керамограніт Atem Selin GRCM 600×600×9,5 мм, матовий': {
            'English': generateTileDescriptions('600x600x9.5', 'English'),
            'Русский': generateTileDescriptions('600x600x9.5', 'Русский'),
            'Українська': generateTileDescriptions('600x600x9.5', 'Українська'),
            'Polski': generateTileDescriptions('600x600x9.5', 'Polski')
        },
        'Керамограніт Atem Hygge Gray 607×607×9 мм, сірий, матовий': {
            'English': generateTileDescriptions('607x607x9', 'English', 'grey'),
            'Русский': generateTileDescriptions('607x607x9', 'Русский', 'серый'),
            'Українська': generateTileDescriptions('607x607x9', 'Українська', 'сірий'),
            'Polski': generateTileDescriptions('607x607x9', 'Polski', 'szary')
        },
        'Керамограніт Atem Space Stone 595×595×9 мм, сірий, матовий': {
            'English': generateTileDescriptions('595x595x9', 'English', 'grey stone effect'),
            'Русский': generateTileDescriptions('595x595x9', 'Русский', 'серый под камень'),
            'Українська': generateTileDescriptions('595x595x9', 'Українська', 'сірий під камінь'),
            'Polski': generateTileDescriptions('595x595x9', 'Polski', 'szary efekt kamienia')
        },
        'Керамограніт Golden Tile Imperial 595×595×9 мм, матовий': {
            'English': generateTileDescriptions('595x595x9', 'English', 'imperial style'),
            'Русский': generateTileDescriptions('595x595x9', 'Русский', 'в императорском стиле'),
            'Українська': generateTileDescriptions('595x595x9', 'Українська', 'в імперському стилі'),
            'Polski': generateTileDescriptions('595x595x9', 'Polski', 'w stylu imperialnym')
        },
        'Керамограніт Atem Space Stone Black 595×595×9 мм, чорний, матовий': {
            'English': generateTileDescriptions('595x595x9', 'English', 'black stone effect'),
            'Русский': generateTileDescriptions('595x595x9', 'Русский', 'черный под камень'),
            'Українська': generateTileDescriptions('595x595x9', 'Українська', 'чорний під камінь'),
            'Polski': generateTileDescriptions('595x595x9', 'Polski', 'czarny efekt kamienia')
        },
        'Керамограніт Golden Tile Meloren 595×595 мм, матовий/глянцевий': {
            'English': generateTileDescriptions('595x595x9', 'English', 'matte/glossy finish'),
            'Русский': generateTileDescriptions('595x595x9', 'Русский', 'матовый/глянцевый'),
            'Українська': generateTileDescriptions('595x595x9', 'Українська', 'матовий/глянцевий'),
            'Polski': generateTileDescriptions('595x595x9', 'Polski', 'matowy/gładki')
        }
    };
    try {
        console.log('🗑️  Удаление старых описаний плитки...');
        const tileProductNames = Object.keys(tileDescriptions);
        const existingProducts = await prisma.product.findMany({
            where: {
                name: { in: tileProductNames }
            },
            include: {
                local_products: {
                    include: {
                        local_item_descriptions: true
                    }
                }
            }
        });
        let deletedDescriptionsCount = 0;
        for (const product of existingProducts) {
            for (const localProduct of product.local_products) {
                const deletedDescriptions = await prisma.localItemDescription.deleteMany({
                    where: {
                        local_product_id: localProduct.id
                    }
                });
                deletedDescriptionsCount += deletedDescriptions.count;
            }
        }
        console.log(`🗑️  Удалено старых описаний плитки: ${deletedDescriptionsCount}`);
        const locales = await prisma.locale.findMany({
            where: {
                symbol: { in: targetLocaleSymbols }
            }
        });
        console.log('🔍 Найдены локали для описаний:', locales.map(l => l.symbol));
        const products = await prisma.product.findMany({
            where: {
                name: { in: tileProductNames }
            }
        });
        console.log('🔍 Найдены продукты плитки для описаний:', products.length);
        let createdCount = 0;
        let skippedCount = 0;
        for (const locale of locales) {
            for (const product of products) {
                try {
                    const localProduct = await prisma.localProduct.findFirst({
                        where: {
                            locale_id: locale.id,
                            product_id: product.id
                        }
                    });
                    if (!localProduct) {
                        console.log(`⚠️  Локализованный продукт не найден для ${product.name} (${locale.symbol})`);
                        skippedCount++;
                        continue;
                    }
                    const productDescriptions = tileDescriptions[product.name]?.[locale.language];
                    if (!productDescriptions) {
                        console.log(`⚠️  Описания не найдены для плитки: ${product.name} на языке ${locale.language}`);
                        skippedCount++;
                        continue;
                    }
                    for (const desc of productDescriptions) {
                        await prisma.localItemDescription.create({
                            data: {
                                title: desc.title,
                                content: desc.content,
                                type: desc.type,
                                order: desc.order,
                                local_product_id: localProduct.id
                            }
                        });
                    }
                    console.log(`✅ Созданы описания для: ${localProduct.name} (${locale.symbol})`);
                    createdCount++;
                }
                catch (error) {
                    console.error(`❌ Ошибка при создании описаний для продукта ${product.name} в локали ${locale.symbol}:`, error);
                    skippedCount++;
                }
            }
        }
        console.log(`✅ Локальные описания плитки созданы! Создано: ${createdCount}, пропущено: ${skippedCount}`);
    }
    catch (error) {
        console.error('❌ Ошибка при создании локальных описаний плитки:', error);
        throw error;
    }
};
exports.seedTileLocalDescriptions = seedTileLocalDescriptions;
//# sourceMappingURL=tile-local-descriptions.js.map