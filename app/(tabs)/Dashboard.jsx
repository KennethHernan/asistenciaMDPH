import IconFlechaDanger from "@/assets/icons/icon_flecha_danger.svg";
import IconFlechaGreen from "@/assets/icons/icon_flecha_green.svg";
import IconFlechaWarning from "@/assets/icons/icon_flecha_warning.svg";
import ComponeteAsistencia from "@/components/componente-asistencia";
import Header from "@/components/header";
import { useAuth } from "@/context/AuthContext";
import { colors, globalStyles, spacing } from "@/styles/globalStyles";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { ScrollView } from "react-native-gesture-handler";
const screenWidth = Dimensions.get("window").width;

export default function DashboardScreen() {
  const { conteo, generarDatosAsistencia, asisteniciasAll } = useAuth();
  const router = useRouter();
  const data = useMemo(() => generarDatosAsistencia(), [asisteniciasAll]);
  
  return (
    <ScrollView style={globalStyles.container}>
      {/* Header */}
      <Header title="Dashboard" />

      {/* Grafico Tardanza */}

      <TouchableOpacity
        activeOpacity={0.99}
        onPress={() => router.push("/(tabs)/Registro")}
      >
        <View style={[globalStyles.card, { backgroundColor: "#ffffffff" }]}>
          {/* Head */}
          <Text style={globalStyles.subtitle}>Evaluación</Text>
          <Text
            style={[
              globalStyles.text,
              { color: colors.text_plomo, marginBottom: spacing.sm },
            ]}
          >
            Último 30 días
          </Text>
          {/* Grafico */}
          <LineChart
            data={data}
            width={screenWidth - 40}
            height={160}
            yAxisLabel=""
            yAxisSuffix=""
            withDots={false}
            withShadow
            bezier
            chartConfig={{
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              fillShadowGradientFrom: "#34C759",
              fillShadowGradientFromOpacity: 0.5,
              fillShadowGradientToOpacity: 0,
              color: (opacity = 1) => `rgba(52,199,89,${opacity})`,
              labelColor: () => colors.text_plomo,
              propsForBackgroundLines: { strokeWidth: 0 },
              propsForLabels: {
                fontSize: 10,
                fontWeight: "500",
                fontFamily: "Roboto",
              },
            }}
            withVerticalLabels={false}
            withHorizontalLabels={false}
            style={{
              backgroundColor: colors.text_plomo,
              marginStart: -55,
              marginBottom: -4,
            }}
          />

          {/* Footer */}
          <View
            style={{
              marginTop: spacing.sm,
              flexDirection: "row",
              justifyContent: "center",
              gap: 20,
              alignItems: "center",
            }}
          >
            {/* Contenido Puntual */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <IconFlechaGreen />
              <Text
                style={[
                  globalStyles.text,
                  { fontWeight: "500", color: colors.secondary },
                ]}
              >
                {conteo.puntual}
              </Text>
              <Text
                style={[
                  globalStyles.text,
                  { color: colors.text_plomo, marginStart: spacing.sm },
                ]}
              >
                Puntual
              </Text>
            </View>
            {/* Contenido Tardanzas */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <IconFlechaWarning />
              <Text
                style={[
                  globalStyles.text,
                  { fontWeight: "500", color: colors.warning },
                ]}
              >
                {conteo.tardanza}
              </Text>
              <Text
                style={[
                  globalStyles.text,
                  { color: colors.text_plomo, marginStart: spacing.sm },
                ]}
              >
                Tardanza
              </Text>
            </View>

            {/* Contenido Faltas */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <IconFlechaDanger />
              <Text
                style={[
                  globalStyles.text,
                  { fontWeight: "500", color: colors.danger },
                ]}
              >
                {conteo.falta}
              </Text>
              <Text
                style={[
                  globalStyles.text,
                  { color: colors.text_plomo, marginStart: spacing.sm },
                ]}
              >
                Falta
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* Conversion de Descuento */}
      <View style={globalStyles.card}>
        {/* Head */}
        <View style={globalStyles.flex}>
          <Text style={globalStyles.subtitle}>Conversión de Descuento</Text>

          {/* Días */}
          <View>
            <Text
              style={[
                globalStyles.textInfo,
                { fontWeight: "500", color: colors.danger },
              ]}
            >
              {Math.trunc(conteo.tardanza / 3) + conteo.falta} Días
            </Text>
          </View>
        </View>
        {/* Footer */}
        <View
          style={{
            marginVertical: spacing.sm,
            flexDirection: "row",
            justifyContent: "center",
            gap: 20,
            alignItems: "center",
            paddingBottom: 10,
          }}
        >
          {/* Tardanza */}
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text style={globalStyles.subtitle}>{conteo.tardanza}</Text>
            <Text
              style={[
                globalStyles.text,
                { color: colors.text_plomo, marginStart: spacing.sm },
              ]}
            >
              Tardanzas
            </Text>
          </View>

          {/* Conversion */}
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text style={globalStyles.subtitle}>
              {Math.trunc(conteo.tardanza / 3)}
            </Text>
            <Text
              style={[
                globalStyles.text,
                {
                  color: colors.text_plomo,
                  marginStart: spacing.sm,
                  width: 100,
                  textAlign: "center",
                  marginBottom: -20,
                },
              ]}
            >
              Conversión de Tardanza
            </Text>
          </View>

          {/* Falta */}
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text style={globalStyles.subtitle}>{conteo.falta}</Text>
            <Text
              style={[
                globalStyles.text,
                { color: colors.text_plomo, marginStart: spacing.sm },
              ]}
            >
              Faltas
            </Text>
          </View>
        </View>
      </View>

      {/* Última Asistencia */}
      <ComponeteAsistencia />
    </ScrollView>
  );
}
