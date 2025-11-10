import { useAuth } from "@/context/AuthContext";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { colors, globalStyles } from "../styles/globalStyles";

export default function TablaAsistencia() {
  const { asisteniciasAll, obtenerlistaAsistencias, horaLimite } = useAuth();
  const Tardanza = "◉";
  const Puntual = "◉";
  const Falta = "◉";

  useEffect(() => {
    obtenerlistaAsistencias();
  }, []);

  return (
    <View style={globalStyles.table}>
      {/* Header */}
      <View style={globalStyles.tableHeader}>
        <Text style={[globalStyles.headerCell, globalStyles.col1]}>Fecha</Text>
        <Text style={[globalStyles.headerCell, globalStyles.col2]}>Día</Text>
        <Text style={[globalStyles.headerCell, globalStyles.col3]}>
          Entrada
        </Text>
        <Text style={[globalStyles.headerCell, globalStyles.col4]}>Salida</Text>
        <Text style={[globalStyles.headerCell, globalStyles.col5]}>Estado</Text>
      </View>
      {/* Rows All */}
      <ScrollView>
        {asisteniciasAll.length > 0 ? (
          <>
            {[...asisteniciasAll]
              .sort((b, a) => new Date(a.horaEntrada) - new Date(b.horaEntrada))
              .map((item) => (
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
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </Text>
                  {/* Salida */}
                  <Text style={[globalStyles.bodyCell, globalStyles.col4]}>
                    {item.horaSalida
                      ? new Date(item.horaSalida).toLocaleTimeString("es-PE", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })
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
                          ? Tardanza
                          : Puntual}
                      </>
                    ) : (
                      Falta
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
  );
}
