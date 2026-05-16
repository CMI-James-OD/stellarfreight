-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "ShipmentStatus" AS ENUM ('processed', 'shipped', 'en_route', 'arrived');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('unpaid', 'pending', 'confirmed', 'released', 'refunded');

-- CreateTable
CREATE TABLE "shipments" (
    "id" UUID NOT NULL,
    "tracking_code" TEXT NOT NULL,
    "shipment_id" TEXT NOT NULL,
    "sender_name" TEXT NOT NULL,
    "sender_phone" TEXT NOT NULL,
    "sender_email" TEXT NOT NULL,
    "receiver_name" TEXT NOT NULL,
    "receiver_phone" TEXT NOT NULL,
    "receiver_email" TEXT NOT NULL,
    "content_name" TEXT NOT NULL,
    "country_from_code" TEXT NOT NULL,
    "country_from_name" TEXT NOT NULL,
    "country_to_code" TEXT NOT NULL,
    "country_to_name" TEXT NOT NULL,
    "country_current_code" TEXT,
    "country_current_name" TEXT,
    "custom_clearance_fee" TEXT NOT NULL,
    "weight_kg" DOUBLE PRECISION,
    "status" "ShipmentStatus" NOT NULL,
    "shipping_date" TIMESTAMP(3) NOT NULL,
    "arrival_date" TIMESTAMP(3) NOT NULL,
    "current_location_time" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "shipper_wallet_address" TEXT,
    "escrow_contract_address" TEXT,
    "stellar_tx_hash" TEXT,
    "payment_status" "PaymentStatus" NOT NULL DEFAULT 'unpaid',
    "payment_amount_usdc" DOUBLE PRECISION,
    "payment_confirmed_at" TIMESTAMP(3),
    "escrow_released_at" TIMESTAMP(3),

    CONSTRAINT "shipments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_users" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_sessions" (
    "id" UUID NOT NULL,
    "token_hash" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shipments_tracking_code_key" ON "shipments"("tracking_code");

-- CreateIndex
CREATE UNIQUE INDEX "shipments_shipment_id_key" ON "shipments"("shipment_id");

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_email_key" ON "admin_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admin_sessions_token_hash_key" ON "admin_sessions"("token_hash");

-- CreateIndex
CREATE INDEX "admin_sessions_user_id_idx" ON "admin_sessions"("user_id");

-- CreateIndex
CREATE INDEX "admin_sessions_expires_at_idx" ON "admin_sessions"("expires_at");

-- AddForeignKey
ALTER TABLE "admin_sessions" ADD CONSTRAINT "admin_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "admin_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
