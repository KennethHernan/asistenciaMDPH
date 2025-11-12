import IconLoanding from "@/assets/icons/icon_loanding.svg";
import ComponeteAsistencia from "@/components/componente-asistencia";
import Header from "@/components/header";
import { useAuth } from "@/context/AuthContext";
import { colors, globalStyles, spacing } from "@/styles/globalStyles";
import { useEffect, useRef } from "react";
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AsistenciaScreen() {
  const {
    createNewAsistencia,
    loandingBtnEntrada,
    loandingBtnSalida,
    entradaDisable,
    salidaDisable,
    registrarSalida,
    fechaHoy,
    mes,
  } = useAuth();
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 2,
        duration: 5000,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <ScrollView style={globalStyles.container}>
      {/* Header */}
      <Header title="Marcación Asistencia" />

      {/* Marcacion Asistencia */}
      <View style={globalStyles.card}>
        <Text style={globalStyles.subtitle}>Marcar Asistencia</Text>
        <Text
          style={[
            globalStyles.text,
            { color: colors.text_plomo, marginBottom: spacing.sm },
          ]}
        >
          Hoy {fechaHoy}
        </Text>

        {/* Marcar Entrada */}
        <TouchableOpacity
          disabled={loandingBtnEntrada || entradaDisable}
          onPress={() => createNewAsistencia()}
          style={[
            globalStyles.button,
            entradaDisable ? globalStyles.buttonPrimary2 : globalStyles.buttonPrimary,
          ]}
          activeOpacity={0.8}
        >
          {!loandingBtnEntrada ? (
            <>
              <Text style={globalStyles.buttonText}>Marcar entrada</Text>
            </>
          ) : (
            <Animated.View
              style={{ transform: [{ rotate: spin }], marginVertical: 6 }}
            >
              <IconLoanding style={globalStyles.loading} />
            </Animated.View>
          )}
        </TouchableOpacity>

        {/* Marcar Salida */}
        <TouchableOpacity
          disabled={loandingBtnSalida || !salidaDisable}
          onPress={() => registrarSalida()}
          style={[
            globalStyles.button,
            salidaDisable ? globalStyles.buttonPrimary2 : globalStyles.buttonPrimary,
            { marginBottom: spacing.sm },
          ]}
          activeOpacity={0.8}
        >
          {!loandingBtnSalida ? (
            <>
              <Text style={globalStyles.buttonText}>Marcar salida</Text>
            </>
          ) : (
            <Animated.View
              style={{ transform: [{ rotate: spin }], marginVertical: 6 }}
            >
              <IconLoanding style={globalStyles.loading} />
            </Animated.View>
          )}
        </TouchableOpacity>
        <Text style={globalStyles.textInfo}>
          Al no marcar la entrada hasta las 09:00 am, automaticamente se
          regitrará como Falta Injustificada.
        </Text>
      </View>

      {/* Marcacion Falta */}
      <View style={globalStyles.card}>
        <Text style={globalStyles.subtitle}>Marcar Falta</Text>
        <Text
          style={[
            globalStyles.text,
            { color: colors.text_plomo, marginBottom: spacing.sm },
          ]}
        >
          Hoy {fechaHoy}
        </Text>

        {/* Marcación Falta*/}
        <TouchableOpacity
          disabled={entradaDisable}
          style={[
            globalStyles.button2,
            entradaDisable
              ? globalStyles.buttonFaltaJustificadaDisable
              : globalStyles.buttonFaltaJustificada,
          ]}
          activeOpacity={0.8}
        >
          <Text
            style={[globalStyles.buttonText2, { color: colors.secondary2 }]}
          >
            Marcar falta justificada
          </Text>
        </TouchableOpacity>
        {/* Marcar Falta Injustificada */}
        <TouchableOpacity
          disabled={entradaDisable}
          style={[
            globalStyles.button2,
            entradaDisable
              ? globalStyles.buttonFaltaInjustificadaDisable
              : globalStyles.buttonFaltaInjustificada,
            { marginBottom: spacing.sm },
          ]}
          activeOpacity={0.8}
        >
          <Text style={[globalStyles.buttonText2, { color: colors.danger }]}>
            Marcar falta injustificada
          </Text>
        </TouchableOpacity>
        <Text style={globalStyles.textInfo}>
          Cada Falta Injustificada es 1 día de descuento. Y faltas
          consecutivamente afectara su estabilidad en el trabajo.
        </Text>
      </View>

      {/* Última Asistencia */}
      <ComponeteAsistencia />
    </ScrollView>
  );
}
