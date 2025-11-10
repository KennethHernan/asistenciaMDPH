import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useEffect } from "react";
export default function Index() {
  const { Autentication, loandingMain } = useAuth();
  const router = useRouter();


  useEffect(() => {
    if (loandingMain) return;
    if (Autentication) {
      router.replace("/(tabs)/Asistencia");
    } else {
      router.replace("/Login/Login");
    }
  }, [Autentication, loandingMain]);
}
