import { Redirect } from "expo-router";
import { StateView } from "@/components/common/StateView";
import { useAuth } from "@/hooks/useAuth";

export default function Index() {
  const { user, restoring } = useAuth();
  if (restoring) return <StateView loading />;
  return <Redirect href={user ? "/(tabs)/tours" : "/(auth)/login"} />;
}
