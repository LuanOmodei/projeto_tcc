// src/pages/HomePage.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import api from '../services/api';
import { RootStackParamList } from '../../App';

type HomePageNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'HomePage'
>;

type Establishment = {
  id: number;
  nome: string;
  imagem?: string; 
};

const HomePage: React.FC = () => {
  const navigation = useNavigation<HomePageNavigationProp>();
  const isFocused = useIsFocused();
  const [estabelecimentos, setEstabelecimentos] = useState<Establishment[]>([]);
  const [search, setSearch] = useState(''); // Estado para armazenar o termo de busca
  const [filteredEstablishments, setFilteredEstablishments] = useState<Establishment[]>([]); // Estado para a lista filtrada

  const fetchEstabelecimentos = async () => {
    try {
      const response = await api.get('/estabelecimentos');
      setEstabelecimentos(response.data);
      setFilteredEstablishments(response.data); // Inicialmente, a lista filtrada é a mesma da completa
    } catch (error) {
      console.error('Erro ao buscar estabelecimentos:', error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchEstabelecimentos();
    }
  }, [isFocused]);


  const handleSearch = (text: string) => {
    setSearch(text);
    if (text) {
      const filtered = estabelecimentos.filter((estabelecimento) =>
        estabelecimento.nome.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredEstablishments(filtered);
    } else {
      setFilteredEstablishments(estabelecimentos);
    }
  };

  // Função para renderizar cada item da FlatList
  const renderItem = ({ item }: { item: Establishment }) => (
    <TouchableOpacity
      style={styles.establishmentButton}
      onPress={() =>
        navigation.navigate('EstablishmentMenuPage', {
          estabelecimentoId: item.id,
        })
      }
    >
      {item.imagem ? (
        <Image
          source={{ uri: item.imagem }}
          style={styles.establishmentImage}
          resizeMode="cover"
          onError={(e) => {
            console.error(`Erro ao carregar a imagem para o estabelecimento ID: ${item.id}`, e.nativeEvent.error);
          }}
        />
      ) : null}
      <Text style={styles.establishmentText}>{item.nome}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione um Estabelecimento</Text>
      
      {/* Campo de Busca Adicionado */}
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por nome"
        placeholderTextColor="#ccc"
        value={search}
        onChangeText={handleSearch}
      />
      
      <FlatList
        data={filteredEstablishments} // Usar a lista filtrada
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum estabelecimento encontrado.</Text>
        }
        renderItem={renderItem}
      />
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.establishmentAreaButton}
          onPress={() => navigation.navigate('EstablishmentArea')}
        >
          <Text style={styles.establishmentAreaText}>
            Área do Estabelecimento
          </Text>
        </TouchableOpacity>
      </View>
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
  searchInput: { // Estilos para o campo de busca
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: '#fff',
    backgroundColor: '#333',
  },
  establishmentButton: {
    padding: 15,
    backgroundColor: '#5a5a5a',
    borderColor: '#fff',
    borderWidth: 5,
    marginBottom: 10,
    borderRadius: 20,
    alignItems: 'center', 
  },
  establishmentImage: {
    width: '100%',
    height: 150,
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: '#ccc', 
  },
  establishmentText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomButtons: {
    marginTop: 20,
  },
  establishmentAreaButton: {
    backgroundColor: '#FF5722',
    padding: 15,
    alignItems: 'center',
    borderRadius: 20,
  },
  establishmentAreaText: {
    color: '#fff',
    fontSize: 18,
  },
  emptyText: { 
    color: '#ccc',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default HomePage;
