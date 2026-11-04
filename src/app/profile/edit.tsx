import { View } from "react-native";
import { Avatar } from "@/components/common/Avatar";
import { Button } from "@/components/common/Button";
import { PhoneField } from "@/components/common/PhoneField";
import { Screen } from "@/components/common/Screen";
import { StateView } from "@/components/common/StateView";
import { TextField } from "@/components/common/TextField";
import { useProfileEditor } from "@/hooks/useProfileEditor";

export default function EditProfileScreen() {
  const e = useProfileEditor();
  if (!e.profile.data) return <StateView loading={e.profile.loading} error={e.profile.error} onRetry={e.profile.reload} />;
  const shown = e.removePhoto ? null : e.photo ?? e.profile.data.profileImageUrl;
  return (
    <Screen>
      <View style={{ alignItems: "center" }}><Avatar name={e.name || e.profile.data.name} imageUrl={shown} size={96} /></View>
      <Button label="Choose photo" variant="outline" onPress={() => void e.pickPhoto()} />
      {shown ? <Button label="Remove photo" variant="outline" onPress={e.clearPhoto} /> : null}
      <TextField label="Full name" value={e.name} onChangeText={e.setName} />
      <PhoneField label="Mobile number" value={e.mobile} onChange={e.setMobile} error={e.mobileError} />
      <TextField label="Age" keyboardType="number-pad" value={e.age} onChangeText={(t) => e.setAge(t.replace(/[^0-9]/g, ""))} />
      <Button label="Save" onPress={e.save} disabled={!e.canSave} loading={e.pending} />
    </Screen>
  );
}
