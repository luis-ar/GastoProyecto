const transferirDineroYape = (id, monto, token) => {
  const apiUrl = "https://billapp-57e4b0e7460c.herokuapp.com/api/wallet/send";
  // Datos del cuerpo (body) de la solicitud
  const requestBody = {
    depositUserID: id,
    amount: parseInt(monto),
  };
  return new Promise((resolve, reject) => {
    fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error en la solicitud HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // console.log("Respuesta del servidor:", data);
        resolve(data); // Resuelve la promesa con el valor data
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error.message);
        reject(error); // Rechaza la promesa con el error
      });
  });
};

export default transferirDineroYape;
