/*
  Warnings:

  - The primary key for the `user_config` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `user_config` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user_config" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "lunchTimeStart" DATETIME,
    "lunchTimeDuration" INTEGER,
    CONSTRAINT "user_config_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_user_config" ("lunchTimeDuration", "lunchTimeStart", "userId") SELECT "lunchTimeDuration", "lunchTimeStart", "userId" FROM "user_config";
DROP TABLE "user_config";
ALTER TABLE "new_user_config" RENAME TO "user_config";
CREATE UNIQUE INDEX "user_config_userId_key" ON "user_config"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
