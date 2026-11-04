import { Text } from "react-native";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { Screen } from "@/components/common/Screen";
import { StateView } from "@/components/common/StateView";
import { TransactionRow } from "@/components/wallet/TransactionRow";
import { MESSAGES } from "@/constants/messages";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { useWallet } from "@/hooks/useWallet";
import { formatMoney } from "@/utilities/format";

export default function WalletScreen() {
  const theme = useTheme();
  const { user } = useAuth();
  const wallet = useWallet(user?.id ?? 0);
  const history = wallet.history.data ?? [];
  return (
    <Screen>
      <Card>
        <Text style={{ color: theme.muted }}>Wallet balance</Text>
        {wallet.account.data ? (
          <Text style={{ color: theme.text, fontSize: 30, fontWeight: "800" }}>{formatMoney(wallet.account.data.balance)}</Text>
        ) : <StateView loading={wallet.account.loading} error={wallet.account.error} />}
        <Text style={{ color: theme.muted }}>Refunds land here. Top up from the web app.</Text>
      </Card>
      <Button label="Refresh" variant="outline" onPress={wallet.reload} />
      <Card>
        {history.map((tx) => <TransactionRow key={tx.id} transaction={tx} />)}
        <StateView loading={wallet.history.loading} error={wallet.history.error} empty={history.length === 0} emptyText={MESSAGES.emptyTransactions} />
      </Card>
    </Screen>
  );
}
