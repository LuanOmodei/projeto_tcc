import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import ItemCard from '../components/ItemCard';

const HomeScreen = ({ navigation }) => {
  const [itens, setItens] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchItens();
    });
    return unsubscribe;
  }, [navigation]);

  const fetchItens = () => {
    axios.get('http://10.0.0.2:3000/itens')
      .then(response => setItens(response.data))
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={itens}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ItemCard item={item} onPress={() => navigation.navigate('Item', { item })} />
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddItem')}
      >
        <Text style={styles.addButtonText}>Adicionar Item</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  addButton: {
    backgroundColor: '#28a745',
    padding: 15,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default HomeScreen;