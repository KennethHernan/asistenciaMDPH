import { useAuth } from "@/context/AuthContext";
import { globalStyles } from "@/styles/globalStyles";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

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
        
        return setErrorEmail("El correo electrónico ingresado ya está en uso.");
      case "auth/invalid-email":
        return setErrorEmail("El correo electrónico no es válido.");
      case "auth/weak-password":
        return setErrorContraseña("La contraseña es muy débil. Usa al menos 6 caracteres.");
      default:
        return setError("Ocurrió un error al registrar el usuario.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Cuenta</Text>

      <TextInput
        style={globalStyles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        backgroundColor={errorEmail && "#ff0000ff"}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button
        title={loading ? "Ingresando..." : "Entrar"}
        onPress={handleRegister}
      />
      {errorEmail || error && <Text style={styles.errorText}>{error}</Text>}
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
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  registerText: {
    textAlign: "center",
    color: "blue",
    marginTop: 15,
  },
  errorText: {
    fontSize: 12,
    textAlign: "center",
    color: "red",
    marginTop: 3,
  },
});
