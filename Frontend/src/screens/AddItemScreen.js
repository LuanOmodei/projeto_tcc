import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const AddItemScreen = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [imagem, setImagem] = useState('');

  const handleAddItem = () => {
    const newItem = { nome, descricao, preco, categoria, imagem };
    axios.post('http://10.0.0.2:3000/itens', newItem)
      .then(() => navigation.goBack())
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput placeholder="Descrição" value={descricao} onChangeText={setDescricao} style={styles.input} />
      <TextInput placeholder="Preço" value={preco} onChangeText={setPreco} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Categoria" value={categoria} onChangeText={setCategoria} style={styles.input} />
      <TextInput placeholder="URL da Imagem" value={imagem} onChangeText={setImagem} style={styles.input} />
      <TouchableOpacity style={styles.button} onPress={handleAddItem}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 5 },
  button: { backgroundColor: '#28a745', padding: 15, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 18 },
});

export default AddItemScreen;
