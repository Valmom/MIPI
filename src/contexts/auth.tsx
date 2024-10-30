import React, { createContext, useContext, useEffect, useState } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Alert } from 'react-native';
import api from '../services';
import moment from 'moment';
import { usePushNotifications } from '../components/UsePushNotifications';

interface AuthData {
  userId: string;
  token?: string;
  userName?: string;  
  userFunction?: string;
  expoToken?: string;
}

interface AuthContextData {
  authData?: AuthData;
  signIn: (user: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [authData, setAuthData] = useState<AuthData>();
  const { expoPushToken } = usePushNotifications();

  async function signIn(userName: string, password: string) {
    let pushToken = await expoPushToken?.data;

    await api.post('https://mipi.equatorialenergia.com.br/mipiapi/api/v1/entrar', {
      headers: {
        'Content-Type': 'application/json'
      },
      userName: userName?.trim(),
      password: password?.trim()
    }).then(async res => {
      const response = res as AxiosResponse;
      const accessToken = await response.data.accessToken;

      if (response.status === 200) {
        let data = {
          userId: response.data.userToken.id,
          token: accessToken,
          userName: response.data.userToken.nome,
          userFunction: response.data.userToken.tipoUsuario
        }

        await saveTokenDevice(pushToken, accessToken);

        setAuthData(data);
      }
      else {
        setAuthData(undefined);
      }
    }).catch(error => {
      setAuthData(undefined);
      if (error.response) {
        // A requisição foi feita e o servidor respondeu com um código de status
        // que sai do alcance de 2xx
        Alert.alert('Erro', error.response.data.errors[0]);
      } else if (error.request) {
        // A requisição foi feita mas nenhuma resposta foi recebida
        // `error.request` é uma instância do XMLHttpRequest no navegador e uma instância de
        // http.ClientRequest no node.js
        Alert.alert('Erro', 'Certifique-se que você está conectado à rede.')
      } else {
        // Alguma coisa acontenceu ao configurar a requisição que acionou este erro.
        Alert.alert('Erro', error.message);
      }
    });
  }

  async function signOut() {
    setAuthData(undefined);
  }

  async function saveTokenDevice(pushTokenString: string, token: string) {
    const body = {
      token: pushTokenString,
      lastLogin: moment().format('YYYY-MM-DD HH:mm:ss')
    }

    const config: AxiosRequestConfig = {
      method: 'POST',
      url: 'https://mipi.equatorialenergia.com.br/mipiapi/api/v1/dispositivos',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(body)
    };

    await axios(config).catch(function (error)  {
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
    });  
  }

  return ( 
    <AuthContext.Provider value={{authData, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  return context;
}