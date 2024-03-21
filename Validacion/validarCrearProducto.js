import React from "react";

const validarCrearProducto = (valores) => {
  let errores = {};
  //validar nombre del usuario
  if (!valores.nombre) {
    errores.nombre = "El nombre es obligatorio";
  }

  //validar empresa
  if (!valores.empresa) {
    errores.empresa = "El Nombre de la empresa es obligatoria";
  }

  //validar la url

  if (!valores.url) {
    errores.url = "La url del producto es obligatoria";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
    errores.url = "url mal formateada o no valida";
  }

  //validar descripcion

  if (!valores.descripcion) {
    errores.descripcion = "Agrega una descripcion de tu producto";
  }

  //validar categoria

  if (!valores.categoria) {
    errores.categoria = "Seleccione una categoria de su producto";
  }

  //validar categoria

  if (!valores.precio) {
    errores.precio = "Agrega un precio a tu producto";
  }

  return errores;
};

export default validarCrearProducto;
