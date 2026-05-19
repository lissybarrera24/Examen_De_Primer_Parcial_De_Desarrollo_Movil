import React, { useState, useContext } from 'react';

import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet
} from 'react-native';

import { BancoContext } from '../context/BancoContext';

export default function Transferencias() {

  const [cuenta, setCuenta] = useState('');
  const [destinatario, setDestinatario] = useState('');
  const [monto, setMonto] = useState('');

  const { transferirSaldo } = useContext(BancoContext);

  const realizarTransferencia = () => {

    const montoNumero = parseInt(monto);

    const resultado = transferirSaldo(
      montoNumero,
      destinatario
    );

    if (resultado) {

      Alert.alert(
        "Éxito",
        "Transferencia realizada correctamente"
      );

      setCuenta('');
      setDestinatario('');
      setMonto('');

    } else {

      Alert.alert(
        "Error",
        "No cuenta con el saldo para completar la transacción"
      );
    }
  };

  return (

    <View style={styles.container}>

      <TextInput
        placeholder="Número de Cuenta"
        value={cuenta}
        onChangeText={setCuenta}
        style={styles.input}
      />

      <TextInput
        placeholder="Nombre del Destinatario"
        value={destinatario}
        onChangeText={setDestinatario}
        style={styles.input}
      />

      <TextInput
        placeholder="Monto"
        value={monto}
        onChangeText={setMonto}
        keyboardType="numeric"
        style={styles.input}
      />

      <Button
        title="Transferir Saldo"
        onPress={realizarTransferencia}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20
  },

  input: {
    borderWidth: 1,
    marginBottom: 15,
    padding: 10
  }

});