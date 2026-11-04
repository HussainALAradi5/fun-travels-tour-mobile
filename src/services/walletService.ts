import { ENDPOINTS } from "@/config/endpoints";
import type { Account } from "@/interfaces/wallet/Account";
import type { Transaction } from "@/interfaces/wallet/Transaction";
import { api } from "./apiClient";

export const walletService = {
  balance: (userId: number) => api.get<Account>(ENDPOINTS.accounts.balance(userId)),
  history: (userId: number) => api.get<Transaction[]>(ENDPOINTS.accounts.history(userId)),
};
