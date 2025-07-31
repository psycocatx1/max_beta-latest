import { Injectable } from "@nestjs/common";
import { PrismaService, Prisma } from "@lib/prisma";
import {
  EntityValidationResult,
  EntitiesValidationResult,
  EntityType,
  ItemWithIssues,
} from "../types";
import { DefaultArgs } from "@prisma/client/runtime/library";

@Injectable()
export class ValidationService {
  constructor(private readonly prisma: PrismaService) {}

  private async validateEntity(
    entityType: EntityType,
  ): Promise<EntityValidationResult> {
    const relationField = {
      [EntityType.Product]: "local_products",
      [EntityType.Service]: "local_services",
      [EntityType.Category]: "local_categories",
    }[entityType];

    const entities = await (
      this.prisma[entityType] as Prisma.ProductDelegate<DefaultArgs>
    ).findMany({
      where: { is_excluded: false },
      select: {
        id: true,
        name: true,
        image: true,
        description: true,
        is_excluded: true,
        ...(entityType === EntityType.Category ? { type: true } : {}),
        [relationField]: {
          select: {
            id: true,
            locale_id: true,
            is_excluded: true,
          },
        },
      },
    });

    const locales = await this.prisma.locale.findMany({
      where: { is_excluded: false },
    });

    const itemsWithIssues = entities
      .map((entity) => {
        const translations = entity[relationField] as Array<{
          locale_id: string;
          is_excluded: boolean;
        }>;

        const activeTranslationLocaleIds = translations
          .filter((trans) => !trans.is_excluded)
          .map((trans) => trans.locale_id);

        const missing_locales = locales.filter(
          (locale) => !activeTranslationLocaleIds.includes(locale.id),
        );

        return { ...entity, missing_locales };
      })
      .filter((item) => item.missing_locales.length > 0);

    return {
      total_items: entities.length,
      missing_translations: itemsWithIssues.length,
      items_with_issues: itemsWithIssues as ItemWithIssues[],
    };
  }

  async validateAllEntities(): Promise<EntitiesValidationResult> {
    const [products, services, categories] = await Promise.all([
      this.validateEntity(EntityType.Product),
      this.validateEntity(EntityType.Service),
      this.validateEntity(EntityType.Category),
    ]);

    return {
      products,
      services,
      categories,
    };
  }
}
