import { PrismaClient } from '@prisma/client';

export const seedLocalProducts = async (prisma: PrismaClient) => {
  const translations = {
    'English': {
      'Cardboard Box Large': {
        name: 'Large Cardboard Box',
        description: 'Large size cardboard box perfect for heavy items and bulk storage',
      },
      'Cardboard Box Medium': {
        name: 'Medium Cardboard Box',
        description: 'Medium size cardboard box ideal for regular items and moving',
      },
      'Cardboard Box Small': {
        name: 'Small Cardboard Box',
        description: 'Small size cardboard box suitable for light items and shipping',
      },
      'Bubble Wrap': {
        name: 'Bubble Wrap',
        description: 'High-quality bubble wrap for protecting fragile items during transport',
      },
      'Stretch Film': {
        name: 'Stretch Film',
        description: 'Industrial grade stretch film for securing pallets and large items',
      },
      'Plastic Container 60L': {
        name: '60L Plastic Container',
        description: 'Durable 60-liter plastic container for secure storage',
      },
      'Foldable Plastic Crate': {
        name: 'Foldable Plastic Crate',
        description: 'Space-saving collapsible plastic crate for efficient storage',
      },
      'Platform Cart': {
        name: 'Platform Cart',
        description: 'Heavy-duty platform cart for efficient warehouse logistics',
      },
      'Two Wheel Cart': {
        name: 'Two Wheel Hand Truck',
        description: 'Professional two-wheel hand truck for easy cargo handling',
      },
      'Adhesive Labels': {
        name: 'Adhesive Shipping Labels',
        description: 'High-quality adhesive labels for shipping and inventory management',
      },
      'Fragile Stickers': {
        name: 'Fragile Warning Labels',
        description: 'Clear warning labels for marking delicate items',
      },
    },
    'Deutsch': {
      'Cardboard Box Large': {
        name: 'Großer Karton',
        description: 'Großer Karton perfekt für schwere Gegenstände und Massenlagerung',
      },
      'Cardboard Box Medium': {
        name: 'Mittlerer Karton',
        description: 'Mittelgroßer Karton ideal für reguläre Gegenstände und Umzüge',
      },
      'Cardboard Box Small': {
        name: 'Kleiner Karton',
        description: 'Kleiner Karton geeignet für leichte Gegenstände und Versand',
      },
      'Bubble Wrap': {
        name: 'Luftpolsterfolie',
        description: 'Hochwertige Luftpolsterfolie zum Schutz zerbrechlicher Gegenstände',
      },
      'Stretch Film': {
        name: 'Stretchfolie',
        description: 'Industrielle Stretchfolie zur Sicherung von Paletten',
      },
      'Plastic Container 60L': {
        name: '60L Kunststoffbehälter',
        description: 'Langlebiger 60-Liter Kunststoffbehälter für sichere Lagerung',
      },
      'Foldable Plastic Crate': {
        name: 'Faltbare Kunststoffkiste',
        description: 'Platzsparende faltbare Kunststoffkiste für effiziente Lagerung',
      },
      'Platform Cart': {
        name: 'Plattformwagen',
        description: 'Robuster Plattformwagen für effiziente Lagerlogistik',
      },
      'Two Wheel Cart': {
        name: 'Zweirad-Sackkarre',
        description: 'Professionelle Zweirad-Sackkarre für einfaches Handling',
      },
      'Adhesive Labels': {
        name: 'Versandetiketten',
        description: 'Hochwertige Klebeetiketten für Versand und Bestandsführung',
      },
      'Fragile Stickers': {
        name: 'Vorsicht Zerbrechlich Aufkleber',
        description: 'Deutliche Warnaufkleber für empfindliche Gegenstände',
      },
    },
    'Français': {
      'Cardboard Box Large': {
        name: 'Grande Boîte en Carton',
        description: 'Grande boîte en carton parfaite pour les objets lourds',
      },
      'Cardboard Box Medium': {
        name: 'Boîte en Carton Moyenne',
        description: 'Boîte en carton moyenne idéale pour les objets courants',
      },
      'Cardboard Box Small': {
        name: 'Petite Boîte en Carton',
        description: 'Petite boîte en carton adaptée aux objets légers',
      },
      'Bubble Wrap': {
        name: 'Papier Bulle',
        description: 'Papier bulle haute qualité pour protéger les objets fragiles',
      },
      'Stretch Film': {
        name: 'Film Étirable',
        description: 'Film étirable industriel pour sécuriser les palettes',
      },
      'Plastic Container 60L': {
        name: 'Conteneur Plastique 60L',
        description: 'Conteneur plastique durable de 60 litres pour stockage sécurisé',
      },
      'Foldable Plastic Crate': {
        name: 'Caisse Plastique Pliable',
        description: 'Caisse plastique pliable pour un stockage efficace',
      },
      'Platform Cart': {
        name: 'Chariot Plateforme',
        description: 'Chariot plateforme robuste pour la logistique d\'entrepôt',
      },
      'Two Wheel Cart': {
        name: 'Diable à Deux Roues',
        description: 'Diable professionnel pour la manutention facile',
      },
      'Adhesive Labels': {
        name: 'Étiquettes Adhésives',
        description: 'Étiquettes adhésives de qualité pour l\'expédition',
      },
      'Fragile Stickers': {
        name: 'Étiquettes Fragile',
        description: 'Étiquettes d\'avertissement pour objets délicats',
      },
    },
    'Español': {
      'Cardboard Box Large': {
        name: 'Caja de Cartón Grande',
        description: 'Caja de cartón grande perfecta para artículos pesados',
      },
      'Cardboard Box Medium': {
        name: 'Caja de Cartón Mediana',
        description: 'Caja de cartón mediana ideal para artículos regulares',
      },
      'Cardboard Box Small': {
        name: 'Caja de Cartón Pequeña',
        description: 'Caja de cartón pequeña adecuada para artículos ligeros',
      },
      'Bubble Wrap': {
        name: 'Plástico de Burbujas',
        description: 'Plástico de burbujas de alta calidad para proteger artículos frágiles',
      },
      'Stretch Film': {
        name: 'Film Estirable',
        description: 'Film estirable industrial para asegurar palés',
      },
      'Plastic Container 60L': {
        name: 'Contenedor Plástico 60L',
        description: 'Contenedor plástico duradero de 60 litros para almacenamiento seguro',
      },
      'Foldable Plastic Crate': {
        name: 'Caja Plástica Plegable',
        description: 'Caja plástica plegable para almacenamiento eficiente',
      },
      'Platform Cart': {
        name: 'Carro Plataforma',
        description: 'Carro plataforma resistente para logística de almacén',
      },
      'Two Wheel Cart': {
        name: 'Carretilla de Dos Ruedas',
        description: 'Carretilla profesional para fácil manejo de carga',
      },
      'Adhesive Labels': {
        name: 'Etiquetas Adhesivas',
        description: 'Etiquetas adhesivas de calidad para envíos',
      },
      'Fragile Stickers': {
        name: 'Etiquetas de Frágil',
        description: 'Etiquetas de advertencia para artículos delicados',
      },
    },
    'Italiano': {
      'Cardboard Box Large': {
        name: 'Scatola di Cartone Grande',
        description: 'Scatola di cartone grande perfetta per oggetti pesanti',
      },
      'Cardboard Box Medium': {
        name: 'Scatola di Cartone Media',
        description: 'Scatola di cartone media ideale per oggetti regolari',
      },
      'Cardboard Box Small': {
        name: 'Scatola di Cartone Piccola',
        description: 'Scatola di cartone piccola adatta per oggetti leggeri',
      },
      'Bubble Wrap': {
        name: 'Pluriball',
        description: 'Pluriball di alta qualità per proteggere oggetti fragili',
      },
      'Stretch Film': {
        name: 'Film Estensibile',
        description: 'Film estensibile industriale per fissare pallet',
      },
      'Plastic Container 60L': {
        name: 'Contenitore in Plastica 60L',
        description: 'Contenitore in plastica durevole da 60 litri per stoccaggio sicuro',
      },
      'Foldable Plastic Crate': {
        name: 'Cassa Pieghevole in Plastica',
        description: 'Cassa pieghevole in plastica per stoccaggio efficiente',
      },
      'Platform Cart': {
        name: 'Carrello a Piattaforma',
        description: 'Carrello a piattaforma robusto per logistica di magazzino',
      },
      'Two Wheel Cart': {
        name: 'Carrello a Due Ruote',
        description: 'Carrello professionale per facile movimentazione',
      },
      'Adhesive Labels': {
        name: 'Etichette Adesive',
        description: 'Etichette adesive di qualità per spedizioni',
      },
      'Fragile Stickers': {
        name: 'Etichette Fragile',
        description: 'Etichette di avvertimento per oggetti delicati',
      },
    },
    'Dutch': {
      'Cardboard Box Large': {
        name: 'Grote Kartonnen Doos',
        description: 'Grote kartonnen doos perfect voor zware items',
      },
      'Cardboard Box Medium': {
        name: 'Middelgrote Kartonnen Doos',
        description: 'Middelgrote kartonnen doos ideaal voor reguliere items',
      },
      'Cardboard Box Small': {
        name: 'Kleine Kartonnen Doos',
        description: 'Kleine kartonnen doos geschikt voor lichte items',
      },
      'Bubble Wrap': {
        name: 'Noppenfolie',
        description: 'Hoogwaardige noppenfolie voor het beschermen van breekbare items',
      },
      'Stretch Film': {
        name: 'Stretchfolie',
        description: 'Industriële stretchfolie voor het vastzetten van pallets',
      },
      'Plastic Container 60L': {
        name: '60L Plastic Container',
        description: 'Duurzame 60 liter plastic container voor veilige opslag',
      },
      'Foldable Plastic Crate': {
        name: 'Opvouwbare Plastic Krat',
        description: 'Ruimtebesparende opvouwbare plastic krat voor efficiënte opslag',
      },
      'Platform Cart': {
        name: 'Platformwagen',
        description: 'Robuuste platformwagen voor efficiënte magazijnlogistiek',
      },
      'Two Wheel Cart': {
        name: 'Tweewielige Steekwagen',
        description: 'Professionele steekwagen voor eenvoudige goederenverwerking',
      },
      'Adhesive Labels': {
        name: 'Verzendlabels',
        description: 'Hoogwaardige zelfklevende labels voor verzending',
      },
      'Fragile Stickers': {
        name: 'Breekbaar Stickers',
        description: 'Waarschuwingslabels voor kwetsbare items',
      },
    },
    'Polski': {
      'Cardboard Box Large': {
        name: 'Duże Pudło Kartonowe',
        description: 'Duże pudło kartonowe idealne do ciężkich przedmiotów',
      },
      'Cardboard Box Medium': {
        name: 'Średnie Pudło Kartonowe',
        description: 'Średnie pudło kartonowe idealne do zwykłych przedmiotów',
      },
      'Cardboard Box Small': {
        name: 'Małe Pudło Kartonowe',
        description: 'Małe pudło kartonowe odpowiednie do lekkich przedmiotów',
      },
      'Bubble Wrap': {
        name: 'Folia Bąbelkowa',
        description: 'Wysokiej jakości folia bąbelkowa do ochrony delikatnych przedmiotów',
      },
      'Stretch Film': {
        name: 'Folia Stretch',
        description: 'Przemysłowa folia stretch do zabezpieczania palet',
      },
      'Plastic Container 60L': {
        name: 'Pojemnik Plastikowy 60L',
        description: 'Trwały pojemnik plastikowy 60 litrów do bezpiecznego przechowywania',
      },
      'Foldable Plastic Crate': {
        name: 'Składana Skrzynia Plastikowa',
        description: 'Składana skrzynia plastikowa do efektywnego przechowywania',
      },
      'Platform Cart': {
        name: 'Wózek Platformowy',
        description: 'Wytrzymały wózek platformowy do efektywnej logistyki magazynowej',
      },
      'Two Wheel Cart': {
        name: 'Wózek Dwukołowy',
        description: 'Profesjonalny wózek dwukołowy do łatwego przewożenia ładunków',
      },
      'Adhesive Labels': {
        name: 'Etykiety Wysyłkowe',
        description: 'Wysokiej jakości etykiety samoprzylepne do wysyłki',
      },
      'Fragile Stickers': {
        name: 'Naklejki Ostrożnie Szkło',
        description: 'Etykiety ostrzegawcze dla delikatnych przedmiotów',
      },
    },
    'Svenska': {
      'Cardboard Box Large': {
        name: 'Stor Kartong',
        description: 'Stor kartong perfekt för tunga föremål',
      },
      'Cardboard Box Medium': {
        name: 'Mellanstor Kartong',
        description: 'Mellanstor kartong idealisk för vanliga föremål',
      },
      'Cardboard Box Small': {
        name: 'Liten Kartong',
        description: 'Liten kartong lämplig för lätta föremål',
      },
      'Bubble Wrap': {
        name: 'Bubbelplast',
        description: 'Högkvalitativ bubbelplast för att skydda ömtåliga föremål',
      },
      'Stretch Film': {
        name: 'Sträckfilm',
        description: 'Industriell sträckfilm för säkring av pallar',
      },
      'Plastic Container 60L': {
        name: '60L Plastbehållare',
        description: 'Hållbar 60-liters plastbehållare för säker förvaring',
      },
      'Foldable Plastic Crate': {
        name: 'Vikbar Plastlåda',
        description: 'Platsbesparande vikbar plastlåda för effektiv förvaring',
      },
      'Platform Cart': {
        name: 'Plattformsvagn',
        description: 'Robust plattformsvagn för effektiv lagerlogistik',
      },
      'Two Wheel Cart': {
        name: 'Tvåhjulig Vagn',
        description: 'Professionell tvåhjulig vagn för enkel godshantering',
      },
      'Adhesive Labels': {
        name: 'Fraktetiketter',
        description: 'Högkvalitativa självhäftande etiketter för frakt',
      },
      'Fragile Stickers': {
        name: 'Ömtåligt Etiketter',
        description: 'Varningsetiketter för ömtåliga föremål',
      },
    },
    'Українська': {
      'Cardboard Box Large': {
        name: 'Велика Картонна Коробка',
        description: 'Велика картонна коробка ідеальна для важких предметів',
      },
      'Cardboard Box Medium': {
        name: 'Середня Картонна Коробка',
        description: 'Середня картонна коробка ідеальна для звичайних предметів',
      },
      'Cardboard Box Small': {
        name: 'Мала Картонна Коробка',
        description: 'Мала картонна коробка підходить для легких предметів',
      },
      'Bubble Wrap': {
        name: 'Пакувальна Плівка',
        description: 'Високоякісна пакувальна плівка для захисту крихких предметів',
      },
      'Stretch Film': {
        name: 'Стретч-плівка',
        description: 'Промислова стретч-плівка для закріплення палет',
      },
      'Plastic Container 60L': {
        name: 'Пластиковий Контейнер 60Л',
        description: 'Міцний пластиковий контейнер 60 літрів для надійного зберігання',
      },
      'Foldable Plastic Crate': {
        name: 'Складаний Пластиковий Ящик',
        description: 'Складаний пластиковий ящик для ефективного зберігання',
      },
      'Platform Cart': {
        name: 'Платформний Візок',
        description: 'Міцний платформний візок для ефективної складської логістики',
      },
      'Two Wheel Cart': {
        name: 'Двоколісний Візок',
        description: 'Професійний двоколісний візок для легкого переміщення вантажів',
      },
      'Adhesive Labels': {
        name: 'Наклейки для Відправлень',
        description: 'Високоякісні самоклеючі етикетки для відправлень',
      },
      'Fragile Stickers': {
        name: 'Наклейки Обережно Крихке',
        description: 'Попереджувальні наклейки для крихких предметів',
      },
    },
    'Русский': {
      'Cardboard Box Large': {
        name: 'Большая Картонная Коробка',
        description: 'Большая картонная коробка идеальна для тяжелых предметов',
      },
      'Cardboard Box Medium': {
        name: 'Средняя Картонная Коробка',
        description: 'Средняя картонная коробка идеальна для обычных предметов',
      },
      'Cardboard Box Small': {
        name: 'Малая Картонная Коробка',
        description: 'Малая картонная коробка подходит для легких предметов',
      },
      'Bubble Wrap': {
        name: 'Пузырчатая Пленка',
        description: 'Высококачественная пузырчатая пленка для защиты хрупких предметов',
      },
      'Stretch Film': {
        name: 'Стретч-пленка',
        description: 'Промышленная стретч-пленка для закрепления паллет',
      },
      'Plastic Container 60L': {
        name: 'Пластиковый Контейнер 60Л',
        description: 'Прочный пластиковый контейнер 60 литров для надежного хранения',
      },
      'Foldable Plastic Crate': {
        name: 'Складной Пластиковый Ящик',
        description: 'Складной пластиковый ящик для эффективного хранения',
      },
      'Platform Cart': {
        name: 'Платформенная Тележка',
        description: 'Прочная платформенная тележка для эффективной складской логистики',
      },
      'Two Wheel Cart': {
        name: 'Двухколесная Тележка',
        description: 'Профессиональная двухколесная тележка для легкой транспортировки грузов',
      },
      'Adhesive Labels': {
        name: 'Наклейки для Отправлений',
        description: 'Высококачественные самоклеящиеся этикетки для отправлений',
      },
      'Fragile Stickers': {
        name: 'Наклейки Осторожно Хрупкое',
        description: 'Предупреждающие наклейки для хрупких предметов',
      },
    },
  };

  const products = await prisma.product.findMany();
  const locales = await prisma.locale.findMany();

  for (const product of products) {
    for (const locale of locales) {
      const translation = translations[locale.language]?.[product.name];

      if (translation) {
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
      }
    }
  }
};

// Примерные курсы валют для конвертации цен
function getExchangeRate(currency: string): number {
  const rates = {
    'USD': 1,
    'EUR': 0.85,
    'GBP': 0.73,
    'PLN': 3.8,
    'SEK': 8.5,
    'UAH': 36,
    'RUB': 90,
    'CAD': 1.25,
  };

  return rates[currency] || 1;
}
