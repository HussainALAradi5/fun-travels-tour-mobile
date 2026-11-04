import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { MESSAGES } from "@/constants/messages";
import { MOBILE_PATTERN } from "@/constants/phone";
import { profileService } from "@/services/profileService";
import { useAction } from "./useAction";
import { useAsync } from "./useAsync";
import { useAuth } from "./useAuth";

/** Edits name, mobile (with country code), age, and photo, then refreshes the signed-in user. */
export function useProfileEditor() {
  const { updateUser } = useAuth();
  const profile = useAsync(useCallback(() => profileService.mine(), []));
  // Only the user's edits are state; untouched fields show the loaded profile.
  const [edits, setEdits] = useState<{ name?: string; mobile?: string; age?: string }>({});
  const [photo, setPhoto] = useState<string | null>(null);
  const [removePhoto, setRemovePhoto] = useState(false);
  const { pending, run } = useAction();
  const name = edits.name ?? profile.data?.name ?? "";
  const mobile = edits.mobile ?? profile.data?.mobileNumber ?? "";
  const age = edits.age ?? (profile.data?.age ? String(profile.data.age) : "");
  const setName = (value: string) => setEdits((e) => ({ ...e, name: value }));
  const setMobile = (value: string) => setEdits((e) => ({ ...e, mobile: value }));
  const setAge = (value: string) => setEdits((e) => ({ ...e, age: value }));

  const pickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ["images"], allowsEditing: true, aspect: [1, 1], quality: 0.7, base64: true });
    if (!result.canceled && result.assets[0]?.base64) {
      setPhoto(`data:${result.assets[0].mimeType ?? "image/jpeg"};base64,${result.assets[0].base64}`);
      setRemovePhoto(false);
    }
  };

  const mobileError = mobile && !MOBILE_PATTERN.test(mobile) ? "Enter the number after the country code" : undefined;
  const save = () => run(async () => {
    const updated = await profileService.update({
      name: name.trim(), mobileNumber: mobile, age: age ? Number(age) : undefined,
      base64Image: photo ?? undefined, removeImage: removePhoto,
    });
    await updateUser(updated);
    Alert.alert(MESSAGES.profileSaved);
    router.back();
  });

  return {
    profile, name, setName, mobile, setMobile, age, setAge, photo, pickPhoto, removePhoto,
    clearPhoto: () => { setPhoto(null); setRemovePhoto(true); }, mobileError, save, pending,
    canSave: name.trim().length > 0 && !mobileError,
  };
}
