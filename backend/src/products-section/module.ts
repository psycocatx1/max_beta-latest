import { PrismaModule } from "@lib/prisma";
import { ProductsModule } from "./products";
import { Module } from "@nestjs/common";
import { LocalProductsModule } from "./local-products";

@Module({
  imports: [PrismaModule, ProductsModule, LocalProductsModule],
  exports: [ProductsModule, LocalProductsModule],
})
export class ProductsSectionModule {}
