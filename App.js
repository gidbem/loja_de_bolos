import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppProvider, useApp} from './src/context/AppContext';
import Catalogo from './src/screens/Catalogo';
import Detalhe from './src/screens/Detalhe';
import Perfil from './src/screens/Perfil';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function LojaStack() {
  const {cores} = useApp();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: cores.card},
        headerTintColor: cores.destaque,
        headerTitleStyle: { color: cores.texto },
        contentStyle: {backgroundColor: cores.fundo},
      }}
    >
      <Stack.Screen name="Vitrine" component={Catalogo} options={{ title: 'Girina Store' }} />
      <Stack.Screen
        name="Detalhes"
        component={Detalhe}
        options={{ title: 'Detalhes do Jogo' }}
      />
    </Stack.Navigator>
  );
}

function Principal() {
  const {cores, carregado} = useApp();

  if (!carregado) {
    return (
      <View style={{flex: 1, justifyContent: 'center', backgroundColor: cores.fundo}}>
        <ActivityIndicator size="large" color={cores.destaque} />
      </View>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => (
          <Ionicons
            name={route.name === 'Loja' ? 'storefront-outline' : 'person-outline'}
            size={size}
            color={color}
          />
        ),
        tabBarActiveTintColor: cores.destaque,
        tabBarInactiveTintColor: cores.secundario,
        tabBarStyle: {backgroundColor: cores.card},
        headerStyle: {backgroundColor: cores.card},
        headerTintColor: cores.destaque,
        headerTitleStyle: {color: cores.texto},
      })}
    >
      <Tab.Screen name="Loja" component={LojaStack} options={{ headerShown: false }} />
      <Tab.Screen name="Perfil" component={Perfil} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <NavigationContainer>
          <Principal />
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
}