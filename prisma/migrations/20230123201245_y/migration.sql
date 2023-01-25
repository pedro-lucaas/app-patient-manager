/*
  Warnings:

  - The primary key for the `patient_attributes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `attributeName` on the `patient_attributes` table. All the data in the column will be lost.
  - The primary key for the `attributes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `userId` to the `patients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `procedure` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attributeId` to the `patient_attributes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `patient_attributes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `attributes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "user_config" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "lunchTimeStart" DATETIME NOT NULL,
    "lunchTimeDuration" INTEGER NOT NULL,
    CONSTRAINT "user_config_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_patients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "comments" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "canceledAt" DATETIME,
    CONSTRAINT "patients_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_patients" ("birthDate", "canceledAt", "comments", "createdAt", "email", "id", "name", "phone", "sex", "updatedAt") SELECT "birthDate", "canceledAt", "comments", "createdAt", "email", "id", "name", "phone", "sex", "updatedAt" FROM "patients";
DROP TABLE "patients";
ALTER TABLE "new_patients" RENAME TO "patients";
CREATE UNIQUE INDEX "patients_email_key" ON "patients"("email");
CREATE TABLE "new_appointments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "initDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "status" TEXT NOT NULL,
    "procedure" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "comments" TEXT,
    "cancelReason" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "appointments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "appointments_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_appointments" ("cancelReason", "comments", "createdAt", "endDate", "id", "initDate", "patientId", "status", "updatedAt") SELECT "cancelReason", "comments", "createdAt", "endDate", "id", "initDate", "patientId", "status", "updatedAt" FROM "appointments";
DROP TABLE "appointments";
ALTER TABLE "new_appointments" RENAME TO "appointments";
CREATE TABLE "new_patient_attributes" (
    "userId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "attributeId" INTEGER NOT NULL,
    "value" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("patientId", "attributeId"),
    CONSTRAINT "patient_attributes_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "patient_attributes_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "attributes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "patient_attributes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_config" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_patient_attributes" ("patientId", "value") SELECT "patientId", "value" FROM "patient_attributes";
DROP TABLE "patient_attributes";
ALTER TABLE "new_patient_attributes" RENAME TO "patient_attributes";
CREATE TABLE "new_attributes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "tag" TEXT
);
INSERT INTO "new_attributes" ("name", "tag") SELECT "name", "tag" FROM "attributes";
DROP TABLE "attributes";
ALTER TABLE "new_attributes" RENAME TO "attributes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
