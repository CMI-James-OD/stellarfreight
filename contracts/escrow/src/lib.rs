#![no_std]

use soroban_sdk::{contract, contractimpl, contracttype, Address, Env, Symbol};

#[contracttype]
#[derive(Clone, PartialEq)]
pub enum EscrowStatus {
    Pending,
    Confirmed,
    Released,
    Refunded,
}

#[contracttype]
pub struct EscrowRecord {
    pub shipper: Address,
    pub amount_stroops: i128,
    pub status: EscrowStatus,
}

#[contract]
pub struct ShipmentEscrow;

#[contractimpl]
impl ShipmentEscrow {
    /// Lock funds into escrow for a shipment.
    pub fn create_escrow(env: Env, shipment_id: Symbol, shipper: Address, amount_stroops: i128) {
        shipper.require_auth();
        let record = EscrowRecord {
            shipper,
            amount_stroops,
            status: EscrowStatus::Pending,
        };
        env.storage().instance().set(&shipment_id, &record);
    }

    /// Release escrowed funds to carrier on delivery confirmation.
    pub fn confirm_delivery(env: Env, shipment_id: Symbol, admin: Address) {
        admin.require_auth();
        let mut record: EscrowRecord = env.storage().instance().get(&shipment_id).unwrap();
        record.status = EscrowStatus::Released;
        env.storage().instance().set(&shipment_id, &record);
    }

    /// Refund escrowed funds to shipper if delivery fails.
    pub fn refund(env: Env, shipment_id: Symbol, admin: Address) {
        admin.require_auth();
        let mut record: EscrowRecord = env.storage().instance().get(&shipment_id).unwrap();
        record.status = EscrowStatus::Refunded;
        env.storage().instance().set(&shipment_id, &record);
    }

    /// Query escrow status for a shipment.
    pub fn get_status(env: Env, shipment_id: Symbol) -> EscrowStatus {
        let record: EscrowRecord = env.storage().instance().get(&shipment_id).unwrap();
        record.status
    }
}
