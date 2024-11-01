import React, { useState, useEffect } from 'react';
import { View, TextInput, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import api from '../services/api';
import { RootStackParamList } from '../../App';
import axios, { AxiosError } from 'axios';

type Props = NativeStackScreenProps<RootStackParamList, 'EstablishmentEditPage'>;

const EstablishmentEditPage: React.FC<Props> = ({ route, navigation }) => {
  const { estabelecimentoId, estabelecimentoNome } = route.params;
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState(estabelecimentoNome);
  const [imagem, setImagem] = useState(''); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchEstabelecimento = async () => {
      try {
        const response = await api.get(`/estabelecimentos/${estabelecimentoId}`);
        setNome(response.data.nome);
        setImagem(response.data.imagem); // Carregar a URL da imagem
      } catch (err) {
        Alert.alert('Erro', 'Erro ao carregar os dados do estabelecimento');
      }
    };
    fetchEstabelecimento();
  }, [estabelecimentoId]);

  const handleVerifyPassword = async () => {
    try {
      const response = await api.post('/estabelecimentos/login', {
        id: estabelecimentoId,
        senha,
      });

      if (response.data.success) {
        setIsAuthenticated(true);
      } else {
        Alert.alert('Erro', 'Senha incorreta');
      }
    } catch (err) {
      const error = err as AxiosError;

      if (error.response && error.response.status === 401) {
        Alert.alert('Erro', 'Senha incorreta');
      } else if (error.response && error.response.status === 404) {
        Alert.alert('Erro', 'Estabelecimento não encontrado');
      } else {
        Alert.alert('Erro', 'Erro ao verificar a senha');
      }
    }
  };

  const handleUpdateEstablishment = async () => {
    try {
      const updateData: { nome: string; imagem: string } = { nome, imagem };

      console.log('Enviando dados para atualização:', updateData); // Log para depuração

      const response = await api.put(`/estabelecimentos/${estabelecimentoId}`, updateData);
      Alert.alert('Sucesso', 'Estabelecimento atualizado com sucesso!');
      navigation.navigate('EstablishmentArea'); // Redireciona após salvar
    } catch (err) {
      const error = err as AxiosError;
      const errorMessage =
        typeof error.response?.data === 'string'
          ? error.response?.data
          : error.message || 'Erro desconhecido';

      console.error("Erro durante a atualização:", errorMessage);
      Alert.alert('Erro', `Erro ao atualizar o estabelecimento: ${errorMessage}`);
    }
  };

  const handleDeleteEstablishment = async () => {
    Alert.alert(
      'Atenção',
      'Tem certeza que deseja excluir este estabelecimento? Essa ação é irreversível.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              await api.delete(`/estabelecimentos/${estabelecimentoId}`);
              Alert.alert('Sucesso', 'Estabelecimento excluído com sucesso!');
              navigation.navigate('EstablishmentArea'); // Redireciona após excluir
            } catch (err) {
              Alert.alert('Erro', 'Erro ao excluir o estabelecimento');
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const goToChangePassword = () => {
    navigation.navigate('ChangePasswordPage', { estabelecimentoId }); // Redireciona para a tela de alteração de senha
  };

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Confirme sua senha para continuar</Text>
        <TextInput
          placeholder="Senha"
          placeholderTextColor={'#fff'}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleVerifyPassword}>
          <Text style={styles.buttonText}>Confirmar Senha</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Estabelecimento</Text>
      <TextInput
        placeholder="Nome do Estabelecimento"
        placeholderTextColor={'#fff'}
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="URL da Imagem"
        placeholderTextColor={'#fff'}
        value={imagem}
        onChangeText={setImagem}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdateEstablishment}>
        <Text style={styles.buttonText}>Salvar Alterações</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: 'red' }]}
        onPress={handleDeleteEstablishment}
      >
        <Text style={styles.buttonText}>Excluir Estabelecimento</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: 'blue' }]}
        onPress={goToChangePassword}
      >
        <Text style={styles.buttonText}>Alterar Senha</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#2c2c2c',
    padding: 20,
  },
  title: {
    color: '#fff', 
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    marginBottom: 20,
    borderRadius: 20,
    color: '#fff', 
    backgroundColor: '#333', 
  },
  button: {
    backgroundColor: '#FF5722', 
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10, 
  },
  buttonText: {
    color: '#fff', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EstablishmentEditPage;