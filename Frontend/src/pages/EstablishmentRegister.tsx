import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import api from '../services/api';
import { RootStackParamList } from '../../App';

type EstablishmentRegisterNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'EstablishmentRegister'
>;

const EstablishmentRegister: React.FC = () => {
  const navigation = useNavigation<EstablishmentRegisterNavigationProp>();
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [imagem, setImagem] = useState(''); 

  const handleRegister = async () => {
    try {
      await api.post('/estabelecimentos', { nome, senha, imagem });
      Alert.alert('Sucesso', 'Estabelecimento cadastrado com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao cadastrar estabelecimento');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome do Estabelecimento"
        placeholderTextColor="#fff"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        placeholderTextColor="#fff"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="URL da Imagem"
        placeholderTextColor="#fff"
        value={imagem}
        onChangeText={setImagem}
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <Button title="Cadastrar" onPress={handleRegister} color="#FF5722" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#2c2c2c',
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
  buttonContainer: {
    marginTop: 20,
    borderRadius: 20,
  },
});

export default EstablishmentRegister;
