import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

async function restarSaldoCreador(uid, cantidadAdicional) {
  try {
    const db = getFirestore();
    const usuarioDocRef = doc(db, "usuarios", uid);

    // Obtener el saldo actual del usuario
    const usuarioSnapshot = await getDoc(usuarioDocRef);

    if (usuarioSnapshot.exists()) {
      const saldoActual = usuarioSnapshot.data().saldo;

      // Sumar la cantidad adicional al saldo actual
      const nuevoSaldo =
        parseFloat(saldoActual) - parseFloat(cantidadAdicional);

      // Actualizar el campo "saldo" en el documento del usuario
      await updateDoc(usuarioDocRef, {
        saldo: nuevoSaldo,
      });

      // console.log(
      //   "Saldo actualizado correctamente. Nuevo saldo creador:",
      //   nuevoSaldo
      // );
    } else {
      console.error(
        'El usuario no tiene un documento en la colección "usuarios".'
      );
    }
  } catch (error) {
    console.error("Error al sumar al saldo:", error);
  }
}

export default restarSaldoCreador;
