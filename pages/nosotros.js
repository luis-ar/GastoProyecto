import React, { useEffect } from "react";
import estilos from "@/styles/Nosotros.module.css";
import styled from "@emotion/styled";
import Layout from "@/components/layout/Layout";

const Contenedor = styled.section`
  .imagenLight {
    position: fixed;
    background: rgb(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translate(100%);
    transition: transform 0.2s ease-in-out;
    z-index: 10;
  }
  .show {
    transform: translate(0);
  }
  .showImage {
    transform: scale(1);
  }

  .agregarImagen {
    object-fit: cover;
    width: 60%;
    border-radius: 10px;
    transform: scale(1);
    transition: transform 0.3s 0.2s;
  }
`;
const nosotros = () => {
  const ContenedorLight = (e) => {
    const imagenesLight = document.querySelector(".agregarImagen");
    const contenedorLight = document.querySelector(".imagenLight");
    if (e.target !== imagenesLight) {
      contenedorLight.classList.toggle("show");
      imagenesLight.classList.toggle("showImage");
    }
  };
  const ImagenAmplia = (e) => {
    const imagenesLight = document.querySelector("#agregarImagen");
    const contenedorLight = document.querySelector("#imagenLight");
    imagenesLight.src = e.target.src;
    contenedorLight.classList.toggle("show");
    imagenesLight.classList.toggle("showImage");
  };

  useEffect(() => {}, []);
  return (
    <Layout>
      <div style={{ margin: "0px" }}>
        <header className={estilos.header} id="inicio">
          <nav className={estilos.menuNavegacion}>
            <a href="#inicio">Inicio</a>
            <a href="#servicio">Servicio</a>
            <a href="#portafolio">Portafolio</a>
            <a href="#expertos">Expertos</a>
            <a href="#contacto">Contacto</a>
          </nav>
          <div className={`${estilos.contenedor1} ${estilos.head}`}>
            <h1 className={estilos.titulo}>
              Cada propiedad tiene una historia, ¡hagamos que la tuya comience
              aquí!
            </h1>
          </div>
        </header>
        <main>
          <section className={`${estilos.services} ${estilos.contenedor1}`}>
            <h2 className={estilos.subtitulo}>Nuestro Servicio</h2>
            <div className={estilos.contenedorServicio}>
              <img src="/static/img/future.png" alt="" />
              <div className={estilos.checklistServicio}>
                <div className={estilos.service}>
                  <h3 className={estilos.nService}>
                    <span className={estilos.number}>1</span>Venta de
                    Propiedades
                  </h3>
                  <p>
                    Asesoramiento en la compra de propiedades residenciales y
                    comerciales.
                  </p>
                </div>
                <div className={estilos.service}>
                  <h3 className={estilos.nService}>
                    <span className={estilos.number}>2</span>
                    Búsqueda y Selección de Propiedades
                  </h3>
                  <p>
                    Ayuda en la búsqueda de propiedades que se ajusten a los
                    requisitos de los clientes.
                  </p>
                </div>
                <div className={estilos.service}>
                  <h3 className={estilos.nService}>
                    <span className={estilos.number}>3</span>Inversiones
                    Inmobiliarias
                  </h3>
                  <p>
                    Asesoramiento en la inversión en propiedades con fines de
                    alquiler o reventa.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className={estilos.gallery} id="portafolio">
            <div className={estilos.contenedor1}>
              <h2 className={estilos.subtitulo}>Galeria</h2>
              <div className={estilos.contenedorGaleria}>
                <img
                  src="/static/img/imagen1.jpg"
                  onClick={ImagenAmplia}
                  alt=""
                  className={estilos.imgGaleria}
                />
                <img
                  src="/static/img/imagen2.jpeg"
                  onClick={ImagenAmplia}
                  alt=""
                  className={estilos.imgGaleria}
                />
                <img
                  src="/static/img/imagen6.jpg"
                  onClick={ImagenAmplia}
                  alt=""
                  className={estilos.imgGaleria}
                />
                <img
                  src="/static/img/imagen4.jpg"
                  onClick={ImagenAmplia}
                  alt=""
                  className={estilos.imgGaleria}
                />
                <img
                  src="/static/img/imagen5.webp"
                  onClick={ImagenAmplia}
                  alt=""
                  className={estilos.imgGaleria}
                />
                <img
                  src="/static/img/imagen3.jpg"
                  onClick={ImagenAmplia}
                  alt=""
                  className={estilos.imgGaleria}
                />
              </div>
            </div>
          </section>
          <Contenedor>
            <section
              className="imagenLight"
              id="imagenLight"
              onClick={ContenedorLight}
            >
              <img
                src="/static/img/familia.jpg"
                alt=""
                className="agregarImagen"
                id="agregarImagen"
              />
            </section>
          </Contenedor>

          <div className={estilos.contenedor1} id="expertos">
            <h2 className={estilos.subtitulo}>Expertos en:</h2>
            <section className={estilos.experts}>
              <div className={estilos.card}>
                <div className={`${estilos.face} ${estilos.front}`}>
                  <img src="/static/img/nosotros1.webp" />
                  <h3 className={estilos.nExpert}>Propiedades Residenciales</h3>
                </div>

                <div className={`${estilos.face} ${estilos.back}`}>
                  <h3>Propiedades Residenciales</h3>
                  <p>
                    Nos enfocamos en la compra, venta y alquiler de propiedades
                    residenciales, como casas, apartamentos y condominios.
                  </p>
                  <div className={estilos.link}></div>
                </div>
              </div>

              <div className={estilos.card}>
                <div className={`${estilos.face} ${estilos.front}`}>
                  <img src="/static/img/nosotros2.jpg" />
                  <h3 className={estilos.nExpert}>Inversiones Inmobiliarias</h3>
                </div>

                <div className={`${estilos.face} ${estilos.back}`}>
                  <h3>Inversiones Inmobiliarias</h3>
                  <p>
                    Brindamos asesoramiento a inversores interesados en comprar
                    propiedades con fines de inversión, ya sea para alquiler o
                    reventa
                  </p>
                  <div className={estilos.link}></div>
                </div>
              </div>

              <div className={estilos.card}>
                <div className={`${estilos.face} ${estilos.front}`}>
                  <img src="/static/img/nosotros3.jpg" />
                  <h3 className={estilos.nExpert}>Asesoramiento Financiero</h3>
                </div>

                <div className={`${estilos.face} ${estilos.back}`}>
                  <h3>Asesoramiento Financiero</h3>
                  <p>
                    Brindamos asesoramiento financiero en términos de
                    inversiones inmobiliarias, préstamos hipotecarios y opciones
                    de financiamiento.
                  </p>
                  <div className={estilos.link}></div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default nosotros;
