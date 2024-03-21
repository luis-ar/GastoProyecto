import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { formatearFecha } from "@/Validacion/convertirUsuarioBilletera";
import Link from "next/link";
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
const PanelNumero = ({ usuario, token, tipo }) => {
  const { names, phone, id } = usuario;
  return (
    <Link
      href={`/yapear/${id}?tipo=${tipo}&token=${token}`}
      style={{ color: "white" }}
    >
      <Contenedor>
        <div className="datosPersonales">
          <span className="nombre">{names}</span>
          <span className="nombre">{phone}</span>
        </div>
      </Contenedor>
    </Link>
  );
};

export default PanelNumero;
