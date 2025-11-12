import Icon_Asistencia from "@/assets/icons/icon_asistencia.svg";
import Icon_Asistencia_Active from "@/assets/icons/icon_asistencia_active.svg";
import Icon_Dashboard from "@/assets/icons/icon_dashboard.svg";
import Icon_Dashboard_Active from "@/assets/icons/icon_dashboard_active.svg";
import Icon_Registro from "@/assets/icons/icon_registro.svg";
import Icon_Registro_Active from "@/assets/icons/icon_registro_active.svg";
import { useAuth } from "@/context/AuthContext";
import { Redirect, Tabs } from "expo-router";

export default function RootLayout() {
  const { Autentication, loandingMain } = useAuth();
  if (loandingMain) return;

  if (!Autentication && !loandingMain) {
    return <Redirect href="/Login/Login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Barra superior visible
        tabBarShowLabel: false, // Ocultar etiquetas de las pestañas
        tabBarStyle: {
          backgroundColor: "#FAFAFA", // Color de fondo de la barra de pestañas
          borderTopColor: "#ffffffff", // Color del borde superior de la barra de pestañas
          height: 60,
          paddingTop: 8,
          paddingBottom: 8,
        },
      }}
    >
      {/* Pestaña DASHBOARD */}
      <Tabs.Screen
        name="Dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ focused }) =>
            focused ? <Icon_Dashboard_Active /> : <Icon_Dashboard />,
        }}
      />
      {/* Pestaña Asistencia */}
      <Tabs.Screen
        name="Asistencia"
        options={{
          title: "Asistencia",
          tabBarIcon: ({ focused }) =>
            focused ? <Icon_Asistencia_Active /> : <Icon_Asistencia />,
        }}
      />

      {/* Pestaña Registro */}
      <Tabs.Screen
        name="Registro"
        options={{
          title: "Registro",
          tabBarIcon: ({ focused }) =>
            focused ? <Icon_Registro_Active /> : <Icon_Registro />,
        }}
      />
    </Tabs>
  );
}
