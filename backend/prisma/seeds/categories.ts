import { PrismaClient, CategoryType } from '@prisma/client';

export const seedCategories = async (prisma: PrismaClient) => {
  // Создаем категории продуктов
  const productCategories = [
    {
      name: 'Packaging Materials',
      description: 'Various materials for packaging goods',
      image: '/static/categories/packaging-materials.webp',
      type: CategoryType.PRODUCT,
      children: [
        {
          name: 'Cardboard Boxes',
          description: 'Different sizes of cardboard boxes',
          image: '/static/categories/cardboard-boxes.webp',
          type: CategoryType.PRODUCT,
        },
        {
          name: 'Containers',
          description: 'Various types of containers',
          image: '/static/categories/containers.webp',
          type: CategoryType.PRODUCT,
        },
        {
          name: 'Fillers',
          description: 'Protective filling materials',
          image: '/static/categories/fillers.webp',
          type: CategoryType.PRODUCT,
        },
      ],
    },
    {
      name: 'Logistics Equipment',
      description: 'Equipment for logistics operations',
      image: '/static/categories/logistics-equipment.webp',
      type: CategoryType.PRODUCT,
      children: [
        {
          name: 'Warehouse Carts',
          description: 'Various types of warehouse carts',
          image: '/static/categories/warehouse-carts.webp',
          type: CategoryType.PRODUCT,
        },
        {
          name: 'Shelving Systems',
          description: 'Storage and shelving solutions',
          image: '/static/categories/shelving-systems.webp',
          type: CategoryType.PRODUCT,
        },
        {
          name: 'Weighing Equipment',
          description: 'Equipment for weighing goods',
          image: '/static/categories/weighing-equipment.webp',
          type: CategoryType.PRODUCT,
        },
      ],
    },
  ];

  // Создаем категории услуг
  const serviceCategories = [
    {
      name: 'Transport Services',
      description: 'Various transportation solutions',
      image: '/static/services/transport-services.webp',
      type: CategoryType.SERVICE,
      children: [
        {
          name: 'Air Transport',
          description: 'Air freight services',
          image: '/static/services/air-transport.webp',
          type: CategoryType.SERVICE,
        },
        {
          name: 'Sea Transport',
          description: 'Sea freight services',
          image: '/static/services/sea-transport.webp',
          type: CategoryType.SERVICE,
        },
        {
          name: 'Rail Transport',
          description: 'Rail freight services',
          image: '/static/services/rail-transport.webp',
          type: CategoryType.SERVICE,
        },
        {
          name: 'Truck Transport',
          description: 'Road freight services',
          image: '/static/services/truck-transport.webp',
          type: CategoryType.SERVICE,
        },
      ],
    },
    {
      name: 'Warehouse Services',
      description: 'Warehousing and storage solutions',
      image: '/static/services/warehouse-services.webp',
      type: CategoryType.SERVICE,
      children: [
        {
          name: 'Short-term Storage',
          description: 'Short-term warehousing solutions',
          image: '/static/services/short-term-storage.webp',
          type: CategoryType.SERVICE,
        },
        {
          name: 'Long-term Storage',
          description: 'Long-term warehousing solutions',
          image: '/static/services/long-term-storage.webp',
          type: CategoryType.SERVICE,
        },
        {
          name: 'Temperature Storage',
          description: 'Temperature-controlled storage',
          image: '/static/services/temperature-storage.webp',
          type: CategoryType.SERVICE,
        },
      ],
    },
    {
      name: 'Packaging Services',
      description: 'Professional packaging solutions',
      image: '/static/services/packaging-services.webp',
      type: CategoryType.SERVICE,
      children: [
        {
          name: 'Standard Packaging',
          description: 'Basic packaging services',
          image: '/static/services/standard-packaging.webp',
          type: CategoryType.SERVICE,
        },
        {
          name: 'Special Packaging',
          description: 'Custom packaging solutions',
          image: '/static/services/special-packaging.webp',
          type: CategoryType.SERVICE,
        },
      ],
    },
  ];

  // Создаем категории продуктов
  for (const category of productCategories) {
    const { children, ...categoryData } = category;
    const createdCategory = await prisma.category.create({
      data: categoryData,
    });

    if (children) {
      for (const child of children) {
        await prisma.category.create({
          data: { ...child, parent_id: createdCategory.id },
        });
      }
    }
  }

  // Создаем категории услуг
  for (const category of serviceCategories) {
    const { children, ...categoryData } = category;
    const createdCategory = await prisma.category.create({
      data: categoryData,
    });

    if (children) {
      for (const child of children) {
        await prisma.category.create({
          data: { ...child, parent_id: createdCategory.id },
        });
      }
    }
  }
};