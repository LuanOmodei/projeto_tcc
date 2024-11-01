import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert, 
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import api from '../services/api';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type EstablishmentAreaNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'EstablishmentArea'
>;

type Establishment = {
  id: number;
  nome: string;
  imagem?: string;
};

const EstablishmentArea: React.FC = () => {
  const navigation = useNavigation<EstablishmentAreaNavigationProp>();
  const isFocused = useIsFocused();
  const [estabelecimentos, setEstabelecimentos] = useState<Establishment[]>([]);

  const fetchEstabelecimentos = async () => {
    try {
      const response = await api.get('/estabelecimentos');
      setEstabelecimentos(response.data);
    } catch (error) {
      console.error('Erro ao buscar estabelecimentos:', error);
      Alert.alert('Erro', 'Não foi possível buscar os estabelecimentos. Tente novamente mais tarde.');
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchEstabelecimentos();
    }
  }, [isFocused]);

  // Função para renderizar cada item da FlatList
  const renderItem = ({ item }: { item: Establishment }) => (
    <View style={styles.establishmentItem}>
      {item.imagem ? (
        <Image
          source={{ uri: item.imagem }}
          style={styles.establishmentImage}
          resizeMode="cover"
          onError={(e) => {
            console.error(`Erro ao carregar a imagem para o estabelecimento ID: ${item.id}`, e.nativeEvent.error);
            Alert.alert('Erro', `Não foi possível carregar a imagem para o estabelecimento "${item.nome}".`);
          }}
        />
      ) : null}
      <Text style={styles.establishmentText}>
        ID: {item.id} - <Text style={styles.establishmentName}>{item.nome}</Text>
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('EstablishmentLogin', {
            estabelecimentoId: item.id,
            estabelecimentoNome: item.nome,
          })
        }
      >
        <Text style={styles.buttonText}>GERENCIAR CARDÁPIO</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('EstablishmentEditPage', {
            estabelecimentoId: item.id,
            estabelecimentoNome: item.nome,
          })
        }
      >
        <Text style={styles.buttonText}>GERENCIAR ESTABELECIMENTO</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estabelecimentos Cadastrados</Text>
      <FlatList
        data={estabelecimentos}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum estabelecimento encontrado.</Text>
        }
        renderItem={renderItem}
      />
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => navigation.navigate('EstablishmentRegister')}
        >
          <Text style={styles.bottomButtonText}>
            CADASTRAR NOVO ESTABELECIMENTO
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
  establishmentItem: {
    padding: 15,
    backgroundColor: '#1C1C1C', 
    marginBottom: 20,
    borderRadius: 20,
    alignItems: 'center', 
  },
  establishmentImage: {
    width: '100%',
    height: 200, 
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: '#ccc', 
  },
  establishmentText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center', 
  },
  establishmentName: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FF5722', 
    padding: 10,
    borderRadius: 20,
    marginBottom: 10, 
    width: '100%', 
    alignItems: 'center', 
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16, 
  },
  bottomButtons: {
    marginTop: 20,
  },
  bottomButton: {
    backgroundColor: '#FF5722', 
    paddingVertical: 15,
    borderRadius: 20,
    marginVertical: 5, 
    alignItems: 'center', 
  },
  bottomButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16, 
  },
  emptyText: {
    color: '#ccc',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default EstablishmentArea;