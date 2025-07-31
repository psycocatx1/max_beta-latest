import { PrismaClient } from '@prisma/client';

export const seedProducts = async (prisma: PrismaClient) => {
  const products = [
    // Cardboard Boxes
    {
      name: 'Cardboard Box Large',
      description: 'Large size cardboard box for heavy items',
      image: '/static/products/cardboard-box-large.webp',
      price_USD: 5.99,
      categoryName: 'Cardboard Boxes',
    },
    {
      name: 'Cardboard Box Medium',
      description: 'Medium size cardboard box for regular items',
      image: '/static/products/cardboard-box-medium.webp',
      price_USD: 3.99,
      categoryName: 'Cardboard Boxes',
    },
    {
      name: 'Cardboard Box Small',
      description: 'Small size cardboard box for light items',
      image: '/static/products/cardboard-box-small.webp',
      price_USD: 2.99,
      categoryName: 'Cardboard Boxes',
    },
    // Fillers
    {
      name: 'Bubble Wrap',
      description: 'Protective bubble wrap for fragile items',
      image: '/static/products/bubble-wrap.webp',
      price_USD: 12.99,
      categoryName: 'Fillers',
    },
    {
      name: 'Stretch Film',
      description: 'Industrial grade stretch film for securing pallets',
      image: '/static/products/stretch-film.webp',
      price_USD: 15.99,
      categoryName: 'Fillers',
    },
    // Containers
    {
      name: 'Plastic Container 60L',
      description: '60-liter plastic storage container',
      image: '/static/products/plastic-container-60l.webp',
      price_USD: 24.99,
      categoryName: 'Containers',
    },
    {
      name: 'Foldable Plastic Crate',
      description: 'Space-saving foldable plastic storage crate',
      image: '/static/products/foldable-plastic-crate.webp',
      price_USD: 19.99,
      categoryName: 'Containers',
    },
    // Warehouse Carts
    {
      name: 'Platform Cart',
      description: 'Heavy duty platform cart',
      image: '/static/products/platform-cart.webp',
      price_USD: 199.99,
      categoryName: 'Warehouse Carts',
    },
    {
      name: 'Two Wheel Cart',
      description: 'Two wheel hand truck',
      image: '/static/products/two-wheel-cart.webp',
      price_USD: 89.99,
      categoryName: 'Warehouse Carts',
    },
    // Labels and Stickers
    {
      name: 'Adhesive Labels',
      description: 'Multi-purpose adhesive shipping labels',
      image: '/static/products/adhesive-labels.webp',
      price_USD: 8.99,
      categoryName: 'Fillers',
    },
    {
      name: 'Fragile Stickers',
      description: 'Warning stickers for fragile items',
      image: '/static/products/fragile-stickers.webp',
      price_USD: 6.99,
      categoryName: 'Fillers',
    },
  ];

  for (const product of products) {
    const { categoryName, ...productData } = product;

    // Находим категорию по имени
    const category = await prisma.category.findFirstOrThrow({
      where: { name: categoryName },
    });

    await prisma.product.upsert({
      where: { name: productData.name },
      update: {
        ...productData,
        category: { connect: { id: category.id } },
      },
      create: {
        ...productData,
        category: { connect: { id: category.id } },
      },
    });
  }
}; 