const activarAgente = (token, nombre, numero) => {
  const url = "https://billapp-57e4b0e7460c.herokuapp.com/api/agent";

  const data = {
    comercialName: nombre,
    contactNumber: numero,
    ruc: "454646461",
    address: "Sin direccion",
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Respuesta de la API:", data);
    })
    .catch((error) => {
      console.error("Error al hacer la solicitud:", error);
    });
};
export default activarAgente;
