import Loanding from "@/components/loanding";
import { auth, db } from "@/firebase/firebaseConfig";
import { capturarDia, capturarFecha, capturarMes } from "@/service/fechaHoy";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { child, get, ref, set, update } from "firebase/database";
import { createContext, useContext, useEffect, useState } from "react";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [loandingBtnEntrada, setLoandingBtnEntrada] = useState(false);
  const [loandingBtnSalida, setLoandingBtnSalida] = useState(false);
  const [loandingBtnFaltaJ, setLoandingBtnFaltaJ] = useState(false);
  const [loandingBtnFaltaI, setLoandingBtnFaltaI] = useState(false);
  const [loandingMain, setLoandingMain] = useState(true);
  const [entradaDisable, setEntrada] = useState(false);
  const [salidaDisable, setSalida] = useState(false);
  const [newDia, setNewdia] = useState(false);
  const [asisteniciasAll, setAsistencias] = useState(false);
  const [Autentication, setAutentication] = useState(false);
  const [Registrado, setRegistrado] = useState(false);
  const [fechaHoy, setFechaHoy] = useState("");
  const [mes, setMes] = useState("");
  const [horaLimite, setHoraLimite] = useState("08:45:00 a. m.");

  const crearUser = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setUser(user);
      setRegistrado(true);
      return;
    } catch (error) {
      return error;
    }
  };

  const cerrarSesion = async () => {
    await signOut(auth);
    //cambiarAutenticacionStorage(false);
    setAutentication(false);
    await AsyncStorage.removeItem("asistencia");
    setSalida(false);
    setEntrada(false);
  };

  const iniciarSesion = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setAutentication(true);
      setSalida(true)
      const asistencia = {
        asistenciaId: "",
        entrada: false,
        salida: false,
        autentication: true,
        fecha: fechaHoy,
      };
      await AsyncStorage.setItem("asistencia", JSON.stringify(asistencia));
      return;
    } catch (error) {
      console.log("erorr:",error);
      
      return error;
    }
  };

  const createNewAsistencia = async () => {
    if (salida) return;
    setLoandingBtnEntrada(true);
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
      cambiarStorage(asistenId, true, false, true, fechaHoy);
      setEntrada(true);
      setLoandingBtnEntrada(false);
      return;
    } catch (error) {
      setLoandingBtnEntrada(false);
      console.error("Error al crear la asistencia:", error);
      throw error;
    }
  };

  const registrarSalida = async () => {
    if (!entrada) return;

    setLoandingBtnSalida(true);

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
      setLoandingBtnSalida(false);
    } catch (error) {
      setLoandingBtnSalida(false);
      console.error("Error al crear la asistencia:", error);
      throw error;
    }
  };

  const cambiarStorage = async (
    asistenId,
    entrada,
    salida,
    autentication,
    fechaHoy
  ) => {
    try {
      const data = await AsyncStorage.getItem("asistencia");

      if (data) {
        const asistencia = JSON.parse(data);
        asistencia.asistenciaId = asistenId;
        asistencia.entrada = entrada;
        asistencia.salida = salida;
        asistencia.autentication = autentication;
        asistencia.fecha = fechaHoy;
        await AsyncStorage.setItem("asistencia", JSON.stringify(asistencia));
      }
    } catch (error) {
      console.error("Error al modificar estado Autentication:", error);
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
          // Nuevo Día
          asistencia.entrada = false;
          asistencia.salida = false;
          asistencia.fechaHoy = fechaHoy;
          await AsyncStorage.setItem("asistencia", JSON.stringify(asistencia));
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
        if (asistencia.autentication) {
          setAutentication(true);
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
    Autentication,
    Registrado,
    entradaDisable,
    salidaDisable,
    fechaHoy,
    loandingBtnEntrada,
    loandingBtnFaltaI,
    loandingBtnFaltaJ,
    loandingBtnSalida,
    loandingMain,
    mes,
    user,
    horaLimite,
    asisteniciasAll,
    crearUser,
    iniciarSesion,
    createNewAsistencia,
    obtenerlistaAsistencias,
    registrarSalida,
    cerrarSesion,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}

      {loandingMain && <Loanding />}
    </AuthContext.Provider>
  );
};
