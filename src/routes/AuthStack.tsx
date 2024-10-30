import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Login } from '../pages/login';

const Stack = createStackNavigator();

export function AuthStack() {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false
      }}
      initialRouteName='Login'
    >
      <Stack.Screen 
        name="Login" 
        component={Login}
      />
    </Stack.Navigator>
  );
}