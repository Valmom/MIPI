import React, { useEffect, useRef, useState } from 'react';
import { Alert, AppState, BackHandler } from 'react-native';
import { AuthProvider } from './src/contexts/auth';
import { Router } from './src/routes';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

const url = "https://mipi.equatorialenergia.com.br/mipiapi/api/v1";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const App = () => {
  const [isRooted, setIsRooted] = useState(null);
  const [appState, setAppState] = useState(AppState.currentState);
  const notificationInterval = useRef(null);

  useEffect(() => {
    const checkRooted = async () => {
      await Device.isRootedExperimentalAsync().then((rooted) => {
        setIsRooted(rooted);

        if (isRooted) {
          Alert.alert("Aviso", "Este dispositivo está rooteado", [{ text: "OK", onPress: () => {
            BackHandler.exitApp();
          }}]);
        }
      });

      if (!Device.isDevice) {
        Alert.alert("Aviso", "Esta aplicativo não pode ser executado em um emulador", [{ text: "OK", onPress: () => {
          BackHandler.exitApp();
        }}]);
      }
    };

    checkRooted();

    registerForPushNotificationsAsync();

    // Verificar se o aplicativo está em primeiro plano
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      setAppState(nextAppState);
    });

    // Configurar intervalo de notificação
    notificationInterval.current = setInterval(() => {
      if (appState === 'active') {
        scheduleNotification();
      }
    }, 900000); // 15 minutos

    // Limpar o intervalo e o listener
    return () => {
      clearInterval(notificationInterval.current);
      subscription.remove();
    };
  }, [appState]);
  
  async function scheduleNotification() {    
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Notificação ",
        body: "Teste de notificação",
        data: { screen: 'Alert' }
      },
      trigger: null
    });
  }

  async function registerForPushNotificationsAsync() {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        Alert.alert('Falha ao obter permissões de notificação!');
        return;
      }
    } else {
      Alert.alert('Você precisa de um dispositivo físico para receber notificações.');
    }
  }

  return (
    <AuthProvider >
      <Router />
    </AuthProvider>
  );
};

export default App;