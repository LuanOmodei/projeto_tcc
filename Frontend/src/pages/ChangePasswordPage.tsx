import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import api from '../services/api';
import { RootStackParamList } from '../../App';
import axios, { AxiosError } from 'axios';

type Props = NativeStackScreenProps<RootStackParamList, 'ChangePasswordPage'>;

const ChangePasswordPage: React.FC<Props> = ({ route, navigation }) => {
  const { estabelecimentoId } = route.params;
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Erro', 'As novas senhas não coincidem');
      return;
    }

    try {
      const response = await api.post(`/estabelecimentos/change-password`, {
        id: estabelecimentoId,
        currentPassword,
        newPassword,
      });

      Alert.alert('Sucesso', 'Senha alterada com sucesso!');
      navigation.navigate('EstablishmentArea'); // Redireciona para a página de área do estabelecimento
    } catch (err) {
      const error = err as AxiosError;
      const errorMessage =
        typeof error.response?.data === 'string'
          ? error.response?.data
          : error.message || 'Erro desconhecido';

      Alert.alert('Erro', `Erro ao alterar a senha: ${errorMessage}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alterar Senha</Text>
      <TextInput
        placeholder="Senha atual"
        placeholderTextColor={'#fff'}
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Nova senha"
        placeholderTextColor={'#fff'}
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Confirme a nova senha"
        placeholderTextColor={'#fff'}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
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
  },
  buttonText: {
    color: '#fff', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChangePasswordPage;
