import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

async function restarSaldo(uid, uidCreador, cantidadAdicional) {
  try {
    const db = getFirestore();
    const usuarioDocRef = doc(db, "usuarios", uid);
    const creadorDocRef = doc(db, "usuarios", uidCreador);

    // Obtener el saldo actual del usuario
    const usuarioSnapshot = await getDoc(usuarioDocRef);
    const creadorSnapshot = await getDoc(creadorDocRef);

    if (usuarioSnapshot.exists() && creadorSnapshot.exists()) {
      const saldoActual = usuarioSnapshot.data().saldo;
      const saldoActualCreador = creadorSnapshot.data().saldo;
      let nuevoSaldoCreador;
      console.log("sald", saldoActual);
      // Sumar la cantidad adicional al saldo actual
      const nuevoSaldo =
        parseFloat(saldoActual) - parseFloat(cantidadAdicional);
      console.log("su nuevo saldo creadorrr", nuevoSaldo);

      // if (uid != uidCreador) {
      //   nuevoSaldoCreador =
      //     parseFloat(saldoActualCreador) + parseFloat(cantidadAdicional);
      // } else {
      //   nuevoSaldoCreador =
      //     parseFloat(nuevoSaldo) + parseFloat(cantidadAdicional);
      // }

      // Actualizar el campo "saldo" en el documento del usuario
      if (nuevoSaldo >= 0) {
        await updateDoc(usuarioDocRef, {
          saldo: nuevoSaldo,
        });

        // await updateDoc(creadorDocRef, {
        //   saldo: nuevoSaldoCreador,
        // });

        // console.log(
        //   "Saldo actualizado correctamente. Nuevo saldo:",
        //   nuevoSaldo
        // );
        // console.log(
        //   "Saldo actualizado correctamente. Nuevo saldo creador:",
        //   nuevoSaldoCreador
        // );
      } else {
        const mensaje = "saldo insuficiente";
        return mensaje;
      }
    } else {
      console.error(
        'El usuario no tiene un documento en la colección "usuarios".'
      );
    }
  } catch (error) {
    console.error("Error al al restar el saldo:", error);
  }
}

export default restarSaldo;
