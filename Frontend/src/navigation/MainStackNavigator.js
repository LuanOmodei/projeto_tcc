import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ItemScreen from '../screens/ItemScreen';
import AddItemScreen from '../screens/AddItemScreen';
import EditItemScreen from '../screens/EditItemScreen';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Cardápio' }} />
      <Stack.Screen name="Item" component={ItemScreen} options={{ title: 'Detalhes do Item' }} />
      <Stack.Screen name="AddItem" component={AddItemScreen} options={{ title: 'Adicionar Item' }} />
      <Stack.Screen name="EditItem" component={EditItemScreen} options={{ title: 'Editar Item' }} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;