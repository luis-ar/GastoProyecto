// import React, { useState } from "react";
// import styled from "@emotion/styled";
// import Mensaje from "./Mensaje";
// const Contenedor = styled.div`
//   position: fixed;
//   z-index: 200;
//   background-color: rgb(0 0 0 / 0.92);
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   .cerrar-modal {
//     position: absolute;
//     right: 3rem;
//     top: 3rem;
//     width: 2rem;
//     height: 2rem;
//     z-index: 2;
//     img {
//       width: 100%;
//     }
//   }
//   form {
//     width: 400px;
//     margin: 0 auto;
//     padding: 3rem 0;
//     legend {
//       font-size: 3.5rem;
//       text-align: center;
//       display: block;
//       text-transform: uppercase;
//       color: white;
//       margin-bottom: 1.5rem;
//       padding-bottom: 1rem;
//       border-bottom: 2px solid blue;
//     }
//     .campo {
//       display: grid;
//       margin-bottom: 2rem;
//     }
//     label {
//       color: white;
//       font-size: 2rem;
//       margin-bottom: 1rem;
//     }
//     input[type="text"],
//     input[type="number"] {
//       background-color: white;
//       border-radius: 1rem;
//       padding: 1rem;
//       border: none;
//       flex: 1;
//       font-size: 1.5rem;
//     }
//     input[type="submit"] {
//       background-color: #1048a4;
//       border: none;
//       padding: 1rem;
//       text-align: center;
//       color: white;
//       font-weight: 900;
//       text-transform: uppercase;
//       font-size: 1.5rem;
//       width: 100%;
//       transition: background-color 300ms ease;
//       :hover {
//         background-color: #042a67;
//         cursor: pointer;
//       }
//     }
//     select {
//       flex: 1;
//       padding: 0.8rem;
//       border: none;
//       border-radius: 1rem;
//       text-align: center;
//       background-color: white;
//     }
//   }
//   label {
//     color: white;
//     text-align: left;
//   }
//   .formulario.animar {
//     position: relative;
//     opacity: 1;
//     z-index: 1;
//   }
//   .formulario.cerrar {
//     opacity: 0;
//   }
// `;

// const ModalInversora = ({
//   guardarModal,
//   inversores,
//   setInputDesInversor,
//   setInputCategoriaInversor,
//   setInputCuboInversor,
//   inputDesInversor,
//   inputCuboInversor,
//   inputCategoriaInversor,
//   setPase,
// }) => {
//   //crear state
//   const [mensaje, setMensaje] = useState("");
//   //funcion ocultarmodal
//   const ocultarModal = () => {
//     guardarModal(false);
//     console.log(inversores);
//   };
//   //funcion submit
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (
//       [inputDesInversor, inputCuboInversor, inputCategoriaInversor].includes("")
//     ) {
//       setMensaje("Todos los campos son obligatorios");
//       setTimeout(() => {
//         setMensaje("");
//       }, 2000);
//       return;
//     }
//     guardarModal(false);
//     setPase(true);
//   };
//   return (
//     <Contenedor className="modal">
//       <div className="cerrar-modal">
//         <img
//           src="/static/img/cerrar.svg"
//           alt="cerrar modal"
//           onClick={ocultarModal}
//         />
//       </div>

//       <form className="formulario" onSubmit={handleSubmit}>
//         <legend> Nueva Inversión</legend>
//         {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

//         <div className="campo">
//           <label htmlFor="nombre">Descripción</label>
//           <input
//             id="nombre"
//             type="text"
//             placeholder="Añade el Nombre del Gasto"
//             autocomplete="off"
//             onChange={(e) => setInputDesInversor(e.target.value)}
//           />
//         </div>
//         <div className="campo">
//           <label htmlFor="cantidad">Cantidad de Cubos</label>
//           <input
//             autocomplete="off"
//             id="cantidad"
//             type="number"
//             placeholder="Añade la cantidad del cubos: ej. 10"
//             min={1}
//             max={100}
//             onChange={(e) => setInputCuboInversor(Number(e.target.value))}
//           />
//         </div>

//         <div className="campo">
//           <label htmlFor="categoria">Categoria</label>

//           <select
//             id="categoria"
//             onChange={(e) => setInputCategoriaInversor(e.target.value)}
//           >
//             <option value="">-- Seleccione --</option>
//             <option value="basico">Básico</option>
//             <option value="medio">Medio</option>
//             <option value="avanzado">Avanzado</option>
//           </select>
//         </div>
//         <input type="submit" value="añadir gasto" />
//       </form>
//     </Contenedor>
//   );
// };

// export default ModalInversora;
