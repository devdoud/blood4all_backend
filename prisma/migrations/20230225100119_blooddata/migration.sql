-- CreateTable
CREATE TABLE "Doctor" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "ifu" TEXT NOT NULL,
    "profil" TEXT,
    "hopital" TEXT NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blood" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "bloodGroupe" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "doctorId" TEXT,
    "reservationId" TEXT,
    "bloodBankId" TEXT,

    CONSTRAINT "Blood_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pocketNumber" INTEGER NOT NULL,
    "doctorId" TEXT,
    "bloodBankId" TEXT NOT NULL,

    CONSTRAINT "reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bloodBank" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nameBankBlood" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "lagitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "bloodBank_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_email_key" ON "Doctor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "bloodBank_nameBankBlood_key" ON "bloodBank"("nameBankBlood");

-- AddForeignKey
ALTER TABLE "Blood" ADD CONSTRAINT "Blood_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "reservation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blood" ADD CONSTRAINT "Blood_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blood" ADD CONSTRAINT "Blood_bloodBankId_fkey" FOREIGN KEY ("bloodBankId") REFERENCES "bloodBank"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_bloodBankId_fkey" FOREIGN KEY ("bloodBankId") REFERENCES "bloodBank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
