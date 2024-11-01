import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Alert,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import api from '../services/api';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'MenuManagementPage'>;

type MenuItem = {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  imagem: string;
  estabelecimento_id: number;
};

const MenuManagementPage: React.FC<Props> = ({ route }) => {
  const { estabelecimentoId } = route.params;
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({
    nome: '',
    descricao: '',
    preco: '',
    categoria: '',
    imagem: '',
  });
  const [editItem, setEditItem] = useState<MenuItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchItems = async () => {
    try {
      const response = await api.get(`/itens/estabelecimento/${estabelecimentoId}`);
      setItems(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao buscar itens');
    } finally {
      setLoading(false);
    }
  };

  const addItem = async () => {
    try {
      const itemData = {
        ...newItem,
        preco: parseFloat(newItem.preco),
        estabelecimento_id: estabelecimentoId,
      };
      await api.post('/itens', itemData);
      setNewItem({
        nome: '',
        descricao: '',
        preco: '',
        categoria: '',
        imagem: '',
      });
      fetchItems();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao adicionar item');
    }
  };

  const deleteItem = async (id: number) => {
    try {
      await api.delete(`/itens/${id}`);
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      Alert.alert('Erro', 'Erro ao excluir item');
    }
  };

  const startEditing = (item: MenuItem) => {
    setEditItem(item);
    setIsEditing(true);
  };

  const saveEditItem = async () => {
    if (editItem) {
      try {
        const updatedItem = {
          nome: editItem.nome,
          descricao: editItem.descricao,
          preco: editItem.preco,
          categoria: editItem.categoria,
          imagem: editItem.imagem,
        };
        await api.put(`/itens/${editItem.id}`, updatedItem);
        setEditItem(null);
        setIsEditing(false);
        fetchItems();
      } catch (error) {
        Alert.alert('Erro', 'Erro ao atualizar item');
      }
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando itens...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isEditing && editItem ? (
        <View>
          <Text style={styles.title}>Editar Item</Text>
          <TextInput
            placeholder="Nome do item"
            value={editItem.nome}
            onChangeText={(text) => setEditItem({ ...editItem, nome: text })}
            style={styles.input}
            placeholderTextColor="#fff"
          />
          <TextInput
            placeholder="Descrição do item"
            value={editItem.descricao}
            onChangeText={(text) => setEditItem({ ...editItem, descricao: text })}
            style={styles.input}
            placeholderTextColor="#fff"
          />
          <TextInput
            placeholder="Preço do item"
            value={String(editItem.preco)}
            onChangeText={(text) =>
              setEditItem({ ...editItem, preco: parseFloat(text) || 0 })
            }
            keyboardType="numeric"
            style={styles.input}
            placeholderTextColor="#fff"
          />
          <TextInput
            placeholder="Categoria do item"
            value={editItem.categoria}
            onChangeText={(text) => setEditItem({ ...editItem, categoria: text })}
            style={styles.input}
            placeholderTextColor="#fff"
          />
          <TextInput
            placeholder="Imagem do item (URL)"
            value={editItem.imagem}
            onChangeText={(text) => setEditItem({ ...editItem, imagem: text })}
            style={styles.input}
            placeholderTextColor="#fff"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={saveEditItem} style={styles.button}>
              <Text style={styles.buttonText}>Salvar Alterações</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsEditing(false)} style={styles.button}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <Text style={styles.title}>Gerenciamento do Cardápio</Text>
          {/* Formulário para adicionar itens */}
          <TextInput
            placeholder="Nome do item"
            placeholderTextColor={'#fff'}
            value={newItem.nome}
            onChangeText={(text) => setNewItem({ ...newItem, nome: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Descrição do item"
            placeholderTextColor={'#fff'}
            value={newItem.descricao}
            onChangeText={(text) => setNewItem({ ...newItem, descricao: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Preço do item"
            placeholderTextColor={'#fff'}
            value={newItem.preco}
            onChangeText={(text) => setNewItem({ ...newItem, preco: text })}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Categoria do item"
            placeholderTextColor={'#fff'}
            value={newItem.categoria}
            onChangeText={(text) => setNewItem({ ...newItem, categoria: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Imagem do item (URL)"
            placeholderTextColor={'#fff'}
            value={newItem.imagem}
            onChangeText={(text) => setNewItem({ ...newItem, imagem: text })}
            style={styles.input}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={addItem} style={styles.button}>
              <Text style={styles.buttonText}>Adicionar Item</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Lista de itens cadastrados */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.nome || ''}</Text>
            {item.imagem ? (
              <Image source={{ uri: item.imagem }} style={styles.image} />
            ) : (
              <Text style={styles.noImageText}>Imagem não disponível</Text>
            )}
            <Text style={styles.itemDescription}>{item.descricao || ''}</Text>
            <Text style={styles.itemPrice}>
              {`Preço: R$ ${
                item.preco !== null &&
                item.preco !== undefined &&
                !isNaN(Number(item.preco))
                  ? Number(item.preco).toFixed(2)
                  : '0.00'
              }`}
            </Text>
            <Text style={styles.itemCategory}>{`Categoria: ${item.categoria || ''}`}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => startEditing(item)} style={styles.button}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteItem(item.id)} style={styles.button}>
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
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
    backgroundColor: '#2c2c2c', 
  },
  title: {
    color: '#fff', 
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    borderRadius: 20,
    color: '#fff', 
    backgroundColor: '#333', 
  },
  itemContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#444', 
    borderRadius: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', 
  },
  itemCategory: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff5722', 
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 16,
    color: '#ccc', 
    marginBottom: 10,
  },
  itemPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', 
    textAlign: 'right',
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  noImageText: {
    color: '#ccc', 
  },
  noItemsText: {
    color: '#fff', 
    textAlign: 'center',
    marginTop: 20,
  },
  loadingText: {
    color: '#fff', 
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#FF5722', 
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5, 
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MenuManagementPage;