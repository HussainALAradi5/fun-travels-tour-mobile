import { useState } from "react";
import { router } from "expo-router";
import type { RegisterRequest } from "@/interfaces/auth/RegisterRequest";
import { useAction } from "./useAction";
import { useAuth } from "./useAuth";

const EMPTY: RegisterRequest = { userName: "", name: "", email: "", password: "", mobileNumber: "" };
const MIN_PASSWORD = 6;
const MOBILE_PATTERN = /^\+?[1-9]\d{7,14}$/;

export function useRegisterForm() {
  const { register } = useAuth();
  const { pending, run } = useAction();
  const [values, setValues] = useState<RegisterRequest>(EMPTY);
  const set = (key: keyof RegisterRequest) => (text: string) => setValues((v) => ({ ...v, [key]: text }));
  const errors = {
    password: values.password && values.password.length < MIN_PASSWORD ? `At least ${MIN_PASSWORD} characters` : undefined,
    mobileNumber: values.mobileNumber && !MOBILE_PATTERN.test(values.mobileNumber) ? "Use international format, e.g. +97333334444" : undefined,
  };
  const complete = Object.entries(values).every(([k, v]) => k === "age" || String(v ?? "").trim() !== "");
  const canSubmit = complete && !errors.password && !errors.mobileNumber;
  const submit = () => run(async () => {
    await register({ ...values, userName: values.userName.trim(), email: values.email.trim() });
    router.replace("/(tabs)/tours");
  });
  return { values, set, errors, canSubmit, pending, submit };
}
