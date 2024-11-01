import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import api from '../services/api';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'EstablishmentMenuPage'>;

type MenuItem = {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  imagem: string;
  estabelecimento_id: number;
};

const EstablishmentMenuPage: React.FC<Props> = ({ route }) => {
  const { estabelecimentoId } = route.params;
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [estabelecimentoNome, setEstabelecimentoNome] = useState('');

  // Função para buscar os itens do estabelecimento
  const fetchItems = async () => {
    try {
      const response = await api.get(`/itens/estabelecimento/${estabelecimentoId}`);
      const items: MenuItem[] = response.data;
      setItems(items);
      
      // Extrair categorias únicas, removendo possíveis strings vazias e duplicadas
      const categoriasUnicas: string[] = [
        ...new Set(items.map((item: MenuItem) => item.categoria).filter(categoria => categoria.trim() !== '')),
      ];
      setCategories(categoriasUnicas);
      setFilteredItems(items);
    } catch (error) {
      console.error('Erro ao buscar itens:', error);
      Alert.alert('Erro', 'Erro ao buscar itens.');
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar o nome do estabelecimento
  const fetchEstabelecimento = async () => {
    try {
      const response = await api.get(`/estabelecimentos/${estabelecimentoId}`);
      setEstabelecimentoNome(response.data.nome);
    } catch (error) {
      console.error('Erro ao buscar o estabelecimento:', error);
      Alert.alert('Erro', 'Erro ao buscar o estabelecimento.');
    }
  };

  useEffect(() => {
    fetchItems();
    fetchEstabelecimento();
  }, []);

  useEffect(() => {
    filterItems();
  }, [search, filterCategory]);

  // Função para filtrar os itens com base na busca e na categoria selecionada
  const filterItems = () => {
    let filtered = items;

    // Filtrar pelo termo de busca, se houver
    if (search.trim() !== '') {
      filtered = filtered.filter((item) =>
        item.nome.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filtrar pela categoria, se uma categoria específica estiver selecionada
    if (filterCategory !== '') {
      filtered = filtered.filter(
        (item) => item.categoria.toLowerCase() === filterCategory.toLowerCase()
      );
    }

    // Ordenar os itens alfabeticamente pelo nome
    filtered = filtered.sort((a, b) => a.nome.localeCompare(b.nome));

    console.log(`Filtrando com categoria: "${filterCategory}" e termo de busca: "${search}"`);
    console.log(`Itens filtrados:`, filtered);

    setFilteredItems(filtered);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando itens...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cardápio de {estabelecimentoNome}</Text>
      
      {/* Campo de Busca */}
      <TextInput
        placeholder="Buscar por nome"
        placeholderTextColor="#fff"
        value={search}
        onChangeText={setSearch}
        style={styles.input}
      />
      
      {/* Picker para Seleção de Categoria */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={filterCategory}
          onValueChange={(itemValue: string) => {
            console.log('Categoria selecionada:', itemValue);
            setFilterCategory(itemValue);
          }}
          style={styles.picker}
          mode="dropdown" 
        >
          <Picker.Item label="Todas as Categorias" value="" />
          {categories.map((categoria, index) => (
            <Picker.Item key={index} label={categoria} value={categoria} />
          ))}
        </Picker>
      </View>

      {/* Botão para Resetar Filtros */}
      <TouchableOpacity
        style={styles.resetButton}
        onPress={() => {
          console.log('Resetando filtros');
          setSearch('');
          setFilterCategory('');
        }}
      >
        <Text style={styles.resetButtonText}>Resetar Filtros</Text>
      </TouchableOpacity>

      {/* Lista de Itens Filtrados */}
      {filteredItems.length === 0 ? (
        <Text style={styles.noItemsText}>Nenhum item encontrado.</Text>
      ) : (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.nome || ''}</Text>
              <Text style={styles.itemCategory}>{item.categoria || ''}</Text>
              {item.imagem ? (
                <Image source={{ uri: item.imagem }} style={styles.image} />
              ) : (
                <Text style={styles.noImageText}>Imagem não disponível</Text>
              )}
              <Text style={styles.itemDescription}>{item.descricao || ''}</Text>
              <Text style={styles.itemPrice}>
                R$ {Number(item.preco).toFixed(2)}
              </Text>
            </View>
          )}
        />
      )}
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 20,
    marginVertical: 5,
    zIndex: 1000, 
    elevation: 1000,
    backgroundColor: '#333',
  },
  picker: {
    color: '#fff',
    height: 50,
    width: '100%',
  },
  resetButton: {
    backgroundColor: '#FF5722',
    padding: 10,
    borderRadius: 20,
    marginVertical: 10,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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
    textAlign: 'center',
    marginTop: 10,
  },
  noItemsText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  loadingText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default EstablishmentMenuPage;
