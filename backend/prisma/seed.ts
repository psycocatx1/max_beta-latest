import { PrismaClient } from '@prisma/client';
import { seedTiles } from './seeds/tiles';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Начинаем сидирование базы данных...');

  await seedTiles(prisma);
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