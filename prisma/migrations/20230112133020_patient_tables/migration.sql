/*
  Warnings:

  - Added the required column `tag` to the `atributes` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_atributes" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "tag" TEXT NOT NULL
);
INSERT INTO "new_atributes" ("name") SELECT "name" FROM "atributes";
DROP TABLE "atributes";
ALTER TABLE "new_atributes" RENAME TO "atributes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
