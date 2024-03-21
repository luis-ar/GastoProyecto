const recuperarNumeros = async (telefono, token) => {
  const apiUrl = "https://billapp-57e4b0e7460c.herokuapp.com/api/user/search/";

  // Construye la URL completa
  const url = apiUrl + telefono;

  // Retorna una nueva promesa
  return new Promise((resolve, reject) => {
    // Realiza la solicitud HTTP
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          //   throw new Error("Error en la solicitud HTTP: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        // Maneja la respuesta de la API
        // console.log("Respuesta de la API:", data);
        resolve(data); // Resuelve la promesa con el valor data
      })
      .catch((error) => {
        // Maneja los errores de la solicitud
        console.error("Error de la solicitud:", error.message);
        reject(error); // Rechaza la promesa con el error
      });
  });
};

export default recuperarNumeros;
