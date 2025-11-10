import { globalStyles } from "@/styles/globalStyles";
import { ActivityIndicator, View } from "react-native";

export default function Loanding() {
  return (
    <View style={globalStyles.loader}>
      <ActivityIndicator
        size="large"
        color="#767676ff"
        style={{ transform: [{ scale: 0.7 }] }}
      />
    </View>
  );
}
