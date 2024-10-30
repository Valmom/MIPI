import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export function Loading({ load }: { load: any }) {
  if (!load) return null;

  return (
    <View style={LoadinfStyles.container}>
      {<ActivityIndicator size={60} color={'#093576'} />}
      <Text>Aguarde...</Text>
    </View>
  );
}

export function FooterList({ load }: { load: any }) {
  if (!load) return null;

  return (
    <View style={{padding: 10}}>
      <ActivityIndicator size={25} color='#121212' />
    </View>
  )
}

const LoadinfStyles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#e3e3e3',
    opacity: 0.8,
    zIndex: 999
  }
});