import { useAuth } from "@/context/AuthContext";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useEffect } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { colors, globalStyles, spacing } from "../styles/globalStyles";

export default function RegistroScreen() {
  const { asisteniciasAll, obtenerlistaAsistencias, mes, horaLimite } =
    useAuth();

  useEffect(() => {
    obtenerlistaAsistencias();
  }, [asisteniciasAll]);

  return (
    <ScrollView style={globalStyles.container}>
      {/* Header */}
      <View style={globalStyles.header}>
        <View>
          <Text style={globalStyles.title}>Registro de Asistencia</Text>
          <View style={{ flexDirection: "row", gap: spacing.sm }}>
            <Text style={[globalStyles.text, { fontWeight: "600" }]}>Mes:</Text>
            <Text style={globalStyles.text}>{mes}</Text>
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
        </View>
      </View>

      {/* Body */}
      <View style={globalStyles.card}>
        <View>
          <Text style={globalStyles.subtitle}>Registro</Text>
          <View style={{ flexDirection: "row", gap: spacing.sm }}>
            <Text
              style={[
                globalStyles.text,
                { color: colors.text_plomo, marginBottom: spacing.sm },
              ]}
            >
              Último 30 días
            </Text>
          </View>
        </View>
        {/* Tabla */}
        <View style={globalStyles.table}>
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
            {asisteniciasAll.length > 0 ? (
              <>
                {asisteniciasAll.map((item) => (
                  <View key={item.id} style={globalStyles.tableBody}>
                    {/* Fecha */}
                    <Text style={[globalStyles.bodyCell, globalStyles.col1]}>
                      {format(new Date(item.horaEntrada), "dd/MM/yyyy", {
                        locale: es,
                      })}
                    </Text>
                    {/* Dia */}
                    <Text style={[globalStyles.bodyCell, globalStyles.col2]}>
                      {item.dia}
                    </Text>
                    {/* Entrada */}
                    <Text style={[globalStyles.bodyCell, globalStyles.col3]}>
                      {new Date(item.horaEntrada).toLocaleTimeString("es-PE", {
                        hour12: true,
                      })}
                    </Text>
                    {/* Salida */}
                    <Text style={[globalStyles.bodyCell, globalStyles.col4]}>
                      {item.horaSalida
                        ? new Date(item.horaSalida).toLocaleTimeString(
                            "es-PE",
                            {
                              hour12: true,
                            }
                          )
                        : "—"}
                    </Text>
                    {/* Estado */}
                    <Text
                      style={[
                        globalStyles.bodyCell,
                        globalStyles.col5,
                        {
                          fontWeight: "600",
                          color:
                            new Date(item.horaEntrada).toLocaleTimeString(
                              "es-PE",
                              {
                                hour12: true,
                              }
                            ) < horaLimite
                              ? colors.secondary
                              : colors.warning,
                        },
                      ]}
                    >
                      {item.horaEntrada ? (
                        <>
                          {new Date(item.horaEntrada).toLocaleTimeString(
                            "es-PE",
                            {
                              hour12: true,
                            }
                          ) > horaLimite
                            ? "Tardanza"
                            : "Puntual"}
                        </>
                      ) : (
                        "Falta"
                      )}
                    </Text>
                  </View>
                ))}
              </>
            ) : (
              <Text style={[globalStyles.bodyCell]}>
                No tienes registro de asistencias
              </Text>
            )}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}
