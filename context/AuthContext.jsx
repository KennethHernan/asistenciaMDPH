import AsyncStorage from "@react-native-async-storage/async-storage";
import { child, get, ref, set, update } from "firebase/database";
import { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase/firebaseConfig";
import { capturarDia, capturarFecha, capturarMes } from "../service/fechaHoy";
const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loanding, setLoanding] = useState(false);
  const [loandingMain, setLoandingMain] = useState(true);
  const [entrada, setEntrada] = useState(false);
  const [salida, setSalida] = useState(false);
  const [newDia, setNewdia] = useState(false);
  const [asisteniciasAll, setAsistencias] = useState(false);
  const [fechaHoy, setFechaHoy] = useState("");
  const [mes, setMes] = useState("");
  const [horaLimite, setHoraLimite] = useState("08:45:00 a. m.");

  const createNewAsistencia = async () => {
    if (salida) return;
    setLoanding(true);
    try {
      const asistenId = uuidv4();
      const diaHoy = capturarDia();
      await set(ref(db, `asistencias/${asistenId}`), {
        asistenciaId: asistenId,
        nombre: "Kenneth",
        horaEntrada: { ".sv": "timestamp" },
        horaSalida: "",
        dia: diaHoy,
        fecha: fechaHoy,
      });
      const asistencia = {
        asistenciaId: asistenId,
        entrada: true,
        salida: false,
        fecha: fechaHoy,
      };
      await AsyncStorage.setItem("asistencia", JSON.stringify(asistencia));
      setEntrada(true);
      setLoanding(false);
      return;
    } catch (error) {
      setLoanding(false);
      console.error("Error al crear la asistencia:", error);
      throw error;
    }
  };

  const registrarSalida = async () => {
    if (!entrada) return;

    setLoanding(true);

    try {
      const data = await AsyncStorage.getItem("asistencia");

      if (data) {
        const asistencia = JSON.parse(data);
        await update(ref(db, `asistencias/${asistencia.asistenciaId}`), {
          horaSalida: { ".sv": "timestamp" },
        });

        asistencia.salida = true;
        await AsyncStorage.setItem("asistencia", JSON.stringify(asistencia));
      }
      setSalida(true);
      setLoanding(false);
    } catch (error) {
      setLoanding(false);
      console.error("Error al crear la asistencia:", error);
      throw error;
    }
  };

  const listAsistencias = async () => {
    try {
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, "asistencias"));

      if (!snapshot.exists()) return [];

      const data = snapshot.val();
      return Object.entries(data).map(([id, value]) => ({ id, ...value }));
    } catch (error) {
      console.error("Error al leer asistencias:", error);
      return [];
    }
  };

  const obtenerlistaAsistencias = async () => {
    try {
      const data = await listAsistencias();
      setAsistencias(data);
    } catch (error) {
      console.error("Error al cargar asistencias:", error);
    } finally {
      setLoandingMain(false);
    }
  };

  async function capturarAsistencia() {
    try {
      const data = await AsyncStorage.getItem("asistencia");
      const fecha = capturarFecha();
      if (data) {
        const asistencia = JSON.parse(data);

        if (asistencia.fecha !== fecha) {
          await AsyncStorage.removeItem("asistencia");
          setSalida(false);
          setEntrada(false);
          return;
        }
        if (asistencia.salida) {
          setSalida(true);
          setEntrada(true);
        } else if (asistencia.entrada) {
          setEntrada(true);
          setSalida(false);
        }
      }
    } catch (error) {
      console.error("Error al capturar asistencia:", error);
    }
  }

  useEffect(() => {
    setLoandingMain(true);
    const fecha = capturarFecha();
    const mesActual = capturarMes();
    setMes(mesActual);
    setFechaHoy(fecha);
    capturarAsistencia();
    obtenerlistaAsistencias();
  }, []);

  const value = {
    loanding,
    entrada,
    salida,
    fechaHoy,
    mes,
    horaLimite,
    asisteniciasAll,
    createNewAsistencia,
    obtenerlistaAsistencias,
    registrarSalida,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}

      {loandingMain && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#34C759" />
        </View>
      )}
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
});
