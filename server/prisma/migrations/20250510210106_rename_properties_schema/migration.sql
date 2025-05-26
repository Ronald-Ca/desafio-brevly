/*
  Warnings:

  - You are about to drop the column `accessCount` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `shortUrl` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Link` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[shortLink]` on the table `Link` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `link` to the `Link` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortLink` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Link_shortUrl_key";

-- AlterTable
ALTER TABLE "Link" DROP COLUMN "accessCount",
DROP COLUMN "shortUrl",
DROP COLUMN "url",
ADD COLUMN     "link" TEXT NOT NULL,
ADD COLUMN     "shortLink" TEXT NOT NULL,
ADD COLUMN     "visits" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Link_shortLink_key" ON "Link"("shortLink");
