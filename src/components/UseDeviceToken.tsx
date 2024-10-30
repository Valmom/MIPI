import { useEffect, useState } from "react";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Alert } from "react-native";

export interface ExpoDevice {
    deviceToken?: String;
}

export const useDeviceToken = (): ExpoDevice => {
    const [deviceToken, setDeviceToken] = useState<String | undefined>();

    async function registerForPushNotificationsAsync() {
        let token;

        if (Device.isDevice) {
          const { status: existingStatus} = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
    
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.getPermissionsAsync();
            finalStatus = status;
          }
    
          if (finalStatus !== 'granted') {
            Alert.alert('É necessário conceder autorização para que seu dispositivo recebe notificações.');
          }
          
          token = (await Notifications.getDevicePushTokenAsync()).data;
        
          return token;
        }
        else {
          console.error('Por favor, use dispositivo físico');
        }
    }

    useEffect(() => {
      registerForPushNotificationsAsync().then((token) => {
        setDeviceToken(token);
      });
    }, []);

    return {
      deviceToken
    }
}