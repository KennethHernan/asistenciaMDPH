import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";

export default function Index() {
  const { Autentication, loandingMain } = useAuth();
  const router = useRouter();

  if (loandingMain) return;

  if (!Autentication) {
    router.replace("/Login/Login");
  } else {
    router.replace("/(tabs)/Asistencia");
  }

  return null;
}