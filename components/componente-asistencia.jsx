import { useAuth } from "@/context/AuthContext";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { colors, globalStyles } from "../styles/globalStyles";

export default function ComponeteAsistencia() {
  const { asisteniciasAll, horaLimite, textoTiempo, compararFecha } = useAuth();
  const [textoinfo, setTextoinfo] = useState("");

  const Tardanza = "◉ T";
  const Puntual = "◉ P";
  const Falta = "◉ F";

  useEffect(() => {
    compararFecha();
  }, []);

  return (
    <View style={globalStyles.card}>
      <View style={globalStyles.flex}>
        <Text style={globalStyles.subtitle}>Última Asistencia</Text>
        <Text style={globalStyles.textInfo}>◉ {textoTiempo}</Text>
      </View>
      {/* Tabla */}
      <View style={globalStyles.table}>
        {/* Header */}
        <View style={globalStyles.tableHeader}>
          <Text style={[globalStyles.headerCell, globalStyles.col1]}>
            Fecha
          </Text>
          <Text style={[globalStyles.headerCell, globalStyles.col2]}>Día</Text>
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

        {/* Rows 1 */}
        <ScrollView>
          {asisteniciasAll.length > 0 ? (
            <>
              {[
                asisteniciasAll.reduce((a, b) =>
                  new Date(a.horaEntrada) > new Date(b.horaEntrada) ? a : b
                ),
              ].map((item) => (
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
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
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
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
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
    </View>
  );
}
