import {
  Zap,
  Globe,
  ShieldCheck,
  DollarSign,
  Truck,
  Plane,
  Ship,
  Package,
  Warehouse,
  Train,
  Box,
  Anchor,
  type LucideIcon,
} from "lucide-react";

// ─── Navigation ──────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href:
    | "/"
    | "/about"
    | "/services"
    | "/team"
    | "/faqs"
    | "/support"
    | "/policy"
    | "/parcel"
    | "/why-stellar"
    | "/trust-center"
    | "/track";
}

export const navItems: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Why Stellar", href: "/why-stellar" },
  { label: "FAQs", href: "/faqs" },
  { label: "Support", href: "/support" },
  { label: "Policy", href: "/policy" },
];

// ─── Hero stats ───────────────────────────────────────────────────────────────

export const heroStats = [
  { value: "< 5s", label: "Payment Settlement" },
  { value: "~$0", label: "Transaction Fees" },
  { value: "180+", label: "Countries Covered" },
  { value: "2.4M+", label: "Shipments Processed" },
];

// ─── How it works ─────────────────────────────────────────────────────────────

export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
  tag: string;
}

export const workflowSteps: WorkflowStep[] = [
  {
    step: 1,
    title: "Book Your Shipment",
    description:
      "Submit your cargo details and destination. Our system generates a unique Stellar payment address and escrow contract for your order.",
    tag: "Instant quote",
  },
  {
    step: 2,
    title: "Pay via Stellar in Seconds",
    description:
      "Send USDC or XLM to your payment address from any Stellar-compatible wallet. Your payment confirms on-chain in under 5 seconds — no bank, no wait.",
    tag: "5-second settlement",
  },
  {
    step: 3,
    title: "Shipment Dispatches Immediately",
    description:
      "The moment blockchain confirmation arrives, your shipment is cleared for dispatch. No payment delays holding up your cargo.",
    tag: "Zero payment lag",
  },
  {
    step: 4,
    title: "Payment Releases on Delivery",
    description:
      "Our Soroban smart contract holds payment in escrow until delivery is confirmed. Both shipper and carrier are protected — automatically.",
    tag: "Smart escrow",
  },
];

// ─── Why Stellar ─────────────────────────────────────────────────────────────

export interface StellarBenefit {
  icon: LucideIcon;
  title: string;
  stat: string;
  statLabel: string;
  description: string;
}

export const stellarBenefits: StellarBenefit[] = [
  {
    icon: Zap,
    title: "Lightning Settlement",
    stat: "4.9s",
    statLabel: "avg. finality",
    description:
      "Stellar's network reaches consensus every 5 seconds. Payments confirm before your customer has closed their wallet — not 3 business days later.",
  },
  {
    icon: DollarSign,
    title: "Near-Zero Fees",
    stat: "$0.00001",
    statLabel: "per transaction",
    description:
      "Traditional SWIFT wires cost $15–$50 and take 3–5 days. Stellar costs a fraction of a cent. Every dollar stays where it belongs — in your operations.",
  },
  {
    icon: Globe,
    title: "Borderless by Default",
    stat: "180+",
    statLabel: "countries",
    description:
      "Any shipper with a Stellar wallet can pay any carrier worldwide. No correspondent bank required, no FX markup, no surprise deductions on arrival.",
  },
  {
    icon: ShieldCheck,
    title: "Soroban Smart Escrow",
    stat: "100%",
    statLabel: "automated",
    description:
      "Our Soroban smart contracts hold payment until delivery is confirmed on-chain. No disputes, no withheld funds, no trust needed between strangers.",
  },
];

// ─── Services ─────────────────────────────────────────────────────────────────

export interface Service {
  icon: LucideIcon;
  image: string;
  alt: string;
  title: string;
  description: string;
  highlight?: string;
}

