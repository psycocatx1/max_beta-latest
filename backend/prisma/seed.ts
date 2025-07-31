import { PrismaClient } from '@prisma/client';
import { seedLocales } from './seeds/locales';
import { seedCategories } from './seeds/categories';
import { seedProducts } from './seeds/products';
import { seedServices } from './seeds/services';
import { seedLocalProducts } from './seeds/local-products';
import { seedLocalServices } from './seeds/local-services';
import { seedLocalCategories } from './seeds/local-categories';
import { seedProductImages } from './seeds/product-images';
import { seedLocalProductDescriptions } from './seeds/local-product-descriptions';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Начинаем сидирование базы данных...');

  await prisma.user.create({
    data: {
      email: 'admin@gmail.com',
      hashed_password: await argon2.hash('G@me2022'),
      role: 'ADMIN',
      first_name: 'Admin',
      last_name: 'Admin',
    },
  });

  console.log('📍 Создаем локализации...');
  await seedLocales(prisma);

  console.log('📍 Создаем категории...');
  await seedCategories(prisma);

  console.log('📍 Создаем локализации для категорий...');
  await seedLocalCategories(prisma);

  console.log('📍 Создаем продукты...');
  await seedProducts(prisma);

  console.log('📍 Создаем услуги...');
  await seedServices(prisma);

  console.log('📍 Создаем локализации для продуктов...');
  await seedLocalProducts(prisma);

  console.log('📍 Создаем локализации для услуг...');
  await seedLocalServices(prisma);

  console.log('📍 Создаем дополнительные изображения продуктов...');
  await seedProductImages(prisma);

  console.log('📍 Создаем локальные описания продуктов...');
  await seedLocalProductDescriptions(prisma);

  console.log('✅ Сидирование завершено!');
}

main()
  .catch((e) => {
    console.error('❌ Ошибка при сидировании:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 