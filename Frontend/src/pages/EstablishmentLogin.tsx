import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import api from '../services/api';
import { RootStackParamList } from '../../App';
import axios, { AxiosError } from 'axios'; 

type Props = NativeStackScreenProps<RootStackParamList, 'EstablishmentLogin'>;

const EstablishmentLogin: React.FC<Props> = ({ route, navigation }) => {
  const { estabelecimentoId, estabelecimentoNome } = route.params;
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const response = await api.post('/estabelecimentos/login', {
        id: estabelecimentoId,
        senha,
      });

      if (response.data.success) {
        navigation.navigate('MenuManagementPage', {
          estabelecimentoId,
        });
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
        Alert.alert('Erro', 'Erro ao fazer login');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estabelecimento: {estabelecimentoNome}</Text>
      <TextInput
        placeholder="Senha"
        placeholderTextColor={'#fff'} 
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
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
  },
  buttonText: {
    color: '#fff', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EstablishmentLogin;
