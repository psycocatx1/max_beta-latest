"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const tiles_1 = require("./seeds/tiles");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Начинаем сидирование базы данных...');
    await (0, tiles_1.seedTiles)(prisma);
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
//# sourceMappingURL=seed.js.map