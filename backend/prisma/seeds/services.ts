import { PrismaClient } from '@prisma/client';

export const seedServices = async (prisma: PrismaClient) => {
  const services = [
    // Transport Services
    {
      name: 'Air Freight',
      description: 'Fast air transportation services',
      image: '/static/services/air-transport.webp',
      price_USD: 1499.99,
      categoryName: 'Air Transport',
    },
    {
      name: 'Sea Freight',
      description: 'Cost-effective sea transportation',
      image: '/static/services/sea-transport.webp',
      price_USD: 999.99,
      categoryName: 'Sea Transport',
    },
    {
      name: 'Rail Transport Service',
      description: 'Reliable rail freight transportation',
      image: '/static/services/rail-transport.webp',
      price_USD: 799.99,
      categoryName: 'Rail Transport',
    },
    {
      name: 'Truck Delivery',
      description: 'Flexible road transportation service',
      image: '/static/services/truck-transport.webp',
      price_USD: 599.99,
      categoryName: 'Truck Transport',
    },
    // Storage Services
    {
      name: 'Short-term Storage',
      description: 'Flexible short-term warehousing solution',
      image: '/static/services/short-term-storage.webp',
      price_USD: 299.99,
      categoryName: 'Short-term Storage',
    },
    {
      name: 'Long-term Storage',
      description: 'Cost-effective long-term storage solution',
      image: '/static/services/long-term-storage.webp',
      price_USD: 399.99,
      categoryName: 'Long-term Storage',
    },
    {
      name: 'Temperature Controlled Storage',
      description: 'Climate-controlled storage facilities',
      image: '/static/services/temperature-storage.webp',
      price_USD: 499.99,
      categoryName: 'Temperature Storage',
    },
    // Packaging Services
    {
      name: 'Standard Packaging',
      description: 'Basic packaging service',
      image: '/static/services/standard-packaging.webp',
      price_USD: 49.99,
      categoryName: 'Standard Packaging',
    },
    {
      name: 'Special Packaging',
      description: 'Custom packaging solutions',
      image: '/static/services/special-packaging.webp',
      price_USD: 79.99,
      categoryName: 'Special Packaging',
    },
    // Additional Services
    {
      name: 'Cargo Handling',
      description: 'Professional cargo handling service',
      image: '/static/services/cargo-handling.webp',
      price_USD: 149.99,
      categoryName: 'Standard Packaging',
    },
    {
      name: 'Customs Clearance',
      description: 'Efficient customs clearance service',
      image: '/static/services/customs-clearance.webp',
      price_USD: 299.99,
      categoryName: 'Standard Packaging',
    },
    {
      name: 'Product Certification',
      description: 'International product certification service',
      image: '/static/services/product-certification.webp',
      price_USD: 399.99,
      categoryName: 'Special Packaging',
    },
    {
      name: 'Logistics Optimization',
      description: 'Supply chain optimization consulting',
      image: '/static/services/logistics-optimization.webp',
      price_USD: 799.99,
      categoryName: 'Special Packaging',
    },
    {
      name: 'Supply Planning',
      description: 'Strategic supply chain planning',
      image: '/static/services/supply-planning.webp',
      price_USD: 699.99,
      categoryName: 'Special Packaging',
    },
    {
      name: 'Logistics Audit',
      description: 'Comprehensive logistics audit service',
      image: '/static/services/logistics-audit.webp',
      price_USD: 899.99,
      categoryName: 'Special Packaging',
    },
    {
      name: 'Foreign Trade Consulting',
      description: 'International trade consulting service',
      image: '/static/services/foreign-trade-consulting.webp',
      price_USD: 599.99,
      categoryName: 'Special Packaging',
    },
    {
      name: 'Customs Services',
      description: 'Complete customs brokerage service',
      image: '/static/services/customs-services.webp',
      price_USD: 399.99,
      categoryName: 'Special Packaging',
    },
  ];

  for (const service of services) {
    const { categoryName, ...serviceData } = service;

    // Находим категорию по имени
    const category = await prisma.category.findFirstOrThrow({
      where: { name: categoryName },
    });

    await prisma.service.upsert({
      where: { name: serviceData.name },
      update: {
        ...serviceData,
        category: { connect: { id: category.id } },
      },
      create: {
        ...serviceData,
        category: { connect: { id: category.id } },
      },
    });
  }
}; 