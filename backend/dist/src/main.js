"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.getHttpAdapter().getInstance().set("trust proxy", true);
    app.useStaticAssets((0, path_1.join)(__dirname, "..", "uploads"), {
        prefix: "/static/",
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true, whitelist: true }));
    app.use(cookieParser());
    app.enableCors({
        origin: true,
        credentials: true,
    });
    app.setGlobalPrefix("api");
    const port = process.env.PORT || 3001;
    await app.listen(port);
    console.log(`Приложение запущено на порту ${port}`);
    console.log(`Статические файлы доступны по адресу http://localhost:${port}/static/`);
}
void bootstrap().catch((error) => {
    console.error("Ошибка при запуске приложения:", error);
    process.exit(1);
});
//# sourceMappingURL=main.js.map