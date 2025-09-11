import { PrismaClient } from '@prisma/client';

/**
 * Сидер для локализованных продуктов плитки
 * Создает переводы названий и описаний плитки на 4 языка
 */
export const seedTileProducts = async (prisma: PrismaClient) => {
  // Целевые локали по символам
  const targetLocaleSymbols = ['UK', 'RU', 'UA', 'PL'];

  type Languages = 'English' | 'Русский' | 'Українська' | 'Polski';
  type TileNames =
    | 'Керамограніт Atem Yankee BCM 600×600×9,5 мм, бежевий, матовий'
    | 'Керамограніт Atem Yankee BM 600×600×9,5 мм, бежевий, матовий'
    | 'Керамограніт Atem Yankee GRCM 600×600×9,5 мм, бежевий, матовий'
    | 'Керамограніт Atem Yankee BCM 600×600×9,5 мм, матовий'
    | 'Керамограніт Atem Zulu BCM 600×600×9,5 мм, сірий, матовий'
    | 'Керамограніт Atem Zulu GRM 600×600×9,5 мм, матовий'
    | 'Керамограніт Atem Zulu GRCM 600×600×9,5 мм, матовий'
    | 'Керамограніт Atem Selin GRCM 600×600×9,5 мм, матовий'
    | 'Керамограніт Atem Hygge Gray 607×607×9 мм, сірий, матовий'
    | 'Керамограніт Atem Space Stone 595×595×9 мм, сірий, матовий'
    | 'Керамограніт Golden Tile Imperial 595×595×9 мм, матовий'
    | 'Керамограніт Atem Space Stone Black 595×595×9 мм, чорний, матовий'
    | 'Керамограніт Golden Tile Meloren 595×595 мм, матовий/глянцевий';

  type TileTranslations = {
    [key in TileNames]: {
      [key in Languages]: {
        name: string;
        description: string;
      };
    };
  }

  // Переводы для каждой плитки
  const tileTranslations: TileTranslations = {
    'Керамограніт Atem Yankee BCM 600×600×9,5 мм, бежевий, матовий': {
      'English': {
        name: 'Atem Yankee BCM Porcelain Stoneware 600×600×9.5mm, Beige, Matte',
        description: 'Premium porcelain stoneware with matte surface finish. Frost-resistant technical porcelain, perfect for floors in any room. Features excellent durability and water resistance with PEI IV wear resistance class.'
      },
      'Русский': {
        name: 'Керамогранит Atem Yankee BCM 600×600×9,5 мм, бежевый, матовый',
        description: 'Универсальная напольная плитка квадратной формы с матовой поверхностью, морозостойкая. Для внутренних и наружных работ. Класс износостойкости PEI IV, водопоглощение менее 0,5%.'
      },
      'Українська': {
        name: 'Керамограніт Atem Yankee BCM 600×600×9,5 мм, бежевий, матовий',
        description: 'Універсальна підлогова плитка квадратної форми з матовою поверхнею, морозостійка. Для внутрішніх і зовнішніх робіт. Клас зносостійкості PEI IV, водопоглинання менше 0,5%.'
      },
      'Polski': {
        name: 'Gres Atem Yankee BCM 600×600×9,5 mm, beżowy, matowy',
        description: 'Uniwersalna płytka podłogowa kwadratowa o matowej powierzchni, mrozoodporna. Do prac wewnętrznych i zewnętrznych. Klasa odporności na ścieranie PEI IV, nasiąkliwość poniżej 0,5%.'
      }
    },
    'Керамограніт Atem Yankee BM 600×600×9,5 мм, бежевий, матовий': {
      'English': {
        name: 'Atem Yankee BM Porcelain Stoneware 600×600×9.5mm, Beige, Matte',
        description: 'Universal technical porcelain tile with matte finish. Square format, frost-resistant, suitable for residential and commercial spaces. Excellent technical characteristics and high wear resistance.'
      },
      'Русский': {
        name: 'Керамогранит Atem Yankee BM 600×600×9,5 мм, бежевый, матовый',
        description: 'Универсальная плитка из технического гранита. Подходит для жилых и общественных помещений. Квадратная форма, морозостойкая, класс износостойкости PEI IV.'
      },
      'Українська': {
        name: 'Керамограніт Atem Yankee BM 600×600×9,5 мм, бежевий, матовий',
        description: 'Універсальна плитка з технічного гресу. Підходить для житлових і громадських приміщень. Квадратна форма, морозостійка, клас зносостійкості PEI IV.'
      },
      'Polski': {
        name: 'Gres Atem Yankee BM 600×600×9,5 mm, beżowy, matowy',
        description: 'Uniwersalna płytka z gresu technicznego. Nadaje się do pomieszczeń mieszkalnych i komercyjnych. Forma kwadratowa, mrozoodporna, klasa odporności na ścieranie PEI IV.'
      }
    },
    'Керамограніт Atem Yankee GRCM 600×600×9,5 мм, бежевий, матовий': {
      'English': {
        name: 'Atem Yankee GRCM Porcelain Stoneware 600×600×9.5mm, Beige, Matte',
        description: 'Durable floor tile with matte surface. Frost-resistant, universal application for interior and exterior use. High-quality technical porcelain with superior strength characteristics.'
      },
      'Русский': {
        name: 'Керамогранит Atem Yankee GRCM 600×600×9,5 мм, бежевый, матовый',
        description: 'Прочная напольная плитка с матовой поверхностью. Морозостойкая, универсальная, для интерьера и экстерьера. Высокопрочный технический керамогранит премиум класса.'
      },
      'Українська': {
        name: 'Керамограніт Atem Yankee GRCM 600×600×9,5 мм, бежевий, матовий',
        description: 'Міцна підлогова плитка з матовою поверхнею. Морозостійка, універсальна, для інтер\'єру та екстер\'єру. Високоміцний технічний керамограніт преміум класу.'
      },
      'Polski': {
        name: 'Gres Atem Yankee GRCM 600×600×9,5 mm, beżowy, matowy',
        description: 'Wytrzymała płytka podłogowa o matowej powierzchni. Mrozoodporna, uniwersalna, do wnętrz i na zewnątrz. Wysokiej wytrzymałości gres techniczny klasy premium.'
      }
    },
    'Керамограніт Atem Yankee BCM 600×600×9,5 мм, матовий': {
      'English': {
        name: 'Atem Yankee BCM Porcelain Stoneware 600×600×9.5mm, Matte',
        description: 'Universal technical porcelain tile with matte surface. Square format, frost-resistant. Used for flooring in any room type. Exceptional durability and low water absorption.'
      },
      'Русский': {
        name: 'Керамогранит Atem Yankee BCM 600×600×9,5 мм, матовый',
        description: 'Универсальная плитка из технического гранита. Матовая, квадратная, морозостойкая. Используется для пола в любых помещениях. Отличная износостойкость.'
      },
      'Українська': {
        name: 'Керамограніт Atem Yankee BCM 600×600×9,5 мм, матовий',
        description: 'Універсальна плитка з технічного гресу. Матова, квадратна, морозостійка. Використовується для підлоги в будь-яких приміщеннях. Відмінна зносостійкість.'
      },
      'Polski': {
        name: 'Gres Atem Yankee BCM 600×600×9,5 mm, matowy',
        description: 'Uniwersalna płytka z gresu technicznego. Matowa, kwadratowa, mrozoodporna. Używana do podłóg w różnego typu pomieszczeniach. Doskonała odporność na ścieranie.'
      }
    },
    'Керамограніт Atem Zulu BCM 600×600×9,5 мм, сірий, матовий': {
      'English': {
        name: 'Atem Zulu BCM Porcelain Stoneware 600×600×9.5mm, Matte',
        description: 'Wear-resistant technical porcelain tile. Floor tile, frost-resistant, square format. For interior and exterior applications. High durability and excellent technical properties.'
      },
      'Русский': {
        name: 'Керамогранит Atem Zulu BCM 600×600×9,5 мм, матовый',
        description: 'Стойкая к износу плитка из технического гранита. Напольная, морозостойкая, квадратная. Для внутренних и наружных работ. Высокая прочность и отличные свойства.'
      },
      'Українська': {
        name: 'Керамограніт Atem Zulu BCM 600×600×9,5 мм, матовий',
        description: 'Стійка до зносу плитка з технічного гресу. Підлогова, морозостійка, квадратна. Для внутрішніх і зовнішніх робіт. Висока міцність та відмінні властивості.'
      },
      'Polski': {
        name: 'Gres Atem Zulu BCM 600×600×9,5 mm, matowy',
        description: 'Płytka odporna na ścieranie z gresu technicznego. Podłogowa, mrozoodporna, kwadratowa. Do prac wewnętrznych i zewnętrznych. Wysoka wytrzymałość i doskonałe właściwości.'
      }
    },
    'Керамограніт Atem Zulu GRM 600×600×9,5 мм, матовий': {
      'English': {
        name: 'Atem Zulu GRM Porcelain Stoneware 600×600×9.5mm, Matte',
        description: 'Frost-resistant floor tile with matte surface. Universal, square format for residential and commercial spaces. Excellent wear resistance and low maintenance requirements.'
      },
      'Русский': {
        name: 'Керамогранит Atem Zulu GRM 600×600×9,5 мм, матовый',
        description: 'Морозостойкая плитка для пола с матовой поверхностью. Универсальная, квадратная, для жилых и общественных помещений. Отличная износостойкость и простота ухода.'
      },
      'Українська': {
        name: 'Керамограніт Atem Zulu GRM 600×600×9,5 мм, матовий',
        description: 'Морозостійка плитка для підлоги з матовою поверхнею. Універсальна, квадратна, для житлових і громадських приміщень. Відмінна зносостійкість та простота догляду.'
      },
      'Polski': {
        name: 'Gres Atem Zulu GRM 600×600×9,5 mm, matowy',
        description: 'Mrozoodporna płytka podłogowa o matowej powierzchni. Uniwersalna, kwadratowa, do pomieszczeń mieszkalnych i komercyjnych. Doskonała odporność na ścieranie i łatwość pielęgnacji.'
      }
    },
    'Керамограніт Atem Zulu GRCM 600×600×9,5 мм, матовий': {
      'English': {
        name: 'Atem Zulu GRCM Porcelain Stoneware 600×600×9.5mm, Matte',
        description: 'Universal floor tile with matte finish. Square format, frost-resistant. Applications include interior and exterior spaces. Premium quality technical porcelain with superior durability.'
      },
      'Русский': {
        name: 'Керамогранит Atem Zulu GRCM 600×600×9,5 мм, матовый',
        description: 'Универсальная плитка для пола с матовой поверхностью. Квадратная, морозостойкая. Применение: интерьер и экстерьер. Премиальный технический керамогранит высшего качества.'
      },
      'Українська': {
        name: 'Керамограніт Atem Zulu GRCM 600×600×9,5 мм, матовий',
        description: 'Універсальна плитка для підлоги з матовою поверхнею. Квадратна, морозостійка. Застосування: інтер\'єр і екстер\'єр. Преміальний технічний керамограніт найвищої якості.'
      },
      'Polski': {
        name: 'Gres Atem Zulu GRCM 600×600×9,5 mm, matowy',
        description: 'Uniwersalna płytka podłogowa o matowej powierzchni. Kwadratowa, mrozoodporna. Zastosowanie: wnętrza i na zewnątrz. Premium gres techniczny najwyższej jakości.'
      }
    },
    'Керамограніт Atem Selin GRCM 600×600×9,5 мм, матовий': {
      'English': {
        name: 'Atem Selin GRCM Porcelain Stoneware 600×600×9.5mm, Matte',
        description: 'Universal floor tile with matte surface finish. Square format, frost-resistant. Suitable for interiors and exterior spaces. High-quality porcelain stoneware with excellent durability.'
      },
      'Русский': {
        name: 'Керамогранит Atem Selin GRCM 600×600×9,5 мм, матовый',
        description: 'Универсальная напольная плитка с матовой поверхностью. Квадратная форма, морозостойкая. Подходит для интерьеров и внешних пространств. Высококачественный керамогранит отличной прочности.'
      },
      'Українська': {
        name: 'Керамограніт Atem Selin GRCM 600×600×9,5 мм, матовий',
        description: 'Універсальна підлогова плитка з матовою поверхнею. Квадратна форма, морозостійка. Підходить для інтер\'єрів та зовнішніх просторів. Високоякісний керамограніт відмінної міцності.'
      },
      'Polski': {
        name: 'Gres Atem Selin GRCM 600×600×9,5 mm, matowy',
        description: 'Uniwersalna płytka podłogowa o matowej powierzchni. Forma kwadratowa, mrozoodporna. Nadaje się do wnętrz i przestrzeni zewnętrznych. Wysokiej jakości gres doskonałej wytrzymałości.'
      }
    },
    'Керамограніт Atem Hygge Gray 607×607×9 мм, сірий, матовий': {
      'English': {
        name: 'Atem Hygge Gray Porcelain Stoneware 607×607×9mm, Grey, Matte',
        description: 'Modern grey floor tile with matte finish. Square format, frost-resistant. For interior and exterior applications. Contemporary design perfect for modern architectural styles.'
      },
      'Русский': {
        name: 'Керамогранит Atem Hygge Gray 607×607×9 мм, серый, матовый',
        description: 'Современная напольная плитка серого цвета с матовой поверхностью. Квадратная форма, морозостойкая. Для внутренних и наружных работ. Современный дизайн идеальный для архитектурных стилей.'
      },
      'Українська': {
        name: 'Керамограніт Atem Hygge Gray 607×607×9 мм, сірий, матовий',
        description: 'Сучасна підлогова плитка сірого кольору з матовою поверхнею. Квадратна форма, морозостійка. Для внутрішніх та зовнішніх робіт. Сучасний дизайн ідеальний для архітектурних стилів.'
      },
      'Polski': {
        name: 'Gres Atem Hygge Gray 607×607×9 mm, szary, matowy',
        description: 'Nowoczesna płytka podłogowa w kolorze szarym o matowej powierzchni. Forma kwadratowa, mrozoodporna. Do prac wewnętrznych i zewnętrznych. Nowoczesny design idealny dla stylów architektonicznych.'
      }
    },
    'Керамограніт Atem Space Stone 595×595×9 мм, сірий, матовий': {
      'English': {
        name: 'Atem Space Stone Porcelain Stoneware 595×595×9mm, Grey, Matte',
        description: 'Universal floor tile with matte surface finish. Square format, frost-resistant. Ideal for contemporary interiors with stone-like appearance and excellent technical properties.'
      },
      'Русский': {
        name: 'Керамогранит Atem Space Stone 595×595×9 мм, серый, матовый',
        description: 'Универсальная плитка для пола с матовой поверхностью. Квадратная форма, морозостойкая. Идеальная для современных интерьеров с видом натурального камня и отличными техническими свойствами.'
      },
      'Українська': {
        name: 'Керамограніт Atem Space Stone 595×595×9 мм, сірий, матовий',
        description: 'Універсальна плитка для підлоги з матовою поверхнею. Квадратна форма, морозостійка. Ідеальна для сучасних інтер\'єрів з виглядом натурального каменю та відмінними технічними властивостями.'
      },
      'Polski': {
        name: 'Gres Atem Space Stone 595×595×9 mm, szary, matowy',
        description: 'Uniwersalna płytka podłogowa o matowej powierzchni. Forma kwadratowa, mrozoodporna. Idealna do nowoczesnych wnętrz z wyglądem naturalnego kamienia i doskonałymi właściwościami technicznymi.'
      }
    },
    'Керамограніт Golden Tile Imperial 595×595×9 мм, матовий': {
      'English': {
        name: 'Golden Tile Imperial Porcelain Stoneware 595×595×9mm, Matte',
        description: 'Technical porcelain floor tile with matte finish. Frost-resistant, square format, universal application. Suitable for residential and commercial spaces with premium quality and durability.'
      },
      'Русский': {
        name: 'Керамогранит Golden Tile Imperial 595×595×9 мм, матовый',
        description: 'Плитка из технического гранита для пола с матовой поверхностью. Морозостойкая, квадратная форма, универсальная. Для жилых и коммерческих помещений премиального качества и долговечности.'
      },
      'Українська': {
        name: 'Керамограніт Golden Tile Imperial 595×595×9 мм, матовий',
        description: 'Плитка з технічного гресу для підлоги з матовою поверхнею. Морозостійка, квадратна форма, універсальна. Для житлових та комерційних приміщень преміальної якості та довговічності.'
      },
      'Polski': {
        name: 'Gres Golden Tile Imperial 595×595×9 mm, matowy',
        description: 'Płytka z gresu technicznego do podłóg o matowej powierzchni. Mrozoodporna, forma kwadratowa, uniwersalna. Do pomieszczeń mieszkalnych i komercyjnych o jakości premium i trwałości.'
      }
    },
    'Керамограніт Atem Space Stone Black 595×595×9 мм, чорний, матовий': {
      'English': {
        name: 'Atem Space Stone Black Porcelain Stoneware 595×595×9mm, Black, Matte',
        description: 'Stylish universal black tile with matte finish. Square format, frost-resistant. For interior and exterior use. Contemporary design with stone texture and exceptional durability.'
      },
      'Русский': {
        name: 'Керамогранит Atem Space Stone Black 595×595×9 мм, черный, матовый',
        description: 'Стильная универсальная плитка черного цвета с матовой поверхностью. Квадратная форма, морозостойкая. Для интерьера и экстерьера. Современный дизайн с текстурой камня и исключительной прочностью.'
      },
      'Українська': {
        name: 'Керамограніт Atem Space Stone Black 595×595×9 мм, чорний, матовий',
        description: 'Стильна універсальна плитка чорного кольору з матовою поверхнею. Квадратна форма, морозостійка. Для інтер\'єру та екстер\'єру. Сучасний дизайн з текстурою каменю та виняткової міцності.'
      },
      'Polski': {
        name: 'Gres Atem Space Stone Black 595×595×9 mm, czarny, matowy',
        description: 'Stylowa uniwersalna płytka w kolorze czarnym o matowej powierzchni. Forma kwadratowa, mrozoodporna. Do wnętrz i na zewnątrz. Nowoczesny design z teksturą kamienia i wyjątkową wytrzymałością.'
      }
    },
    'Керамограніт Golden Tile Meloren 595×595 мм, матовий/глянцевий': {
      'English': {
        name: 'Golden Tile Meloren Porcelain Stoneware 595×595×9mm, Matte / Glossy',
        description: 'Universal floor tile with matte surface finish. Frost-resistant, square format suitable for any room type. High-quality porcelain stoneware with excellent wear resistance and low maintenance.'
      },
      'Русский': {
        name: 'Керамогранит Golden Tile Meloren 595×595×9 мм, матовый / глянцевий',
        description: 'Напольная универсальная плитка с матовой поверхностью. Морозостойкая, квадратная, подходит для любых помещений. Высококачественный керамогранит с отличной износостойкостью и простотой ухода.'
      },
      'Українська': {
        name: 'Керамограніт Golden Tile Meloren 595×595×9 мм, матовий/глянцевий',
        description: 'Підлогова універсальна плитка з матовою поверхнею. Морозостійка, квадратна, підходить для будь-яких приміщень. Високоякісний керамограніт з відмінною зносостійкістю та простотою догляду.'
      },
      'Polski': {
        name: 'Gres Golden Tile Meloren 595×595×9 mm, matowy / gładki',
        description: 'Uniwersalna płytka podłogowa o matowej powierzchni. Mrozoodporna, kwadratowa, nadaje się do różnego typu pomieszczeń. Wysokiej jakości gres z doskonałą odpornością na ścieranie i łatwością pielęgnacji.'
      }
    }
  };

  try {
    console.log('🗑️  Удаление старых записей локализованных продуктов плитки...');

    // Найдем основные продукты плитки по украинским названиям для удаления старых записей
    const tileProductNames = Object.keys(tileTranslations);
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
    let deletedProductsCount = 0;

    // Удаляем связанные локальные описания и локализованные продукты
    for (const product of existingProducts) {
      for (const localProduct of product.local_products) {
        // Удаляем описания
        const deletedDescriptions = await prisma.localItemDescription.deleteMany({
          where: {
            local_product_id: localProduct.id
          }
        });
        deletedDescriptionsCount += deletedDescriptions.count;
      }

      // Удаляем локализованные продукты
      const deletedProducts = await prisma.localProduct.deleteMany({
        where: {
          product_id: product.id
        }
      });
      deletedProductsCount += deletedProducts.count;
    }

    console.log(`🗑️  Удалено старых записей: ${deletedDescriptionsCount} описаний, ${deletedProductsCount} локализованных продуктов`);

    // Получаем локализованные продукты для целевых локалей  
    const locales = await prisma.locale.findMany({
      where: {
        symbol: { in: targetLocaleSymbols }
      }
    });

    console.log('🔍 Найдены локали:', locales.map(l => l.symbol));

    // Получаем базовые продукты для создания новых записей
    const products = await prisma.product.findMany({
      where: {
        name: { in: tileProductNames }
      }
    });

    console.log('🔍 Найдены продукты плитки:', products.length);

    // Получаем курсы валют для конвертации цен
    function getExchangeRate(currency: string): number {
      const rates = {
        'USD': 1,
        'EUR': 0.85,
        'GBP': 0.73,
        'PLN': 3.8,
        'UAH': 36,
        'RUB': 90,
      };
      return rates[currency as keyof typeof rates] || 1;
    }

    let createdCount = 0;
    let skippedCount = 0;

    for (const locale of locales) {
      for (const product of products) {
        try {
          // Примечание: старые записи уже удалены выше, создаем новые

          const translation = tileTranslations[product.name as TileNames]?.[locale.language as Languages];

          if (!translation) {
            console.log(`⚠️  Перевод не найден для плитки: ${product.name} на языке ${locale.language}`);
            skippedCount++;
            continue;
          }

          const exchangeRate = getExchangeRate(locale.currency);

          await prisma.localProduct.create({
            data: {
              name: translation.name,
              description: translation.description,
              price: product.price_USD * exchangeRate,
              discount_price: product.discount_price_USD ? product.discount_price_USD * exchangeRate : null,
              product: { connect: { id: product.id } },
              locale: { connect: { id: locale.id } },
            },
          });

          console.log(`✅ Создан локализованный продукт: ${translation.name} (${locale.symbol})`);
          createdCount++;

        } catch (error) {
          console.error(`❌ Ошибка при создании локализованного продукта ${product.name} для локали ${locale.symbol}:`, error);
          skippedCount++;
        }
      }
    }

    console.log(`✅ Локализованные продукты плитки созданы! Создано: ${createdCount}, пропущено: ${skippedCount}`);

  } catch (error) {
    console.error('❌ Ошибка при создании локализованных продуктов плитки:', error);
    throw error;
  }
};
