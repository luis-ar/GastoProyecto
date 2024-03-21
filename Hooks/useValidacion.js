import React, { useState, useEffect } from "react";

const useValidacion = (stateInicial, validar, fn) => {
  const [valores, guardarValores] = useState(stateInicial);
  const [errores, guardarErrores] = useState({});
  const [submitForm, guardarSubmitForm] = useState(false);
  useEffect(() => {
    if (submitForm) {
      const noErrores = Object.keys(errores).length === 0;
      if (noErrores) {
        fn(); //Funcion que se ejecuta en el componente
      }
      guardarSubmitForm(false);
    }
  }, [errores]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      if (!isNumeric(value) && value !== "") {
        return;
      }
    }

    if (name === "telefono") {
      if (!isNumeric(value) && value !== "") {
        return;
      }
    }
    if (name === "monto") {
      if (!isNumeric(value) && value !== "") {
        return;
      }
    }

    // Actualizar el estado del formulario
    guardarValores({
      ...valores,
      [name]: value,
    });
  };

  // Función para verificar si una cadena es numérica
  const isNumeric = (str) => {
    return /^\d+$/.test(str);
  };
  // Funcion que se ejecuta cuando el usuario hace submit
  const handleSumit = (e) => {
    e.preventDefault();
    const erroresValidacion = validar(valores);
    guardarErrores(erroresValidacion);
    guardarSubmitForm(true);
  };

  //cuando se realiza el evento de blur
  const handleBlur = () => {
    const erroresValidacion = validar(valores);
    guardarErrores(erroresValidacion);
  };

  return {
    valores,
    errores,
    handleSumit,
    handleChange,
    handleBlur,
  };
};

export default useValidacion;
