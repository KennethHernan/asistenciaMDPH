import Header from "@/components/header";
import TablaAsistencia from "@/components/tabla-asistencia";
import { useAuth } from "@/context/AuthContext";
import { colors, globalStyles, spacing } from "@/styles/globalStyles";
import { ScrollView, Text, View } from "react-native";
export default function RegistroScreen() {
    const { textoTiempo } = useAuth();
  return (
    <ScrollView style={globalStyles.container}>
      {/* Header */}
      <Header title="Registro de Asistencia" />

      {/* Body */}
      <View style={globalStyles.card}>
        <View style={globalStyles.flex}>
          <Text style={globalStyles.subtitle}>Registro</Text>
          <View style={{ flexDirection: "row", gap: spacing.sm }}>
            <Text
              style={[
                globalStyles.text,
                { color: colors.text_plomo},
              ]}
            >
              Último registro { textoTiempo }
            </Text>
          </View>
        </View>
        {/* Tabla */}
        <TablaAsistencia />
      </View>
    </ScrollView>
  );
}
