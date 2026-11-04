import { useLocalSearchParams } from "expo-router";
import { BoardingPass } from "@/components/booking/BoardingPass";
import { Button } from "@/components/common/Button";
import { Screen } from "@/components/common/Screen";
import { StateView } from "@/components/common/StateView";
import { useTicketDetail } from "@/hooks/useTicketDetail";

export default function TicketScreen() {
  const id = Number(useLocalSearchParams<{ id: string }>().id);
  const detail = useTicketDetail(id);
  const ticket = detail.ticket.data;
  if (!ticket) return <StateView loading={detail.ticket.loading} error={detail.ticket.error} onRetry={detail.ticket.reload} />;
  return (
    <Screen>
      <BoardingPass ticket={ticket} tour={detail.tour.data} />
      {detail.active ? <Button label="Cancel ticket" variant="danger" onPress={detail.cancel} loading={detail.pending} /> : null}
    </Screen>
  );
}
