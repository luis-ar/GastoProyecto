const recuperarDatosUsuario = (token) => {
  const url = "https://billapp-57e4b0e7460c.herokuapp.com/api/user/me";

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Respuesta de la API:", data);
        resolve(data);
      })
      .catch((error) => {
        // console.error("Error al hacer la solicitud:", error);
        reject(error);
      });
  });
};

export default recuperarDatosUsuario;
