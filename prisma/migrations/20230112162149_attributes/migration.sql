/*
  Warnings:

  - The primary key for the `patient_attributes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `patient_attributes` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_patient_attributes" (
    "patientId" TEXT NOT NULL,
    "attributeName" TEXT NOT NULL,
    "value" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("patientId", "attributeName"),
    CONSTRAINT "patient_attributes_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "patient_attributes_attributeName_fkey" FOREIGN KEY ("attributeName") REFERENCES "attributes" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_patient_attributes" ("attributeName", "patientId", "value") SELECT "attributeName", "patientId", "value" FROM "patient_attributes";
DROP TABLE "patient_attributes";
ALTER TABLE "new_patient_attributes" RENAME TO "patient_attributes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
