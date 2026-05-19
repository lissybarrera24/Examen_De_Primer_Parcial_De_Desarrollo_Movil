# Examen_De_Primer_Parcial_De_Desarrollo_Movil
App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from 'react-navigation/botton-tabs';

import Inicio from  './screens/Inicio';
import Transferencias from './screens/Transferencias';
import Historial from './screens/Historial';

import { BancoProvider } from './context/BancoContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <BancoProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Inicio" component={Inicio} />
          <Tab.Screen name="Transferencias" component={Transferencias} />
          <Tab.Screen name= "Historial" component={Historial} />
        <Tab.Navigator>
      <NavigationContainer>
    <BancoProvider>
  );
}

Banco.js
import React, { createContext, useState } from 'react';

export const BancoContext = createContext();

export const BancoProvider = ({ children }) => {

  const [saldo, setSaldo] = useState(10000);

  const [transacciones, setTransacciones] = useState([]);

  const depositarSaldo = () => {
    setSaldo(saldo + 500);

    setTransacciones([
      ...transacciones,
      "Deposito de L.500"
    ]);
  };

  const transferirSaldo = (monto, destinatario) => {

    if (monto <= saldo) {

      setSaldo(saldo  - monto);

      setTransacciones([
        ...transacciones,
        `Transferencia de L.${monto} a ${destinatario}`
      ]);

      return true;

    } else {
      return false;
    }
  };

  return (
    <BancoContext.Provider
      value={{
        saldo,
        transacciones,
        depositarSaldo,
        transferirSaldo
      }}
    >
      {children}
    </BancoContext.Provider>
  );
};
Inicio.js
import React, { useContext } from 'react';
 import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
 } from  'react-native';

import { BancoContext } from '../context/BancoContext';

export default function Inicio() {

    const {
    saldo,
    depositarSaldo,
    transacciones
  } = useContext(BancoContext);

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        Bienvenido Usuario
      </Text>

      <Text style={styles.saldo}>
        Saldo Actual: L.{saldo}
      </Text>

      <Button
        title="Depositar Saldo"
        onPress={depositarSaldo}
      />

      <Text style={styles.subtitulo}>
        Transacciones
      </Text>

      <FlatList
        data={transacciones}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item}
          </Text>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20
  },

  titulo: {
    fontSize: 24,
    marginBottom: 20
  },

  saldo: {
    fontSize: 20,
    marginBottom: 20
  },

  subtitulo: {
    fontSize: 18,
    marginTop: 20
  },

  item: {
    padding: 10,
    borderBottomWidth: 1
  }

});
Transferencia-js
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

Historial.js
import React, { useContext } from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet
} from 'react-native';

import { BancoContext } from '../context/BancoContext';

export default function Historial() {

  const { transacciones } = useContext(BancoContext);

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Historial de Transacciones
      </Text>

      <Text style={styles.total}>
        Total: {transacciones.length}
      </Text>

      <FlatList
        data={transacciones}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item}
          </Text>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20
  },

  titulo: {
    fontSize: 22,
    marginBottom: 20
  },

  total: {
    fontSize: 18,
    marginBottom: 20
  },

  item: {
    padding: 10,
    borderBottomWidth: 1
  }

});
