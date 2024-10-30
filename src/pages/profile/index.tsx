import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { ProfileStyles } from './style';
import { useAuth } from '../../contexts/auth';

export function Profile() {
  const { signOut } = useAuth();

  return (
    <View style={ProfileStyles.container}>
      <View style={ProfileStyles.header}></View>
      <TouchableOpacity style={ProfileStyles.editPhoto} onPress={() => console.log('Teste')}>
        <Image
            style={ProfileStyles.avatar}
            source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }}        
        />
      </TouchableOpacity>
      <View style={{marginTop: 60, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 20}}>{useAuth().authData?.userName}</Text>
        <Text>{useAuth().authData?.userFunction}</Text>     
      </View>
      <View style={ProfileStyles.body}>
        <View style={ProfileStyles.bodyContent}>
          {/* <TouchableOpacity style={ProfileStyles.buttonContainer}>
            <Text style={{color: '#FFF', fontSize: 16}}>Alterar Senha</Text>
          </TouchableOpacity>           */}
          <TouchableOpacity style={ProfileStyles.buttonContainer} onPress={signOut}>
            <Text style={{color: '#FFF', fontSize: 16}}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}