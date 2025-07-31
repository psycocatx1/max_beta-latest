import { Module } from "@nestjs/common";
import { CategoriesModule } from "./categories";
import { LocalCategoriesModule } from "./local-categories";

@Module({
  imports: [CategoriesModule, LocalCategoriesModule],
  exports: [CategoriesModule, LocalCategoriesModule],
})
export class CategoriesSectionModule {}
