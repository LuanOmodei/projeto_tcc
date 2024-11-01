import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ItemScreen = ({ route, navigation }) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      {item.imagem && (
        <Image source={{ uri: item.imagem }} style={styles.image} />
      )}
      <Text style={styles.title}>{item.nome}</Text>
      <Text style={styles.description}>{item.descricao}</Text>
      <Text style={styles.price}>Preço: R$ {item.preco}</Text>
      <Text style={styles.category}>Categoria: {item.categoria}</Text>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditItem', { item })}
      >
        <Text style={styles.editButtonText}>Editar Item</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  image: { width: '100%', height: 200 },
  title: { fontSize: 24, fontWeight: 'bold', marginVertical: 10 },
  description: { fontSize: 16, marginVertical: 10 },
  price: { fontSize: 18, marginVertical: 5 },
  category: { fontSize: 18, marginVertical: 5 },
  editButton: {
    backgroundColor: '#007bff',
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  editButtonText: { color: '#fff', fontSize: 18 },
});

export default ItemScreen;
