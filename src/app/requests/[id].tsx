import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { Screen } from "@/components/common/Screen";
import { StateView } from "@/components/common/StateView";
import { StatusBadge } from "@/components/common/StatusBadge";
import { TextField } from "@/components/common/TextField";
import { MESSAGES } from "@/constants/messages";
import { useSupportRequest } from "@/hooks/useSupportRequest";
import { useTheme } from "@/hooks/useTheme";
import { formatDateTime } from "@/utilities/format";

export default function RequestScreen() {
  const theme = useTheme();
  const id = Number(useLocalSearchParams<{ id: string }>().id);
  const d = useSupportRequest(id);
  const request = d.request.data;
  if (!request) return <StateView loading={d.request.loading} error={d.request.error} onRetry={d.request.reload} />;
  const comments = d.timeline.data?.comments ?? [];
  return (
    <Screen>
      <Card>
        <StatusBadge status={request.status} />
        <Text style={{ color: theme.text, fontSize: 18, fontWeight: "800" }}>{request.title}</Text>
        <Text style={{ color: theme.text }}>{request.description}</Text>
        <Text style={{ color: theme.muted, fontSize: 12 }}>
          {request.type} - {formatDateTime(request.createdAt)}{request.assignedTo ? ` - with ${request.assignedTo.name}` : ""}
        </Text>
      </Card>
      <Text style={{ color: theme.text, fontWeight: "700" }}>Replies</Text>
      {comments.map((c) => (
        <Card key={c.id}>
          <Text style={{ color: theme.text, fontWeight: "600" }}>{c.author?.name ?? "Support"}</Text>
          <Text style={{ color: theme.text }}>{c.content}</Text>
          <Text style={{ color: theme.muted, fontSize: 12 }}>{formatDateTime(c.createdAt)}{c.updatedAt ? " (edited)" : ""}</Text>
        </Card>
      ))}
      <StateView loading={d.timeline.loading} empty={!d.timeline.loading && comments.length === 0} emptyText={MESSAGES.emptyComments} />
      <TextField label="Your reply" value={d.reply} onChangeText={d.setReply} multiline style={styles.area} />
      <Button label="Send reply" onPress={d.send} disabled={!d.reply.trim()} loading={d.pending} />
      {d.deletable ? <Button label="Delete request" variant="danger" onPress={d.remove} /> : null}
    </Screen>
  );
}

const styles = StyleSheet.create({ area: { minHeight: 80, textAlignVertical: "top" } });
