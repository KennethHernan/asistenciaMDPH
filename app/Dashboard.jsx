import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { ScrollView } from "react-native-gesture-handler";
import IconFlechaDanger from "../assets/icons/icon_flecha_danger.svg";
import IconFlechaWarning from "../assets/icons/icon_flecha_warning.svg";
import { colors, globalStyles, spacing } from "../styles/globalStyles";
const screenWidth = Dimensions.get("window").width;
const dataGrafico = [
  {
    id: 1,
    fecha: "30/10/2025",
    dia: "Jueves",
    entrada: "08:45 am",
    salida: "05:30 pm",
    estado: "Puntual",
  },
];

const data = {
  labels: [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
  ],
  datasets: [
    {
      data: [
        3, 3, 4, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3, 3, 3, 3,
        3, 3, 3, 3, 3, 3, 3, 3, 3,
      ],
      color: (opacity = 1) => `rgba(52, 199, 89, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};
export default function DashboardScreen() {
  return (
    <ScrollView style={globalStyles.container}>
      {/* Header */}
      <View style={globalStyles.header}>
        <View>
          <Text style={globalStyles.title}>Dashboard</Text>
          <View style={{ flexDirection: "row", gap: spacing.sm }}>
            <Text style={[globalStyles.text, { fontWeight: "600" }]}>Mes:</Text>
            <Text style={globalStyles.text}>Setiembre</Text>
          </View>
        </View>

        {/* Icono de Perfil */}
        <View
          style={{
            width: 35,
            height: 35,
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image source={require("../assets/images/usuario 1.png")} style={{ width: 35, height: 35}} />
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
        </View>
      </View>

      {/* Grafico Tardanza */}
      <View style={globalStyles.card}>
        {/* Head */}
        <Text style={globalStyles.subtitle}>Tardanzas</Text>
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
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            fillShadowGradientFrom: "#34C759",
            fillShadowGradientFromOpacity: 0.1,
            fillShadowGradientToOpacity: 0,
            color: (opacity = 1) => `rgba(52,199,89,${opacity})`,
            labelColor: () => colors.text_plomo,
            propsForBackgroundLines: { strokeWidth: 0.5 },
            propsForLabels: {
              fontSize: 7,
              fontWeight: "500",
              fontFamily: "Roboto",
            },
          }}
          withVerticalLabels={true}
          withHorizontalLabels={false}
          style={{
            backgroundColor: colors.text_plomo,
            marginStart: -55,
            marginBottom: spacing.sm,
          }}
        />

        {/* Footer */}
        <View
          style={{
            marginTop: spacing.sm,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Contenido Tardanzas */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <IconFlechaWarning />
            <Text style={[globalStyles.text, { color: colors.warning }]}>
              3
            </Text>
            <Text
              style={[
                globalStyles.text,
                { color: colors.text_plomo, marginStart: spacing.sm },
              ]}
            >
              Tardanzas
            </Text>
          </View>

          {/* Contenido Faltas */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <IconFlechaDanger />
            <Text style={[globalStyles.text, { color: colors.danger }]}>3</Text>
            <Text
              style={[
                globalStyles.text,
                { color: colors.text_plomo, marginStart: spacing.sm },
              ]}
            >
              Faltas
            </Text>
          </View>

          {/* Boton "Ver Detalle" */}
          <TouchableOpacity>
            <Text
              style={[
                globalStyles.text,
                { color: colors.text_plomo, marginStart: spacing.sm },
              ]}
            >
              Ver detalle
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Conversion de Descuento */}
      <View style={globalStyles.card}>
        {/* Head */}
        <Text style={globalStyles.subtitle}>Conversión de Descuento</Text>
        <Text
          style={[
            globalStyles.text,
            { color: colors.text_plomo, marginBottom: spacing.md },
          ]}
        >
          Último 30 días
        </Text>
        {/* Footer */}
        <View
          style={{
            marginVertical: spacing.sm,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Tardanza */}
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text style={[globalStyles.title, { color: colors.warning }]}>
              3
            </Text>
            <Text
              style={[
                globalStyles.text,
                { color: colors.text_plomo, marginStart: spacing.sm },
              ]}
            >
              Tardanzas
            </Text>
          </View>

          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text style={[globalStyles.subtitle, { color: colors.text_plomo }]}>
              =/
            </Text>
          </View>
          {/* Conversion */}
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text style={[globalStyles.title, { color: colors.warning }]}>
              2
            </Text>
            <Text
              style={[
                globalStyles.text,
                { color: colors.text_plomo, marginStart: spacing.sm },
              ]}
            >
              Conversión
            </Text>
          </View>

          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text style={[globalStyles.subtitle, { color: colors.text_plomo }]}>
              +
            </Text>
          </View>
          {/* Falta */}
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text style={[globalStyles.title, { color: colors.danger }]}>
              2
            </Text>
            <Text
              style={[
                globalStyles.text,
                { color: colors.text_plomo, marginStart: spacing.sm },
              ]}
            >
              Faltas
            </Text>
          </View>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text style={[globalStyles.subtitle, { color: colors.text_plomo }]}>
              =
            </Text>
          </View>
          {/* Días */}
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text style={[globalStyles.title, { color: colors.danger }]}>
              2
            </Text>
            <Text
              style={[
                globalStyles.text,
                { color: colors.text_plomo, marginStart: spacing.sm },
              ]}
            >
              Días
            </Text>
          </View>
        </View>
      </View>

      {/* Última Asistencia */}
      <View style={globalStyles.card}>
        <View>
          <Text style={globalStyles.subtitle}>Última Asistencia</Text>
        </View>
        {/* Tabla */}
        <View style={[globalStyles.table, { marginTop: spacing.sm }]}>
          {/* Header */}
          <View style={globalStyles.tableHeader}>
            <Text style={[globalStyles.headerCell, globalStyles.col1]}>
              Fecha
            </Text>
            <Text style={[globalStyles.headerCell, globalStyles.col2]}>
              Día
            </Text>
            <Text style={[globalStyles.headerCell, globalStyles.col3]}>
              Entrada
            </Text>
            <Text style={[globalStyles.headerCell, globalStyles.col4]}>
              Salida
            </Text>
            <Text style={[globalStyles.headerCell, globalStyles.col5]}>
              Estado
            </Text>
          </View>

          {/* Rows */}
          <ScrollView>
            {dataGrafico.map((item) => (
              <View key={item.id} style={globalStyles.tableBody}>
                <Text style={[globalStyles.bodyCell, globalStyles.col1]}>
                  {item.fecha}
                </Text>
                <Text style={[globalStyles.bodyCell, globalStyles.col2]}>
                  {item.dia}
                </Text>
                <Text style={[globalStyles.bodyCell, globalStyles.col3]}>
                  {item.entrada}
                </Text>
                <Text style={[globalStyles.bodyCell, globalStyles.col4]}>
                  {item.salida}
                </Text>
                <Text
                  style={[
                    globalStyles.bodyCell,
                    globalStyles.col5,
                    {
                      fontWeight: "600",
                      color:
                        item.estado === "Puntual"
                          ? colors.secondary
                          : item.estado === "Falta"
                          ? colors.danger
                          : colors.warning,
                    },
                  ]}
                >
                  {item.estado}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}
