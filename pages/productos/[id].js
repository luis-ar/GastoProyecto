import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
// formatDistanceToNow
import { useRouter } from "next/router";
import React, { useEffect, useContext, useState } from "react";
import { FirebaseContext } from "../../firebase";
import {
  collection,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import Error404 from "../../components/layout/404";
import Layout from "../../components/layout/Layout";
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";
import { Campo, InputSubmit, Invertir } from "../../components/ui/Formulario";
import Boton from "../../components/ui/Boton1";
import Spinner from "../../components/ui/Spinner";
import MapPage from "@/components/ui/MapaPrueba";
import MapaAnimada from "@/components/ui/MapaAnimada";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Mensaje from "@/components/ui/Mensaje";
import restarSaldo from "@/Validacion/restarSaldo";
import sumarSaldo from "@/Validacion/actualizarSaldo";
import restarSaldoCreador from "@/Validacion/restarSaldoCreador";
import SpinnerPrincipal from "@/components/ui/SpinnerPrincipal";
import enviarGanancia from "@/Validacion/enviarGanancia";
import { ref, getDownloadURL, uploadBytesResumable } from "@firebase/storage";
//GENERADOR DE ID PARA LOS GASTOS
import { v4 as uuidv4 } from "uuid";
//contenedor imagenes

const ContenedorImagenes = styled.div`
  width: 100%;
  height: 220px;
  display: flex;
  margin-top: 10px;
  border: solid 1px white;
  div {
    display: flex;
    flex-direction: column;
    width: 50%;
    .tituloEntrada {
      background-color: #454546;
      width: 100%;
      text-align: center;
      height: 40px;
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;
      text-transform: uppercase;
    }
    .tipoImagen {
      width: 100%;
    }
  }
`;

const ContenedorProducto = styled.div`
  display: grid;
  gap: 60px;
  grid-auto-rows: auto;
  grid-template-columns: repeat(auto-fill, minmax(480px, 1fr));
  @media (max-width: 550px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
`;
const CreadorProducto = styled.p`
  padding: 0.5rem 2rem;
  background-color: #da552f;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  display: inline-block;
  text-align: center;
  position: absolute;
  top: 25px;
  right: 5px;
  @media (max-width: 550px) {
    top: 15px;
    bottom: 0;
  }
`;
const contenedorBarra = styled.div`
  margin-top: 20px !important;
  background-color: red;
  height: 300px;
  width: 300px;
`;
const Mapa = styled.div`
  z-index: 1;
  width: 100%;
  height: 400px;
  border: 1px solid #e1e1e1;
  margin-bottom: 20px;
`;
//estilo modal
const Contenedor = styled.div`
  position: fixed;
  z-index: 200;
  background-color: rgb(0 0 0 / 0.92);
  overflow-y: scroll;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .cerrar-modal {
    position: absolute;
    right: 3rem;
    top: 3rem;
    width: 2rem;
    height: 2rem;
    z-index: 2;
    img {
      width: 100%;
    }
  }
  form {
    width: 400px;
    margin: 0 auto;
    padding: 3rem 0;
    legend {
      font-size: 3.5rem;
      text-align: center;
      display: block;
      text-transform: uppercase;
      color: white;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid #3b82f6;
    }
    .campo {
      display: grid;
      margin-bottom: 2rem;
    }
    label {
      color: white;
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    input[type="text"],
    input[type="number"] {
      background-color: white;
      border-radius: 1rem;
      padding: 1rem;
      border: none;
      flex: 1;
      font-size: 1.5rem;
    }
    input[type="submit"] {
      background-color: #1048a4;
      border: none;
      padding: 1rem;
      text-align: center;
      color: white;
      font-weight: 900;
      text-transform: uppercase;
      font-size: 1.5rem;
      width: 100%;
      transition: background-color 300ms ease;
      :hover {
        background-color: #042a67;
        cursor: pointer;
      }
    }
    select {
      flex: 1;
      padding: 0.8rem;
      border: none;
      border-radius: 1rem;
      text-align: center;
      background-color: white;
    }
  }
  label {
    color: white;
    text-align: left;
  }
  .formulario.animar {
    position: relative;
    opacity: 1;
    z-index: 1;
  }
  .formulario.cerrar {
    opacity: 0;
  }
`;

//estilo precio
const Precio = styled.p`
  margin-top: 10px;
  font-size: 30px;
  margin-bottom: 10px;
  text-align: center;
  span {
    font-size: 20px;
    color: #3b82f6;
    font-weight: bold;
  }
  @media (max-width: 550px) {
    font-size: 15px;
    span {
      font-size: 12px;
    }
  }
`;
const lista = styled.ul`
  .swipe-action__leading {
    background-color: var(--azul);
    color: var(--blanco);
    margin-bottom: 2rem;
  }

  .swipe-action__trailing {
    background-color: #db2777;
    margin-bottom: 2rem;
    color: var(--blanco);
  }

  .swipeable-list .swipe-action {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.4rem;
    text-align: right;
  }
`;
const Publicado = styled.p`
  margin-bottom: 5px;
  @media (max-width: 550px) {
    font-size: 12px;
  }
`;
const ListaComentario = styled.li`
  display: grid;
  /* grid-template-columns: 0.5fr 5fr; */
  .contenedorPerfil {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      border-radius: 100%;
      height: 50px;
      width: 50px;
    }
  }
`;

const GeneralDescripcion = styled.div`
  position: relative;
  border: 1px solid #e1e1e1;
  background-color: var(--colorBarraSuperior);
  margin-top: 20px;
  margin-bottom: 30px;
  padding: 50px;

  .nombreProducto {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    .iconoProducto {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    @media (max-width: 550px) {
      flex-direction: column;
    }
  }
  .bx {
    font-size: 30px;
    cursor: pointer;
  }
  .bx-map {
    color: #dc2626;
    cursor: pointer;
  }
  .bxl-whatsapp {
    color: #3ff71a;
  }
  .iconosExtra {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-bottom: 15px;
    div {
      display: flex;
      align-items: center;
      flex-direction: column;
      padding: 8px;
      border-radius: 6px;
      background-color: var(--grisBotones);
    }
  }
  .botones {
    position: absolute;
    right: 50px;
    bottom: 50px;
    display: flex;
    justify-content: space-around;
    gap: 5px;

    button {
      background-color: var(--botones);
      cursor: pointer;
      padding: 10px 20px;
      font-size: 20px;
      color: white;
      border-radius: 10px;
      text-align: center;
      text-transform: uppercase;
      font-family: "PT Sans", sans-serif;

      /* 
      :last-child {
        margin-left: 10px;
      }
      :nth-child(2) {
        margin-left: 10px;
      } */
    }

    @media (max-width: 1300px) {
      margin-top: 20px;
      position: static;
      button {
        padding: 5px 10px;
        font-size: 15px;
        /* :last-child {
          margin-left: 10px;
        } */
      }
    }
  }
`;
const Comentarios = styled.div`
  height: 160px;
  background-color: var(--colorBarraSuperior);
  padding: 20px;
  margin-bottom: 15px;
  input[type="submit"] {
    background-color: var(--botones);
    width: 50%;
    padding: 1.5rem;
    text-align: center;
    color: #fff;
    font-size: 1.8rem;
    text-transform: uppercase;
    border: none;
    font-family: "PT Sans", sans-serif;
    font-weight: 700;
    &:hover {
      cursor: pointer;
    }

    @media (max-width: 1200px) {
      width: 100%;
    }
  }
  .enviarComentario {
    display: flex;
    justify-content: center;
  }
`;
const RutaWeb = styled.div`
  height: 160px;

  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: var(--colorBarraSuperior);
  padding: 20px;
  margin-bottom: 15px;
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-weight: 700;
    text-transform: uppercase;
    text-align: center;
    color: white;
  }
  .cantVotos {
    background-color: var(--grisBotones);
    align-items: center;
    display: flex;
    justify-content: center;
    gap: 5px;
    padding: 10px 0;
    border-radius: 10px 10px 0 0;
  }
  .votarUsuario {
    border: 1px solid #d1d1d1;
    border-radius: 10px;
  }
`;
const ListaComentarios = styled.div`
  padding: 30px;
  border: 1px solid #e1e1e1;
`;
const BotonVotar = styled.a`
  display: block;
  font-weight: 700;
  text-transform: uppercase;
  border-top: 1px solid #d1d1d1;
  padding: 0.8rem 2rem;
  text-align: center;
  background-color: var(--botones);
  cursor: pointer;
  border-radius: 0 0 10px 10px;
`;
const Producto = () => {
  //state del componente
  const [producto, guardarProducto] = useState({});
  const [error, guardarError] = useState(false);
  //comentarios
  const [comentario, guardarComentario] = useState({});
  const [inputComentario, SetInputComentario] = useState("");

  const [consultarDB, guardarConsultarDB] = useState(true);
  const [paseModal, guardarModal] = useState(false);
  const [paseModalGanancia, guardarPaseModalGanancia] = useState(false);
  const [paseModalPrecio, guardarPaseModalPrecio] = useState(false);
  //state inversores
  const [inver, guardarinver] = useState({});
  const [inputDesInversor, setInputDesInversor] = useState("");
  const [inputCuboInversor, setInputCuboInversor] = useState("");
  const [inputUnidadesInversor, setInputUnidadesInversor] = useState("");
  const [inputNombreInversor, setInputNombreInversor] = useState("");
  const [inputPrecioInversor, setInputPrecioInversor] = useState("");
  const [inputComprobanteInversor, setInputComprobanteInversor] = useState("");
  const [inputGanancia, setInputGanancia] = useState("");
  const [inputPrecio, setInputPrecio] = useState("");
  const [inputCategoriaInversor, setInputCategoriaInversor] = useState();
  const [pase, setPase] = useState(false);
  const [numElementos, setNumElementos] = useState(0); // Nuevo estado para el número de elementos
  const [editarInversion, setEditarInversion] = useState(true);
  const [IDEncontrado, setIDEncontrado] = useState("");
  const [depositarRecaudado, setDepositarRecaudado] = useState(false);
  //FILTRO BUSQUEDA
  const [filtro, setFiltro] = useState("");

  //mensaje error
  const [mensaje, setMensaje] = useState("");
  //cantida de cubos
  const [totalCubos, setTotalCubos] = useState(0);
  //Imagen comprobante
  const [uploading, setUploading] = useState(false);
  const [imagenComprobante, setImagenComprobante] = useState("");
  const [imagenDeposito, setImagenDeposito] = useState("");
  //routing para obtener el id actual
  const router = useRouter();
  const {
    query: { id },
  } = router;
  //context de firebase
  const { firebase, usuario } = useContext(FirebaseContext);

  const {
    comentarios,
    creado,
    descripcion,
    empresa,
    nombre,
    url,
    urlimagen,
    votos,
    creador,
    haVotado,
    cordenadas,
    categoria,
    inversores,
    precio,
    estado,
    monto,
    depositoRecaudado,
  } = producto;

  //elimina un producto de la bd
  const eliminarProducto = async () => {
    if (!usuario) {
      return router.push("/login");
    }
    if (creador.id !== usuario.uid) {
      return router.push("/");
    }
    try {
      const docRef = doc(firebase.db, "productos", `${id}`);
      await deleteDoc(docRef);
      router.push("/");
    } catch (error) {
      console.log("error");
    }
  };
  const actualizarInversorPorId = async (idGasto) => {
    const docRef = doc(firebase.db, "productos", `${id}`);
    try {
      // Obtiene el documento actual
      guardarModal(true);
      setEditarInversion(false);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Obtiene el array inversores del documento
        const inversores = await docSnap.data().inversores;
        // Busca el inversor que coincide con el idUsuario
        const inversorEncontrado = await inversores.find(
          (inversor) => inversor.id === idGasto
        );
        if (inversorEncontrado) {
          setIDEncontrado(inversorEncontrado.id);
          setInputDesInversor(inversorEncontrado.descripcion);
          setInputCuboInversor(inversorEncontrado.cubos);
          setInputCategoriaInversor(inversorEncontrado.categoria);
          setInputNombreInversor(inversorEncontrado.nombreInversor);
          setInputPrecioInversor(inversorEncontrado.precioUnitario);
          setInputUnidadesInversor(inversorEncontrado.unidad);
          setInputComprobanteInversor(inversorEncontrado.comprobante);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const eliminarInversorPorId = async (idGasto) => {
    setEditarInversion(true);

    try {
      const docRef = doc(firebase.db, "productos", `${id}`);

      // Obtener el documento actual
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Obtener el array de inversores del documento
        const inversores = docSnap.data().inversores;

        // Filtrar el array para eliminar el elemento con el idUsuario deseado
        const nuevoInversores = inversores.filter(
          (inversor) => inversor.id !== idGasto
        );

        // Actualizar el documento con el nuevo array de inversores
        await updateDoc(docRef, { inversores: nuevoInversores });
        //actualizar el state
        guardarProducto({
          ...producto,
          inversores: nuevoInversores,
        });
        setPase(false);
        guardarConsultarDB(true); //hay un voto, por lo tanto consultar a la db
        setIDEncontrado("");
      } else {
        console.log("El documento no existe");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    const ejecutar = async () => {
      const docRef = doc(firebase.db, "productos", `${id}`);
      try {
        // Obtiene el documento actual
        const docSnap = await getDoc(docRef);
        // Obtiene el array inversores del documento
        const inversores = docSnap.data().inversores;
        // Busca el inversor que coincide con el idUsuario
        const inversorEncontrado = inversores.find(
          (inversor) => inversor.usuarioId === usuario.uid
        );

        if (inversorEncontrado) {
          setPase(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Llama a la función ejecutar una vez que la página se haya cargado
    ejecutar();
  }, [producto]);
  useEffect(() => {
    if (id && consultarDB) {
      const obtenerProducto = async () => {
        const productoQuerry = await doc(
          collection(firebase.db, "productos"),
          id
        );
        const producto = await getDoc(productoQuerry);
        if (producto.exists()) {
          guardarProducto(producto.data());
          guardarConsultarDB(false);
        } else {
          guardarError(true);
          guardarConsultarDB(false);
        }
      };
      obtenerProducto();
    }
  }, [id, producto]);

  useEffect(() => {
    let suma = 0;
    const sumaTotal = async () => {
      if (inversores) {
        inversores.map((inversor) => {
          suma = suma + parseFloat(inversor.parcial);
        });
        await setTotalCubos(suma);
      } else {
        suma = 0;
      }
    };
    sumaTotal();
  }, [producto, numElementos, totalCubos]);

  if (Object.keys(producto).length === 0 && !error) return <SpinnerPrincipal />;

  //administrar y validar votos
  const votarProducto = () => {
    if (!usuario) {
      return router.push("/login");
    }
    //obtener y sumar un nuevo voto
    const nuevoTotal = votos + 1;

    //verificar si el usuario actual ha votado
    if (haVotado.includes(usuario.uid)) {
      return;
    }
    //guardar el ID del usuario que ha votado
    const nuevoHaVotado = [...haVotado, usuario.uid];

    //actualizar en la bd
    const docRef = doc(firebase.db, "productos", `${id}`);
    updateDoc(docRef, {
      votos: nuevoTotal,
      haVotado: nuevoHaVotado,
    });
    //actualizar el state
    guardarProducto({
      ...producto,
      votos: nuevoTotal,
    });
    guardarConsultarDB(true); //hay un voto, por lo tanto consultar a la db
  };

  //funciones para crear comentario

  const comentariosChange = (e) => {
    guardarComentario({
      ...comentario,
      [e.target.name]: e.target.value,
    });
    SetInputComentario(e.target.value);
  };

  const inversorDesChange = (e) => {
    guardarinver({
      ...inver,
      [e.target.name]: e.target.value,
    });
    setInputDesInversor(e.target.value);
  };
  const inversorCuboChange = (e) => {
    guardarinver({
      ...inver,
      [e.target.name]: Number(e.target.value),
    });
    setInputCuboInversor(Number(e.target.value));
  };
  const gananciaChange = (e) => {
    setInputGanancia({
      ...inver,
      [e.target.name]: Number(e.target.value),
    });
    setInputGanancia(Number(e.target.value));
  };

  const inversorCategoriaChange = (e) => {
    guardarinver({
      ...inver,
      [e.target.name]: e.target.value,
    });
    setInputCategoriaInversor(e.target.value);
  };
  const inversorUnidadesChange = (e) => {
    guardarinver({
      ...inver,
      [e.target.name]: e.target.value,
    });
    setInputUnidadesInversor(e.target.value);
  };
  const inversorPrecioChange = (e) => {
    guardarinver({
      ...inver,
      [e.target.name]: e.target.value,
    });
    setInputPrecioInversor(e.target.value);
  };
  const inversorInvChange = (e) => {
    guardarinver({
      ...inver,
      [e.target.name]: e.target.value,
    });
    setInputNombreInversor(e.target.value);
  };
  const inversorComprobanteChange = (e) => {
    guardarinver({
      ...inver,
      [e.target.name]: e.target.value,
    });
    setInputComprobanteInversor(e.target.value);
  };

  //identifica si el comentario es del creador del producto
  const esCreador = (id) => {
    if (creador.id == id) {
      return true;
    } else {
      return false;
    }
  };

  const esCreadorInversor = (id) => {
    if (usuario != null) {
      if (usuario.uid == id) {
        return true;
      } else {
        return false;
      }
    }
  };

  const agregarComentario = async (e) => {
    e.preventDefault();
    if (!usuario) {
      return router.push("/login");
    }

    //informacion extra al comentario
    comentario.usuarioId = usuario.uid;
    comentario.usuarioNombre = usuario.displayName;
    comentario.fecha = Date.now();
    comentario.icono = usuario.photoURL;

    // tomar copia de comentarios y agregar al arreglo

    const nuevosComentarios = [...comentarios, comentario];
    //actualizar la bd
    const docRef = doc(firebase.db, "productos", `${id}`);
    updateDoc(docRef, {
      comentarios: nuevosComentarios,
    });
    //actualizar el state
    guardarProducto({
      ...producto,
      comentarios: nuevosComentarios,
    });
    guardarConsultarDB(true); //hay un conentario, por lo tanto consultar a la db
    SetInputComentario("");
  };

  //funcion que revisa que el creador del producto sea el mismo que esta autenticado
  const puedeBorrar = () => {
    if (!usuario) return false;
    if (creador.id === usuario.uid) {
      return true;
    }
  };

  //nueva inversion
  const handleNuevaInversion = () => {
    guardarModal(true);
  };
  const handleGanancia = () => {
    guardarPaseModalGanancia(true);
  };
  //funcion ocultarmodal
  const ocultarModal = () => {
    guardarModal(false);
    guardarPaseModalGanancia(false);
    guardarPaseModalPrecio(false);
    setImagenComprobante("");
    setImagenDeposito("");
    setInputCategoriaInversor("");
    setInputComprobanteInversor("");
    setInputCuboInversor("");
    setInputDesInversor("");
    setInputPrecioInversor("");
    setInputUnidadesInversor("");
    setInputNombreInversor("");
    setIDEncontrado("");
  };
  //funcion submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    //unidades,precio,inversor,comprobante

    if (
      [
        inputDesInversor,
        inputCuboInversor,
        inputCategoriaInversor,
        inputComprobanteInversor,
        inputUnidadesInversor,
        inputNombreInversor,
        inputPrecioInversor,
      ].includes("")
    ) {
      setMensaje("Todos los campos son obligatorios");
      setTimeout(() => {
        setMensaje("");
      }, 2000);
      return;
    }

    const docRef = doc(firebase.db, "productos", `${id}`);
    const docSnap = await getDoc(docRef);
    if (!usuario) {
      return router.push("/login");
    }

    if (docSnap.exists()) {
      // Obtener el array de inversores del documento
      const inversores = docSnap.data().inversores;
      let existeGasto;
      if (inversores != undefined) {
        // Filtrar el array para eliminar el elemento con el idUsuario deseado
        existeGasto = inversores.filter(
          (inversor) => inversor.id === IDEncontrado
        );
      }
      if (existeGasto != undefined && existeGasto.length != 0) {
        // Encuentra el índice del elemento que coincide con el idUsuario deseado
        let result;
        let parcialIGV;
        let parcialBase;

        result = inputPrecioInversor * inputCuboInversor;
        if (inputComprobanteInversor == "Factura") {
          parcialIGV = (result * 0.18).toFixed(2);
          parcialBase = (result * 0.82).toFixed(2);
        } else {
          parcialIGV = 0;
          parcialBase = result;
        }

        const nuevosCampos = {
          descripcion: inputDesInversor,
          categoria: inputCategoriaInversor,
          cubos: inputCuboInversor,
          fecha: Date.now(),
          comprobante: inputComprobanteInversor,
          nombreInversor: inputNombreInversor,
          precioUnitario: inputPrecioInversor,
          unidad: inputUnidadesInversor,
          parcial: parseFloat(result).toFixed(2),
          base: parcialBase,
          igv: parcialIGV,
        };

        if (imagenComprobante != "") {
          nuevosCampos.imagenComprobante = imagenComprobante;
          console.log("entro cambio de comprobante");
        }

        if (imagenDeposito != "") {
          nuevosCampos.imagenDeposito = imagenDeposito;
          console.log("entro cambio de deposito");
        }

        const indice = inversores.findIndex(
          (inversor) => inversor.id === IDEncontrado
        );
        if (indice !== -1) {
          // Actualiza los campos del elemento con los nuevos valores
          if (inversores != undefined) {
            inversores[indice] = { ...inversores[indice], ...nuevosCampos };
            const nuevos = [...inversores];

            // Actualiza el documento con el array actualizado
            await updateDoc(docRef, { inversores });
            guardarProducto({
              ...producto,
              inversores: nuevos,
            });
            console.log("Elemento actualizado con éxito");
          }
          guardarModal(false);
        }
      } else {
        guardarModal(false);
        let precioBase;
        precioBase = inputCuboInversor * inputPrecioInversor;
        inver.usuarioId = usuario.uid;
        inver.usuarioNombre = usuario.displayName;
        inver.icono = usuario.photoURL;
        inver.fecha = Date.now();
        inver.imagenComprobante = imagenComprobante;
        inver.imagenDeposito = imagenDeposito;
        inver.parcial = parseFloat(precioBase).toFixed(2);
        //generar su id
        inver.id = uuidv4();
        if (inputComprobanteInversor == "boleta") {
          inver.igv = 0;
          inver.base = precioBase;
        } else {
          inver.igv = (0.18 * precioBase).toFixed(2);
          inver.base = (0.82 * precioBase).toFixed(2);
        }

        //copia de inversores
        if (inversores != undefined) {
          const nuevosInversores = [...inversores, inver];
          //actualizar la bd
          updateDoc(docRef, {
            inversores: nuevosInversores,
          });
          //actulizar el state
          guardarProducto({
            ...producto,
            inversores: nuevosInversores,
          });
        }
      }
    }

    localStorage.setItem("pase", true);
    setPase(true);
    setInputDesInversor("");
    setInputCuboInversor("");
    setInputCategoriaInversor("");
    setInputNombreInversor("");
    setInputUnidadesInversor("");
    setInputPrecioInversor("");
    setInputComprobanteInversor("");
    setImagenComprobante("");
    setImagenDeposito("");
  };
  const formatearPresupuesto = (cantidad) => {
    return cantidad.toLocaleString("es-PE", {
      style: "currency",
      currency: "PEN",
    });
  };
  const leadingActions = (idGasto) => (
    <LeadingActions>
      <SwipeAction
        onClick={() => {
          actualizarInversorPorId(idGasto);
        }}
      >
        Editar
      </SwipeAction>
    </LeadingActions>
  );
  const trailingActions = (idGasto) => (
    <TrailingActions>
      <SwipeAction
        onClick={() => {
          eliminarInversorPorId(idGasto);
        }}
        destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );
  const scrollToSection = () => {
    const sectionDestino = document.getElementById("mapaProducto");
    if (sectionDestino) {
      sectionDestino.scrollIntoView({ behavior: "smooth" });
    }
  };
  const hadleRepartirGanancia = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(firebase.db, "productos", `${id}`);

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // Obtener el array de inversores del documento
        const estado = docSnap.data().estado;
        const monto = docSnap.data().monto;

        // Filtrar el array para eliminar el elemento con el idUsuario deseado
        await updateDoc(docRef, {
          estado: false,
          monto: inputGanancia,
        });
        console.log("actualizado con exito el estado");
        guardarProducto({
          ...producto,
          estado: false,
          monto: inputGanancia,
        });
        guardarConsultarDB(true);
      } else {
        console.log("El documento no existe");
      }
    } catch (error) {}
    const montoRestar = (parseFloat(precio) * totalCubos) / 100;
    await restarSaldo(usuario.uid, creador.id, montoRestar);
    await enviarGanancia(inversores, inputGanancia);
    guardarPaseModalGanancia(false);
  };
  const recuperarCubos = () => {
    let resultado;
    const respuesta = inversores.filter(
      (inversor) => inversor.usuarioId === usuario.uid
    );
    if (respuesta.length > 0) {
      resultado = respuesta[0]["cubos"];
    }
    return resultado;
  };

  const handleRecaudado = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(firebase.db, "productos", `${id}`);

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // Obtener el array de inversores del documento
        const depositoRecaudado = docSnap.data().depositoRecaudado;

        // Filtrar el array para eliminar el elemento con el idUsuario deseado
        await updateDoc(docRef, {
          depositoRecaudado: true,
        });
        console.log("actualizado con exito el depositoRecaudado");
        guardarProducto({
          ...producto,
          depositoRecaudado: true,
        });
        guardarConsultarDB(true);
      } else {
        console.log("El documento no existe");
      }
    } catch (error) {}
    const montoDepositar = (parseFloat(precio) * totalCubos) / 100;
    sumarSaldo(creador.id, montoDepositar);
  };

  const handleModificarPrecio = () => {
    guardarPaseModalPrecio(true);
  };
  const hadleModificarNuevoPreecio = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(firebase.db, "productos", `${id}`);

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const precio = docSnap.data().precio;
        await updateDoc(docRef, {
          precio: inputPrecio,
        });
        console.log("actualizado con exito el estado");
        guardarProducto({
          ...producto,
          precio: inputPrecio,
        });
        guardarConsultarDB(true);
        setInputPrecio("");
      } else {
        console.log("El documento no existe");
      }
    } catch (error) {}

    guardarPaseModalPrecio(false);
  };

  //CARGA DE IMAGENES

  const handleImageUpload = (e, tipo) => {
    // Se obtiene referencia de la ubicación donde se guardará la imagen
    const file = e.target.files[0];
    const imageRef = ref(firebase.storage, "productos/" + file.name);

    // Se inicia la subida
    setUploading(true);
    const uploadTask = uploadBytesResumable(imageRef, file);

    // Registra eventos para cuando detecte un cambio en el estado de la subida
    uploadTask.on(
      "state_changed",
      // Muestra progreso de la subida
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Subiendo imagen: ${progress}% terminado`);
      },
      // En caso de error
      (error) => {
        setUploading(false);
        console.error(error);
      },
      // Subida finalizada correctamente
      () => {
        setUploading(false);
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          if (tipo == "comprobante") {
            setImagenComprobante(url);
          } else {
            setImagenDeposito(url);
          }
        });
      }
    );
  };

  const TipoArchivo = (url) => {
    // Obtener el nombre del archivo de la URL
    const nombreArchivoConQuery = url.substring(url.lastIndexOf("/") + 1);

    // Eliminar cualquier parámetro de consulta de la URL
    const nombreArchivo = nombreArchivoConQuery.split("?")[0];

    // Obtener la extensión del archivo
    const puntoAntesDeExtension = nombreArchivo.lastIndexOf(".");
    const extension =
      puntoAntesDeExtension === -1
        ? ""
        : nombreArchivo.substring(puntoAntesDeExtension + 1);
    return extension;
  };

  const Expandir = (e) => {
    var elem = document.getElementById(e.target.id);
    console.log(e);
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  };

  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
  };

  const gastosFiltrados = inversores.filter(
    (gasto) =>
      gasto.descripcion.toLowerCase().includes(filtro.toLowerCase()) ||
      gasto.categoria.toLowerCase().includes(filtro.toLowerCase()) ||
      gasto.comprobante.toLowerCase().includes(filtro.toLowerCase()) ||
      gasto.nombreInversor.toLowerCase().includes(filtro.toLowerCase()) ||
      gasto.usuarioNombre.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <Layout>
      <>
        {error ? (
          <Error404 />
        ) : (
          <div
            css={css`
              padding-left: 20px;
              padding-right: 20px;
              color: white;
              @media (min-width: 1000px) {
                margin-left: 300px;
              }
              @media (max-width: 1000px) {
                margin-bottom: 60px;
              }
            `}
          >
            {paseModalPrecio && (
              <Contenedor className="modal">
                <div className="cerrar-modal">
                  <img
                    src="/static/img/cerrar.svg"
                    alt="cerrar modal"
                    onClick={ocultarModal}
                  />
                </div>

                <form
                  className="formulario"
                  onSubmit={hadleModificarNuevoPreecio}
                >
                  <legend>Modificar Precio</legend>

                  {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

                  <div className="campo">
                    <label htmlFor="precio">Nuevo Precio</label>
                    <input
                      autocomplete="off"
                      id="precio"
                      type="number"
                      name="precio"
                      placeholder="Ingrese el nuevo precio"
                      min={1}
                      value={inputPrecio}
                      onChange={(e) => {
                        setInputPrecio(e.target.value);
                      }}
                    />
                  </div>

                  <input type="submit" value="Modificar Precio" />
                </form>
              </Contenedor>
            )}
            {paseModalGanancia && (
              <Contenedor className="modal">
                <div className="cerrar-modal">
                  <img
                    src="/static/img/cerrar.svg"
                    alt="cerrar modal"
                    onClick={ocultarModal}
                  />
                </div>

                <form className="formulario" onSubmit={hadleRepartirGanancia}>
                  <legend>Repartir Ganancia</legend>
                  <div
                    css={css`
                      margin-bottom: 5px;
                      color: white;
                      font-size: 20px;
                      text-align: center;
                      span {
                        color: #3b82f6;
                        font-size: 25px;
                      }
                    `}
                  >
                    Cantidad de inversores
                    <span> {inversores.length}</span>
                  </div>
                  {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

                  <div className="campo">
                    <label htmlFor="cantidad">Monto total</label>
                    <input
                      autocomplete="off"
                      id="cantidad"
                      type="number"
                      name="ganancia"
                      placeholder="Añade el monto total recaudado"
                      min={1}
                      value={inputGanancia}
                      onChange={gananciaChange}
                    />
                  </div>

                  <input type="submit" value="Enviar Ganancia" />
                </form>
              </Contenedor>
            )}

            {paseModal && (
              <Contenedor className="modal">
                <div
                  className="cerrar-modal"
                  css={css`
                    cursor: pointer;
                  `}
                >
                  <img
                    src="/static/img/cerrar.svg"
                    alt="cerrar modal"
                    onClick={ocultarModal}
                  />
                </div>

                <form className="formulario" onSubmit={handleSubmit}>
                  <legend>
                    {IDEncontrado == "" ? "Nuevo Gasto" : "Editar Gasto"}
                  </legend>
                  {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
                  <div className="campo">
                    <label htmlFor="categoria">Categoria</label>

                    <select
                      id="categoria"
                      name="categoria"
                      value={inputCategoriaInversor}
                      onChange={inversorCategoriaChange}
                    >
                      <option value="">-- Seleccione --</option>
                      <option value="0bras Provicionales y Estructurales">
                        0bras Provicionales y Estructurales
                      </option>
                      <option value="Estructuras">Estructuras</option>
                      <option value="Arquitectura">Arquitectura</option>
                      <option value="Instalaciones Sanitarias">
                        Instalaciones Sanitarias
                      </option>
                      <option value="Instalaciones Electricas y Mecanicas">
                        Instalaciones Electricas y Mecanicas
                      </option>
                      <option value="Gastos Generales">Gastos Generales</option>
                    </select>
                  </div>
                  {/* descripcion */}
                  <div className="campo">
                    <label htmlFor="nombre">Descripción</label>
                    <input
                      id="nombre"
                      type="text"
                      name="descripcion"
                      placeholder="Añade una descripcion de la inversion"
                      autocomplete="off"
                      value={inputDesInversor}
                      onChange={inversorDesChange}
                    />
                  </div>
                  {/* Unidades */}
                  <div className="campo">
                    <label htmlFor="nombre">Unidades</label>
                    <input
                      id="nombre"
                      type="text"
                      name="unidad"
                      placeholder="Ingrese el tipo de unidad"
                      autocomplete="off"
                      value={inputUnidadesInversor}
                      onChange={inversorUnidadesChange}
                    />
                  </div>
                  {/* Cantidad */}

                  <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input
                      autocomplete="off"
                      id="cantidad"
                      type="number"
                      name="cubos"
                      placeholder="Añade la cantidad: ej. 10"
                      min={1}
                      value={inputCuboInversor}
                      onChange={inversorCuboChange}
                    />
                  </div>
                  {/* Precio */}
                  <div className="campo">
                    <label htmlFor="cantidad">Precio Unitario</label>
                    <input
                      autocomplete="off"
                      id="cantidad"
                      type="number"
                      name="precioUnitario"
                      placeholder="Añade el precio: ej. S/100"
                      min={1}
                      value={inputPrecioInversor}
                      onChange={inversorPrecioChange}
                    />
                  </div>
                  {/* Inversor */}
                  <div className="campo">
                    <label htmlFor="nombre">Inversor</label>
                    <input
                      id="nombre"
                      type="text"
                      name="nombreInversor"
                      placeholder="Ingrese el Inversor"
                      autocomplete="off"
                      value={inputNombreInversor}
                      onChange={inversorInvChange}
                    />
                  </div>
                  {/* Comprobante de Pago */}

                  <div className="campo">
                    <label htmlFor="categoria">Comprobante de Pago</label>

                    <select
                      id="categoria"
                      name="comprobante"
                      value={inputComprobanteInversor}
                      onChange={inversorComprobanteChange}
                    >
                      <option value="">-- Seleccione --</option>
                      <option value="Boleta">Boleta</option>
                      <option value="Factura">Factura</option>
                    </select>
                  </div>
                  {/* Imagen de Factura */}
                  <div className="campo">
                    <label htmlFor="nombre">Imagen del Comprobante</label>
                    <input
                      id="nombre"
                      type="file"
                      onChange={(e) => handleImageUpload(e, "comprobante")}
                    />
                  </div>
                  <div className="campo">
                    <label htmlFor="nombre">Imagen del Deposito</label>
                    <input
                      id="nombre"
                      type="file"
                      onChange={(e) => handleImageUpload(e, "deposito")}
                    />
                  </div>

                  <input
                    type="submit"
                    value={IDEncontrado == "" ? "Añadir Gasto" : "Editar Gasto"}
                  />
                </form>
              </Contenedor>
            )}
            <GeneralDescripcion>
              <div
                css={css`
                  width: 100%;
                  display: flex;
                  justify-content: center;
                `}
              >
                <img
                  src={urlimagen}
                  css={css`
                    width: 80%;
                    height: 350px;
                    border-radius: 20px;
                    margin-bottom: 10px;
                    @media (max-width: 550px) {
                      height: 150px;
                    }
                  `}
                />
              </div>
              <div className="nombreProducto">
                <div
                  css={css`
                    font-size: 20px;
                  `}
                >
                  {nombre}
                </div>
                <div className="iconoProducto">
                  <div className="ubicacion">
                    <i class="bx bx-map"></i>
                  </div>
                  <div className="whatsapp">
                    <i class="bx bxl-whatsapp"></i>
                  </div>
                </div>
              </div>
              <div>
                <Precio>{formatearPresupuesto(parseFloat(precio))}</Precio>
                {usuario != undefined && esCreador(usuario.uid) && (
                  <button
                    css={css`
                      background-color: var(--botones);
                      cursor: pointer;
                      padding: 10px 20px;
                      font-size: 20px;
                      color: white;
                      border-radius: 10px;
                      text-align: center;
                      text-transform: uppercase;
                      margin-bottom: 10px;
                      @media (max-width: 1300px) {
                        padding: 5px 10px;
                        font-size: 15px;
                      }
                    `}
                    onClick={handleModificarPrecio}
                  >
                    Modificar Precio
                  </button>
                )}
              </div>
              <div
                css={css`
                  display: flex;
                  justify-content: space-between;
                  @media (max-width: 550px) {
                    flex-direction: column;
                  }
                `}
              >
                <div className="iconosExtra">
                  <div>
                    <i class="bx bx-message-rounded-dots"></i>{" "}
                    <p>{comentarios.length}</p>
                  </div>
                  <div className="corazon">
                    <i className="bx bx-heart"></i>
                    <p>{votos}</p>
                  </div>
                </div>
                <div
                  css={css`
                    font-weight: bold;
                    p {
                      font-size: 20px;
                    }
                  `}
                >
                  {pase == true && estado == false && (
                    <>
                      <p>
                        Tu Inversion:{" "}
                        <span>
                          {formatearPresupuesto(
                            (recuperarCubos() * precio) / 100
                          )}
                        </span>
                      </p>
                      <p>
                        Tu Ganancia:{" "}
                        <span>
                          {formatearPresupuesto(
                            ((monto - precio) * recuperarCubos()) / 100
                          )}
                        </span>
                      </p>
                    </>
                  )}
                </div>
              </div>

              <p
                css={css`
                  font-size: 15px;
                `}
              >
                Publicado hace :{" "}
                {formatDistanceToNow(new Date(creado), { locale: es })}
              </p>
              <div className="botones">
                <button onClick={scrollToSection}>PLANO</button>

                {usuario && (
                  <>
                    <button onClick={handleNuevaInversion}>GASTOS</button>

                    {estado &&
                      esCreador(usuario.uid) &&
                      totalCubos === 100 &&
                      depositoRecaudado == false && (
                        <button onClick={handleRecaudado}>
                          Depositar lo Recaudado
                        </button>
                      )}
                    {estado && esCreador(usuario.uid) && totalCubos === 100 && (
                      <button onClick={handleGanancia}>
                        Finalizar Proyecto
                      </button>
                    )}
                  </>
                )}
              </div>
            </GeneralDescripcion>

            <ContenedorProducto>
              <div>
                {usuario && (
                  <Comentarios>
                    <form onSubmit={agregarComentario}>
                      <Campo>
                        <input
                          type="text"
                          name="mensaje"
                          value={inputComentario}
                          onChange={comentariosChange}
                          placeholder="Escribe tu comentario"
                        />
                      </Campo>
                      <div className="enviarComentario">
                        <input type="submit" value="Agregar Comentario" />
                      </div>
                    </form>
                  </Comentarios>
                )}

                <ListaComentarios>
                  <h2
                    css={css`
                      text-align: center;
                    `}
                  >
                    Comentarios
                  </h2>
                  {comentarios.length === 0 ? (
                    <p
                      css={css`
                        margin-bottom: 2rem;
                      `}
                    >
                      Aún no hay comentarios
                    </p>
                  ) : (
                    <ul>
                      {comentarios.map((comentario, i) => (
                        <ListaComentario
                          key={`${comentario.usuarioId}-${i}`}
                          css={css`
                            border: 1px solid #e1e1e1;
                            padding: 2rem;
                            margin-bottom: 2rem;
                            border-radius: 10px;
                            position: relative;
                          `}
                        >
                          {esCreador(comentario.usuarioId) && (
                            <CreadorProducto
                              css={css`
                                @media (max-width: 550px) {
                                  right: 5px;
                                  font-size: 10px;
                                  padding: 0.2rem 1rem;
                                  height: 20px;
                                  position: absolute;
                                  top: 78%;
                                  border-radius: 2px;
                                }
                              `}
                            >
                              Es Creador
                            </CreadorProducto>
                          )}
                          <div className="contenedorPerfil">
                            <img
                              src={
                                comentario.icono != null
                                  ? comentario.icono
                                  : "/static/img/imagenPerfil.png"
                              }
                            />
                          </div>
                          <div
                            css={css`
                              margin-left: 10px;
                            `}
                          >
                            <p>{comentario.mensaje}</p>
                            <p>
                              Escrito por:
                              <span
                                css={css`
                                  font-weight: bold;
                                `}
                              >
                                {""} {comentario.usuarioNombre}
                              </span>
                            </p>
                            <Publicado>
                              Publicado hace :{" "}
                              {formatDistanceToNow(new Date(comentario.fecha), {
                                locale: es,
                              })}
                            </Publicado>
                          </div>
                        </ListaComentario>
                      ))}
                    </ul>
                  )}
                </ListaComentarios>
              </div>
              <aside>
                <RutaWeb>
                  <a
                    target="_blank"
                    bgColor="true"
                    href={url}
                    css={css`
                      background-color: var(--grisBotones);
                      padding: 10px;
                      border-radius: 10px;
                      height: 100px;
                    `}
                  >
                    <img src="/static/img/ruta.png" />
                    <span>Visitar Web</span>
                  </a>
                  <div className="votarUsuario">
                    <div className="cantVotos">
                      <i className="bx bx-heart"></i>
                      <p>{votos}</p>
                    </div>
                    {usuario && (
                      <BotonVotar onClick={votarProducto}>Votar</BotonVotar>
                    )}
                  </div>
                </RutaWeb>
                {/* <Mapa>
                  <MapPage cordenadas={cordenadas} />
                </Mapa> */}
                {/* {categoria === "habilitacionUrbana" && <MapaAnimada />} */}

                <div
                  className="grupoInversores"
                  css={css`
                    padding: 30px;
                    border: 1px solid #e1e1e1;
                    margin-bottom: 20px;
                  `}
                >
                  <div
                    css={css`
                      width: 50%;
                      margin: 0 auto;
                      margin-top: 10px;
                      margin-bottom: 20px;
                    `}
                  >
                    <CircularProgressbar
                      value={(totalCubos * 100) / precio}
                      styles={buildStyles({
                        pathColor: totalCubos < precio ? "#3B82F6" : "#DC2626",
                        textColor: totalCubos < precio ? "#3B82F6" : "#DC2626",
                        trailColor: "#eee",
                        strokeLinecap: "butt",
                      })}
                      text={`${((totalCubos * 100) / precio).toFixed(2)}%`}
                    />
                  </div>
                  {inversores != undefined && inversores.length === 0 ? (
                    <p
                      css={css`
                        text-align: center;
                        font-weight: bold;
                        margin: 30px;
                      `}
                    >
                      Aún no hay inversores
                    </p>
                  ) : (
                    <>
                      <Precio>
                        <span>Presupuesto: </span>{" "}
                        {formatearPresupuesto(parseFloat(precio))}
                      </Precio>
                      <Precio
                        css={css`
                          color: ${precio - totalCubos < 0 && "#dc2626"};
                        `}
                      >
                        <span
                          css={css`
                            color: ${precio - totalCubos < 0 &&
                            "#dc2626"} !important;
                          `}
                        >
                          Disponible:{" "}
                        </span>{" "}
                        {formatearPresupuesto(parseFloat(precio - totalCubos))}
                      </Precio>
                      <Precio>
                        <span>Gastado: </span>{" "}
                        {formatearPresupuesto(parseFloat(totalCubos))}
                      </Precio>
                      <p
                        css={css`
                          font-weight: bold;
                          margin-bottom: 10px;
                        `}
                      >
                        Lista de Gastos{" "}
                      </p>
                      {/* Barra de búsqueda */}
                      <div
                        css={css`
                          position: relative;
                          margin-bottom: 15px;
                        `}
                      >
                        <input
                          value={filtro}
                          onChange={handleFiltroChange}
                          type="text"
                          placeholder="Buscar gastos..."
                          css={css`
                            width: 100%;
                            background-color: #1b1b1b;
                            padding: 10px;
                            color: white;
                            padding-right: 50px;
                            border: none;
                          `}
                        />
                        <i
                          className="bx bx-search-alt-2"
                          css={css`
                            position: absolute;
                            right: 10px;
                            color: white;
                            top: 7px;
                            font-size: 30px;
                          `}
                        ></i>
                      </div>

                      <ul
                        css={css`
                          .swipe-action__leading {
                            background-color: #3b82f6;
                            color: white;
                            margin-bottom: 20px;
                          }

                          .swipe-action__trailing {
                            background-color: #db2777;
                            color: white;
                            margin-bottom: 20px;
                          }

                          .swipeable-list .swipe-action {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-size: 2.4rem;
                            text-align: right;
                          }
                        `}
                      >
                        {inversores &&
                          gastosFiltrados.map((inversor, i) => (
                            <div>
                              {esCreadorInversor(inversor.usuarioId) &&
                              estado ? (
                                <SwipeableList>
                                  <SwipeableListItem
                                    leadingActions={leadingActions(inversor.id)}
                                    trailingActions={trailingActions(
                                      inversor.id
                                    )}
                                  >
                                    <ListaComentario
                                      key={`${inversor.usuarioId}-${i}`}
                                      css={css`
                                        border: 1px solid #e1e1e1;
                                        padding: 2rem;
                                        width: 100%;
                                        margin-bottom: 20px;
                                        background-color: var(--grisBotones);
                                        @media (max-width: 500px) {
                                          font-size: 10px;
                                          padding: 0.6rem;
                                        }
                                      `}
                                    >
                                      {esCreadorInversor(
                                        inversor.usuarioId
                                      ) && (
                                        <CreadorProducto
                                          css={css`
                                            @media (max-width: 550px) {
                                              font-size: 10px;
                                              padding: 0.2rem 1rem;
                                              height: 20px;
                                            }
                                          `}
                                        >
                                          Tu Gasto
                                        </CreadorProducto>
                                      )}
                                      <div
                                        css={css`
                                          display: flex;
                                          width: 100%;
                                        `}
                                      >
                                        <div
                                          className="contenedorPerfil"
                                          css={css`
                                            width: 20%;
                                          `}
                                        >
                                          <img
                                            src={
                                              inversor.icono != null
                                                ? inversor.icono
                                                : "/static/img/imagenPerfil.png"
                                            }
                                          />
                                        </div>
                                        <div
                                          css={css`
                                            margin-left: 10px;
                                            display: grid;
                                            width: 80%;
                                            grid-template-columns: 1fr 1fr;
                                            @media (max-width: 550px) {
                                              display: flex;
                                              flex-direction: column;
                                            }
                                          `}
                                        >
                                          <div>
                                            <p>
                                              Titular:
                                              <span
                                                css={css`
                                                  font-weight: bold;
                                                `}
                                              >
                                                {""} {inversor.usuarioNombre}
                                              </span>
                                            </p>
                                            <p>
                                              Inversor:
                                              <span
                                                css={css`
                                                  font-weight: bold;
                                                `}
                                              >
                                                {""} {inversor.nombreInversor}
                                              </span>
                                            </p>

                                            <p>
                                              Descripción:
                                              <span
                                                css={css`
                                                  font-weight: bold;
                                                `}
                                              >
                                                {""} {inversor.descripcion}
                                              </span>
                                            </p>

                                            <p>
                                              Categoria:
                                              <span
                                                css={css`
                                                  font-weight: bold;
                                                `}
                                              >
                                                {""} {inversor.categoria}
                                              </span>
                                            </p>
                                            <p>
                                              Comprobante:
                                              <span
                                                css={css`
                                                  font-weight: bold;
                                                `}
                                              >
                                                {""} {inversor.comprobante}
                                              </span>
                                            </p>
                                            <p>
                                              Precio Unitario:{" "}
                                              <span
                                                css={css`
                                                  font-weight: bold;
                                                `}
                                              >
                                                {formatearPresupuesto(
                                                  parseFloat(
                                                    inversor.precioUnitario
                                                  )
                                                )}
                                              </span>
                                            </p>
                                            <p>
                                              IGV:{" "}
                                              <span
                                                css={css`
                                                  font-weight: bold;
                                                `}
                                              >
                                                {formatearPresupuesto(
                                                  parseFloat(inversor.igv)
                                                )}
                                              </span>
                                            </p>
                                            <p>
                                              Precio Base:
                                              <span
                                                css={css`
                                                  font-weight: bold;
                                                `}
                                              >
                                                {""}{" "}
                                                {formatearPresupuesto(
                                                  parseFloat(inversor.base)
                                                )}
                                              </span>
                                            </p>

                                            <Publicado>
                                              Publicado hace :{" "}
                                              {formatDistanceToNow(
                                                new Date(inversor.fecha),
                                                {
                                                  locale: es,
                                                }
                                              )}
                                            </Publicado>
                                          </div>
                                          <div
                                            css={css`
                                              display: grid;
                                              grid-template-columns: 1fr 2fr;

                                              div {
                                                display: flex;
                                                align-items: center;
                                                justify-content: center;
                                                flex-direction: column;
                                                gap: 5px;
                                                div {
                                                  display: flex;
                                                  align-items: center;
                                                  padding: 8px;
                                                  border-radius: 6px;
                                                  background-color: var(
                                                    --contBoton
                                                  );
                                                }
                                              }
                                            `}
                                          >
                                            <div>
                                              <div>
                                                <i class="bx bx-cube"></i>
                                                <span
                                                  css={css`
                                                    font-weight: bold;
                                                    @media (max-width: 550px) {
                                                      font-size: 10px;
                                                    }
                                                  `}
                                                >
                                                  {inversor.cubos}
                                                </span>
                                              </div>
                                            </div>
                                            <div>
                                              <div>
                                                <i class="bx bx-money-withdraw"></i>
                                                <span
                                                  css={css`
                                                    font-weight: bold;
                                                    @media (max-width: 550px) {
                                                      font-size: 10px;
                                                    }
                                                  `}
                                                >
                                                  {""}{" "}
                                                  {formatearPresupuesto(
                                                    parseFloat(inversor.parcial)
                                                  )}
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <ContenedorImagenes>
                                        <div
                                          css={css`
                                            border-right: solid white 1px;
                                          `}
                                        >
                                          <div className="tituloEntrada">
                                            Comprobante
                                          </div>
                                          <div className="tipoImagen">
                                            {TipoArchivo(
                                              inversor.imagenComprobante
                                            ) != "pdf" ? (
                                              <img
                                                id={`${inversor.id}`}
                                                src={inversor.imagenComprobante}
                                                style={{
                                                  width: "98%",
                                                  height: "150px",
                                                }}
                                              />
                                            ) : (
                                              <iframe
                                                id={`${inversor.id}`}
                                                src={inversor.imagenComprobante}
                                                style={{
                                                  width: "100%",
                                                  height: "150px",
                                                }}
                                              />
                                            )}

                                            <button
                                              id={`${inversor.id}`}
                                              onClick={Expandir}
                                              css={css`
                                                height: 30px;
                                              `}
                                            >
                                              EXPANDIR
                                            </button>
                                          </div>
                                        </div>
                                        <div>
                                          <div className="tituloEntrada">
                                            DEPOSITO
                                          </div>
                                          <div
                                            className="tipoImagen"
                                            id="imagenContenedor"
                                          >
                                            {TipoArchivo(
                                              inversor.imagenDeposito
                                            ) != "pdf" ? (
                                              <img
                                                id={`${inversor.id}a`}
                                                src={inversor.imagenDeposito}
                                                style={{
                                                  width: "98%",
                                                  height: "150px",
                                                }}
                                              />
                                            ) : (
                                              <iframe
                                                id={`${inversor.id}a`}
                                                src={inversor.imagenDeposito}
                                                style={{
                                                  width: "100%",
                                                  height: "150px",
                                                }}
                                              />
                                            )}
                                            <button
                                              id={`${inversor.id}a`}
                                              onClick={Expandir}
                                              css={css`
                                                height: 30px;
                                              `}
                                            >
                                              EXPANDIR
                                            </button>
                                          </div>
                                        </div>
                                      </ContenedorImagenes>
                                    </ListaComentario>
                                  </SwipeableListItem>
                                </SwipeableList>
                              ) : (
                                <ListaComentario
                                  key={`${inversor.usuarioId}-${i}`}
                                  css={css`
                                    border: 1px solid #e1e1e1;
                                    padding: 2rem;
                                    width: 100%;
                                    margin-bottom: 20px;
                                    position: relative;
                                  `}
                                >
                                  {esCreadorInversor(inversor.usuarioId) && (
                                    <div
                                      css={css`
                                        padding: 0.5rem 2rem;
                                        background-color: #da552f;
                                        color: #fff;
                                        position: absolute;
                                        right: 15px;
                                        bottom: 10px;
                                        text-transform: uppercase;
                                        font-weight: bold;
                                        @media (max-width: 550px) {
                                          font-size: 10px;
                                          padding: 0.2rem 1rem;
                                        }
                                      `}
                                    >
                                      Tu inversion
                                    </div>
                                  )}
                                  <div
                                    css={css`
                                      display: flex;
                                      width: 100%;
                                    `}
                                  >
                                    <div
                                      className="contenedorPerfil"
                                      css={css`
                                        width: 20%;
                                      `}
                                    >
                                      <img
                                        src={
                                          inversor.icono != null
                                            ? inversor.icono
                                            : "/static/img/imagenPerfil.png"
                                        }
                                      />
                                    </div>
                                    <div
                                      css={css`
                                        margin-left: 10px;
                                        width: 80%;
                                        display: grid;
                                        grid-template-columns: 1fr 1fr;
                                        @media (max-width: 550px) {
                                          display: flex;
                                          flex-direction: column;
                                          font-size: 10px;
                                        }
                                      `}
                                    >
                                      <div>
                                        <p>
                                          Titular:
                                          <span
                                            css={css`
                                              font-weight: bold;
                                            `}
                                          >
                                            {""} {inversor.usuarioNombre}
                                          </span>
                                        </p>
                                        <p>
                                          Inversor:
                                          <span
                                            css={css`
                                              font-weight: bold;
                                            `}
                                          >
                                            {""} {inversor.nombreInversor}
                                          </span>
                                        </p>
                                        <p>
                                          Descripción:
                                          <span
                                            css={css`
                                              font-weight: bold;
                                            `}
                                          >
                                            {""} {inversor.descripcion}
                                          </span>
                                        </p>

                                        <p>
                                          Categoria:
                                          <span
                                            css={css`
                                              font-weight: bold;
                                            `}
                                          >
                                            {""} {inversor.categoria}
                                          </span>
                                        </p>
                                        <p>
                                          Comprobante:
                                          <span
                                            css={css`
                                              font-weight: bold;
                                            `}
                                          >
                                            {""} {inversor.comprobante}
                                          </span>
                                        </p>
                                        <p>
                                          Precio Unitario:{" "}
                                          <span
                                            css={css`
                                              font-weight: bold;
                                            `}
                                          >
                                            {formatearPresupuesto(
                                              parseFloat(
                                                inversor.precioUnitario
                                              )
                                            )}
                                          </span>
                                        </p>
                                        <p>
                                          IGV:{" "}
                                          <span
                                            css={css`
                                              font-weight: bold;
                                            `}
                                          >
                                            {formatearPresupuesto(
                                              parseFloat(inversor.igv)
                                            )}
                                          </span>
                                        </p>
                                        <p>
                                          Precio Base:
                                          <span
                                            css={css`
                                              font-weight: bold;
                                            `}
                                          >
                                            {""}{" "}
                                            {formatearPresupuesto(
                                              parseFloat(inversor.base)
                                            )}
                                          </span>
                                        </p>
                                        <Publicado>
                                          Publicado hace :{" "}
                                          {formatDistanceToNow(
                                            new Date(inversor.fecha),
                                            {
                                              locale: es,
                                            }
                                          )}
                                        </Publicado>
                                      </div>
                                      <div
                                        css={css`
                                          display: grid;
                                          grid-template-columns: 1fr 2fr;
                                          gap: 10px;

                                          div {
                                            display: flex;
                                            align-items: center;
                                            justify-content: center;
                                            flex-direction: column;
                                            gap: 5px;
                                            div {
                                              display: flex;
                                              align-items: center;
                                              padding: 8px;
                                              border-radius: 6px;
                                              background-color: var(
                                                --contBoton
                                              );
                                            }
                                          }
                                        `}
                                      >
                                        <div>
                                          <div>
                                            <i class="bx bx-cube"></i>
                                            <span
                                              css={css`
                                                font-weight: bold;
                                                @media (max-width: 550px) {
                                                  font-size: 10px;
                                                }
                                              `}
                                            >
                                              {inversor.cubos}
                                            </span>
                                          </div>
                                        </div>
                                        <div>
                                          <div>
                                            <i class="bx bx-money-withdraw"></i>
                                            <span
                                              css={css`
                                                font-weight: bold;
                                                @media (max-width: 550px) {
                                                  font-size: 10px;
                                                }
                                              `}
                                            >
                                              {""}{" "}
                                              {formatearPresupuesto(
                                                parseFloat(inversor.parcial)
                                              )}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <ContenedorImagenes>
                                    <div
                                      css={css`
                                        border-right: solid white 1px;
                                      `}
                                    >
                                      <div className="tituloEntrada">
                                        Comprobante
                                      </div>
                                      <div className="tipoImagen">
                                        {TipoArchivo(
                                          inversor.imagenComprobante
                                        ) != "pdf" ? (
                                          <img
                                            id={`${inversor.id}`}
                                            src={inversor.imagenComprobante}
                                            style={{
                                              width: "98%",
                                              height: "150px",
                                            }}
                                          />
                                        ) : (
                                          <iframe
                                            id={`${inversor.id}`}
                                            src={inversor.imagenComprobante}
                                            style={{
                                              width: "100%",
                                              height: "150px",
                                            }}
                                          />
                                        )}

                                        <button
                                          id={`${inversor.id}`}
                                          onClick={Expandir}
                                          css={css`
                                            height: 30px;
                                          `}
                                        >
                                          EXPANDIR
                                        </button>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="tituloEntrada">
                                        DEPOSITO
                                      </div>
                                      <div
                                        className="tipoImagen"
                                        id="imagenContenedor"
                                      >
                                        {TipoArchivo(inversor.imagenDeposito) !=
                                        "pdf" ? (
                                          <img
                                            id={`${inversor.id}a`}
                                            src={inversor.imagenDeposito}
                                            style={{
                                              width: "98%",
                                              height: "150px",
                                            }}
                                          />
                                        ) : (
                                          <iframe
                                            id={`${inversor.id}a`}
                                            src={inversor.imagenDeposito}
                                            style={{
                                              width: "100%",
                                              height: "150px",
                                            }}
                                          />
                                        )}
                                        <button
                                          id={`${inversor.id}a`}
                                          onClick={Expandir}
                                          css={css`
                                            height: 30px;
                                          `}
                                        >
                                          EXPANDIR
                                        </button>
                                      </div>
                                    </div>
                                  </ContenedorImagenes>
                                </ListaComentario>
                              )}
                            </div>
                          ))}
                      </ul>
                    </>
                  )}
                </div>
              </aside>
            </ContenedorProducto>
            <Mapa id="mapaProducto">
              <MapPage cordenadas={cordenadas} />
            </Mapa>
            {puedeBorrar() && (
              <Boton onClick={eliminarProducto}>Eliminar Producto</Boton>
            )}
          </div>
        )}
      </>
    </Layout>
  );
};

export default Producto;
