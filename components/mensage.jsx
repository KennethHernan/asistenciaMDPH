import IconClose from "@/assets/icons/icon_close.svg";
import { useAuth } from "@/context/AuthContext";
import { globalStyles } from "@/styles/globalStyles";
import { Text, TouchableOpacity, View } from "react-native";
export default function Mensaje( { texto } ) {
  const { setMenssage } = useAuth();  
  return (
    <View style={globalStyles.message}>
      <View style={globalStyles.card}>
        <View style={globalStyles.flex}>
          <Text style={globalStyles.subtitle}>Mensaje Sistema</Text>
          <TouchableOpacity
            activeOpacity={0.99}
            onPress={() => setMenssage("")}
          >
            <IconClose />
          </TouchableOpacity>
        </View>
        <Text style={[globalStyles.textInfo, { width: 250}]}>{ String(texto) }</Text>
      </View>
    </View>
  );
}
