const enviarDineroPropia = (token, monto, id) => {
  const url = "https://billapp-57e4b0e7460c.herokuapp.com/api/agent/recharge";

  const bodyData = {
    rechargedUserID: id,
    amount: parseInt(monto),
  };

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta de la API:", data);
        resolve(data);
      })
      .catch((error) => {
        console.error("Error al hacer la solicitud:", error);
        reject(error);
      });
  });
};

export default enviarDineroPropia;
