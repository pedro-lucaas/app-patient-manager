/*
  Warnings:

  - You are about to drop the column `key` on the `patient_attributes` table. All the data in the column will be lost.
  - Added the required column `attributeName` to the `patient_attributes` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_patient_attributes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "patientId" TEXT NOT NULL,
    "attributeName" TEXT NOT NULL,
    "value" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "patient_attributes_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "patient_attributes_attributeName_fkey" FOREIGN KEY ("attributeName") REFERENCES "attributes" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_patient_attributes" ("id", "patientId", "value") SELECT "id", "patientId", "value" FROM "patient_attributes";
DROP TABLE "patient_attributes";
ALTER TABLE "new_patient_attributes" RENAME TO "patient_attributes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
