import { PrismaClient } from '@prisma/client';
import { seedTileProducts } from '../tile.seed';
import { seedTileLocalDescriptions } from './tile-local-descriptions';

/**
 * Основной сидер для плитки
 * Включает создание локализированных продуктов плитки и их описаний
 * ВНИМАНИЕ: Сначала удаляет все старые записи, затем создает новые
 * Использует локали: GB, RU, UA, PL
 */
export const seedTiles = async (prisma: PrismaClient) => {
  console.log('🏗️  Начало создания сидов для плитки (с удалением старых записей)...');

  try {
    // Сначала создаем локализованные продукты плитки
    console.log('1️⃣  Создание локализованных продуктов плитки...');
    await seedTileProducts(prisma);

    // Затем создаем локальные описания с характеристиками
    console.log('2️⃣  Создание локальных описаний плитки...');
    await seedTileLocalDescriptions(prisma);

    console.log('✅ Сидирование плитки завершено успешно!');

  } catch (error) {
    console.error('❌ Ошибка при создании сидов плитки:', error);
    throw error;
  }
};
