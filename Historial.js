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