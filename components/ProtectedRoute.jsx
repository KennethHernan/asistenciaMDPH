import { useAuth } from "@/context/AuthContext";
import { Redirect, Slot } from "expo-router";
export default function ProtectedRoute() {
  const { Autentication, loandingMain } = useAuth();

  if (loandingMain) return;

  if (!Autentication && !loandingMain) {
    return <Redirect href="/Login/Login" />;
  }

  return <Slot />;
}
