import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';

import HomePage from './src/pages/HomePage';
import EstablishmentMenuPage from './src/pages/EstablishmentMenuPage';
import EstablishmentArea from './src/pages/EstablishmentArea';
import EstablishmentRegister from './src/pages/EstablishmentRegister';
import EstablishmentLogin from './src/pages/EstablishmentLogin';
import MenuManagementPage from './src/pages/MenuManagementPage';
import EstablishmentEditPage from './src/pages/EstablishmentEditPage'; 
import ChangePasswordPage from './src/pages/ChangePasswordPage'; 

export type RootStackParamList = {
  HomePage: undefined;
  EstablishmentMenuPage: { estabelecimentoId: number };
  EstablishmentArea: undefined;
  EstablishmentRegister: undefined;
  EstablishmentLogin: { estabelecimentoId: number; estabelecimentoNome?: string };
  MenuManagementPage: { estabelecimentoId: number };
  EstablishmentEditPage: { estabelecimentoId: number; estabelecimentoNome: string }; 
  ChangePasswordPage: { estabelecimentoId: number }; 
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomePage"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#161616', // Cor azul para todas as telas
          },
          headerTintColor: '#fff', // Texto branco no cabeçalho
        }}
      >
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{ title: 'Estabelecimentos' }}
        />
        <Stack.Screen
          name="EstablishmentMenuPage"
          component={EstablishmentMenuPage}
          options={{ title: 'Cardápio' }}
        />
        <Stack.Screen
          name="EstablishmentArea"
          component={EstablishmentArea}
          options={{ title: 'Área do Estabelecimento' }}
        />
        <Stack.Screen
          name="EstablishmentRegister"
          component={EstablishmentRegister}
          options={{ title: 'Cadastrar Estabelecimento' }}
        />
        <Stack.Screen
          name="EstablishmentLogin"
          component={EstablishmentLogin}
          options={{ title: 'Login do Estabelecimento' }}
        />
        <Stack.Screen
          name="MenuManagementPage"
          component={MenuManagementPage}
          options={{ title: 'Gerenciar Cardápio' }}
        />
        <Stack.Screen
          name="EstablishmentEditPage"
          component={EstablishmentEditPage}
          options={{ title: 'Editar Estabelecimento' }}
        />
        <Stack.Screen
          name="ChangePasswordPage"
          component={ChangePasswordPage}
          options={{ title: 'Alterar Senha' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    color: '#000',
  },
});

export default App;
