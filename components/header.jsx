import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { colors, globalStyles, spacing } from "../styles/globalStyles";

export default function Header({ title }) {
  const { mes, cerrarSesion } = useAuth();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setModal(false);
  }, []);

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
      <TouchableOpacity
        onPress={() => setModal(true)}
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
      </TouchableOpacity>
      {modal && (
        <>
          <TouchableOpacity
            onPress={() => setModal(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999,
            }}
            activeOpacity={1}
          />

          {/* Menú */}
          <View
            style={{
              width: 150,
              padding: 15,
              height: "auto",
              borderRadius: 10,
              backgroundColor: "#ffffff",
              position: "absolute",
              bottom: -75,
              gap: 15,
              right: 2,
              shadowColor: "#000",
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.08,
              shadowRadius: 10,
              elevation: 10,
              zIndex: 1000,
            }}
          >
            <Text
              onPress={() => {
                cerrarSesion();
                setModal(false);
              }}
              style={[globalStyles.text, { fontWeight: "600" }]}
            >
              Cerrar Sesión
            </Text>
            <Text
              onPress={() => {
                setModal(false);
              }}
              style={[globalStyles.text, { fontWeight: "600" }]}
            >
              Perfil
            </Text>
          </View>
        </>
      )}
    </View>
  );
}
