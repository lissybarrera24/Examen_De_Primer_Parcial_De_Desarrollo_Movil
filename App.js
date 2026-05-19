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
