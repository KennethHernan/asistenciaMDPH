import { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import IconLoanding from "../assets/icons/icon_loanding.svg";
import IconTickets from "../assets/icons/icon_tickets.svg";
import { useAuth } from "../context/AuthContext";
import { colors, globalStyles, spacing } from "../styles/globalStyles";

export default function AsistenciaScreen() {
  const {
    createNewAsistencia,
    loanding,
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
      <View style={globalStyles.header}>
        <View>
          <Text style={globalStyles.title}>Marcación Asistencia</Text>
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

        {/* Marcar asistencia */}
        <TouchableOpacity
          disabled={loanding || entrada}
          onPress={() => createNewAsistencia()}
          style={[
            globalStyles.button,
            entrada ? globalStyles.buttonPrimary2 : globalStyles.buttonPrimary,
          ]}
          activeOpacity={0.8}
        >
          {!loanding ? (
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
          disabled={loanding || salida}
          onPress={() => registrarSalida()}
          style={[
            globalStyles.button,
            salida ? globalStyles.buttonPrimary2 : globalStyles.buttonPrimary,
            { marginBottom: spacing.sm },
          ]}
          activeOpacity={0.8}
        >
          {!loanding ? (
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
    </ScrollView>
  );
}
