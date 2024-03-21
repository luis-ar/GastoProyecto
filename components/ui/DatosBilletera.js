import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { formatearFecha } from "@/Validacion/convertirUsuarioBilletera";
const Contenedor = styled.div`
  padding: 0 20px;
  padding-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);
  margin-bottom: 13px;
  .datosPersonales {
    display: flex;
    flex-direction: column;
  }
`;
const DatosBilletera = ({ historial }) => {
  const { DepositUser, Operation, amount, createdAt } = historial;
  const { names, phone, lastname } = DepositUser;
  const { extra } = Operation;
  const { symbol, description } = extra;
  const monto = symbol + amount;
  const formatearPresupuesto = (cantidad) => {
    return cantidad.toLocaleString("es-PE", {
      style: "currency",
      currency: "PEN",
    });
  };
  const fechaOriginal = new Date(createdAt);
  const fechaFormateada = formatearFecha(fechaOriginal);
  return (
    <Contenedor>
      <div className="datosPersonales">
        <span className="nombre">{names}</span>
        <span>{fechaFormateada}</span>
      </div>
      <div className="cantidad">
        {symbol === "-" ? (
          <p style={{ color: "#FE4141" }}>
            {formatearPresupuesto(parseInt(monto))}
          </p>
        ) : (
          <p>{formatearPresupuesto(parseInt(monto))}</p>
        )}
      </div>
    </Contenedor>
  );
};

export default DatosBilletera;
