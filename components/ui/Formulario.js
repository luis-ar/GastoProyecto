import styled from "@emotion/styled";

export const Formulario = styled.form`
  max-width: 600px;
  width: 95%;
  margin: 5rem auto 0 auto;
  fieldset {
    margin: 2rem 0;
    border: 1px solid #e1e1e1;
    font-size: 2rem;
    padding: 2rem;
    background-color: #a6abab;
  }
  legend {
    color: white;
    font-size: 2rem;
  }
`;

export const Campo = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  label {
    flex: 0 0 150px;
    font-size: 1.8rem;
  }

  textarea,
  select {
    flex: 1;
    padding: 1rem;
  }
  select {
    text-align: center;
  }
  textarea {
    height: 400px;
  }
  input {
    width: 150px;
    padding: 1rem;
    flex: 1;
    @media (min-width: 400px) {
      flex: 1;
    }
  }
`;

export const InputSubmit = styled.input`
  background-color: var(--naranja);
  width: 100%;
  padding: 1.5rem;
  text-align: center;
  color: #fff;
  font-size: 1.8rem;
  text-transform: uppercase;
  border: none;
  font-family: "PT Sans", sans-serif;
  font-weight: 700;
  margin-bottom: 20px;
  &:hover {
    cursor: pointer;
  }
`;

export const ErrorMostrar = styled.p`
  background-color: red;
  padding: 1rem;
  font-family: "PT Sans", sans-serif;
  font-weight: 700;
  font-size: 1.4rem;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
  margin: 2rem 0;
`;

export const Invertir = styled.button`
  background-color: var(--naranja);
  width: 50%;
  padding: 1.5rem;
  text-align: center;
  color: #fff;
  font-size: 1.8rem;
  text-transform: uppercase;
  border: none;
  font-family: "PT Sans", sans-serif;
  font-weight: 700;
  margin-top: 20px;
  margin-bottom: 20px;
  &:hover {
    cursor: pointer;
    background-color: #c95e14;
  }
`;
