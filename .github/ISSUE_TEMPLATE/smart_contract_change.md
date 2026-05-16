---
name: Smart Contract Change
about: Propose a change to the StellarFreight Soroban escrow contract
labels: contract
---

**Contract Name**
e.g. `escrow` (`contracts/escrow/`)

**Description of the Proposed Change**
What new function, logic, or behaviour are you proposing?

**Security Considerations**
- Does this change affect shipper or carrier funds?
- How are edge cases (failed delivery, dispute, partial refund) handled?
- What safeguards prevent unauthorised fund release?

**Testing Requirements**
What specific unit test cases need to be covered for this change?
- Happy path (successful delivery → release)
- Failure path (delivery fails → refund)
- Auth checks (only admin can confirm/refund)
- Edge cases

**Verification Plan**
How can this contract logic be verified on-chain (or via Soroban testutils)?

**Audit Impact**
Does this change affect any existing audit findings or introduce new attack surfaces?
