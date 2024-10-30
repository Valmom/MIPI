import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { IconButton } from 'react-native-paper';

import { HomeStyles } from './style';

export function Home() {
  return (
    <SafeAreaView style={HomeStyles.container}>
      <View style={HomeStyles.containerItem}>
        <Text style={HomeStyles.conatinerItemText}>
          Quantidade de Alertas
        </Text>
        <Text style={HomeStyles.conatinerItemValue}>
          12
        </Text>        
      </View>
      <View style={HomeStyles.containerItem}>
        <View>
          <Text style={HomeStyles.conatinerItemText}>
            <MaterialCommunityIcons name='alert' style={{color: 'red', margin: 10 }} size={18}/> Notivicação de Novo Alerta
          </Text>
        </View>
        <Text style={[HomeStyles.conatinerItemValue, {fontSize: 16, fontWeight: 'normal'}]}>
          Anomalia do tipo XXXXXXXXXXXX XXXXXXXX foi detecdada na equipe SLZ014
        </Text>        
      </View> 
      <View style={HomeStyles.containerMenu}>
        <View style={HomeStyles.menu}>
          <IconButton 
            icon='chart-bar' size={34}
            iconColor={'#FFF'}
            style={{ backgroundColor: '#596CFF', padding: 8, borderRadius: 12}}
            onPress={() => console.log("clicou")}
          />          
          <View style={{borderBottomColor: 'gray', borderBottomWidth: 1, width: '35%', paddingTop: 10}} />
          <Text style={{marginTop: 10, fontSize: 16}}>Dashboard</Text>
        </View>
        <View style={HomeStyles.menu}>
          <IconButton 
            icon='bell' size={34}
            iconColor={'#FFF'}
            style={{ backgroundColor: '#FD7E14', padding: 8, borderRadius: 12}}
          />
          <View style={{borderBottomColor: 'gray', borderBottomWidth: 1, width: '35%', paddingTop: 10}} />
          <Text style={{marginTop: 10, fontSize: 16}}>Alertas</Text>
        </View>
        <View style={HomeStyles.menu}>
          <IconButton 
            icon='file-document-multiple' size={34}
            iconColor={'#FFF'}
            style={{ backgroundColor: '#F56565', padding: 8, borderRadius: 12}}
          />
          <View style={{borderBottomColor: 'gray', borderBottomWidth: 1, width: '35%', paddingTop: 10}} />
          <Text style={{marginTop: 10, fontSize: 16}}>Justificar Alerta</Text>
        </View>
        <View style={HomeStyles.menu}>
          <IconButton 
            icon='archive' size={34}
            iconColor={'#FFF'}
            style={{ backgroundColor: '#20c997', padding: 8, borderRadius: 12}}
          />          
          <View style={{borderBottomColor: 'gray', borderBottomWidth: 1, width: '35%', paddingTop: 10}} />
          <Text style={{marginTop: 10, fontSize: 16}}>Justificativas</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}