export const services: Service[] = [
  {
    icon: Truck,
    image: "/images/truck4.jpg",
    alt: "Truck on highway",
    title: "Road Freight",
    description:
      "Door-to-door trucking across continents with real-time GPS tracking and Stellar payment settlement upon collection.",
    highlight: "Same-day dispatch",
  },
  {
    icon: Plane,
    image: "/images/airplane.jpg",
    alt: "Cargo airplane",
    title: "Air Freight",
    description:
      "Express air cargo for time-critical shipments. Pay in USDC on Stellar and your goods are wheels-up within hours of confirmation.",
    highlight: "48-hour delivery",
  },
  {
    icon: Ship,
    image: "/images/ship_.jpeg",
    alt: "Container ship at sea",
    title: "Ocean Freight",
    description:
      "Full and less-than-container loads on global shipping lanes. Smart escrow protects both importer and exporter for the full voyage.",
    highlight: "Port-to-port",
  },
  {
    icon: Package,
    image: "/images/courier.jpg",
    alt: "Courier delivery",
    title: "Courier & Express",
    description:
      "Small parcel and document delivery worldwide. Instant payment confirmation means faster packing, faster pickup.",
  },
  {
    icon: Warehouse,
    image: "/images/warehousing.jpg",
    alt: "Warehouse facility",
    title: "Warehousing",
    description:
      "Secure bonded warehousing at key transit hubs. Storage fees settle automatically on the Stellar network — no invoicing needed.",
  },
  {
    icon: Train,
    image: "/images/railway.jpg",
    alt: "Freight train",
    title: "Rail Freight",
    description:
      "Cost-efficient intermodal rail solutions across major corridors. Stellar payments work the same on every rail route worldwide.",
  },
  {
    icon: Box,
    image: "/images/pas.jpg",
    alt: "Packaging and storage",
    title: "Packaging & Storage",
    description:
      "Professional packing, crating, and long-term storage. Bundle with any freight service for one-click Stellar checkout.",
  },
  {
    icon: Anchor,
    image: "/images/ship_.jpeg",
    alt: "Customs clearance at port",
    title: "Customs & Compliance",
    description:
      "Expert customs clearance in 80+ jurisdictions. Blockchain-verified payment receipts simplify customs documentation.",
    highlight: "80+ countries",
  },
];

// ─── Stellar core benefits (for shorter sections) ────────────────────────────

export const coreBenefits = [
  {
    title: "Settlement That Matches Shipment Speed",
    body: "Stellar finality in under 5 seconds eliminates the payment lag that stalls dispatch. When payment confirms, your cargo moves — no polling a bank API at midnight.",
  },
  {
    title: "Transparent Payment Lifecycle",
    body: "Every payment state lives on the Stellar ledger: pending, confirmed, escrowed, released. No black box, no support tickets asking 'did the payment arrive?'",
  },
  {
    title: "Built for Cross-Border from Day One",
    body: "Stellar's anchor network converts local fiat to USDC in seconds. Shippers in Lagos pay just like shippers in London — same speed, same fee, same experience.",
  },
];

// ─── Why Stellar vs Traditional (comparison) ──────────────────────────────────

export const paymentComparison = [
  { category: "Settlement time", traditional: "3–5 business days", stellar: "< 5 seconds" },
  { category: "Transaction fee", traditional: "3–8% + bank charges", stellar: "~$0.00001" },
  { category: "Bank account required", traditional: "Yes — for both parties", stellar: "No — wallet only" },
  { category: "FX conversion markup", traditional: "1.5–4% hidden markup", stellar: "Transparent DEX rate" },
  { category: "Payment traceability", traditional: "Opaque SWIFT messaging", stellar: "Public ledger, instant verify" },
  { category: "Escrow / dispute", traditional: "Expensive legal route", stellar: "Automated smart contract" },
  { category: "Weekend / holiday", traditional: "Blocked — banks closed", stellar: "24 / 7 / 365" },
];

// ─── Payment flow (for Why Stellar page) ─────────────────────────────────────

export const paymentFlow = [
  "Shipper books order; system generates Stellar payment address + Soroban escrow contract",
  "Shipper sends USDC or XLM — payment confirms on-chain in under 5 seconds",
  "Escrow contract locks funds; carrier receives immediate dispatch signal",
  "Carrier updates tracking milestones; shipment status reflects on-chain events",
  "On delivery confirmation, Soroban contract releases payment to carrier automatically",
];

// ─── Technical integration details ──────────────────────────────────────────

export const technicalIntegration = [
  {
    title: "USDC on Stellar",
    description:
      "Payments denominated in Circle's USDC for stable value transfer. No volatility risk for either party.",
  },
  {
    title: "Soroban Smart Contracts",
    description:
      "Escrow logic deployed on Stellar's Soroban VM. Funds release only on verified delivery events — no manual intervention.",
  },
  {
    title: "Stellar Anchor Network",
    description:
      "Local fiat on/off ramps via SEP-24 anchors. Shippers can pay with local currency; it converts to USDC before hitting the ledger.",
  },
  {
    title: "SEP-31 Cross-Border Payments",
    description:
      "Compliant institutional remittance protocol for B2B freight payments across jurisdictions.",
  },
];

// ─── Roadmap ──────────────────────────────────────────────────────────────────

export const roadmapItems = [
  {
    quarter: "Q3 2025",
    title: "Live Stellar Payments",
    description: "USDC and XLM payment acceptance on all shipment types. Escrow contract deployed to Stellar mainnet.",
    done: true,
  },
  {
    quarter: "Q4 2025",
    title: "Shipper Wallet Dashboard",
    description: "In-app wallet connection, payment history, and on-chain receipt download for every transaction.",
    done: false,
  },
  {
    quarter: "Q1 2026",
    title: "Anchor Fiat On-Ramp",
    description: "Local currency deposit via SEP-24 anchors in 30+ markets. Pay in Naira, receive in USDC.",
    done: false,
  },
  {
    quarter: "Q2 2026",
    title: "Multi-Carrier Smart Routing",
    description: "Soroban contracts automatically split payments across multi-leg shipments and sub-contractors.",
    done: false,
  },
];

