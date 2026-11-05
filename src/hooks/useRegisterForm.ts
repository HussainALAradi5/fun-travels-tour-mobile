import { useState } from "react";
import { router } from "expo-router";
import { MOBILE_PATTERN } from "@/constants/phone";
import type { Gender } from "@/enums/Gender";
import type { RegisterRequest } from "@/interfaces/auth/RegisterRequest";
import { useAction } from "./useAction";
import { useAuth } from "./useAuth";

type TextKey = Exclude<keyof RegisterRequest, "gender" | "age">;
type RegisterDraft = Omit<RegisterRequest, "gender"> & { gender: Gender | null };

const EMPTY: RegisterDraft = { userName: "", name: "", email: "", password: "", mobileNumber: "", gender: null };
const MIN_PASSWORD = 6;

export function useRegisterForm() {
  const { register } = useAuth();
  const { pending, run } = useAction();
  const [values, setValues] = useState<RegisterDraft>(EMPTY);
  const set = (key: TextKey) => (text: string) => setValues((v) => ({ ...v, [key]: text }));
  const setGender = (gender: Gender) => setValues((v) => ({ ...v, gender }));
  const errors = {
    password: values.password && values.password.length < MIN_PASSWORD ? `At least ${MIN_PASSWORD} characters` : undefined,
    mobileNumber: values.mobileNumber && !MOBILE_PATTERN.test(values.mobileNumber) ? "Enter the number after the country code, e.g. +973 39990001" : undefined,
  };
  const complete = values.gender !== null && Object.entries(values).every(([k, v]) => k === "age" || String(v ?? "").trim() !== "");
  const canSubmit = complete && !errors.password && !errors.mobileNumber;
  const submit = () => run(async () => {
    if (!values.gender) return;
    await register({ ...values, gender: values.gender, userName: values.userName.trim(), email: values.email.trim() });
    router.replace("/(tabs)/tours");
  });
  return { values, set, setGender, errors, canSubmit, pending, submit };
}
