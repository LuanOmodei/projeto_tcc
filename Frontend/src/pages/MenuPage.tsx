import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import api from '../services/api';

// Definição dos parâmetros de navegação
type RootStackParamList = {
  HomePage: undefined;
  MenuPage: undefined;
  ViewMenuPage: undefined;
  ItemDetailPage: { itemId: string };
};

// Tipagem para a navegação da MenuPage
type Props = NativeStackScreenProps<RootStackParamList, 'MenuPage'>;

// Definição do tipo de cada item do cardápio
type MenuItem = {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  imagem: string;
};

const MenuPage: React.FC<Props> = ({ navigation }) => {
  const [items, setItems] = useState<MenuItem[]>([]); // Estado para armazenar os itens do cardápio
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [newItem, setNewItem] = useState({
    nome: '',
    descricao: '',
    preco: '',
    categoria: '',
    imagem: '',
  }); 

  // Função para buscar os itens do backend
  const fetchItems = async () => {
    try {
      const response = await api.get('/itens'); // Faz uma requisição para a rota /itens
      setItems(response.data); // Define os dados no estado
    } catch (error) {
      Alert.alert('Erro', 'Erro ao buscar itens'); // Exibir um alerta em vez de console.error
    } finally {
      setLoading(false); // Parar o carregamento
    }
  };

  // Função para adicionar um novo item
  const addItem = async () => {
    try {
      const response = await api.post('/itens', {
        nome: newItem.nome,
        descricao: newItem.descricao,
        preco: parseFloat(newItem.preco), 
        categoria: newItem.categoria,
        imagem: newItem.imagem,
      });
      setItems([...items, response.data]); // Adiciona o novo item à lista
      setNewItem({ nome: '', descricao: '', preco: '', categoria: '', imagem: '' }); // Limpa os campos de input
    } catch (error) {
      Alert.alert('Erro', 'Erro ao adicionar item'); // Exibir alerta
    }
  };

  // Função para excluir um item
  const deleteItem = async (id: number) => {
    try {
      await api.delete(`/itens/${id}`); // Faz a requisição de exclusão
      setItems(items.filter((item) => item.id !== id)); // Remove o item da lista
    } catch (error) {
      Alert.alert('Erro', 'Erro ao excluir item'); // Exibir alerta
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando itens...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro do Cardápio</Text>

      {/* Formulário para adicionar um novo item */}
      <TextInput
        placeholder="Nome do item"
        value={newItem.nome}
        onChangeText={(text) => setNewItem({ ...newItem, nome: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Descrição do item"
        value={newItem.descricao}
        onChangeText={(text) => setNewItem({ ...newItem, descricao: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Preço do item"
        value={newItem.preco}
        onChangeText={(text) => setNewItem({ ...newItem, preco: text })}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Categoria do item"
        value={newItem.categoria}
        onChangeText={(text) => setNewItem({ ...newItem, categoria: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Imagem do item (URL)"
        value={newItem.imagem}
        onChangeText={(text) => setNewItem({ ...newItem, imagem: text })}
        style={styles.input}
      />
      <Button title="Adicionar Item" onPress={addItem} />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.nome || ''}</Text>
            {item.imagem ? (
              <Image source={{ uri: item.imagem }} style={styles.image} />
            ) : (
              <Text>Imagem não disponível</Text>
            )}
            <Text>{item.descricao || ''}</Text>
            <Text>
              {`Preço: R$ ${
                item.preco !== null &&
                item.preco !== undefined &&
                !isNaN(Number(item.preco))
                  ? Number(item.preco).toFixed(2)
                  : '0.00'
              }`}
            </Text>
            <Text>{`Categoria: ${item.categoria || ''}`}</Text>
            <Button
              title="Ver Detalhes"
              onPress={() =>
                navigation.navigate('ItemDetailPage', {
                  itemId: item.id.toString(),
                })
              }
            />
            <Button title="Excluir" onPress={() => deleteItem(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  itemContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default MenuPage;
