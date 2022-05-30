-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" CITEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Boat" (
    "id" TEXT NOT NULL,
    "name" CITEXT NOT NULL,

    CONSTRAINT "Boat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Swimlane" (
    "id" TEXT NOT NULL,
    "name" CITEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "Swimlane_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL,
    "boatId" TEXT NOT NULL,
    "swimlaneId" TEXT NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Boat_name_key" ON "Boat"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Swimlane_name_key" ON "Swimlane"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Card_boatId_key" ON "Card"("boatId");

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_boatId_fkey" FOREIGN KEY ("boatId") REFERENCES "Boat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_swimlaneId_fkey" FOREIGN KEY ("swimlaneId") REFERENCES "Swimlane"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
