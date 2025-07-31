/*
  Warnings:

  - You are about to drop the column `local_id` on the `local_categories` table. All the data in the column will be lost.
  - You are about to drop the column `icon` on the `locales` table. All the data in the column will be lost.
  - You are about to drop the column `sub_category_id` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `local_product_descriptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `local_sub_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sub_categories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locale_id` to the `local_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `locales` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('PRODUCT', 'SERVICE');

-- CreateEnum
CREATE TYPE "LocalItemDescriptionType" AS ENUM ('TEXT', 'IMAGE', 'VIDEO', 'LINK');

-- DropForeignKey
ALTER TABLE "local_categories" DROP CONSTRAINT "local_categories_category_id_fkey";

-- DropForeignKey
ALTER TABLE "local_categories" DROP CONSTRAINT "local_categories_local_id_fkey";

-- DropForeignKey
ALTER TABLE "local_product_descriptions" DROP CONSTRAINT "local_product_descriptions_local_product_id_fkey";

-- DropForeignKey
ALTER TABLE "local_products" DROP CONSTRAINT "local_products_locale_id_fkey";

-- DropForeignKey
ALTER TABLE "local_products" DROP CONSTRAINT "local_products_product_id_fkey";

-- DropForeignKey
ALTER TABLE "local_sub_categories" DROP CONSTRAINT "local_sub_categories_local_id_fkey";

-- DropForeignKey
ALTER TABLE "local_sub_categories" DROP CONSTRAINT "local_sub_categories_sub_category_id_fkey";

-- DropForeignKey
ALTER TABLE "product_images" DROP CONSTRAINT "product_images_product_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_category_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_sub_category_id_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_user_id_fkey";

-- DropIndex
DROP INDEX "locales_currency_key";

-- DropIndex
DROP INDEX "locales_currency_symbol_key";

-- DropIndex
DROP INDEX "locales_language_key";

-- DropIndex
DROP INDEX "locales_phone_code_key";

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "is_excluded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "parent_id" TEXT,
ADD COLUMN     "type" "CategoryType" NOT NULL;

-- AlterTable
ALTER TABLE "local_categories" DROP COLUMN "local_id",
ADD COLUMN     "is_excluded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "locale_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "local_products" ADD COLUMN     "description" TEXT,
ADD COLUMN     "is_excluded" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "locales" DROP COLUMN "icon",
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "is_excluded" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "sub_category_id",
ADD COLUMN     "is_excluded" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "local_product_descriptions";

-- DropTable
DROP TABLE "local_sub_categories";

-- DropTable
DROP TABLE "product_images";

-- DropTable
DROP TABLE "sessions";

-- DropTable
DROP TABLE "sub_categories";

-- DropEnum
DROP TYPE "LocalProductDescriptionType";

-- CreateTable
CREATE TABLE "forms" (
    "id" TEXT NOT NULL,
    "sender_name" TEXT NOT NULL,
    "company_name" TEXT,
    "phone_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "ip_address" TEXT NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "is_answered" BOOLEAN NOT NULL DEFAULT false,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "locale_id" TEXT,

    CONSTRAINT "forms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT NOT NULL,
    "price_USD" DOUBLE PRECISION NOT NULL,
    "discount_price_USD" DOUBLE PRECISION,
    "is_excluded" BOOLEAN NOT NULL DEFAULT false,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_images" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "is_excluded" BOOLEAN NOT NULL DEFAULT false,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "product_id" TEXT,
    "service_id" TEXT,

    CONSTRAINT "item_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "local_services" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "discount_price" DOUBLE PRECISION,
    "is_excluded" BOOLEAN NOT NULL DEFAULT false,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "service_id" TEXT NOT NULL,
    "locale_id" TEXT NOT NULL,

    CONSTRAINT "local_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "local_item_descriptions" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "title" TEXT,
    "type" "LocalItemDescriptionType" NOT NULL,
    "is_excluded" BOOLEAN NOT NULL DEFAULT false,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "local_product_id" TEXT,
    "local_service_id" TEXT,

    CONSTRAINT "local_item_descriptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "services_name_key" ON "services"("name");

-- AddForeignKey
ALTER TABLE "forms" ADD CONSTRAINT "forms_locale_id_fkey" FOREIGN KEY ("locale_id") REFERENCES "locales"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "local_categories" ADD CONSTRAINT "local_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "local_categories" ADD CONSTRAINT "local_categories_locale_id_fkey" FOREIGN KEY ("locale_id") REFERENCES "locales"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_images" ADD CONSTRAINT "item_images_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_images" ADD CONSTRAINT "item_images_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "local_products" ADD CONSTRAINT "local_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "local_products" ADD CONSTRAINT "local_products_locale_id_fkey" FOREIGN KEY ("locale_id") REFERENCES "locales"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "local_services" ADD CONSTRAINT "local_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "local_services" ADD CONSTRAINT "local_services_locale_id_fkey" FOREIGN KEY ("locale_id") REFERENCES "locales"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "local_item_descriptions" ADD CONSTRAINT "local_item_descriptions_local_product_id_fkey" FOREIGN KEY ("local_product_id") REFERENCES "local_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "local_item_descriptions" ADD CONSTRAINT "local_item_descriptions_local_service_id_fkey" FOREIGN KEY ("local_service_id") REFERENCES "local_services"("id") ON DELETE CASCADE ON UPDATE CASCADE;
