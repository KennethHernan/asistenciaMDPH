import { useAuth } from "@/context/AuthContext";
import { globalStyles } from "@/styles/globalStyles";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
export default function LoginScreen() {
  const { iniciarSesion, Autentication } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorContraseña, setErrorContraseña] = useState("");

  useEffect(() => {
    if (Autentication) {
      router.replace("/(tabs)/Asistencia");
    }
  }, [Autentication]);

  const handleLogin = async () => {
    setErrorEmail(false);
    setErrorContraseña(false);
    setError("");
    if (!email || !password) {
      setErrorEmail(true);
      setErrorContraseña(true);
      Alert.alert("Error", "Por favor ingresa tu correo y contraseña.");
      return;
    }
    setLoading(true);

    const response = await iniciarSesion(email, password);
    if (!response.code) return;
    switch (response.code) {
      case "auth/invalid-email":
        setErrorEmail(true);
        setLoading(false);
        return setError("El formato del correo es inválido.");
      case "auth/user-not-found":
        setErrorEmail(true);
        setLoading(false);
        return setError("No existe una cuenta con este correo.");
      case "auth/wrong-password":
        setErrorContraseña(true);
        setLoading(false);
        return setError("La contraseña es incorrecta.");
      case "auth/too-many-requests":
        return setError("Demasiados intentos fallidos. Intenta más tarde.");
      default:
        setErrorEmail(true);
        setErrorContraseña(true);
        setLoading(false);
        return setError("Ocurrió un error al Iniciar Sesión");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        style={[
          globalStyles.input,
          errorEmail && error ? globalStyles.inputError : "",
        ]}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={[
          globalStyles.input,
          errorContraseña && error ? globalStyles.inputError : "",
        ]}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button
        title={loading ? "Ingresando..." : "Entrar"}
        onPress={handleLogin}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Text
        style={styles.registerText}
        onPress={() => router.push("/Login/Register")}
      >
        ¿No tienes cuenta? Regístrate aquí
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
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  registerText: {
    textAlign: "center",
    color: "blue",
    marginTop: 10,
  },
  errorText: {
    fontSize: 12,
    textAlign: "center",
    color: "red",
    marginTop: 3,
  },
});
