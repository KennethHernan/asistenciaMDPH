import { AuthProvider } from "@/context/AuthContext";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" backgroundColor="#fff" />

      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <Slot />
        </AuthProvider>
      </GestureHandlerRootView>
    </>
  );
}
