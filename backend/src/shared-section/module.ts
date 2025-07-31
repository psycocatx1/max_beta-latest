import { Module } from "@nestjs/common";
import { LocalItemDescriptionsModule } from "./local-item-descriptions/module";
import { ItemImagesModule } from "./item-images/module";

@Module({
  imports: [LocalItemDescriptionsModule, ItemImagesModule],
  exports: [LocalItemDescriptionsModule, ItemImagesModule],
})
export class SharedSectionModule {}
