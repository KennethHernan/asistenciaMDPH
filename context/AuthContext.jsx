import Loanding from "@/components/loanding";
import { auth, db } from "@/firebase/firebaseConfig";
import { capturarDia, capturarFecha, capturarMes } from "@/service/fechaHoy";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { differenceInCalendarDays, getDaysInMonth } from "date-fns";
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
  const [salidaDisable, setSalida] = useState(true);
  const [newDia, setNewdia] = useState(false);
  const [asisteniciasAll, setAsistencias] = useState(false);
  const [Autentication, setAutentication] = useState(false);
  const [Registrado, setRegistrado] = useState(false);
  const [fechaHoy, setFechaHoy] = useState("");
  const [mes, setMes] = useState("");
  const [horaLimite, setHoraLimite] = useState("08:45:00 a. m.");
  const [textoTiempo, setTextoTiempo] = useState("");
  const [conteo, setConteo] = useState({
    puntual: 0,
    tardanza: 0,
    falta: 0,
  });

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
      setSalida(true);
      const asistencia = {
        asistenciaId: "",
        entrada: false,
        salida: true,
        autentication: true,
        fecha: fechaHoy,
      };
      await AsyncStorage.setItem("asistencia", JSON.stringify(asistencia));
      return;
    } catch (error) {
      return error;
    }
  };

  const createNewAsistencia = async () => {
    console.log("salidaDisable:", salidaDisable);
    if (entradaDisable) return;
    console.log("HOLA");
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
      setSalida(false);
      setLoandingBtnEntrada(false);
      obtenerlistaAsistencias();
      return;
    } catch (error) {
      setLoandingBtnEntrada(false);
      console.error("Error al crear la asistencia:", error);
      throw error;
    }
  };

  const registrarSalida = async () => {
    if (!entradaDisable) return;

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
      obtenerlistaAsistencias();
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

        setAutentication(asistencia.autentication);
        setEntrada(asistencia.entrada);
        setSalida(asistencia.salida);
      }
    } catch (error) {
      console.error("Error al capturar asistencia:", error);
    }
  }

  // Compara fecha actual
  const compararFecha = () => {
    const hoy = new Date();
    if (asisteniciasAll.length > 0) {
      const ultima = asisteniciasAll.reduce((a, b) =>
        new Date(a.horaEntrada) > new Date(b.horaEntrada) ? a : b
      );

      const fechaAsistencia = new Date(ultima.horaEntrada);

      const diff = differenceInCalendarDays(hoy, fechaAsistencia);
      if (diff === 0) setTextoTiempo("hoy");
      else if (diff === 1) setTextoTiempo("hace 1 día");
      else if (diff === 2) setTextoTiempo("hace 2 días");
      else setTextoTiempo(`hace ${diff} días`);
      console.log("Date");
    }
    setLoandingMain(false);
  };

  // Grafico Evalución
  const generarDatosAsistencia = () => {
    const hoy = new Date();
    const diasMes = getDaysInMonth(hoy);
    const labels = Array.from({ length: diasMes }, (_, i) =>
      (i + 1).toString()
    );

    const dataPorDia = Array(diasMes).fill(0);

    asisteniciasAll.forEach((item) => {
      if (
        !item.horaEntrada ||
        item.horaEntrada === null ||
        item.horaEntrada === ""
      ) {
        // Falta
        const dia = new Date(item.fecha).getDate() - 1;
        dataPorDia[dia] = 1;
        return;
      }

      const fecha = new Date(item.horaEntrada);
      const dia = fecha.getDate() - 1;

      const horaEntrada = fecha.toLocaleTimeString("es-PE", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      // Clasificar
      if (horaEntrada <= horaLimite) {
        dataPorDia[dia] = 5; // puntual
      } else {
        dataPorDia[dia] = 3; // tardanza
      }
    });

    return {
      labels,
      datasets: [
        {
          data: dataPorDia,
          color: (opacity = 1) => `rgba(52, 199, 89, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    };
  };

  useEffect(() => {
    if (asisteniciasAll.length > 0) {
      const resultados = asisteniciasAll.reduce(
        (acc, item) => {
          if (
            !item.horaEntrada ||
            item.horaEntrada === null ||
            item.horaEntrada === ""
          ) {
            acc.falta++;
            return acc;
          }

          const horaEntrada = new Date(item.horaEntrada).toLocaleTimeString(
            "es-PE",
            {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }
          );

          if (horaEntrada <= horaLimite) {
            acc.puntual++;
          } else {
            acc.tardanza++;
          }

          return acc;
        },
        { puntual: 0, tardanza: 0, falta: 0 }
      );

      setConteo(resultados);
    }
  }, [asisteniciasAll]);

  useEffect(() => {
    setLoandingMain(true);
    const fecha = capturarFecha();
    const mesActual = capturarMes();
    setMes(mesActual);
    setFechaHoy(fecha);
    capturarAsistencia();
    obtenerlistaAsistencias();
    compararFecha();
    console.log("holaz");
    
  }, []);

  const value = {
    textoTiempo,
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
    conteo,
    crearUser,
    iniciarSesion,
    createNewAsistencia,
    obtenerlistaAsistencias,
    registrarSalida,
    cerrarSesion,
    compararFecha,
    generarDatosAsistencia,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}

      {loandingMain && <Loanding />}
    </AuthContext.Provider>
  );
};
