import { useAuth } from "@/context/AuthContext";
import { globalStyles } from "@/styles/globalStyles";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const { Registrado, crearUser } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorContraseña, setErrorContraseña] = useState("");

  useEffect(() => {
    if (Registrado) {
      router.replace("/Login/Login");
    }
  }, [Registrado]);

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor ingresa tu correo y contraseña.");
      return;
    }

    const result = await crearUser(email, password);
    switch (result.code) {
      case "auth/email-already-in-use":
        console.log("hola");
        setErrorEmail(true);
        return setError("El correo electrónico ingresado ya está en uso.");
      case "auth/invalid-email":
        setErrorEmail(true);
        return setError("El correo electrónico no es válido.");
      case "auth/weak-password":
        setErrorContraseña(true);
        return setError(
          "La contraseña es muy débil. Usa al menos 6 caracteres."
        );
      default:
        setErrorEmail(true);
        setErrorContraseña(true);
        return setError("Ocurrió un error al registrar el usuario.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Cuenta</Text>

      <TextInput
        style={[
          globalStyles.input,
          errorEmail ? globalStyles.inputError : "",
        ]}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        borer
      />
      <TextInput
        style={[
          globalStyles.input,
          errorContraseña ? globalStyles.inputError : "",
        ]}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        disabled={loading}
        onPress={() => handleRegister()}
        style={[
          globalStyles.buttonlogin,
          loading ? globalStyles.buttonPrimary2 : globalStyles.buttonPrimary,
          { marginBottom: 10 },
        ]}
        activeOpacity={0.8}
      >
        <Text style={[globalStyles.buttonText, { fontWeight: "500" }]}>
          Registrar
        </Text>
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Text
        style={styles.registerText}
        onPress={() => router.push("/Login/Login")}
      >
        ¿Si tienes cuenta? Inicia sesión aquí
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "semibold",
    textAlign: "center",
    marginBottom: 20,
  },
  registerText: {
    textAlign: "center",
    color: "#222",
    marginTop: 10,
  },
  errorText: {
    fontSize: 12,
    textAlign: "center",
    color: "red",
    marginTop: 3,
  },
});
