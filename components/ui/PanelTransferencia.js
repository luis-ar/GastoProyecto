import React, { useContext, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { FirebaseContext } from "@/firebase";
import SliderBilletera from "./SliderBilletera";
import DatosBilletera from "./DatosBilletera";
import Link from "next/link";
import SpinnerHistorial from "./SpinnerHistorial";
import recuperarNumeros from "@/Validacion/recuperarNumeros";
import PanelNumero from "./PanelNumero";

const BuscarTelefono = styled.div`
  height: 8%;
  .contenedorTelefono {
    position: relative;
    padding: 0 20px;
    display: flex;
    align-items: center;
  }
  i {
    position: absolute;
    color: black;
    margin-left: 2px;
  }
  input {
    width: 100%;
    height: 35px;
    padding-left: 20px;
    padding-right: 5px;
    font-size: 12px;
    border-radius: 5px;
  }
`;
const MostrarError = styled.div`
  width: 300px;
  height: 505px;
  position: fixed;
  z-index: 200;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  span {
    color: red;
    margin-bottom: 10px;
    font-weight: bold;
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  a {
    background-color: black;
    color: white;
    padding: 10px 20px;
    border-radius: 10px;
  }
`;
const Contenedor = styled.div`
  background-color: var(--fondoBilletera);
  height: 500px;
  width: 300px;
  border-radius: 15px;
  .encabezado {
    padding: 10px;
    background-color: var(--botonesBilletera);
    height: 40px;
    width: 100%;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    display: flex;
    gap: 10px;
    align-items: center;
    a {
      color: white;
    }
    i {
      font-size: 30px;
      font-weight: bold;
    }
    p {
      font-weight: bold;
      font-size: 20px;
    }
    div {
      display: flex;
    }
  }
  .saldo {
    margin-top: 15px;
    width: 100%;
    height: 35px;
    padding: 0 20px;
    background-color: transparent;
    div {
      background-color: var(--botonesBilletera);
      height: 100%;
      border-radius: 5px;
      cursor: pointer;
    }
    .mostrarSaldo {
      padding-left: 10px;
      padding-right: 10px;
      div {
        display: flex;
        align-items: center;
        gap: 5px;
      }
      p,
      span {
        font-weight: bold;
        font-size: 14px;
      }
      img {
        width: 20px;
        height: 20px;
      }
      i {
        font-size: 20px;
      }
      .visualizarSaldo {
        display: flex;
        justify-content: space-between;
      }
    }
  }
`;
const PanelTransferencia = ({ token, tipo }) => {
  const { firebase, usuario } = useContext(FirebaseContext);
  const [datosUser, setDatos] = useState();
  const [mostrarSaldo, setMostrarSaldo] = useState(false);
  const [saldo, setSaldo] = useState(0);
  const [historiales, setHistoriales] = useState();
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState();
  const [numero, setNumero] = useState();
  const retornoSaldo = () => {
    if (mostrarSaldo) {
      setMostrarSaldo(false);
    } else {
      setMostrarSaldo(true);
    }
  };
  const formatearPresupuesto = (cantidad) => {
    return cantidad.toLocaleString("es-PE", {
      style: "currency",
      currency: "PEN",
    });
  };
  const cargarDatos = (e) => {
    setNumero(e.target.value);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://billapp-57e4b0e7460c.herokuapp.com.com/api/wallet",
  //         {
  //           method: "GET",
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       const data = await response.json();

  //       if (!response.ok) {
  //         throw new Error(data.message || "Error de servidor");
  //       }

  //       setHistoriales(data["data"]["WalletHistrial"]);
  //       setSaldo(data["data"]["cash"]);
  //       setLoading(false); // Marca como cargado
  //     } catch (error) {
  //       // console.error("Error al obtener datos:", error.message);
  //       if (error.message.length === 29) {
  //         setError(error.message);
  //         setLoading(false);
  //       }
  //       if (
  //         (error.message =
  //           "Cannot read properties of null (reading 'WalletHistrial')")
  //       ) {
  //         setLoading(false);
  //       }
  //     }
  //   };

  //   fetchData(); // Llama a la función asincrónica
  // }, [token]);

  useEffect(() => {
    const llamadaDatos = async () => {
      const datos = await recuperarNumeros(numero, token);
      // console.log(datos["error"]);
      // console.log("desde", datos["data"]);
      setDatos(datos["data"]);
      if (datos["error"]) {
        setError(datos["message"]);
      }
      setLoading(false); // Marca como cargado
    };
    llamadaDatos();
  }, [numero]);

  return (
    <div
      css={css`
        width: 100%;
        height: calc(90vh - 55px);
        display: flex;
        justify-content: center;
        align-items: center;
        @media (max-width: 1000px) {
          height: calc(90vh - 103px);
        }
      `}
    >
      <Contenedor>
        {error && (
          <MostrarError>
            <div>
              <span>{error}</span>
              <Link href="/billetera">Iniciar Sesión</Link>
            </div>
          </MostrarError>
        )}
        <div
          css={css`
            height: 10%;
          `}
        >
          <div className="encabezado">
            <div>
              <div>
                <Link href={`/usuarios/${token}`}>
                  <i class="bx bx-x"></i>
                </Link>
              </div>
              <div>{usuario && <p>Yapear</p>}</div>
            </div>
          </div>
        </div>
        <BuscarTelefono>
          <div className="contenedorTelefono">
            <i class="bx bx-search-alt bx-rotate-90"></i>
            <input
              type="text"
              placeholder="Ingrese el celular"
              value={numero}
              onChange={cargarDatos}
            />
          </div>
        </BuscarTelefono>

        <div
          css={css`
            height: 80%;
          `}
        >
          {loading && <SpinnerHistorial />}

          <ul
            css={css`
              height: 100%;
              margin-top: 5px;
              overflow-y: auto;
            `}
          >
            {datosUser && datosUser.length != 0 ? (
              <>
                {datosUser.map((usuario, index) => (
                  <PanelNumero
                    key={index}
                    usuario={usuario}
                    token={token}
                    tipo={tipo}
                  />
                ))}
              </>
            ) : (
              !loading && (
                <p
                  css={css`
                    font-weight: bold;
                    font-size: 12px;
                    padding: 0 20px;
                  `}
                >
                  "Sin Resultados"
                </p>
              )
            )}
          </ul>
        </div>
      </Contenedor>
    </div>
  );
};

export default PanelTransferencia;
