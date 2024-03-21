import sumarSaldo from "./actualizarSaldo";

const enviarGanancia = (inversores, monto) => {
  inversores.map((inversor) => {
    const ganancia = (monto * inversor["cubos"]) / 100;
    const id = inversor["usuarioId"];
    sumarSaldo(id, ganancia);
  });
};
export default enviarGanancia;
