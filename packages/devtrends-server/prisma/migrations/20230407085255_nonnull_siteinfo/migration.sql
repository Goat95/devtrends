/*
  Warnings:

  - Made the column `siteInfoId` on table `Item` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "author" TEXT NOT NULL DEFAULT '',
    "link" TEXT,
    "thumbnail" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "siteInfoId" INTEGER NOT NULL,
    CONSTRAINT "Item_siteInfoId_fkey" FOREIGN KEY ("siteInfoId") REFERENCES "SiteInfo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("author", "body", "createdAt", "id", "link", "siteInfoId", "thumbnail", "title", "updatedAt", "userId") SELECT "author", "body", "createdAt", "id", "link", "siteInfoId", "thumbnail", "title", "updatedAt", "userId" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE INDEX "Item_createdAt_idx" ON "Item"("createdAt" DESC);
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
