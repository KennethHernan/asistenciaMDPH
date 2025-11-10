import { StyleSheet } from "react-native";

export const colors = {
  primary: "#0F60FF",
  primary2: "#C3D8FF",
  secondary: "#1EB564",
  secondary2: "#28C76F",
  danger: "#FF0000",
  warning: "#FFC600",
  faltaJDisable: "#28c76f96",
  faltaIDisable: "#ff000054",
  background: "#FAFAFA",
  text_plomo: "#8B909A",
  text_dark: "#23272E",
  white: "#FFFFFF",
  black: "#000000",
  gray: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    500: "#6B7280",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  h1: {
    fontSize: 20,
    fontWeight: "700",
  },
  h2: {
    fontSize: 17,
    fontWeight: "600",
  },
  h3_5: {
    fontSize: 14,
    fontWeight: "400",
  },
  h3: {
    fontSize: 13,
    fontWeight: "400",
  },
  textHeaderTable: {
    fontSize: 13,
    fontWeight: "500",
  },
  textBodyTable: {
    fontSize: 13,
    fontWeight: "400",
  },
  body: {
    fontSize: 16,
    fontWeight: "400",
  },
  caption: {
    fontSize: 14,
    fontWeight: "400",
  },
};

export const globalStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  loader: {
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
  header: {
    padding: spacing.sm,
    marginTop: spacing.md,
    marginHorizontal: spacing.sm,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 99,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: "hidden",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.sm,
    marginHorizontal: spacing.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  button: {
    borderRadius: 12,
    paddingHorizontal: spacing.lg,
    paddingVertical: 13,
    marginTop: spacing.md,
    display: "flex",
    flexDirection: "row",
    gap: spacing.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  buttonPrimary2: {
    backgroundColor: colors.primary2,
  },
  buttonDanger: {
    backgroundColor: colors.danger,
  },
  buttonWarning: {
    backgroundColor: colors.secondary2,
  },
  buttonFaltaJustificada: {
    backgroundColor: colors.secondary2,
  },
  buttonFaltaInjustificada: {
    backgroundColor: colors.danger,
  },
  buttonFaltaJustificadaDisable: {
    backgroundColor: colors.faltaJDisable,
  },
  buttonFaltaInjustificadaDisable: {
    backgroundColor: colors.faltaIDisable,
  },
  buttonText: {
    ...typography.h3_5,
    color: colors.white,
  },
  title: {
    ...typography.h1,
    color: colors.text_dark,
  },
  subtitle: {
    ...typography.h2,
    color: colors.text_dark,
  },
  text: {
    ...typography.h3,
  },
  table: {
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  headerCell: {
    color: colors.text_dark,
    ...typography.textHeaderTable,
  },
  bodyCell: {
    color: colors.text_plomo,
    ...typography.textBodyTable,
  },
  tableBody: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 8,
    ...typography.textBodyTable,
  },

  col1: {
    flex: 2,
    textAlign: "center",
  },
  col2: {
    flex: 2,
    textAlign: "center",
  },
  col3: {
    flex: 2,
    textAlign: "center",
  },
  col4: {
    flex: 2,
    textAlign: "center",
  },
  col5: {
    flex: 1,
    textAlign: "center",
  },
});
