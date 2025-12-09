"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedTiles = void 0;
const tile_seed_1 = require("../tile.seed");
const tile_local_descriptions_1 = require("./tile-local-descriptions");
const seedTiles = async (prisma) => {
    console.log('🏗️  Начало создания сидов для плитки (с удалением старых записей)...');
    try {
        console.log('1️⃣  Создание локализованных продуктов плитки...');
        await (0, tile_seed_1.seedTileProducts)(prisma);
        console.log('2️⃣  Создание локальных описаний плитки...');
        await (0, tile_local_descriptions_1.seedTileLocalDescriptions)(prisma);
        console.log('✅ Сидирование плитки завершено успешно!');
    }
    catch (error) {
        console.error('❌ Ошибка при создании сидов плитки:', error);
        throw error;
    }
};
exports.seedTiles = seedTiles;
//# sourceMappingURL=tiles.js.map