export type Role = "USER" | "ADMIN";

export type AccountType = "STANDARD" | "INFLUENCER";

export type User = {
  id: number;
  firstName: string | null;
  lastName: string | null;
  mail: string;
  roles: Role[];
  accountType: AccountType;
  points: number;
  currentTier: string;
  referralCode: string | null;
};

export type LoginPayload = {
  mail: string;
  password: string;
};

export type RegisterPayload = {
  firstName?: string;
  lastName?: string;
  mail: string;
  password: string;
  referralCode?: string;
};

export type LoginResponse = {
  access_token: string;
};
