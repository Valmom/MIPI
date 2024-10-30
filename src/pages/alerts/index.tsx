import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { IconButton, TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modal';
import { SelectList } from "react-native-dropdown-select-list";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { useAuth } from '../../contexts/auth';
import { Loading } from '../../components/PageLoading';

import { AlertsStyles } from "./style";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

const url = "https://mipi.equatorialenergia.com.br/mipiapi/api/v1";

const listAlerts = new Array();

export function Alerts({ navigation, route }) {
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);  
  const [alerts, setAlerts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [modalFilterVisible, setModalFilterVisible] = useState(false);
  const [team, setTeam] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [supplier, setSupplier] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [typeTeam, setTypeTeam] = useState([]);
  const [selectedTypeTeam, setSelectedTypeTeam] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [nav, setNav] = useState('');
  const isFocused = useIsFocused();

  const token = useAuth().authData?.token;
  const userFunction = useAuth().authData?.userFunction;

  const options = {
    method: "GET",
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  };
  
  async function loadAlerts() {
    setIsLoading(true);
    try {
      const data = await fetch(url + '/alertas/table-alerta', options);

      const json = await data.json();

      setAlerts(json);
      setIsLoading(false);
    }
    catch(error) {
      console.error(error);
      setIsLoading(false);
    }    
  }

  const toggleModalFilter = () => {
    setModalFilterVisible(!modalFilterVisible);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  useEffect(() => {    
    loadAlerts();
    userFunction === 'Fiscal' ? setNav('NewAlert') : setNav('Historic');    
  }, [isFocused]);

  useFocusEffect(
    React.useCallback(() => { 
      // Configurando o intervalo para 15 minutos (900000 milissegundos)
      const interval = setInterval(loadAlerts, 900000);
  
      // Limpar o intervalo ao desmontar o componente para evitar vazamento de memória
      return () => clearInterval(interval);
    }, [])
  );
  
  return (
    <SafeAreaView style={AlertsStyles.container}>
      <View style={AlertsStyles.sectionList}>
        <FlatList
          style={{ marginTop: 3 }}
          contentContainerStyle={{ marginHorizontal: 20 }}
          data={alerts}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (            
            <View style={{ flexDirection: 'column', borderBottomColor: '#e3e3e3', borderBottomWidth: 1 }}>
              <View style={{ flexDirection: 'row', padding: 5 }}>
                <View style={{ justifyContent: 'center', width: '85%' }}>
                  <Text style={AlertsStyles.listText}>{item.tipoAlerta.toUpperCase()}</Text>
                  <Text style={{ marginLeft: 8, fontSize: 10 }}>{item.dataOcorrencia + ' - ' + item.prefixo}</Text>
                </View>
                <View style={{ width: '15%', alignItems: 'flex-end' }}>
                  <IconButton
                    icon='clipboard-text-search' size={32}
                    iconColor={'#093576'}
                    style={{ marginRight: 15, alignSelf: 'center' }}
                    onPress={() => navigation.navigate(item.status === 'Aguardando Resposta' ? nav : 'Historic', { 
                      id: item.id,
                      description: item.tipoAlerta,
                      classification: item.classificacao,
                      status: item.status
                    })}
                  />
                </View>
              </View>
              <LinearGradient 
                colors={ReturnGradient(item.status)} 
                style={{ borderRadius: 4, marginBottom: 3, width: '80%', padding: 5 }}
                locations={[0.5, 0.8, 0.9]}
              >
                <Text style={{ fontSize: 12, color: '#FFF', textAlign: "center" }}>{item.status}</Text>
              </LinearGradient>
            </View>
          )}
        />
      </View>
      <Modal
        animationIn='slideInUp'
        animationOut='slideOutDown'
        isVisible={modalFilterVisible}
        backdropColor='#000'
        backdropOpacity={0.4}
        avoidKeyboard={false}
      >
        <View style={AlertsStyles.centeredView}>
          <View style={AlertsStyles.modalView}>
            <View style={AlertsStyles.modalHeader}>
              <Text>Filtrar Alertas</Text>
            </View>
            <View style={{ flexDirection: 'row', width: '90%', alignContent: 'space-between', marginBottom: 20, flexWrap: 'wrap' }}>
              <View style={{ width: '100%', padding: 3, marginBottom: 10 }}>
                <Text style={{ fontSize: 12 }}>Equipe</Text>
                <SelectList
                  data={team}
                  setSelected={(val: any) => setSelectedTeam(val)}
                  placeholder="Selecione"
                  boxStyles={{ borderRadius: 4 }}
                  inputStyles={{ fontSize: 12 }}
                  dropdownTextStyles={{ fontSize: 12 }}
                />
              </View>
              <View style={{ width: '100%', padding: 3, marginBottom: 10 }}>
                <Text style={{ fontSize: 12 }}>Fornecedor</Text>
                <SelectList
                  data={supplier}
                  setSelected={(val: any) => setSelectedSupplier(val)}
                  placeholder="Selecione"
                  boxStyles={{ borderRadius: 4 }}
                  inputStyles={{ fontSize: 12 }}
                  dropdownTextStyles={{ fontSize: 12 }}
                />
              </View>          
              <View style={{ width: '100%', padding: 3, marginBottom: 10 }}>
                <Text style={{ fontSize: 12 }}>Tipo de Equipe</Text>
                <SelectList
                  data={typeTeam}
                  setSelected={(val: any) => setSelectedTypeTeam(val)}
                  placeholder="Selecione"
                  boxStyles={{ borderRadius: 4 }}
                  inputStyles={{ fontSize: 12 }}
                  dropdownTextStyles={{ fontSize: 12 }}
                />
              </View> 
              <View style={{ width: '100%' }}>
                <Text style={{ fontSize: 12 }}>Data</Text>
                <TextInput
                  mode='outlined'
                  multiline={true}
                  numberOfLines={5}
                  style={{
                    fontSize: 12,
                    backgroundColor: '#FFF',
                    width: '100%',
                    borderRadius: 0,
                    height: 40,
                    padding: 1
                  }}
                  onFocus={showDatePicker}
                  value={selectedDate}
                />
              </View>                                
            </View>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={(date: any) => {
                setSelectedDate(moment(date).format('DD/MM/YYYY'));
                setDatePickerVisibility(false);
              }}
              onCancel={hideDatePicker}
              confirmTextIOS='Confirmar'
              cancelTextIOS='Cancelar'
              textColor='black'
              locale='pt_BR'
            />    
            <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 30}}>
              <TouchableOpacity style={AlertsStyles.buttonConfirm} onPress={toggleModalFilter}>
                <Text style={{color: '#FFF'}}>Confirmar</Text>
              </TouchableOpacity>                     
              <TouchableOpacity style={AlertsStyles.buttonFilter} onPress={toggleModalFilter}>
                <Text style={{ color: '#093576' }}>Cancelar</Text>
              </TouchableOpacity>                    
            </View>
          </View>
        </View>
      </Modal>
      <Loading load={isLoading} />
    </SafeAreaView>
  )
}

function ReturnGradient(description: any) {
  switch (description) {
    case 'Aprovado': return ['#038a25', '#136118', '#136118'];
    case 'Aguardando Resposta': return ['#f04324', '#e67b17', '#e67b17'];
    case 'Aguardando Aprovação': return ['#0e459c', '#407fe6', '#407fe6'];
    case 'Não Respondido': return ['#f04324', '#d63333', '#d63333'];
    case 'Recusado': return ['#d63333', '#d63333', '#d63333'];
    default: return ['#038a25', '#136118', '#06290b'];
  }
}