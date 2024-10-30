import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { Alerts } from '../pages/alerts';
import { Dashboard } from '../pages/dashboard';
import { Profile } from '../pages/profile';
import { NewAlert } from '../pages/newalert';
import { Historic } from '../pages/historic';
import { WebViewPage } from '../pages/webview';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const AlertStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='Alerts' 
        component={Alerts} 
        options={{
          headerShown: false,
          headerStyle: {
            height: 0
          }
        }}
      />
      <Stack.Screen 
        name='NewAlert' 
        component={NewAlert} 
        options={{
          headerTitle: '',
          headerBackTitle: 'Voltar'
        }}
      />
      <Stack.Screen 
        name='WebViewPage' 
        component={WebViewPage} 
        options={{
          headerTitle: '',
          headerBackTitle: 'Voltar'
        }}
      />      
      <Stack.Screen 
        name='Historic'
        component={Historic}
        options={{
          headerTitle: '',
          headerBackTitle: 'Voltar'
        }}        
      />
    </Stack.Navigator>
  );
};

export function AppStack() {
  return (    
    <Tab.Navigator
      screenOptions={{
        headerStatusBarHeight: 40,
        unmountOnBlur: false
      }}
    >      
      <Tab.Screen
        name='Dashboard'
        component={Dashboard}
        options={{
          tabBarLabel: 'Dashboard',
          headerTitle: 'Dashboard',
          headerTitleAlign: 'center',
          headerTitleContainerStyle: { marginBottom: 25 },
          tabBarIcon: ({ color, size }) => (
            <AntDesign name='dashboard' color={color} size={size} />
          ),
          headerStyle: {
            backgroundColor: '#093576'
          },
          headerTintColor: '#FFF'
        }}
      />
      <Tab.Screen
        name='Alert'
        component={AlertStack}
        options={{
          tabBarLabel: 'Alertas',
          headerTitle: 'Alertas',
          headerTitleAlign: 'center',
          headerTitleContainerStyle: { marginBottom: 25 },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="alert" size={24} color={color} />
          ),
          headerStyle: {
            backgroundColor: '#093576'
          },
          headerTintColor: '#FFF'
        }}
      />
      <Tab.Screen
        name='WebViewPage'
        component={WebViewPage}
        options={{
          tabBarLabel: 'MIPI Web',
          headerTitle: 'MIPI Web',
          headerTitleAlign: 'center',
          headerTitleContainerStyle: { marginBottom: 25 },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="web" size={24} color={color} />
          ),
          headerStyle: {
            backgroundColor: '#093576'
          },
          headerTintColor: '#FFF'
        }}
      />      
      <Tab.Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
          headerTitleContainerStyle: { marginBottom: 25 },
          tabBarIcon: ({ color, size }) => (
            <AntDesign name='user' color={color} size={size} />
          ),
          headerStyle: {
            backgroundColor: '#093576'
          },
          headerTintColor: '#FFF'
        }}
      />      
    </Tab.Navigator>
  )
}