/**
 * Plan tiers and constraint definitions.
 * Client and server safe (does NOT contain secrets).
 */

export interface PlanTierConfig {
  id: 'free' | 'starter' | 'professional';
  name: string;
  amount: number;
  currency: string;
  maxClients: number;
  maxTeamMembers: number;
  features: string[];
}

export const PLAN_CONFIGS: Record<string, PlanTierConfig> = {
  free: {
    id: 'free',
    name: 'Free',
    amount: 0,
    currency: 'NGN',
    maxClients: 10,
    maxTeamMembers: 0,
    features: [
      'Up to 10 clients',
      'Core measurement tools',
      '0 team members',
    ],
  },
  starter: {
    id: 'starter',
    name: 'Starter',
    amount: 5_000,
    currency: 'NGN',
    maxClients: 20,
    maxTeamMembers: 1,
    features: [
      'Up to 20 clients',
      'Unlimited measurements',
      'Core measurement tools',
      'Basic order tracking',
      '1 team member',
    ],
  },
  professional: {
    id: 'professional',
    name: 'Professional',
    amount: 10_000,
    currency: 'NGN',
    maxClients: 50,
    maxTeamMembers: 5,
    features: [
      'Up to 50 clients',
      'Unlimited measurements',
      'Advanced order tracking',
      'Core measurement tools',
      'Smart scheduling',
      'Basic order tracking',
      '5 team members',
    ],
  },
};

/**
 * Returns the PlanTierConfig for a given subscription_tier string.
 * Defaults to 'free' if missing or unknown.
 */
export function getPlanLimit(tier?: string | null): PlanTierConfig {
  if (!tier) return PLAN_CONFIGS.free;
  const clean = tier.trim().toLowerCase();
  return PLAN_CONFIGS[clean] || PLAN_CONFIGS.free;
}
