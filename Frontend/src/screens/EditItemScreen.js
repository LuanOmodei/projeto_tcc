import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const EditItemScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const [nome, setNome] = useState(item.nome);
  const [descricao, setDescricao] = useState(item.descricao);
  const [preco, setPreco] = useState(item.preco.toString());
  const [categoria, setCategoria] = useState(item.categoria);
  const [imagem, setImagem] = useState(item.imagem);

  const handleUpdateItem = () => {
    const updatedItem = { nome, descricao, preco, categoria, imagem };
    axios.put(`http://10.0.0.2:3000/itens/${item.id}`, updatedItem)
      .then(() => navigation.goBack())
      .catch(error => console.error(error));
  };

  const handleDeleteItem = () => {
    axios.delete(`http://10.0.0.2:3000/itens/${item.id}`)
      .then(() => navigation.navigate('Home'))
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput placeholder="Descrição" value={descricao} onChangeText={setDescricao} style={styles.input} />
      <TextInput placeholder="Preço" value={preco} onChangeText={setPreco} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Categoria" value={categoria} onChangeText={setCategoria} style={styles.input} />
      <TextInput placeholder="URL da Imagem" value={imagem} onChangeText={setImagem} style={styles.input} />
      <TouchableOpacity style={styles.button} onPress={handleUpdateItem}>
        <Text style={styles.buttonText}>Salvar Alterações</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteItem}>
        <Text style={styles.buttonText}>Excluir Item</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 5 },
  button: { backgroundColor: '#007bff', padding: 15, alignItems: 'center', marginTop: 10 },
  deleteButton: { backgroundColor: '#dc3545', padding: 15, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 18 },
});

export default EditItemScreen;
