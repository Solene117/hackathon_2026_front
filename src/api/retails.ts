import { api } from "./client";
import type { Retail } from "../types/retail";

export function fetchRetails(): Promise<Retail[]> {
  return api<Retail[]>("/api/retails");
}
