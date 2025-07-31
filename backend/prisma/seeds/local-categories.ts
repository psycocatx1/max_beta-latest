import { PrismaClient } from '@prisma/client';

export const seedLocalCategories = async (prisma: PrismaClient) => {
  // Получаем все локали
  const locales = await prisma.locale.findMany();

  // Получаем все категории
  const categories = await prisma.category.findMany();

  // Подготавливаем переводы для каждой категории
  const translations = {
    // Категории продуктов
    'Packaging Materials': {
      'English': { name: 'Packaging Materials', description: 'Various materials for packaging goods' },
      'Deutsch': { name: 'Verpackungsmaterialien', description: 'Verschiedene Materialien zur Warenverpackung' },
      'Français': { name: 'Matériaux d\'emballage', description: 'Divers matériaux pour l\'emballage des marchandises' },
      'Español': { name: 'Materiales de embalaje', description: 'Diversos materiales para el embalaje de mercancías' },
      'Italiano': { name: 'Materiali per imballaggio', description: 'Vari materiali per l\'imballaggio delle merci' },
      'Dutch': { name: 'Verpakkingsmaterialen', description: 'Diverse materialen voor het verpakken van goederen' },
      'Polski': { name: 'Materiały opakowaniowe', description: 'Różne materiały do pakowania towarów' },
      'Svenska': { name: 'Förpackningsmaterial', description: 'Olika material för varuförpackning' },
      'Українська': { name: 'Пакувальні матеріали', description: 'Різноманітні матеріали для пакування товарів' },
      'Русский': { name: 'Упаковочные материалы', description: 'Различные материалы для упаковки товаров' }
    },
    'Cardboard Boxes': {
      'English': { name: 'Cardboard Boxes', description: 'Different sizes of cardboard boxes' },
      'Deutsch': { name: 'Kartonagen', description: 'Kartons in verschiedenen Größen' },
      'Français': { name: 'Boîtes en carton', description: 'Boîtes en carton de différentes tailles' },
      'Español': { name: 'Cajas de cartón', description: 'Cajas de cartón de diferentes tamaños' },
      'Italiano': { name: 'Scatole di cartone', description: 'Scatole di cartone di diverse dimensioni' },
      'Dutch': { name: 'Kartonnen dozen', description: 'Kartonnen dozen in verschillende maten' },
      'Polski': { name: 'Pudła kartonowe', description: 'Pudła kartonowe w różnych rozmiarach' },
      'Svenska': { name: 'Kartonglådor', description: 'Kartonglådor i olika storlekar' },
      'Українська': { name: 'Картонні коробки', description: 'Картонні коробки різних розмірів' },
      'Русский': { name: 'Картонные коробки', description: 'Картонные коробки разных размеров' }
    },
    'Containers': {
      'English': { name: 'Containers', description: 'Various types of containers' },
      'Deutsch': { name: 'Container', description: 'Verschiedene Arten von Containern' },
      'Français': { name: 'Conteneurs', description: 'Différents types de conteneurs' },
      'Español': { name: 'Contenedores', description: 'Varios tipos de contenedores' },
      'Italiano': { name: 'Contenitori', description: 'Vari tipi di contenitori' },
      'Dutch': { name: 'Containers', description: 'Verschillende soorten containers' },
      'Polski': { name: 'Kontenery', description: 'Różne rodzaje kontenerów' },
      'Svenska': { name: 'Containrar', description: 'Olika typer av containrar' },
      'Українська': { name: 'Контейнери', description: 'Різні типи контейнерів' },
      'Русский': { name: 'Контейнеры', description: 'Различные типы контейнеров' }
    },
    'Fillers': {
      'English': { name: 'Fillers', description: 'Protective filling materials' },
      'Deutsch': { name: 'Füllmaterial', description: 'Schützende Füllmaterialien' },
      'Français': { name: 'Matériaux de remplissage', description: 'Matériaux de remplissage protecteurs' },
      'Español': { name: 'Rellenos', description: 'Materiales de relleno protectores' },
      'Italiano': { name: 'Materiali di riempimento', description: 'Materiali di riempimento protettivi' },
      'Dutch': { name: 'Vulmateriaal', description: 'Beschermende vulmateriaal' },
      'Polski': { name: 'Wypełniacze', description: 'Ochronne materiały wypełniające' },
      'Svenska': { name: 'Fyllnadsmaterial', description: 'Skyddande fyllnadsmaterial' },
      'Українська': { name: 'Наповнювачі', description: 'Захисні пакувальні матеріали' },
      'Русский': { name: 'Наполнители', description: 'Защитные упаковочные материалы' }
    },
    'Logistics Equipment': {
      'English': { name: 'Logistics Equipment', description: 'Equipment for logistics operations' },
      'Deutsch': { name: 'Logistikausrüstung', description: 'Ausrüstung für logistische Operationen' },
      'Français': { name: 'Équipement logistique', description: 'Équipement pour les opérations logistiques' },
      'Español': { name: 'Equipo logístico', description: 'Equipamiento para operaciones logísticas' },
      'Italiano': { name: 'Attrezzature logistiche', description: 'Attrezzature per operazioni logistiche' },
      'Dutch': { name: 'Logistieke apparatuur', description: 'Apparatuur voor logistieke operaties' },
      'Polski': { name: 'Sprzęt logistyczny', description: 'Sprzęt do operacji logistycznych' },
      'Svenska': { name: 'Logistikutrustning', description: 'Utrustning för logistikoperationer' },
      'Українська': { name: 'Логістичне обладнання', description: 'Обладнання для логістичних операцій' },
      'Русский': { name: 'Логистическое оборудование', description: 'Оборудование для логистических операций' }
    },
    'Warehouse Carts': {
      'English': { name: 'Warehouse Carts', description: 'Various types of warehouse carts' },
      'Deutsch': { name: 'Lagerkarren', description: 'Verschiedene Arten von Lagerkarren' },
      'Français': { name: 'Chariots d\'entrepôt', description: 'Différents types de chariots d\'entrepôt' },
      'Español': { name: 'Carros de almacén', description: 'Varios tipos de carros de almacén' },
      'Italiano': { name: 'Carrelli da magazzino', description: 'Vari tipi di carrelli da magazzino' },
      'Dutch': { name: 'Magazijnkarren', description: 'Verschillende soorten magazijnkarren' },
      'Polski': { name: 'Wózki magazynowe', description: 'Różne rodzaje wózków magazynowych' },
      'Svenska': { name: 'Lagervagnar', description: 'Olika typer av lagervagnar' },
      'Українська': { name: 'Складські візки', description: 'Різні типи складських візків' },
      'Русский': { name: 'Складские тележки', description: 'Различные типы складских тележек' }
    },
    'Shelving Systems': {
      'English': { name: 'Shelving Systems', description: 'Storage and shelving solutions' },
      'Deutsch': { name: 'Regalsysteme', description: 'Lager- und Regallösungen' },
      'Français': { name: 'Systèmes de rayonnage', description: 'Solutions de stockage et d\'étagères' },
      'Español': { name: 'Sistemas de estanterías', description: 'Soluciones de almacenamiento y estanterías' },
      'Italiano': { name: 'Sistemi di scaffalature', description: 'Soluzioni di stoccaggio e scaffalature' },
      'Dutch': { name: 'Schappensystemen', description: 'Opslag- en schapoplossingen' },
      'Polski': { name: 'Systemy regałowe', description: 'Rozwiązania magazynowe i regałowe' },
      'Svenska': { name: 'Hyllsystem', description: 'Förvarings- och hyllösningar' },
      'Українська': { name: 'Стелажні системи', description: 'Рішення для зберігання та стелажів' },
      'Русский': { name: 'Стеллажные системы', description: 'Решения для хранения и стеллажей' }
    },
    'Weighing Equipment': {
      'English': { name: 'Weighing Equipment', description: 'Equipment for weighing goods' },
      'Deutsch': { name: 'Wägeausrüstung', description: 'Ausrüstung zum Wiegen von Waren' },
      'Français': { name: 'Équipement de pesage', description: 'Équipement pour peser les marchandises' },
      'Español': { name: 'Equipo de pesaje', description: 'Equipamiento para pesar mercancías' },
      'Italiano': { name: 'Attrezzature di pesatura', description: 'Attrezzature per pesare le merci' },
      'Dutch': { name: 'Weegapparatuur', description: 'Apparatuur voor het wegen van goederen' },
      'Polski': { name: 'Sprzęt wagowy', description: 'Sprzęt do ważenia towarów' },
      'Svenska': { name: 'Vägningsutrustning', description: 'Utrustning för vägning av varor' },
      'Українська': { name: 'Вагове обладнання', description: 'Обладнання для зважування товарів' },
      'Русский': { name: 'Весовое оборудование', description: 'Оборудование для взвешивания товаров' }
    },

    // Категории услуг
    'Transport Services': {
      'English': { name: 'Transport Services', description: 'Various transportation solutions' },
      'Deutsch': { name: 'Transportdienste', description: 'Verschiedene Transportlösungen' },
      'Français': { name: 'Services de transport', description: 'Différentes solutions de transport' },
      'Español': { name: 'Servicios de transporte', description: 'Varias soluciones de transporte' },
      'Italiano': { name: 'Servizi di trasporto', description: 'Varie soluzioni di trasporto' },
      'Dutch': { name: 'Transportdiensten', description: 'Verschillende transportoplossingen' },
      'Polski': { name: 'Usługi transportowe', description: 'Różne rozwiązania transportowe' },
      'Svenska': { name: 'Transporttjänster', description: 'Olika transportlösningar' },
      'Українська': { name: 'Транспортні послуги', description: 'Різноманітні транспортні рішення' },
      'Русский': { name: 'Транспортные услуги', description: 'Различные транспортные решения' }
    },
    'Air Transport': {
      'English': { name: 'Air Transport', description: 'Air freight services' },
      'Deutsch': { name: 'Lufttransport', description: 'Luftfrachtdienste' },
      'Français': { name: 'Transport aérien', description: 'Services de fret aérien' },
      'Español': { name: 'Transporte aéreo', description: 'Servicios de carga aérea' },
      'Italiano': { name: 'Trasporto aereo', description: 'Servizi di trasporto aereo merci' },
      'Dutch': { name: 'Luchttransport', description: 'Luchtvrachtdiensten' },
      'Polski': { name: 'Transport lotniczy', description: 'Usługi frachtu lotniczego' },
      'Svenska': { name: 'Flygtransport', description: 'Flygfrakttjänster' },
      'Українська': { name: 'Авіаперевезення', description: 'Послуги авіаційних вантажоперевезень' },
      'Русский': { name: 'Авиаперевозки', description: 'Услуги авиационных грузоперевозок' }
    },
    'Sea Transport': {
      'English': { name: 'Sea Transport', description: 'Sea freight services' },
      'Deutsch': { name: 'Seetransport', description: 'Seefrachtdienste' },
      'Français': { name: 'Transport maritime', description: 'Services de fret maritime' },
      'Español': { name: 'Transporte marítimo', description: 'Servicios de carga marítima' },
      'Italiano': { name: 'Trasporto marittimo', description: 'Servizi di trasporto marittimo merci' },
      'Dutch': { name: 'Zeetransport', description: 'Zeevrachtdiensten' },
      'Polski': { name: 'Transport morski', description: 'Usługi frachtu morskiego' },
      'Svenska': { name: 'Sjötransport', description: 'Sjöfrakttjänster' },
      'Українська': { name: 'Морські перевезення', description: 'Послуги морських вантажоперевезень' },
      'Русский': { name: 'Морские перевозки', description: 'Услуги морских грузоперевозок' }
    },
    'Rail Transport': {
      'English': { name: 'Rail Transport', description: 'Rail freight services' },
      'Deutsch': { name: 'Schienentransport', description: 'Schienenfrachtdienste' },
      'Français': { name: 'Transport ferroviaire', description: 'Services de fret ferroviaire' },
      'Español': { name: 'Transporte ferroviario', description: 'Servicios de carga ferroviaria' },
      'Italiano': { name: 'Trasporto ferroviario', description: 'Servizi di trasporto ferroviario merci' },
      'Dutch': { name: 'Railtransport', description: 'Spoorvrachtdiensten' },
      'Polski': { name: 'Transport kolejowy', description: 'Usługi frachtu kolejowego' },
      'Svenska': { name: 'Järnvägstransport', description: 'Järnvägsfrakttjänster' },
      'Українська': { name: 'Залізничні перевезення', description: 'Послуги залізничних вантажоперевезень' },
      'Русский': { name: 'Железнодорожные перевозки', description: 'Услуги железнодорожных грузоперевозок' }
    },
    'Truck Transport': {
      'English': { name: 'Truck Transport', description: 'Road freight services' },
      'Deutsch': { name: 'LKW-Transport', description: 'Straßenfrachtdienste' },
      'Français': { name: 'Transport routier', description: 'Services de fret routier' },
      'Español': { name: 'Transporte por carretera', description: 'Servicios de carga por carretera' },
      'Italiano': { name: 'Trasporto su strada', description: 'Servizi di trasporto stradale merci' },
      'Dutch': { name: 'Wegtransport', description: 'Wegvrachtdiensten' },
      'Polski': { name: 'Transport drogowy', description: 'Usługi frachtu drogowego' },
      'Svenska': { name: 'Lastbilstransport', description: 'Vägfrakttjänster' },
      'Українська': { name: 'Автомобільні перевезення', description: 'Послуги автомобільних вантажоперевезень' },
      'Русский': { name: 'Автомобильные перевозки', description: 'Услуги автомобильных грузоперевозок' }
    },
    'Warehouse Services': {
      'English': { name: 'Warehouse Services', description: 'Warehousing and storage solutions' },
      'Deutsch': { name: 'Lagerdienste', description: 'Lager- und Aufbewahrungslösungen' },
      'Français': { name: 'Services d\'entrepôt', description: 'Solutions d\'entreposage et de stockage' },
      'Español': { name: 'Servicios de almacén', description: 'Soluciones de almacenaje y depósito' },
      'Italiano': { name: 'Servizi di magazzino', description: 'Soluzioni di magazzinaggio e stoccaggio' },
      'Dutch': { name: 'Magazijndiensten', description: 'Opslag- en magazijnoplossingen' },
      'Polski': { name: 'Usługi magazynowe', description: 'Rozwiązania magazynowe i składowania' },
      'Svenska': { name: 'Lagertjänster', description: 'Lager- och förvaringslösningar' },
      'Українська': { name: 'Складські послуги', description: 'Рішення для складування та зберігання' },
      'Русский': { name: 'Складские услуги', description: 'Решения для складирования и хранения' }
    },
    'Short-term Storage': {
      'English': { name: 'Short-term Storage', description: 'Short-term warehousing solutions' },
      'Deutsch': { name: 'Kurzzeitlagerung', description: 'Kurzzeitige Lagerlösungen' },
      'Français': { name: 'Stockage à court terme', description: 'Solutions d\'entreposage à court terme' },
      'Español': { name: 'Almacenamiento a corto plazo', description: 'Soluciones de almacenaje a corto plazo' },
      'Italiano': { name: 'Stoccaggio a breve termine', description: 'Soluzioni di magazzinaggio a breve termine' },
      'Dutch': { name: 'Korte termijn opslag', description: 'Korte termijn opslagoplossingen' },
      'Polski': { name: 'Magazynowanie krótkoterminowe', description: 'Rozwiązania magazynowe krótkoterminowe' },
      'Svenska': { name: 'Korttidsförvaring', description: 'Korttids lagringslösningar' },
      'Українська': { name: 'Короткострокове зберігання', description: 'Рішення для короткострокового складування' },
      'Русский': { name: 'Краткосрочное хранение', description: 'Решения для краткосрочного складирования' }
    },
    'Long-term Storage': {
      'English': { name: 'Long-term Storage', description: 'Long-term warehousing solutions' },
      'Deutsch': { name: 'Langzeitlagerung', description: 'Langzeitige Lagerlösungen' },
      'Français': { name: 'Stockage à long terme', description: 'Solutions d\'entreposage à long terme' },
      'Español': { name: 'Almacenamiento a largo plazo', description: 'Soluciones de almacenaje a largo plazo' },
      'Italiano': { name: 'Stoccaggio a lungo termine', description: 'Soluzioni di magazzinaggio a lungo termine' },
      'Dutch': { name: 'Lange termijn opslag', description: 'Lange termijn opslagoplossingen' },
      'Polski': { name: 'Magazynowanie długoterminowe', description: 'Rozwiązania magazynowe długoterminowe' },
      'Svenska': { name: 'Långtidsförvaring', description: 'Långtids lagringslösningar' },
      'Українська': { name: 'Довгострокове зберігання', description: 'Рішення для довгострокового складування' },
      'Русский': { name: 'Долгосрочное хранение', description: 'Решения для долгосрочного складирования' }
    },
    'Temperature Storage': {
      'English': { name: 'Temperature Storage', description: 'Temperature-controlled storage' },
      'Deutsch': { name: 'Temperaturgeführte Lagerung', description: 'Temperaturkontrollierte Lagerung' },
      'Français': { name: 'Stockage température contrôlée', description: 'Stockage à température contrôlée' },
      'Español': { name: 'Almacenamiento con temperatura controlada', description: 'Almacenamiento con control de temperatura' },
      'Italiano': { name: 'Stoccaggio a temperatura controllata', description: 'Magazzinaggio a temperatura controllata' },
      'Dutch': { name: 'Temperatuur gecontroleerde opslag', description: 'Temperatuur gecontroleerde opslagruimte' },
      'Polski': { name: 'Magazynowanie w kontrolowanej temperaturze', description: 'Magazynowanie z kontrolą temperatury' },
      'Svenska': { name: 'Temperaturkontrollerad förvaring', description: 'Temperaturkontrollerat lager' },
      'Українська': { name: 'Температурне зберігання', description: 'Зберігання з контролем температури' },
      'Русский': { name: 'Температурное хранение', description: 'Хранение с контролем температуры' }
    },
    'Packaging Services': {
      'English': { name: 'Packaging Services', description: 'Professional packaging solutions' },
      'Deutsch': { name: 'Verpackungsdienste', description: 'Professionelle Verpackungslösungen' },
      'Français': { name: 'Services d\'emballage', description: 'Solutions d\'emballage professionnelles' },
      'Español': { name: 'Servicios de embalaje', description: 'Soluciones profesionales de embalaje' },
      'Italiano': { name: 'Servizi di imballaggio', description: 'Soluzioni professionali di imballaggio' },
      'Dutch': { name: 'Verpakkingsdiensten', description: 'Professionele verpakkingsoplossingen' },
      'Polski': { name: 'Usługi pakowania', description: 'Profesjonalne rozwiązania pakowania' },
      'Svenska': { name: 'Förpackningstjänster', description: 'Professionella förpackningslösningar' },
      'Українська': { name: 'Пакувальні послуги', description: 'Професійні пакувальні рішення' },
      'Русский': { name: 'Упаковочные услуги', description: 'Профессиональные упаковочные решения' }
    },
    'Standard Packaging': {
      'English': { name: 'Standard Packaging', description: 'Basic packaging services' },
      'Deutsch': { name: 'Standardverpackung', description: 'Grundlegende Verpackungsdienste' },
      'Français': { name: 'Emballage standard', description: 'Services d\'emballage de base' },
      'Español': { name: 'Embalaje estándar', description: 'Servicios básicos de embalaje' },
      'Italiano': { name: 'Imballaggio standard', description: 'Servizi di imballaggio base' },
      'Dutch': { name: 'Standaard verpakking', description: 'Basis verpakkingsdiensten' },
      'Polski': { name: 'Pakowanie standardowe', description: 'Podstawowe usługi pakowania' },
      'Svenska': { name: 'Standardförpackning', description: 'Grundläggande förpackningstjänster' },
      'Українська': { name: 'Стандартне пакування', description: 'Базові послуги пакування' },
      'Русский': { name: 'Стандартная упаковка', description: 'Базовые услуги упаковки' }
    },
    'Special Packaging': {
      'English': { name: 'Special Packaging', description: 'Custom packaging solutions' },
      'Deutsch': { name: 'Spezialverpackung', description: 'Maßgeschneiderte Verpackungslösungen' },
      'Français': { name: 'Emballage spécial', description: 'Solutions d\'emballage personnalisées' },
      'Español': { name: 'Embalaje especial', description: 'Soluciones de embalaje personalizadas' },
      'Italiano': { name: 'Imballaggio speciale', description: 'Soluzioni di imballaggio personalizzate' },
      'Dutch': { name: 'Speciale verpakking', description: 'Aangepaste verpakkingsoplossingen' },
      'Polski': { name: 'Pakowanie specjalne', description: 'Niestandardowe rozwiązania pakowania' },
      'Svenska': { name: 'Specialförpackning', description: 'Anpassade förpackningslösningar' },
      'Українська': { name: 'Спеціальне пакування', description: 'Індивідуальні пакувальні рішення' },
      'Русский': { name: 'Специальная упаковка', description: 'Индивидуальные упаковочные решения' }
    }
  };

  // Создаем локализации для каждой категории
  for (const category of categories) {
    for (const locale of locales) {
      const translation = translations[category.name]?.[locale.language];

      if (translation) {
        await prisma.localCategory.create({
          data: {
            name: translation.name,
            description: translation.description,
            category: { connect: { id: category.id } },
            locale: { connect: { id: locale.id } }
          }
        });
      }
    }
  }
};
