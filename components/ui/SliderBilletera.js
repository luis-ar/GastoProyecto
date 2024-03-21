import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";

const Contenedor = styled.div`
  width: 100%;
  height: 80px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  .splide__pagination {
    background-color: red;
    position: absolute;
    top: 50px;
  }
`;
const Image = styled.img`
  width: 100%;
  height: 50px;
  object-fit: cover;
  cursor: pointer;
`;
const SliderBilletera = () => {
  return (
    <>
      <Contenedor className="container">
        <Splide
          aria-label="My Favorite Images"
          options={{
            rewind: true,
            gap: "1rem",
            autoplay: true,
            interval: "3000",
            arrows: false,
          }}
        >
          <SplideSlide>
            <Image src="/static/img/familia.jpg" alt="Picture of the author" />
          </SplideSlide>
          <SplideSlide>
            <Image src="/static/img/casa.jpg" alt="Picture of the author" />
          </SplideSlide>
          <SplideSlide>
            <Image
              src="/static/img/departamento.jpg"
              alt="Picture of the author"
            />
          </SplideSlide>{" "}
          <SplideSlide>
            <Image
              src="/static/img/recreacion.jpg"
              alt="Picture of the author"
            />
          </SplideSlide>
        </Splide>
      </Contenedor>
    </>
  );
};

export default SliderBilletera;
