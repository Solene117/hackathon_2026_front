export type Role = "USER" | "ADMIN";

export type User = {
  id: number;
  firstName: string | null;
  lastName: string | null;
  mail: string;
  roles: Role[];
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
};

export type LoginResponse = {
  access_token: string;
};
