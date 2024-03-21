const crearToken = async () => {
  let token;
  const data = {
    email: "remate@gmail.com",
    password: "150185",
  };
  try {
    const response = await fetch(
      "https://billapp-57e4b0e7460c.herokuapp.com/api/user/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      token = responseData.data.accessToken;
    } else {
      console.error(
        "Error al enviar los datos:",
        response.status,
        response.statusText
      );

      // Imprimir más detalles sobre la respuesta
      const responseBody = await response.json();

      // Acceder al valor de la propiedad 'data'
      if (responseBody && responseBody.data) {
        console.log(responseBody.data);
        guardarError(responseBody.data);
        setTimeout(() => {
          guardarError("");
        }, 2000);
      }
    }
  } catch (error) {
    console.error("Error al enviar los datos:", error);
  }
  return token;
};

const enviarDineroGeneralUsuario = async (monto, id) => {
  const apiUrl = "https://billapp-57e4b0e7460c.herokuapp.com/api/wallet/send";
  const token = await crearToken();

  const data = {
    depositUserID: id,
    amount: monto,
  };

  return new Promise((resolve, reject) => {
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        resolve(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        reject(error);
      });
  });
};
export default enviarDineroGeneralUsuario;
