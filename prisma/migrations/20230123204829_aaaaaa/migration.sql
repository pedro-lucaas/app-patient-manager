/*
  Warnings:

  - You are about to drop the `attributes` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `patient_attributes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `attributeId` on the `patient_attributes` table. All the data in the column will be lost.
  - Added the required column `id` to the `patient_attributes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `patient_attributes` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "attributes";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_patient_attributes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "patient_attributes_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "patient_attributes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_config" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_patient_attributes" ("patientId", "userId", "value") SELECT "patientId", "userId", "value" FROM "patient_attributes";
DROP TABLE "patient_attributes";
ALTER TABLE "new_patient_attributes" RENAME TO "patient_attributes";
CREATE UNIQUE INDEX "patient_attributes_userId_patientId_name_key" ON "patient_attributes"("userId", "patientId", "name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
