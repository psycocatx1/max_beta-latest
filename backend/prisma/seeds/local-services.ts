import { PrismaClient } from '@prisma/client';

export const seedLocalServices = async (prisma: PrismaClient) => {
  const translations = {
    'English': {
      'Air Freight': {
        name: 'Air Freight Service',
        description: 'Fast and reliable air transportation services for time-sensitive cargo',
      },
      'Sea Freight': {
        name: 'Sea Freight Service',
        description: 'Cost-effective sea transportation for large volume shipments',
      },
      'Rail Transport Service': {
        name: 'Rail Transport Service',
        description: 'Reliable rail freight transportation for bulk cargo',
      },
      'Truck Delivery': {
        name: 'Truck Delivery Service',
        description: 'Flexible road transportation service for local and interstate delivery',
      },
      'Short-term Storage': {
        name: 'Short-term Storage Service',
        description: 'Flexible warehousing solution for temporary storage needs',
      },
      'Long-term Storage': {
        name: 'Long-term Storage Service',
        description: 'Cost-effective warehousing solution for extended storage periods',
      },
      'Temperature Controlled Storage': {
        name: 'Temperature Controlled Storage',
        description: 'Climate-controlled storage facilities for sensitive goods',
      },
      'Standard Packaging': {
        name: 'Standard Packaging Service',
        description: 'Professional packaging service for regular items',
      },
      'Special Packaging': {
        name: 'Special Packaging Service',
        description: 'Custom packaging solutions for unique requirements',
      },
      'Cargo Handling': {
        name: 'Cargo Handling Service',
        description: 'Professional cargo handling and processing service',
      },
      'Customs Clearance': {
        name: 'Customs Clearance Service',
        description: 'Efficient customs documentation and clearance service',
      },
      'Product Certification': {
        name: 'Product Certification Service',
        description: 'International product certification and compliance service',
      },
      'Logistics Optimization': {
        name: 'Logistics Optimization Service',
        description: 'Professional supply chain optimization consulting',
      },
      'Supply Planning': {
        name: 'Supply Chain Planning Service',
        description: 'Strategic supply chain planning and management',
      },
      'Logistics Audit': {
        name: 'Logistics Audit Service',
        description: 'Comprehensive logistics operations audit service',
      },
      'Foreign Trade Consulting': {
        name: 'Foreign Trade Consulting',
        description: 'Expert international trade consulting service',
      },
      'Customs Services': {
        name: 'Customs Brokerage Service',
        description: 'Complete customs brokerage and compliance service',
      },
    },
    'Deutsch': {
      'Air Freight': {
        name: 'Luftfracht-Service',
        description: 'Schnelle und zuverlässige Lufttransportdienste für zeitkritische Fracht',
      },
      'Sea Freight': {
        name: 'Seefracht-Service',
        description: 'Kostengünstige Seetransporte für große Sendungsvolumen',
      },
      'Rail Transport Service': {
        name: 'Schienentransport-Service',
        description: 'Zuverlässiger Schienengüterverkehr für Massengut',
      },
      'Truck Delivery': {
        name: 'LKW-Lieferservice',
        description: 'Flexibler Straßentransport für lokale und überregionale Lieferungen',
      },
      'Short-term Storage': {
        name: 'Kurzzeitlager-Service',
        description: 'Flexible Lagerlösung für temporäre Lagerungsbedürfnisse',
      },
      'Long-term Storage': {
        name: 'Langzeitlager-Service',
        description: 'Kostengünstige Lagerlösung für längere Lagerperioden',
      },
      'Temperature Controlled Storage': {
        name: 'Temperaturgeführte Lagerung',
        description: 'Klimatisierte Lagereinrichtungen für empfindliche Waren',
      },
      'Standard Packaging': {
        name: 'Standard-Verpackungsservice',
        description: 'Professioneller Verpackungsservice für reguläre Artikel',
      },
      'Special Packaging': {
        name: 'Spezial-Verpackungsservice',
        description: 'Maßgeschneiderte Verpackungslösungen für besondere Anforderungen',
      },
      'Cargo Handling': {
        name: 'Frachtabfertigung',
        description: 'Professionelle Frachtabfertigung und -bearbeitung',
      },
      'Customs Clearance': {
        name: 'Zollabfertigung',
        description: 'Effiziente Zolldokumentation und -abwicklung',
      },
      'Product Certification': {
        name: 'Produktzertifizierung',
        description: 'Internationale Produktzertifizierung und Konformitätsprüfung',
      },
      'Logistics Optimization': {
        name: 'Logistikoptimierung',
        description: 'Professionelle Beratung zur Optimierung der Lieferkette',
      },
      'Supply Planning': {
        name: 'Lieferkettenplanung',
        description: 'Strategische Planung und Verwaltung der Lieferkette',
      },
      'Logistics Audit': {
        name: 'Logistik-Audit',
        description: 'Umfassende Prüfung der Logistikprozesse',
      },
      'Foreign Trade Consulting': {
        name: 'Außenhandelsberatung',
        description: 'Experten-Beratung im internationalen Handel',
      },
      'Customs Services': {
        name: 'Zollmakler-Service',
        description: 'Kompletter Zollmakler- und Compliance-Service',
      },
    },
    'Français': {
      'Air Freight': {
        name: 'Service de Fret Aérien',
        description: 'Services de transport aérien rapides et fiables pour les cargaisons urgentes',
      },
      'Sea Freight': {
        name: 'Service de Fret Maritime',
        description: 'Transport maritime économique pour les envois volumineux',
      },
      'Rail Transport Service': {
        name: 'Service de Transport Ferroviaire',
        description: 'Transport ferroviaire fiable pour les marchandises en vrac',
      },
      'Truck Delivery': {
        name: 'Service de Livraison par Camion',
        description: 'Service de transport routier flexible pour livraisons locales et nationales',
      },
      'Short-term Storage': {
        name: 'Service de Stockage Court Terme',
        description: 'Solution d\'entreposage flexible pour besoins temporaires',
      },
      'Long-term Storage': {
        name: 'Service de Stockage Long Terme',
        description: 'Solution d\'entreposage économique pour longues périodes',
      },
      'Temperature Controlled Storage': {
        name: 'Stockage à Température Contrôlée',
        description: 'Installations de stockage climatisées pour marchandises sensibles',
      },
      'Standard Packaging': {
        name: 'Service d\'Emballage Standard',
        description: 'Service d\'emballage professionnel pour articles réguliers',
      },
      'Special Packaging': {
        name: 'Service d\'Emballage Spécial',
        description: 'Solutions d\'emballage personnalisées pour besoins spécifiques',
      },
      'Cargo Handling': {
        name: 'Service de Manutention',
        description: 'Service professionnel de manutention et traitement de fret',
      },
      'Customs Clearance': {
        name: 'Service de Dédouanement',
        description: 'Service efficace de documentation et dédouanement',
      },
      'Product Certification': {
        name: 'Service de Certification Produit',
        description: 'Service de certification et conformité internationale',
      },
      'Logistics Optimization': {
        name: 'Service d\'Optimisation Logistique',
        description: 'Conseil professionnel en optimisation de chaîne logistique',
      },
      'Supply Planning': {
        name: 'Service de Planification Logistique',
        description: 'Planification et gestion stratégique de la chaîne logistique',
      },
      'Logistics Audit': {
        name: 'Service d\'Audit Logistique',
        description: 'Service d\'audit complet des opérations logistiques',
      },
      'Foreign Trade Consulting': {
        name: 'Conseil en Commerce International',
        description: 'Service expert de conseil en commerce international',
      },
      'Customs Services': {
        name: 'Service de Courtage en Douane',
        description: 'Service complet de courtage et conformité douanière',
      },
    },
    'Español': {
      'Air Freight': {
        name: 'Servicio de Carga Aérea',
        description: 'Servicios de transporte aéreo rápidos y confiables para carga urgente',
      },
      'Sea Freight': {
        name: 'Servicio de Carga Marítima',
        description: 'Transporte marítimo económico para envíos de gran volumen',
      },
      'Rail Transport Service': {
        name: 'Servicio de Transporte Ferroviario',
        description: 'Transporte ferroviario confiable para carga a granel',
      },
      'Truck Delivery': {
        name: 'Servicio de Entrega por Camión',
        description: 'Servicio flexible de transporte por carretera para entregas locales y nacionales',
      },
      'Short-term Storage': {
        name: 'Servicio de Almacenamiento Corto Plazo',
        description: 'Solución flexible de almacenaje para necesidades temporales',
      },
      'Long-term Storage': {
        name: 'Servicio de Almacenamiento Largo Plazo',
        description: 'Solución económica de almacenaje para períodos prolongados',
      },
      'Temperature Controlled Storage': {
        name: 'Almacenamiento con Control de Temperatura',
        description: 'Instalaciones de almacenamiento climatizadas para mercancías sensibles',
      },
      'Standard Packaging': {
        name: 'Servicio de Embalaje Estándar',
        description: 'Servicio profesional de embalaje para artículos regulares',
      },
      'Special Packaging': {
        name: 'Servicio de Embalaje Especial',
        description: 'Soluciones de embalaje personalizadas para requisitos específicos',
      },
      'Cargo Handling': {
        name: 'Servicio de Manipulación de Carga',
        description: 'Servicio profesional de manipulación y procesamiento de carga',
      },
      'Customs Clearance': {
        name: 'Servicio de Despacho Aduanero',
        description: 'Servicio eficiente de documentación y despacho aduanero',
      },
      'Product Certification': {
        name: 'Servicio de Certificación de Productos',
        description: 'Servicio de certificación y cumplimiento internacional',
      },
      'Logistics Optimization': {
        name: 'Servicio de Optimización Logística',
        description: 'Consultoría profesional en optimización de cadena de suministro',
      },
      'Supply Planning': {
        name: 'Servicio de Planificación de Suministro',
        description: 'Planificación y gestión estratégica de cadena de suministro',
      },
      'Logistics Audit': {
        name: 'Servicio de Auditoría Logística',
        description: 'Servicio integral de auditoría de operaciones logísticas',
      },
      'Foreign Trade Consulting': {
        name: 'Consultoría en Comercio Exterior',
        description: 'Servicio experto de consultoría en comercio internacional',
      },
      'Customs Services': {
        name: 'Servicio de Agencia Aduanal',
        description: 'Servicio completo de agencia aduanal y cumplimiento',
      },
    },
    'Italiano': {
      'Air Freight': {
        name: 'Servizio di Trasporto Aereo',
        description: 'Servizi di trasporto aereo veloci e affidabili per carichi urgenti',
      },
      'Sea Freight': {
        name: 'Servizio di Trasporto Marittimo',
        description: 'Trasporto marittimo economico per spedizioni di grande volume',
      },
      'Rail Transport Service': {
        name: 'Servizio di Trasporto Ferroviario',
        description: 'Trasporto ferroviario affidabile per carichi alla rinfusa',
      },
      'Truck Delivery': {
        name: 'Servizio di Consegna su Gomma',
        description: 'Servizio flessibile di trasporto su strada per consegne locali e nazionali',
      },
      'Short-term Storage': {
        name: 'Servizio di Stoccaggio Breve Termine',
        description: 'Soluzione flessibile di magazzinaggio per esigenze temporanee',
      },
      'Long-term Storage': {
        name: 'Servizio di Stoccaggio Lungo Termine',
        description: 'Soluzione economica di magazzinaggio per periodi prolungati',
      },
      'Temperature Controlled Storage': {
        name: 'Stoccaggio a Temperatura Controllata',
        description: 'Strutture di stoccaggio climatizzate per merci sensibili',
      },
      'Standard Packaging': {
        name: 'Servizio di Imballaggio Standard',
        description: 'Servizio di imballaggio professionale per articoli regolari',
      },
      'Special Packaging': {
        name: 'Servizio di Imballaggio Speciale',
        description: 'Soluzioni di imballaggio personalizzate per requisiti specifici',
      },
      'Cargo Handling': {
        name: 'Servizio di Movimentazione Merci',
        description: 'Servizio professionale di movimentazione e processamento merci',
      },
      'Customs Clearance': {
        name: 'Servizio di Sdoganamento',
        description: 'Servizio efficiente di documentazione e sdoganamento',
      },
      'Product Certification': {
        name: 'Servizio di Certificazione Prodotti',
        description: 'Servizio di certificazione e conformità internazionale',
      },
      'Logistics Optimization': {
        name: 'Servizio di Ottimizzazione Logistica',
        description: 'Consulenza professionale per ottimizzazione della catena logistica',
      },
      'Supply Planning': {
        name: 'Servizio di Pianificazione Forniture',
        description: 'Pianificazione e gestione strategica della catena di fornitura',
      },
      'Logistics Audit': {
        name: 'Servizio di Audit Logistico',
        description: 'Servizio completo di audit delle operazioni logistiche',
      },
      'Foreign Trade Consulting': {
        name: 'Consulenza Commercio Estero',
        description: 'Servizio esperto di consulenza nel commercio internazionale',
      },
      'Customs Services': {
        name: 'Servizio di Intermediazione Doganale',
        description: 'Servizio completo di intermediazione e conformità doganale',
      },
    },
    'Dutch': {
      'Air Freight': {
        name: 'Luchtvracht Service',
        description: 'Snelle en betrouwbare luchtvrachtdiensten voor tijdgevoelige vracht',
      },
      'Sea Freight': {
        name: 'Zeevracht Service',
        description: 'Kosteneffectief zeetransport voor grote volumes',
      },
      'Rail Transport Service': {
        name: 'Railtransport Service',
        description: 'Betrouwbaar railtransport voor bulkladingen',
      },
      'Truck Delivery': {
        name: 'Vrachtwagen Bezorgservice',
        description: 'Flexibele wegtransportservice voor lokale en nationale leveringen',
      },
      'Short-term Storage': {
        name: 'Korte Termijn Opslag',
        description: 'Flexibele opslagoplossing voor tijdelijke behoeften',
      },
      'Long-term Storage': {
        name: 'Lange Termijn Opslag',
        description: 'Kosteneffectieve opslagoplossing voor langere perioden',
      },
      'Temperature Controlled Storage': {
        name: 'Temperatuur Gecontroleerde Opslag',
        description: 'Klimaatgecontroleerde opslagfaciliteiten voor gevoelige goederen',
      },
      'Standard Packaging': {
        name: 'Standaard Verpakkingsservice',
        description: 'Professionele verpakkingsservice voor reguliere items',
      },
      'Special Packaging': {
        name: 'Speciale Verpakkingsservice',
        description: 'Aangepaste verpakkingsoplossingen voor specifieke eisen',
      },
      'Cargo Handling': {
        name: 'Vrachtafhandeling',
        description: 'Professionele vrachtafhandeling en verwerking',
      },
      'Customs Clearance': {
        name: 'Douane-inklaring',
        description: 'Efficiënte douanedocumentatie en -afhandeling',
      },
      'Product Certification': {
        name: 'Productcertificering',
        description: 'Internationale productcertificering en conformiteit',
      },
      'Logistics Optimization': {
        name: 'Logistieke Optimalisatie',
        description: 'Professioneel advies voor supply chain optimalisatie',
      },
      'Supply Planning': {
        name: 'Supply Chain Planning',
        description: 'Strategische planning en beheer van de supply chain',
      },
      'Logistics Audit': {
        name: 'Logistieke Audit',
        description: 'Uitgebreide audit van logistieke operaties',
      },
      'Foreign Trade Consulting': {
        name: 'Buitenlandse Handel Advies',
        description: 'Expert advies in internationale handel',
      },
      'Customs Services': {
        name: 'Douane Services',
        description: 'Complete douane-expeditie en compliance service',
      },
    },
    'Polski': {
      'Air Freight': {
        name: 'Usługa Frachtu Lotniczego',
        description: 'Szybkie i niezawodne usługi transportu lotniczego dla pilnych ładunków',
      },
      'Sea Freight': {
        name: 'Usługa Frachtu Morskiego',
        description: 'Ekonomiczny transport morski dla przesyłek o dużej objętości',
      },
      'Rail Transport Service': {
        name: 'Usługa Transportu Kolejowego',
        description: 'Niezawodny transport kolejowy dla ładunków masowych',
      },
      'Truck Delivery': {
        name: 'Usługa Dostawy Ciężarowej',
        description: 'Elastyczny transport drogowy dla dostaw lokalnych i krajowych',
      },
      'Short-term Storage': {
        name: 'Usługa Magazynowania Krótkoterminowego',
        description: 'Elastyczne rozwiązanie magazynowe dla tymczasowych potrzeb',
      },
      'Long-term Storage': {
        name: 'Usługa Magazynowania Długoterminowego',
        description: 'Ekonomiczne rozwiązanie magazynowe na dłuższe okresy',
      },
      'Temperature Controlled Storage': {
        name: 'Magazynowanie w Kontrolowanej Temperaturze',
        description: 'Klimatyzowane obiekty magazynowe dla towarów wrażliwych',
      },
      'Standard Packaging': {
        name: 'Standardowa Usługa Pakowania',
        description: 'Profesjonalna usługa pakowania dla standardowych przedmiotów',
      },
      'Special Packaging': {
        name: 'Specjalna Usługa Pakowania',
        description: 'Niestandardowe rozwiązania pakowania dla specjalnych wymagań',
      },
      'Cargo Handling': {
        name: 'Obsługa Ładunków',
        description: 'Profesjonalna obsługa i przetwarzanie ładunków',
      },
      'Customs Clearance': {
        name: 'Odprawa Celna',
        description: 'Efektywna dokumentacja i odprawa celna',
      },
      'Product Certification': {
        name: 'Certyfikacja Produktów',
        description: 'Międzynarodowa certyfikacja i zgodność produktów',
      },
      'Logistics Optimization': {
        name: 'Optymalizacja Logistyczna',
        description: 'Profesjonalne doradztwo w optymalizacji łańcucha dostaw',
      },
      'Supply Planning': {
        name: 'Planowanie Łańcucha Dostaw',
        description: 'Strategiczne planowanie i zarządzanie łańcuchem dostaw',
      },
      'Logistics Audit': {
        name: 'Audyt Logistyczny',
        description: 'Kompleksowy audyt operacji logistycznych',
      },
      'Foreign Trade Consulting': {
        name: 'Doradztwo w Handlu Zagranicznym',
        description: 'Eksperckie doradztwo w handlu międzynarodowym',
      },
      'Customs Services': {
        name: 'Usługi Celne',
        description: 'Kompleksowa obsługa celna i zgodność',
      },
    },
    'Svenska': {
      'Air Freight': {
        name: 'Flygfrakttjänst',
        description: 'Snabba och pålitliga flygfrakttjänster för tidskänslig last',
      },
      'Sea Freight': {
        name: 'Sjöfrakttjänst',
        description: 'Kostnadseffektiv sjötransport för stora volymsändningar',
      },
      'Rail Transport Service': {
        name: 'Järnvägstransporttjänst',
        description: 'Pålitlig järnvägstransport för bulkgods',
      },
      'Truck Delivery': {
        name: 'Lastbilsleveranstjänst',
        description: 'Flexibel vägtransporttjänst för lokala och nationella leveranser',
      },
      'Short-term Storage': {
        name: 'Korttidslagringstjänst',
        description: 'Flexibel lagringslösning för tillfälliga behov',
      },
      'Long-term Storage': {
        name: 'Långtidslagringstjänst',
        description: 'Kostnadseffektiv lagringslösning för längre perioder',
      },
      'Temperature Controlled Storage': {
        name: 'Temperaturkontrollerad Lagring',
        description: 'Klimatkontrollerade lagringsanläggningar för känsligt gods',
      },
      'Standard Packaging': {
        name: 'Standard Förpackningstjänst',
        description: 'Professionell förpackningstjänst för vanliga artiklar',
      },
      'Special Packaging': {
        name: 'Specialförpackningstjänst',
        description: 'Anpassade förpackningslösningar för specifika krav',
      },
      'Cargo Handling': {
        name: 'Godshantering',
        description: 'Professionell godshantering och bearbetning',
      },
      'Customs Clearance': {
        name: 'Tullklarering',
        description: 'Effektiv tulldokumentation och klarering',
      },
      'Product Certification': {
        name: 'Produktcertifiering',
        description: 'Internationell produktcertifiering och överensstämmelse',
      },
      'Logistics Optimization': {
        name: 'Logistikoptimering',
        description: 'Professionell rådgivning för optimering av försörjningskedjan',
      },
      'Supply Planning': {
        name: 'Försörjningsplanering',
        description: 'Strategisk planering och hantering av försörjningskedjan',
      },
      'Logistics Audit': {
        name: 'Logistikrevision',
        description: 'Omfattande revision av logistikverksamheten',
      },
      'Foreign Trade Consulting': {
        name: 'Utrikeshandelsrådgivning',
        description: 'Expert rådgivning inom internationell handel',
      },
      'Customs Services': {
        name: 'Tulltjänster',
        description: 'Komplett tullhantering och efterlevnadstjänst',
      },
    },
    'Українська': {
      'Air Freight': {
        name: 'Послуга Авіаперевезення',
        description: 'Швидкі та надійні послуги авіаперевезень для термінових вантажів',
      },
      'Sea Freight': {
        name: 'Послуга Морського Перевезення',
        description: 'Економічне морське перевезення для великих обсягів вантажів',
      },
      'Rail Transport Service': {
        name: 'Послуга Залізничного Транспорту',
        description: 'Надійне залізничне перевезення для насипних вантажів',
      },
      'Truck Delivery': {
        name: 'Послуга Автомобільної Доставки',
        description: 'Гнучкий автомобільний транспорт для місцевих та національних доставок',
      },
      'Short-term Storage': {
        name: 'Послуга Короткострокового Зберігання',
        description: 'Гнучке рішення для тимчасового зберігання',
      },
      'Long-term Storage': {
        name: 'Послуга Довгострокового Зберігання',
        description: 'Економічне рішення для тривалого зберігання',
      },
      'Temperature Controlled Storage': {
        name: 'Зберігання з Контролем Температури',
        description: 'Складські приміщення з кліматичним контролем для чутливих товарів',
      },
      'Standard Packaging': {
        name: 'Стандартна Послуга Пакування',
        description: 'Професійна послуга пакування для звичайних товарів',
      },
      'Special Packaging': {
        name: 'Спеціальна Послуга Пакування',
        description: 'Індивідуальні рішення пакування для особливих вимог',
      },
      'Cargo Handling': {
        name: 'Обробка Вантажів',
        description: 'Професійна обробка та переробка вантажів',
      },
      'Customs Clearance': {
        name: 'Митне Оформлення',
        description: 'Ефективна митна документація та оформлення',
      },
      'Product Certification': {
        name: 'Сертифікація Продукції',
        description: 'Міжнародна сертифікація та відповідність продукції',
      },
      'Logistics Optimization': {
        name: 'Оптимізація Логістики',
        description: 'Професійні консультації з оптимізації ланцюга поставок',
      },
      'Supply Planning': {
        name: 'Планування Поставок',
        description: 'Стратегічне планування та управління ланцюгом поставок',
      },
      'Logistics Audit': {
        name: 'Логістичний Аудит',
        description: 'Комплексний аудит логістичних операцій',
      },
      'Foreign Trade Consulting': {
        name: 'Консультації з Зовнішньої Торгівлі',
        description: 'Експертні консультації з міжнародної торгівлі',
      },
      'Customs Services': {
        name: 'Митні Послуги',
        description: 'Повний спектр митно-брокерських послуг та відповідність',
      },
    },
    'Русский': {
      'Air Freight': {
        name: 'Услуга Авиаперевозки',
        description: 'Быстрые и надежные услуги авиаперевозок для срочных грузов',
      },
      'Sea Freight': {
        name: 'Услуга Морской Перевозки',
        description: 'Экономичная морская перевозка для больших объемов грузов',
      },
      'Rail Transport Service': {
        name: 'Услуга Железнодорожного Транспорта',
        description: 'Надежная железнодорожная перевозка для насыпных грузов',
      },
      'Truck Delivery': {
        name: 'Услуга Автомобильной Доставки',
        description: 'Гибкий автомобильный транспорт для местных и национальных доставок',
      },
      'Short-term Storage': {
        name: 'Услуга Краткосрочного Хранения',
        description: 'Гибкое решение для временного хранения',
      },
      'Long-term Storage': {
        name: 'Услуга Долгосрочного Хранения',
        description: 'Экономичное решение для длительного хранения',
      },
      'Temperature Controlled Storage': {
        name: 'Хранение с Контролем Температуры',
        description: 'Складские помещения с климатическим контролем для чувствительных товаров',
      },
      'Standard Packaging': {
        name: 'Стандартная Услуга Упаковки',
        description: 'Профессиональная услуга упаковки для обычных товаров',
      },
      'Special Packaging': {
        name: 'Специальная Услуга Упаковки',
        description: 'Индивидуальные решения упаковки для особых требований',
      },
      'Cargo Handling': {
        name: 'Обработка Грузов',
        description: 'Профессиональная обработка и переработка грузов',
      },
      'Customs Clearance': {
        name: 'Таможенное Оформление',
        description: 'Эффективная таможенная документация и оформление',
      },
      'Product Certification': {
        name: 'Сертификация Продукции',
        description: 'Международная сертификация и соответствие продукции',
      },
      'Logistics Optimization': {
        name: 'Оптимизация Логистики',
        description: 'Профессиональные консультации по оптимизации цепи поставок',
      },
      'Supply Planning': {
        name: 'Планирование Поставок',
        description: 'Стратегическое планирование и управление цепью поставок',
      },
      'Logistics Audit': {
        name: 'Логистический Аудит',
        description: 'Комплексный аудит логистических операций',
      },
      'Foreign Trade Consulting': {
        name: 'Консультации по Внешней Торговле',
        description: 'Экспертные консультации по международной торговле',
      },
      'Customs Services': {
        name: 'Таможенные Услуги',
        description: 'Полный спектр таможенно-брокерских услуг и соответствие',
      },
    },
  };

  const services = await prisma.service.findMany();
  const locales = await prisma.locale.findMany();

  for (const service of services) {
    for (const locale of locales) {
      const translation = translations[locale.language]?.[service.name];

      if (translation) {
        const exchangeRate = getExchangeRate(locale.currency);

        await prisma.localService.create({
          data: {
            name: translation.name,
            description: translation.description,
            price: service.price_USD * exchangeRate,
            discount_price: service.discount_price_USD ? service.discount_price_USD * exchangeRate : null,
            service: { connect: { id: service.id } },
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
