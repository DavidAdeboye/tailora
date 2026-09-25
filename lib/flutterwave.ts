/**
 * Flutterwave configuration and helpers.
 * Keep this module server-only — it reads FLUTTERWAVE_SECRET_KEY.
 */

export const FLW_BASE = "https://api.flutterwave.com/v3";

export const FLW_HEADERS = {
  Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
  "Content-Type": "application/json",
} as const;

/**
 * Pricing tiers — single source of truth for amounts displayed on
 * the landing page AND passed to Flutterwave at checkout time.
 */
export interface PricingTier {
  id: string;            // internal key
  name: string;          // display name
  amount: number;        // NGN per month
  currency: string;
  features: string[];
  description: string;
}

export const PRICING_TIERS: Record<string, PricingTier> = {
  starter: {
    id: "starter",
    name: "Starter",
    amount: 5_000,
    currency: "NGN",
    description: "Basic features for everyone",
    features: [
      "Up to 20 clients",
      "Unlimited measurements",
      "Core measurement tools",
      "Basic order tracking",
      "1 team member",
    ],
  },
  professional: {
    id: "professional",
    name: "Professional",
    amount: 10_000,
    currency: "NGN",
    description: "Professional features for everyone",
    features: [
      "Up to 50 clients",
      "Unlimited measurements",
      "Advanced order tracking",
      "Core measurement tools",
      "Smart scheduling",
      "Basic order tracking",
      "5 team members",
    ],
  },
};

/** Generate a unique, human-readable tx_ref. */
export function makeTxRef(userId: string) {
  return `tailora-${userId.slice(0, 8)}-${Date.now()}`;
}
