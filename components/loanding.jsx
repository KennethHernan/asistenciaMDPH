import { useAuth } from "@/context/AuthContext";
import { globalStyles } from "@/styles/globalStyles";
import { ActivityIndicator, Text, View } from "react-native";

export default function Loanding() {
  const { isUpdating } = useAuth();
  return (
    <View style={globalStyles.loader}>
      <ActivityIndicator
        size="large"
        color="#767676ff"
        style={{ transform: [{ scale: 0.7 }] }}
      />
      <Text style={globalStyles.textInfo}>
        {isUpdating
          ? "Instalando actualización..."
          : "Buscando actualizaciones..."}
      </Text>
    </View>
  );
}
