import type { Transaction } from "../wallet/Transaction";

export interface TransactionRowProps {
  transaction: Transaction;
  onPress?: () => void;
}
