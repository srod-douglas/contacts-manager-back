/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `clients` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `contacts` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
CREATE SEQUENCE clients_id_seq;
ALTER TABLE "clients" ALTER COLUMN "id" SET DEFAULT nextval('clients_id_seq'),
ALTER COLUMN "last_name" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3);
ALTER SEQUENCE clients_id_seq OWNED BY "clients"."id";

-- AlterTable
CREATE SEQUENCE contacts_id_seq;
ALTER TABLE "contacts" ALTER COLUMN "id" SET DEFAULT nextval('contacts_id_seq'),
ALTER COLUMN "last_name" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3);
ALTER SEQUENCE contacts_id_seq OWNED BY "contacts"."id";

-- CreateIndex
CREATE UNIQUE INDEX "clients_email_key" ON "clients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_email_key" ON "contacts"("email");
