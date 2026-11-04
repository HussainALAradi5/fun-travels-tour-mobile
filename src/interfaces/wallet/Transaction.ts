export interface Transaction {
  id: number;
  amount: number;
  transactionType: string;
  description?: string;
  timestamp: string;
}
