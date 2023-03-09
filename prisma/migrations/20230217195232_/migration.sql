/*
  Warnings:

  - You are about to drop the `attributes` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `name` on table `patient_attributes` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "patient_attributes" DROP CONSTRAINT "patient_attributes_name_fkey";

-- AlterTable
ALTER TABLE "patient_attributes" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "value" DROP DEFAULT,
ALTER COLUMN "value" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "attributes";
