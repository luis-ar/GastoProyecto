export const convertirUsuarioBilletera = (token) => {
  fetch("https://billapp-57e4b0e7460c.herokuapp.com/api/wallet", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      // Manejo de errores
      console.error(error);
    });
};

export const formatearFecha = (fecha) => {
  const hoy = new Date();
  const ayer = new Date(hoy);
  ayer.setDate(hoy.getDate() - 1);

  const esHoy = fecha.toDateString() === hoy.toDateString();
  const esAyer = fecha.toDateString() === ayer.toDateString();

  let fechaFormateada = "";

  if (esHoy) {
    fechaFormateada = "hoy";
  } else if (esAyer) {
    fechaFormateada = "ayer";
  } else {
    const nuevo = fecha.toLocaleDateString("es-PE", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    fechaFormateada = nuevo;
  }

  const horas = fecha.getHours();
  const minutos = fecha.getMinutes();

  const horaFormateada = `${horas}:${minutos < 10 ? "0" + minutos : minutos}`;

  return `${fechaFormateada} ${horaFormateada}`;
};
