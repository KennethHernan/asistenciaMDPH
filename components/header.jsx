import { useAuth } from "@/context/AuthContext";
import { Image, Text, View } from "react-native";
import { colors, globalStyles, spacing } from "../styles/globalStyles";

export default function Header({ title }) {
  const { mes, cerrarSesion } = useAuth();
  return (
    <View style={globalStyles.header}>
      <View>
        <Text style={globalStyles.title}>{title}</Text>
        <View style={{ flexDirection: "row", gap: spacing.sm }}>
          <Text style={[globalStyles.text, { fontWeight: "600" }]}>Mes:</Text>
          <Text style={globalStyles.text}>{mes}</Text>
        </View>
      </View>

      {/* Icono de Perfil */}
      <View
        onPress={() => cerrarSesion()}
        style={{
          width: 35,
          height: 35,
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/images/usuario 1.png")}
          style={{ width: 35, height: 35 }}
        />
        <View
          style={{
            width: 12,
            height: 12,
            borderRadius: 50,
            backgroundColor: "#34C759",
            position: "absolute",
            bottom: 0,
            right: 2,
            borderWidth: 2,
            borderColor: colors.white,
          }}
        />

        <View
          style={{
            width: 150,
            padding: 10,
            height: "auto",
            borderRadius: 10,
            backgroundColor: "#ffffff13",
            position: "absolute",
            bottom: -75,
            gap: 10,
            right: 2,
            shadowColor: "#000",
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.08,
            shadowRadius: 10,
            elevation: 10,
          }}
        >
          <Text
            onPress={() => cerrarSesion()}
            style={[globalStyles.text, { fontWeight: "600" }]}
          >
            Cerrar Sesión
          </Text>
          <Text
            onPress={() => router.push("/Register")}
            style={[globalStyles.text, { fontWeight: "600" }]}
          >
            Perfil
          </Text>
        </View>
      </View>
    </View>
  );
}
