const fechaActual = new Date();

const dias = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];
const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Setiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export const capturarFecha = () => {
  const diaSemana = dias[fechaActual.getDay()];
  const diaNumero = fechaActual.getDate();
  const mes = meses[fechaActual.getMonth()];
  const anio = fechaActual.getFullYear();
  const fechaFormateada = `${diaSemana} ${diaNumero} de ${mes} del ${anio}`;

  return fechaFormateada;
};

export const capturarMes = () => {
  const mes = meses[fechaActual.getMonth()];
  return mes;
};

export const capturarDia = () => {
  const dia = dias[fechaActual.getDay()];
  return dia;
};
