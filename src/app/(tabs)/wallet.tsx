import { router } from "expo-router";
import { Text } from "react-native";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { LinkRow } from "@/components/common/LinkRow";
import { Screen } from "@/components/common/Screen";
import { StateView } from "@/components/common/StateView";
import { ExportButton } from "@/components/report/ExportButton";
import { TransactionRow } from "@/components/wallet/TransactionRow";
import { MESSAGES } from "@/constants/messages";
import { ReportType } from "@/enums/ReportType";
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
        <Text style={{ color: theme.muted }}>{MESSAGES.topUpOnWeb}</Text>
      </Card>
      <Card>
        <LinkRow label="Booking payments" hint="Every payment made from this wallet" onPress={() => router.push("/payments")} />
      </Card>
      <Button label="Refresh" variant="outline" onPress={wallet.reload} />
      <ExportButton report={{ type: ReportType.TRANSACTIONS }} label="Export ledger" />
      <Card>
        {history.map((tx) => <TransactionRow key={tx.id} transaction={tx} onPress={() => router.push(`/transactions/${tx.id}`)} />)}
        <StateView loading={wallet.history.loading} error={wallet.history.error} empty={history.length === 0} emptyText={MESSAGES.emptyTransactions} />
      </Card>
    </Screen>
  );
}
