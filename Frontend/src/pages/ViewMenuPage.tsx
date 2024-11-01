import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import api from '../services/api';

// Definição dos parâmetros de navegação
type RootStackParamList = {
  HomePage: undefined;
  MenuPage: undefined;
  ViewMenuPage: undefined;
  ItemDetailPage: { itemId: string };
};

// Tipagem para a navegação da ViewMenuPage
type ViewMenuPageNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ViewMenuPage'>;

// Definção do tipo de cada item do cardápio
type MenuItem = {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  imagem: string;
};

type Props = {
  navigation: ViewMenuPageNavigationProp;
};

const ViewMenuPage: React.FC<Props> = ({ navigation }) => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar os itens do backend
  const fetchItems = async () => {
    try {
      const response = await api.get('/itens');
      setItems(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao buscar itens');
    } finally {
      setLoading(false);
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
      <Text style={styles.title}>Cardápio</Text>
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

export default ViewMenuPage;