import { useCallback } from "react";
import { walletService } from "@/services/walletService";
import { useAsync } from "./useAsync";

export function useWallet(userId: number) {
  const account = useAsync(useCallback(() => walletService.balance(userId), [userId]));
  const history = useAsync(useCallback(() => walletService.history(userId), [userId]));
  const reload = useCallback(async () => {
    await Promise.all([account.reload(), history.reload()]);
  }, [account, history]);
  return { account, history, reload };
}
