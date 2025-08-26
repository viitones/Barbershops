/*
  Warnings:

  - You are about to drop the column `price` on the `BarbershopService` table. All the data in the column will be lost.
  - Added the required column `priceInCents` to the `BarbershopService` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."BarbershopService" DROP COLUMN "price",
ADD COLUMN     "priceInCents" INTEGER NOT NULL;
