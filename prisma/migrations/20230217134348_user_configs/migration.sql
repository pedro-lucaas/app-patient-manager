-- AlterTable
ALTER TABLE "users" ADD COLUMN     "inactiveDays" TEXT NOT NULL DEFAULT '[0,6]',
ADD COLUMN     "lunchTime" TEXT NOT NULL DEFAULT '[60,150]',
ADD COLUMN     "workTime" TEXT NOT NULL DEFAULT '[0,24]';
