import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'
import { Alert, Image, Keyboard, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { useAuth } from '../../contexts/auth';
import { styles } from './style';
import { Button } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  const { signIn } = useAuth();

  const toggleShowPassword = () => { 
    setShowPassword(!showPassword); 
  }; 

  async function login(userName: string, password: string) { 
    setIsLoading(true);

    try {
      await signIn(userName, password);
      setIsLoading(false);
    }
    catch(error)  {
      if (error.response) {
        // A requisição foi feita e o servidor respondeu com um código de status
        // que sai do alcance de 2xx
        Alert.alert('Erro', error.response.data.errors[0]);
      } else if (error.request) {
        // A requisição foi feita mas nenhuma resposta foi recebida
        // `error.request` é uma instância do XMLHttpRequest no navegador e uma instância de
        // http.ClientRequest no node.js
        console.error(error.request);
      } else {
        // Alguma coisa acontenceu ao configurar a requisição que acionou este erro.
        console.error('Error', error.message);
      }
      setIsLoading(false);
    };   
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.safeArea}>
        <StatusBar style='inverted' backgroundColor='transparent' translucent={true} />
        <Image
          style={styles.backgroundImage}
          source={require('../../assets/background-image.jpg')}
        />
        <View style={styles.container}>
          <Image
            style={styles.logoSafDespesas}
            source={require('../../assets/mipi.png')}
          />
          <Text style={styles.titleText}>Acesso a área restrita</Text>
          <TextInput
            placeholder="Usuário de rede"
            style={styles.input}
            value={userName}
            onChangeText={setUserName}
          />
          <View style={styles.inputContainer}> 
            <TextInput
              secureTextEntry={!showPassword} 
              placeholder="Senha"
              style={styles.inputPassword}
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#aaa"
            />
            <MaterialCommunityIcons 
                name={showPassword ? 'eye-off' : 'eye'} 
                size={24} 
                color="#aaa"
                style={styles.icon} 
                onPress={toggleShowPassword} 
            /> 
          </View>
          <Button 
            containerStyle={{width: '90%', backgroundColor: '#272c7d', borderRadius: 8, marginTop: 20, marginBottom: 40}} 
            buttonStyle={styles.loginButton}
            titleStyle={{fontSize: 18}} 
            title={'Acessar'} type='solid' 
            loading={isLoading} 
            onPress={() => login(userName, password)} 
          />
          <Image
            source={require('../../assets/logo-equatorial.png')}                
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}