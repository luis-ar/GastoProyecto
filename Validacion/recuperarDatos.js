const recuperarDatos = (userId, token) => {
  const apiUrl = "https://billapp-57e4b0e7460c.herokuapp.com/api/user/";

  const url = apiUrl + userId;

  return new Promise((resolve, reject) => {
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
        // console.log("Datos obtenidos:", data);
        resolve(data); // Resuelve la promesa con el valor data
      })
      .catch((error) => {
        console.error("Error de la solicitud:", error.message);
        reject(error);
      });
  });
};
export default recuperarDatos;
