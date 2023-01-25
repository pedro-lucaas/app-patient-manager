/*
  Warnings:

  - You are about to drop the `atributes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `patient_atributes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "atributes";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "patient_atributes";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "attributes" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "tag" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "patient_attributes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "patientId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "patient_attributes_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "patient_attributes_key_fkey" FOREIGN KEY ("key") REFERENCES "attributes" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);
