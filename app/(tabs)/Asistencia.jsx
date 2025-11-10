import IconLoanding from "@/assets/icons/icon_loanding.svg";
import IconTickets from "@/assets/icons/icon_tickets.svg";
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
  View
} from "react-native";

export default function AsistenciaScreen() {
  const {
    createNewAsistencia,
    loandingBtnEntrada,
    loandingBtnSalida,
    entrada,
    salida,
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
          disabled={loandingBtnEntrada || entrada}
          onPress={() => createNewAsistencia()}
          style={[
            globalStyles.button,
            entrada ? globalStyles.buttonPrimary2 : globalStyles.buttonPrimary,
          ]}
          activeOpacity={0.8}
        >
          {!loandingBtnEntrada ? (
            <>
              <IconTickets />
              <Text style={globalStyles.buttonText}>Marcar Entrada</Text>
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
          disabled={loandingBtnSalida || salida}
          onPress={() => registrarSalida()}
          style={[
            globalStyles.button,
            salida ? globalStyles.buttonPrimary2 : globalStyles.buttonPrimary,
            { marginBottom: spacing.sm },
          ]}
          activeOpacity={0.8}
        >
          {!loandingBtnSalida ? (
            <>
              <IconTickets />
              <Text style={globalStyles.buttonText}>Marcar Salida</Text>
            </>
          ) : (
            <Animated.View
              style={{ transform: [{ rotate: spin }], marginVertical: 6 }}
            >
              <IconLoanding style={globalStyles.loading} />
            </Animated.View>
          )}
        </TouchableOpacity>
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
          disabled={entrada}
          style={[
            globalStyles.button,
            entrada
              ? globalStyles.buttonFaltaJustificadaDisable
              : globalStyles.buttonFaltaJustificada,
          ]}
          activeOpacity={0.8}
        >
          <IconTickets />
          <Text style={globalStyles.buttonText}>Marcar Falta Justificada</Text>
        </TouchableOpacity>
        {/* Marcar Falta Injustificada */}
        <TouchableOpacity
          disabled={entrada}
          style={[
            globalStyles.button,
            entrada
              ? globalStyles.buttonFaltaInjustificadaDisable
              : globalStyles.buttonFaltaInjustificada,
            { marginBottom: spacing.sm },
          ]}
          activeOpacity={0.8}
        >
          <IconTickets />
          <Text style={globalStyles.buttonText}>
            Marcar Falta Injustificada
          </Text>
        </TouchableOpacity>
      </View>

      {/* Última Asistencia */}
      <ComponeteAsistencia />
    </ScrollView>
  );
}
