import React, { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { AppStack } from './AppStack';
import { AuthStack } from './AuthStack';
import { useAuth } from '../contexts/auth';

export function Router() {
  const { authData } = useAuth();
  const responseListener = useRef<Notifications.Subscription>();
  const navigationRef = useRef<any>();

  useEffect(() => {
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      const { data } = response.notification.request.content;

      if (data && data.screen) {
        navigationRef.current?.navigate(data.screen);
      }
    });

    return () => {
      Notifications.removeNotificationSubscription(responseListener.current!);
    }    
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar barStyle={'default'} backgroundColor='transparent' translucent={true} />
      {authData ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}