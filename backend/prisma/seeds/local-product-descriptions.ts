import { Prisma, PrismaClient } from '@prisma/client';
import { LocalItemDescriptionType } from '@prisma/client';

export const seedLocalProductDescriptions = async (prisma: PrismaClient) => {
  // Целевые локали по символам
  const targetLocaleSymbols = ['US', 'RU', 'UA', 'PL'];

  type Languages = 'English' | 'Русский' | 'Українська' | 'Polski';
  type Products = 'Fragile Stickers' | 'Foldable Plastic Crate' | 'Stretch Film' | 'Cardboard Box Small' | 'Two Wheel Cart';

  type Descriptions = {
    [key in Products]: {
      [key in Languages]: Prisma.LocalItemDescriptionCreateInput[];
    };
  }

  // Описания для каждого продукта и языка
  const descriptions: Descriptions = {
    'Fragile Stickers': { // Наклейки Осторожно Хрупкое
      'English': [
        {
          type: LocalItemDescriptionType.TEXT,
          title: 'Product Features',
          order: 1,
          content: 'High-quality warning labels with strong adhesive that clearly mark fragile items. Perfect for shipping and storage applications.'
        },
        {
          type: LocalItemDescriptionType.TEXT,
          title: 'Usage Instructions',
          order: 2,
          content: 'Simply peel off the backing paper and apply to clean, dry surfaces. Ensure the sticker is firmly pressed for optimal adhesion.'
        },
        {
          type: LocalItemDescriptionType.IMAGE,
          title: 'Installation Example',
          order: 3,
          content: '/static/local_item_descriptions/fragile-stickers-installation.webp'
        },
        {
          type: LocalItemDescriptionType.VIDEO,
          title: 'How to Apply Fragile Labels',
          order: 4,
          content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        },
        {
          type: LocalItemDescriptionType.LINK,
          title: 'Safety Guidelines',
          order: 5,
          content: 'https://example.com/fragile-packaging-guidelines'
        }
      ],
      'Русский': [
        {
          type: LocalItemDescriptionType.TEXT,
          title: 'Особенности продукта',
          order: 1,
          content: 'Высококачественные предупреждающие наклейки с сильным клеящим составом, которые четко обозначают хрупкие предметы. Идеально подходят для отправки и хранения.'
        },
        {
          type: LocalItemDescriptionType.TEXT,
          title: 'Инструкция по применению',
          order: 2,
          content: 'Просто отклейте защитную бумагу и нанесите на чистую сухую поверхность. Убедитесь, что наклейка плотно прижата для оптимального сцепления.'
        },
        {
          type: LocalItemDescriptionType.IMAGE,
          title: 'Пример установки',
          order: 3,
          content: '/static/local_item_descriptions/fragile-stickers-installation-ru.webp'
        },
        {
          type: LocalItemDescriptionType.VIDEO,
          title: 'Как наклеить предупреждающие этикетки',
          order: 4,
          content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        },
        {
          type: LocalItemDescriptionType.LINK,
          title: 'Правила безопасности',
          order: 5,
          content: 'https://example.com/ru/fragile-packaging-guidelines'
        }
      ],
      'Українська': [
        {
          type: LocalItemDescriptionType.TEXT,
          title: 'Особливості продукту',
          order: 1,
          content: 'Високоякісні попереджувальні наклейки з міцним клейким складом, які чітко позначають крихкі предмети. Ідеально підходять для відправлення та зберігання.'
        },
        {
          type: LocalItemDescriptionType.TEXT,
          title: 'Інструкція по застосуванню',
          order: 2,
          content: 'Просто відклейте захисний папір і нанесіть на чисту суху поверхню. Переконайтеся, що наклейка щільно притиснута для оптимального зчеплення.'
        },
        {
          type: LocalItemDescriptionType.IMAGE,
          title: 'Приклад встановлення',
          order: 3,
          content: '/static/local_item_descriptions/fragile-stickers-installation-ua.webp'
        },
        {
          type: LocalItemDescriptionType.VIDEO,
          title: 'Як наклеїти попереджувальні етикетки',
          order: 4,
          content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        },
        {
          type: LocalItemDescriptionType.LINK,
          title: 'Правила безпеки',
          order: 5,
          content: 'https://example.com/ua/fragile-packaging-guidelines'
        }
      ],
      'Polski': [
        {
          type: LocalItemDescriptionType.TEXT,
          title: 'Właściwości produktu',
          order: 1,
          content: 'Wysokiej jakości etykiety ostrzegawcze z mocnym klejem, które wyraźnie oznaczają delikatne przedmioty. Idealne do wysyłki i przechowywania.'
        },
        {
          type: LocalItemDescriptionType.TEXT,
          title: 'Instrukcja użytkowania',
          order: 2,
          content: 'Po prostu zdejmij papier ochronny i nałóż na czystą, suchą powierzchnię. Upewnij się, że naklejka jest mocno dociskana dla optymalnej przyczepności.'
        },
        {
          type: LocalItemDescriptionType.IMAGE,
          title: 'Przykład instalacji',
          order: 3,
          content: '/static/local_item_descriptions/fragile-stickers-installation-pl.webp'
        },
        {
          type: LocalItemDescriptionType.VIDEO,
          title: 'Jak nakleić etykiety ostrzegawcze',
          order: 4,
          content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        },
        {
          type: LocalItemDescriptionType.LINK,
          title: 'Wytyczne bezpieczeństwa',
          order: 5,
          content: 'https://example.com/pl/fragile-packaging-guidelines'
        }
      ]
    },
    'Foldable Plastic Crate': { // Складной Пластиковый Ящик
      'English': [
        {
          type: LocalItemDescriptionType.TEXT,
          title: 'Space-Saving Design',
          order: 1,
          content: 'Innovative collapsible design reduces storage space by 70% when not in use. Made from durable, food-grade plastic suitable for various applications.'
        },
        {
          type: LocalItemDescriptionType.TEXT,
          title: 'Versatile Applications',
          order: 2,
          content: 'Perfect for warehouses, retail stores, moving, and home organization. Stackable design maximizes storage efficiency and transportation convenience.'
        },
        {
          type: LocalItemDescriptionType.IMAGE,
          title: 'Folding Demonstration',
          order: 3,
          content: '/static/local_item_descriptions/foldable-crate-folding.webp'
        },
        {
          type: LocalItemDescriptionType.VIDEO,
          title: 'Assembly and Folding Guide',
          order: 4,
          content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        },
        {
          type: LocalItemDescriptionType.LINK,
          title: 'Technical Specifications',
          order: 5,
          content: 'https://example.com/foldable-crate-specs'
        }
      ],
      'Русский': [
        {
          type: LocalItemDescriptionType.TEXT,
          title: 'Экономящий место дизайн',
          order: 1,
          content: 'Инновационная складная конструкция уменьшает место для хранения на 70% когда не используется. Изготовлен из прочного пищевого пластика, подходящего для различных применений.'
        },
        {
          type: LocalItemDescriptionType.TEXT,
          title: 'Универсальное применение',
          order: 2,
          content: 'Идеально подходит для складов, розничных магазинов, переездов и домашней организации. Штабелируемая конструкция максимизирует эффективность хранения и удобство транспортировки.'
        },
        {
          type: LocalItemDescriptionType.IMAGE,
          title: 'Демонстрация складывания',
          order: 3,
          content: '/static/local_item_descriptions/foldable-crate-folding-ru.webp'
        },
        {
          type: LocalItemDescriptionType.VIDEO,
          title: 'Руководство по сборке и складыванию',
          order: 4,
          content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        },
        {
          type: LocalItemDescriptionType.LINK,
          title: 'Технические характеристики',
          order: 5,
          content: 'https://example.com/ru/foldable-crate-specs'
        }
      ],
      'Українська': [
        {
          type: LocalItemDescriptionType.TEXT,
          title: 'Дизайн що економить місце',
          order: 1,
          content: 'Інноваційна складна конструкція зменшує місце для зберігання на 70% коли не використовується. Виготовлений з міцного харчового пластику, підходящого для різних застосувань.'
        },
        {
          type: LocalItemDescriptionType.TEXT,
          title: 'Універсальне застосування',
          order: 2,
          content: 'Ідеально підходить для складів, роздрібних магазинів, переїздів та домашньої організації. Конструкція що штабелюється максимізує ефективність зберігання та зручність транспортування.'
        },
        {
          type: LocalItemDescriptionType.IMAGE,
          title: 'Демонстрація складання',
          order: 3,
          content: '/static/local_item_descriptions/foldable-crate-folding-ua.webp'
        },
        {
          type: LocalItemDescriptionType.VIDEO,
          title: 'Керівництво по збірці та складанню',
          order: 4,
          content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        },
        {
          type: LocalItemDescriptionType.LINK,
          title: 'Технічні характеристики',
          order: 5,
          content: 'https://example.com/ua/foldable-crate-specs'
        }
      ],
      'Polski': [
        {
          type: LocalItemDescriptionType.TEXT,
          title: 'Projekt oszczędzający miejsce',
          order: 1,
          content: 'Innowacyjna składana konstrukcja zmniejsza miejsce do przechowywania o 70% gdy nie jest używana. Wykonana z trwałego plastiku spożywczego odpowiedniego do różnych zastosowań.'
        },
        {
          type: LocalItemDescriptionType.TEXT,
          title: 'Wszechstronne zastosowania',
          order: 2,
          content: 'Idealna do magazynów, sklepów detalicznych, przeprowadzek i organizacji domowej. Konstrukcja do układania w stosy maksymalizuje efektywność przechowywania i wygodę transportu.'
        },
        {
          type: LocalItemDescriptionType.IMAGE,
          title: 'Demonstracja składania',
          order: 3,
          content: '/static/local_item_descriptions/foldable-crate-folding-pl.webp'
        },
        {
          type: LocalItemDescriptionType.VIDEO,
          title: 'Przewodnik montażu i składania',
          order: 4,
          content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        },
        {
          type: LocalItemDescriptionType.LINK,
          title: 'Specyfikacje techniczne',
          order: 5,
          content: 'https://example.com/pl/foldable-crate-specs'
        }
      ]
    },
    'Stretch Film': { // Стретч-пленка
      'English': [
        {
          type: LocalItemDescriptionType.TEXT,
          title: 'Industrial Grade Quality',
          order: 1,
          content: 'Premium stretch film with superior puncture resistance and excellent cling properties. Provides secure wrap for pallets and large items during transport and storage.'
        },
        {
          type: LocalItemDescriptionType.TEXT,
          title: 'Cost-Effective Solution',
          order: 2,
          content: 'High stretch ratio reduces material usage while maintaining load stability. Transparent film allows easy identification of wrapped goods without unwrapping.'
        },
        {
          type: LocalItemDescriptionType.IMAGE,
          title: 'Pallet Wrapping Example',
          order: 3,
          content: '/static/local_item_descriptions/stretch-film-wrapping.webp'
        },
        {
          type: LocalItemDescriptionType.VIDEO,
          title: 'Professional Wrapping Technique',
          order: 4,
          content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        },
        {
          type: LocalItemDescriptionType.LINK,
          title: 'Load Securing Standards',
          order: 5,
          content: 'https://example.com/load-securing-standards'
        }
      ],
      'Русский': [
        {
          type: LocalItemDescriptionType.TEXT,
          title: 'Промышленное качество',
          order: 1,
          content: 'Премиум стретч-пленка с превосходной устойчивостью к проколам и отличными адгезивными свойствами. Обеспечивает надежную упаковку паллет и крупных предметов во время транспортировки и хранения.'
        },
        {
          type: LocalItemDescriptionType.TEXT,
          title: 'Экономичное решение',
          order: 2,
          content: 'Высокий коэффициент растяжения снижает расход материала, сохраняя при этом стабильность груза. Прозрачная пленка позволяет легко идентифицировать упакованные товары без разворачивания.'
        },
        {
          type: LocalItemDescriptionType.IMAGE,
          title: 'Пример упаковки паллет',
          order: 3,
          content: '/static/local_item_descriptions/stretch-film-wrapping-ru.webp'
        },
        {
          type: LocalItemDescriptionType.VIDEO,
          title: 'Профессиональная техника упаковки',
          order: 4,
          content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        },
        {
          type: LocalItemDescriptionType.LINK,
          title: 'Стандарты крепления грузов',
          order: 5,
          content: 'https://example.com/ru/load-securing-standards'
        }
      ],
      'Українська': [
        {
          type: LocalItemDescriptionType.TEXT,
          title: 'Промислова якість',
          order: 1,
          content: 'Преміум стретч-плівка з чудовою стійкістю до проколів та відмінними адгезивними властивостями. Забезпечує надійну упаковку палет та великих предметів під час транспортування та зберігання.'
        },
        {
          type: LocalItemDescriptionType.TEXT,
          title: 'Економічне рішення',
          order: 2,
          content: 'Високий коефіцієнт розтягування знижує витрати матеріалу, зберігаючи при цьому стабільність вантажу. Прозора плівка дозволяє легко ідентифікувати упаковані товари без розгортання.'
        },
        {
          type: LocalItemDescriptionType.IMAGE,
          title: 'Приклад упаковки палет',
          order: 3,
          content: '/static/local_item_descriptions/stretch-film-wrapping-ua.webp'
        },
        {
          type: LocalItemDescriptionType.VIDEO,
          title: 'Професійна техніка упаковки',
          order: 4,
          content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        },
        {
          type: LocalItemDescriptionType.LINK,
          title: 'Стандарти кріплення вантажів',
          order: 5,
          content: 'https://example.com/ua/load-securing-standards'
        }
      ],
      'Polski': [
        {
          type: LocalItemDescriptionType.TEXT,
          title: 'Jakość przemysłowa',
          order: 1,
          content: 'Folia stretch premium o doskonałej odporności na przebicia i właściwościach przyczepności. Zapewnia bezpieczne owijanie palet i dużych przedmiotów podczas transportu i przechowywania.'
        },
        {
          type: LocalItemDescriptionType.TEXT,
          title: 'Ekonomiczne rozwiązanie',
          order: 2,
          content: 'Wysoki współczynnik rozciągania zmniejsza zużycie materiału przy zachowaniu stabilności ładunku. Przezroczysta folia umożliwia łatwą identyfikację owiniętych towarów bez rozwijania.'
        },
        {
          type: LocalItemDescriptionType.IMAGE,
          title: 'Przykład owijania palet',
          order: 3,
          content: '/static/local_item_descriptions/stretch-film-wrapping-pl.webp'
        },
        {
          type: LocalItemDescriptionType.VIDEO,
          title: 'Profesjonalna technika owijania',
          order: 4,
          content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        },
        {
          type: LocalItemDescriptionType.LINK,
          title: 'Standardy zabezpieczania ładunku',
          order: 5,
          content: 'https://example.com/pl/load-securing-standards'
        }
      ]
    },
    'Cardboard Box Small': { // Малая Картонная Коробка
      'English': [
        {
          type: LocalItemDescriptionType.TEXT,
          title: 'Compact and Durable',
          order: 1,
          content: 'Small cardboard box designed for lightweight items and shipping applications. Made from recycled corrugated cardboard with reinforced edges for enhanced durability.'
        },
        {
          type: LocalItemDescriptionType.TEXT,
          title: 'Eco-Friendly Choice',
          order: 2,
          content: 'Manufactured from 100% recyclable materials, supporting sustainable packaging practices. Perfect size for electronics, books, and small household items.'
        },
        {
          type: LocalItemDescriptionType.IMAGE,
          title: 'Size Comparison Guide',
          order: 3,
          content: '/static/local_item_descriptions/small-box-comparison.webp'
        },
        {
          type: LocalItemDescriptionType.VIDEO,
          title: 'Assembly Instructions',
          order: 4,
          content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        },
        {
          type: LocalItemDescriptionType.LINK,
          title: 'Recycling Information',
          order: 5,
          content: 'https://example.com/cardboard-recycling-guide'
        }
      ],
      'Русский': [
        {
          type: LocalItemDescriptionType.TEXT,
          title: 'Компактная и прочная',
          order: 1,
          content: 'Малая картонная коробка, предназначенная для легких предметов и отправки. Изготовлена из переработанного гофрокартона с усиленными краями для повышенной прочности.'
        },
        {
          type: LocalItemDescriptionType.TEXT,
          title: 'Экологичный выбор',
          order: 2,
          content: 'Изготовлена из 100% перерабатываемых материалов, поддерживая практики устойчивой упаковки. Идеальный размер для электроники, книг и мелких предметов домашнего обихода.'
        },
        {
          type: LocalItemDescriptionType.IMAGE,
          title: 'Руководство по сравнению размеров',
          order: 3,
          content: '/static/local_item_descriptions/small-box-comparison-ru.webp'
        },
        {
          type: LocalItemDescriptionType.VIDEO,
          title: 'Инструкции по сборке',
          order: 4,
          content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        },
        {
          type: LocalItemDescriptionType.LINK,
          title: 'Информация о переработке',
          order: 5,
          content: 'https://example.com/ru/cardboard-recycling-guide'
        }
      ],
      'Українська': [
        {
          type: LocalItemDescriptionType.TEXT,
          title: 'Компактна та міцна',
          order: 1,
          content: 'Мала картонна коробка, призначена для легких предметів та відправлення. Виготовлена з переробленого гофрокартону з підсиленими краями для підвищеної міцності.'
        },
        {
          type: LocalItemDescriptionType.TEXT,
          title: 'Екологічний вибір',
          order: 2,
          content: 'Виготовлена зі 100% матеріалів що переробляються, підтримуючи практики сталого пакування. Ідеальний розмір для електроніки, книг та дрібних предметів домашнього вжитку.'
        },
        {
          type: LocalItemDescriptionType.IMAGE,
          title: 'Керівництво по порівнянню розмірів',
          order: 3,
          content: '/static/local_item_descriptions/small-box-comparison-ua.webp'
        },
        {
          type: LocalItemDescriptionType.VIDEO,
          title: 'Інструкції по збірці',
          order: 4,
          content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        },
        {
          type: LocalItemDescriptionType.LINK,
          title: 'Інформація про переробку',
          order: 5,
          content: 'https://example.com/ua/cardboard-recycling-guide'
        }
      ],
      'Polski': [
        {
          type: LocalItemDescriptionType.TEXT,
          title: 'Kompaktowa i wytrzymała',
          order: 1,
          content: 'Małe pudełko kartonowe przeznaczone do lekkich przedmiotów i wysyłki. Wykonane z recyklingowej tektury falistej z wzmocnionymi krawędziami dla zwiększonej wytrzymałości.'
        },
        {
          type: LocalItemDescriptionType.TEXT,
          title: 'Wybór przyjazny środowisku',
          order: 2,
          content: 'Wyprodukowane w 100% z materiałów nadających się do recyklingu, wspierając praktyki zrównoważonego opakowywania. Idealny rozmiar na elektronikę, książki i małe przedmioty domowe.'
        },
        {
          type: LocalItemDescriptionType.IMAGE,
          title: 'Przewodnik porównania rozmiarów',
          order: 3,
          content: '/static/local_item_descriptions/small-box-comparison-pl.webp'
        },
        {
          type: LocalItemDescriptionType.VIDEO,
          title: 'Instrukcje montażu',
          order: 4,
          content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        },
        {
          type: LocalItemDescriptionType.LINK,
          title: 'Informacje o recyklingu',
          order: 5,
          content: 'https://example.com/pl/cardboard-recycling-guide'
        }
      ]
    },
    'Two Wheel Cart': { // Двухколесная Тележка
      'English': [
        {
          type: LocalItemDescriptionType.TEXT,
          title: 'Heavy-Duty Performance',
          order: 1,
          content: 'Professional two-wheel hand truck designed for easy transportation of heavy loads up to 300kg. Features ergonomic handles and pneumatic wheels for smooth operation.'
        },
        {
          type: LocalItemDescriptionType.TEXT,
          title: 'Workplace Safety',
          order: 2,
          content: 'Reduces physical strain and prevents workplace injuries when moving heavy items. Non-slip toe plate and secure strapping system ensure load stability during transport.'
        },
        {
          type: LocalItemDescriptionType.IMAGE,
          title: 'Load Capacity Demonstration',
          order: 3,
          content: '/static/local_item_descriptions/two-wheel-cart-capacity.webp'
        },
        {
          type: LocalItemDescriptionType.VIDEO,
          title: 'Proper Loading Technique',
          order: 4,
          content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        },
        {
          type: LocalItemDescriptionType.LINK,
          title: 'Safety Operating Manual',
          order: 5,
          content: 'https://example.com/hand-truck-safety-manual'
        }
      ],
      'Русский': [
        {
          type: LocalItemDescriptionType.TEXT,
          title: 'Производительность для тяжелых работ',
          order: 1,
          content: 'Профессиональная двухколесная тележка, предназначенная для легкой транспортировки тяжелых грузов до 300кг. Оснащена эргономичными ручками и пневматическими колесами для плавной работы.'
        },
        {
          type: LocalItemDescriptionType.TEXT,
          title: 'Безопасность на рабочем месте',
          order: 2,
          content: 'Снижает физическую нагрузку и предотвращает травмы на рабочем месте при перемещении тяжелых предметов. Противоскользящая опорная площадка и надежная система крепления обеспечивают стабильность груза во время транспортировки.'
        },
        {
          type: LocalItemDescriptionType.IMAGE,
          title: 'Демонстрация грузоподъемности',
          order: 3,
          content: '/static/local_item_descriptions/two-wheel-cart-capacity-ru.webp'
        },
        {
          type: LocalItemDescriptionType.VIDEO,
          title: 'Правильная техника загрузки',
          order: 4,
          content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        },
        {
          type: LocalItemDescriptionType.LINK,
          title: 'Руководство по безопасной эксплуатации',
          order: 5,
          content: 'https://example.com/ru/hand-truck-safety-manual'
        }
      ],
      'Українська': [
        {
          type: LocalItemDescriptionType.TEXT,
          title: 'Продуктивність для важких робіт',
          order: 1,
          content: 'Професійна двоколісна тележка, призначена для легкого транспортування важких вантажів до 300кг. Оснащена эргономічними ручками та пневматичними колесами для плавної роботи.'
        },
        {
          type: LocalItemDescriptionType.TEXT,
          title: 'Безпека на робочому місці',
          order: 2,
          content: 'Знижує фізичне навантаження та запобігає травмам на робочому місці при переміщенні важких предметів. Протиковзна опорна площадка та надійна система кріплення забезпечують стабільність вантажу під час транспортування.'
        },
        {
          type: LocalItemDescriptionType.IMAGE,
          title: 'Демонстрація вантажопідйомності',
          order: 3,
          content: '/static/local_item_descriptions/two-wheel-cart-capacity-ua.webp'
        },
        {
          type: LocalItemDescriptionType.VIDEO,
          title: 'Правильна техніка завантаження',
          order: 4,
          content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        },
        {
          type: LocalItemDescriptionType.LINK,
          title: 'Керівництво з безпечної експлуатації',
          order: 5,
          content: 'https://example.com/ua/hand-truck-safety-manual'
        }
      ],
      'Polski': [
        {
          type: LocalItemDescriptionType.TEXT,
          title: 'Wydajność do ciężkich prac',
          order: 1,
          content: 'Profesjonalny dwukołowy wózek transportowy przeznaczony do łatwego transportu ciężkich ładunków do 300kg. Wyposażony w ergonomiczne uchwyty i pneumatyczne koła dla płynnej pracy.'
        },
        {
          type: LocalItemDescriptionType.TEXT,
          title: 'Bezpieczeństwo w miejscu pracy',
          order: 2,
          content: 'Zmniejsza obciążenie fizyczne i zapobiega urazom w miejscu pracy podczas przenoszenia ciężkich przedmiotów. Przeciwpoślizgowa płyta nośna i bezpieczny system mocowania zapewniają stabilność ładunku podczas transportu.'
        },
        {
          type: LocalItemDescriptionType.IMAGE,
          title: 'Demonstracja udźwigu',
          order: 3,
          content: '/static/local_item_descriptions/two-wheel-cart-capacity-pl.webp'
        },
        {
          type: LocalItemDescriptionType.VIDEO,
          title: 'Właściwa technika ładowania',
          order: 4,
          content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        },
        {
          type: LocalItemDescriptionType.LINK,
          title: 'Instrukcja bezpiecznej obsługi',
          order: 5,
          content: 'https://example.com/pl/hand-truck-safety-manual'
        }
      ]
    }
  };

  // Получаем локализованные продукты для целевых локалей
  const locales = await prisma.locale.findMany({
    where: {
      symbol: { in: targetLocaleSymbols }
    }
  });

  // Сначала найдем основные продукты по английским названиям
  const targetProductsEnglish = Object.keys(descriptions);
  const products = await prisma.product.findMany({
    where: {
      name: { in: targetProductsEnglish }
    }
  });

  for (const locale of locales) {
    for (const product of products) {
      // Найдем локализованный продукт для данного локального продукта
      const localProduct = await prisma.localProduct.findFirst({
        where: {
          locale_id: locale.id,
          product_id: product.id
        }
      });

      if (!localProduct) continue;

      const productDescriptions = descriptions[product.name]?.[locale.language];
      if (!productDescriptions) continue;

      // Создаем описания для каждого типа
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
    }
  }

  console.log('✅ Локальные описания продуктов созданы!');
};