// ─── FAQs ─────────────────────────────────────────────────────────────────────

export const faqs = [
  {
    question: "What is Stellar and why do you use it for payments?",
    answer:
      "Stellar is an open, decentralised payment network built specifically for global money movement. Unlike general-purpose blockchains, Stellar focuses on fast, low-cost value transfer between any two parties anywhere in the world. We chose Stellar because it solves the exact pain points of international freight payments: slow settlement, high fees, and exclusion of unbanked businesses.",
  },
  {
    question: "Do I need cryptocurrency experience to use Trustway?",
    answer:
      "No. While we accept USDC and XLM directly, our local fiat on-ramp (via Stellar anchors) lets you pay in your local currency from a familiar bank or mobile money app. The conversion to USDC happens automatically — you just pay as normal.",
  },
  {
    question: "How does the Soroban escrow protect me?",
    answer:
      "When you pay for a shipment, funds are locked in a Soroban smart contract on the Stellar blockchain. The carrier only receives payment when our system records a verified delivery event. If delivery fails, the contract releases funds back to you — automatically, with no dispute process required.",
  },
  {
    question: "How long does a payment actually take?",
    answer:
      "Stellar achieves ledger finality in 3–5 seconds. Once you submit your payment, it confirms, your shipment is cleared for dispatch, and both you and the carrier receive on-chain notification — all within one working minute.",
  },
  {
    question: "What currencies can I pay with?",
    answer:
      "You can pay with USDC (USD Coin on Stellar), XLM (Stellar Lumens), or local fiat via supported anchors. We currently support fiat on-ramps in 30+ countries with more being added quarterly.",
  },
  {
    question: "Is Stellar payment mandatory, or can I pay by bank transfer?",
    answer:
      "Stellar payment is our primary and recommended method due to its speed and cost advantages. Traditional bank transfer is available as a fallback in select corridors but carries standard settlement delays and fees.",
  },
  {
    question: "How do I track my shipment?",
    answer:
      "Every shipment gets a unique tracking code at booking. Enter it on our Track page for real-time status updates. Payment and delivery milestones are also visible on the Stellar ledger via your transaction hash.",
  },
  {
    question: "What happens if a shipment is lost or damaged?",
    answer:
      "Our insurance partners cover loss and damage claims. The on-chain payment record and delivery events form an immutable audit trail, which significantly speeds up the claims process compared to traditional paper-based documentation.",
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────

export const testimonials = [
  {
    quote:
      "We used to wait 4 days for payment to clear before dispatching to our Nigerian distributor. With Trustway on Stellar, it clears before I close my browser tab. It changed our operations entirely.",
    name: "Marcus Oyeleke",
    title: "Head of Supply Chain, Meridian Exports",
    country: "🇿🇦 South Africa",
  },
  {
    quote:
      "The Soroban escrow was the dealbreaker for us. We ship high-value electronics to new buyers in Southeast Asia. Knowing the smart contract protects both sides means we can work with partners we've never met.",
    name: "Chen Wei",
    title: "Founder, Pacific Gateway Freight",
    country: "🇸🇬 Singapore",
  },
  {
    quote:
      "Our small business was excluded from global shipping lanes because we didn't have a USD bank account. Stellar's wallet-based payments opened the door. Trustway made it stupidly easy.",
    name: "Fatima Al-Rashidi",
    title: "Owner, Artisan Imports",
    country: "🇦🇪 UAE",
  },
];

// ─── Partner logos ────────────────────────────────────────────────────────────

export const partnerLogos = [
  { src: "/images/msc.png", alt: "MSC" },
  { src: "/images/pil.png", alt: "PIL" },
  { src: "/images/maersk.png", alt: "Maersk" },
  { src: "/images/evergreen.png", alt: "Evergreen" },
  { src: "/images/cosco.png", alt: "COSCO" },
];

// kept for footer text list
export const partners = [
  "Stellar Development Foundation",
  "Circle (USDC)",
  "Moneygram",
  "Flutterwave",
  "DHL Express",
  "Maersk Line",
];

// ─── Team ─────────────────────────────────────────────────────────────────────

export const teamMembers = [
  {
    name: "Walter Blair",
    position: "Shipping & Logistics",
    image: "/images/walter-blair.jpg",
  },
  {
    name: "Garreth Paul",
    position: "Parcel Packaging & Safety",
    image: "/images/garreth-paul.jpg",
  },
  {
    name: "Amanda Anderson",
    position: "Customer Care Unit",
    image: "/images/amanda-anderson.jpg",
  },
  {
    name: "John D. Tyler",
    position: "Warehousing & Local Transport",
    image: "/images/john-d-tyler.jpg",
  },
];
