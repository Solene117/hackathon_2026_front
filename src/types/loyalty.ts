export type RewardType = "DISCOUNT_VOUCHER" | "COMMISSION";

export type RewardStatus = "AVAILABLE" | "USED" | "EXPIRED" | "PAID";

export type PointsSource = "REFERRAL" | "KILOMETERS" | "TIER";

export type Reward = {
  id: number;
  userId: number;
  type: RewardType;
  code: string;
  source: PointsSource;
  status: RewardStatus;
  discountPercent: number | null;
  category: string | null;
  amount: number | null;
  reference: string | null;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ReferralStatus = "REGISTERED" | "COMPLETED";

export type ReferralFilleul = {
  id: number;
  firstName: string | null;
  lastName: string | null;
  mail: string;
};

export type ReferralItem = {
  id: number;
  status: ReferralStatus;
  completedAt: string | null;
  createdAt: string;
  filleul: ReferralFilleul;
};

export type ReferralOverview = {
  referralCode: string;
  referralLink: string;
  totalReferrals: number;
  completedReferrals: number;
  referrals: ReferralItem[];
};

export type InfluencerDashboard = {
  referrals: {
    total: number;
    converted: number;
    conversionRate: number;
  };
  commissions: {
    pendingAmount: number;
    paidAmount: number;
    totalAmount: number;
    items: Reward[];
  };
};
