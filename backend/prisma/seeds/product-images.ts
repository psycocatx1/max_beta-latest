import { PrismaClient } from '@prisma/client';

export const seedProductImages = async (prisma: PrismaClient) => {
  // Продукты и их дополнительные изображения
  const productImages = {
    'Fragile Stickers': [
      '/static/products/fragile-stickers-01.webp',
      '/static/products/fragile-stickers-02.webp',
      '/static/products/fragile-stickers-03.webp',
      '/static/products/fragile-stickers-04.webp',
      '/static/products/fragile-stickers-05.webp'
    ],
    'Foldable Plastic Crate': [
      '/static/products/foldable-plastic-crate-01.webp',
      '/static/products/foldable-plastic-crate-02.webp',
      '/static/products/foldable-plastic-crate-03.webp',
      '/static/products/foldable-plastic-crate-04.webp',
      '/static/products/foldable-plastic-crate-05.webp'
    ],
    'Stretch Film': [
      '/static/products/stretch-film-01.webp',
      '/static/products/stretch-film-02.webp',
      '/static/products/stretch-film-03.webp',
      '/static/products/stretch-film-04.webp',
      '/static/products/stretch-film-05.webp'
    ],
    'Cardboard Box Small': [
      '/static/products/cardboard-box-small-01.webp',
      '/static/products/cardboard-box-small-02.webp',
      '/static/products/cardboard-box-small-03.webp',
      '/static/products/cardboard-box-small-04.webp',
      '/static/products/cardboard-box-small-05.webp'
    ],
    'Two Wheel Cart': [
      '/static/products/two-wheel-cart-01.webp',
      '/static/products/two-wheel-cart-02.webp',
      '/static/products/two-wheel-cart-03.webp',
      '/static/products/two-wheel-cart-04.webp',
      '/static/products/two-wheel-cart-05.webp'
    ]
  };

  // Получаем продукты по их названиям (английские названия)
  const targetProductNames = Object.keys(productImages);

  for (const productName of targetProductNames) {
    const product = await prisma.product.findFirst({
      where: { name: productName }
    });

    if (!product) {
      console.log(`⚠️  Продукт "${productName}" не найден`);
      continue;
    }

    const images = productImages[productName];

    // Создаем дополнительные изображения для продукта
    for (const imagePath of images) {
      await prisma.itemImage.create({
        data: {
          image: imagePath,
          product_id: product.id
        }
      });
    }

    console.log(`✅ Создано ${images.length} изображений для продукта "${productName}"`);
  }

  console.log('✅ Все дополнительные изображения продуктов созданы!');
};
