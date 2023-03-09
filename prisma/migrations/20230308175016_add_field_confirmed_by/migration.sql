/*
  Warnings:

  - You are about to drop the column `confirmed` on the `appointments` table. All the data in the column will be lost.
  - Added the required column `confirmedBy` to the `appointments` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ConfirmedBy" AS ENUM ('WHATSAPP', 'EMAIL', 'PHONE');

-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "confirmed",
ADD COLUMN     "confirmedBy" "ConfirmedBy" NOT NULL;
