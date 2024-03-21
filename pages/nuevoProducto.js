import {
  Formulario,
  Campo,
  InputSubmit,
  ErrorMostrar,
} from "../components/ui/Formulario";
import Layout from "../components/layout/Layout";
import React, { useState, useContext } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { FirebaseContext } from "../firebase";
import Router, { useRouter } from "next/router";
import { collection, addDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "@firebase/storage";
import Error404 from "@/components/layout/404";

//Validaciones
import useValidacion from "../Hooks/useValidacion";
import validarCrearProducto from "../Validacion/validarCrearProducto";
import MapPage from "@/components/ui/MapaPrueba";
const STATE_INICIAL = {
  nombre: "",
  empresa: "",
  // imgen: "",
  url: "",
  descripcion: "",
  categoria: "",
  precio: "",
};
const Mapa = styled.div`
  width: 100%;
  height: 30vh;
`;
const nuevoProducto = () => {
  // States para la subida de la imagen
  const [uploading, setUploading] = useState(false);
  const [urlimagen, setURLImage] = useState("");
  ///
  const [error, guardarError] = useState(false);
  const [cordenadas, setCordenadas] = useState({});
  //extra
  //context con las operaciones crud de firebase

  const { usuario, firebase } = useContext(FirebaseContext);
  //hook de routing para redireccionar
  const router = useRouter();
  const crearProducto = async () => {
    //si el usuario no esta autenticado llevar al login
    if (!usuario) {
      return router.push("/login");
    }
    //crear objeto de nuevo producto
    const producto = {
      nombre,
      empresa,
      url,
      urlimagen,
      descripcion,
      votos: 0,
      comentarios: [],
      creado: Date.now(),
      creador: {
        id: usuario.uid,
        nombre: usuario.displayName,
      },
      haVotado: [],
      categoria,
      precio,
      cordenadas,
      inversores: [],
      estado: true,
      monto: 0,
      depositoRecaudado: false,
    };
    //insertarlo en la base de datos
    // firebase.db.collection("productos").add(producto);
    try {
      await addDoc(collection(firebase.db, "productos"), producto);
      return router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageUpload = (e) => {
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
          setURLImage(url);
        });
      }
    );
  };
  const { valores, errores, handleSumit, handleChange, handleBlur } =
    useValidacion(STATE_INICIAL, validarCrearProducto, crearProducto);
  //OnBlur -> cuando salgo del input lo valida sin la necesidad de presion el boton de crear cuenta
  const { nombre, empresa, imagen, url, descripcion, categoria, precio } =
    valores;

  return (
    <div>
      <Layout>
        {!usuario ? (
          <Error404 />
        ) : (
          <div
            css={css`
              @media (min-width: 1000px) {
                margin-left: 300px;
              }
            `}
          >
            <h1
              css={css`
                text-align: center;
                margin-top: 5rem;
                color: white;
              `}
            >
              Nuevo Producto
            </h1>
            <Formulario onSubmit={handleSumit} noValidate>
              <fieldset>
                <legend>Información General</legend>

                {errores.nombre && (
                  <ErrorMostrar>{errores.nombre}</ErrorMostrar>
                )}

                <Campo>
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Nombre del Producto"
                    value={nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>
                {errores.empresa && (
                  <ErrorMostrar>{errores.empresa}</ErrorMostrar>
                )}

                <Campo>
                  <label htmlFor="empresa">Empresa</label>
                  <input
                    type="text"
                    id="empresa"
                    name="empresa"
                    placeholder="Nombre Empresa o Compañia"
                    value={empresa}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>
                {errores.imagen && (
                  <ErrorMostrar>{errores.imagen}</ErrorMostrar>
                )}

                <Campo>
                  <label htmlFor="imagen">Imagen</label>
                  <input
                    type="file"
                    id="imagen"
                    name="imagen"
                    value={imagen}
                    onChange={handleImageUpload}
                  />
                </Campo>
                {errores.url && <ErrorMostrar>{errores.url}</ErrorMostrar>}

                <Campo>
                  <label htmlFor="url">URL</label>
                  <input
                    type="url"
                    id="url"
                    name="url"
                    placeholder="URL de tu producto"
                    value={url}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>
                {errores.categoria && (
                  <ErrorMostrar>{errores.categoria}</ErrorMostrar>
                )}

                <Campo>
                  <label htmlFor="url">Categoria</label>
                  <select
                    id="categoria"
                    name="categoria"
                    value={categoria}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">-- Seleccione --</option>
                    <option value="departamento">Departamento</option>
                    <option value="terreno">Terreno</option>
                    <option value="casa">Casa</option>
                    <option value="oficina">Oficina</option>
                    <option value="localComercial">Local Comercial</option>
                    <option value="habilitacionUrbana">
                      Habilitación Urbana
                    </option>
                  </select>
                </Campo>
                {errores.precio && (
                  <ErrorMostrar>{errores.precio}</ErrorMostrar>
                )}

                <Campo>
                  <label htmlFor="url">Precio</label>
                  <input
                    type="number"
                    id="precio"
                    name="precio"
                    value={precio}
                    min={0}
                    placeholder="Precio del Producto"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>
                <Campo>
                  <label htmlFor="url">Ubicación</label>
                  <Mapa>
                    <MapPage setCordenadas={setCordenadas} />
                  </Mapa>
                </Campo>
              </fieldset>
              <fieldset>
                <legend>Sobre tu Producto</legend>
                {errores.descripcion && (
                  <ErrorMostrar>{errores.descripcion}</ErrorMostrar>
                )}

                <Campo>
                  <label htmlFor="descripcion">Descripcion</label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    value={descripcion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>
              </fieldset>

              {error && <ErrorMostrar>{error}</ErrorMostrar>}
              <InputSubmit
                type="submit"
                value="Crear Producto"
                css={css`
                  margin-bottom: 65px;
                `}
              />
            </Formulario>
          </div>
        )}
      </Layout>
    </div>
  );
};

export default nuevoProducto;
