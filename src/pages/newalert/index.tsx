import React, { useEffect, useState } from "react";
import { Alert, Keyboard, Platform, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { IconButton, TextInput } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import axios, { AxiosRequestConfig } from 'axios';
import { NewAlertStyles } from './style';
import { useAuth } from '../../contexts/auth';

export function NewAlert({ navigation, route }) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const [listAction, setListAction] = useState([]);
  const [selectedAction, setSelectedAction] = useState<string | null>('');
  const [justification, setJustification] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const token = useAuth().authData?.token;

  async function loadAction() {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: 'https://mipi.equatorialenergia.com.br/mipiapi/api/v1/acoes-corretivas',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'multipart/form-data'
      }
    };

    await axios(config).then((response) => {
      setListAction(response.data);
    }).catch(function (error)  {
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
      setIsLoading(false);
    });   
  }

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("O seu aplicativo ainda não possui permissão para utilizar a câmera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsMultipleSelection: true,
      selectionLimit: 5,
      quality: 1.0
    });

    if (!result?.canceled) {
      const photoUri = Platform.OS === 'ios' ? result.assets[0].uri.replace('file://', '') : result.assets[0].uri;
      setImageUri(photoUri);
    }
  }

  async function saveJustification() {
    setIsLoading(true);

    const formData: FormData = new FormData();
    const json = {
      'id': route.params.id,
      'acaoCorretivaId': selectedAction,
      'justificativa': justification
    };

    if (imageUri !== '') {
      formData.append('ImagemUpload', blob);
    }

    formData.append('command', JSON.stringify(json));

    const config: AxiosRequestConfig = {
      method: 'POST',
      url: 'https://mipi.equatorialenergia.com.br/mipiapi/api/v1/alertas',
      data: formData,
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'multipart/form-data'
      }
    };

    await axios(config).then((response) => {
      navigation.goBack();
    }).catch(function (error)  {
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
      setIsLoading(false);
    });      
  }

  function clearForm() {    
    setSelectedAction('');
    setJustification('');
    setImageUri('');
  }

  const showPrompt = () => {
    if (selectedAction === '') {
      Alert.alert('Atenção', 'Informe a ação necessária');
      return;
    }
    else if (justification === '') {
      Alert.alert('Atenção', 'Informe a jsutificativa');
      return;
    }

    Alert.alert(
      'Confirmação',
      'Confirmar a inclusão desta justificativa?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Ok',
          onPress: () => saveJustification(),
          style: 'default',
        },        
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            'This alert was dismissed by tapping outside of the alert dialog.',
          ),
      },
    );
  }

  useEffect(() => {
    setIsDisabled(route.params.status !== 'Aguardando Resposta');
   
    loadAction();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{  
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
      }}>
        <View style={{ padding: 10 }}>
          <Text>{ route.params.description.toUpperCase() }</Text>
        </View>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 14 }}>Preencha os dados abaixo referentes à Anomalia selecionada</Text>
        </View>
        <View style={NewAlertStyles.fieldSet}>
          <Text style={NewAlertStyles.legend}>Classificação</Text>
          <Text>{route.params.classification.toUpperCase()}</Text>
        </View>        
        <View style={{ marginBottom: 10, paddingLeft: 20, paddingRight: 20, width: '100%' }} pointerEvents={isDisabled ? "none" : undefined}>
          <Text style={{ fontSize: 13, fontWeight: 'bold', marginLeft: 5 }}>Ação Corretiva</Text>
          <SelectList
            data={listAction}
            setSelected={(value: any) => setSelectedAction(value)}
            placeholder="SELECIONE"
            boxStyles={{ borderRadius: 4, backgroundColor: '#FFF' }}
            inputStyles={{ fontSize: 12 }}
            dropdownTextStyles={{ fontSize: 12 }}
            searchPlaceholder="Busca"
            notFoundText="Não encontrado"
            defaultOption={{key: '', value: ''}}
          />
        </View>
        <View style={{ marginBottom: 10, paddingLeft: 20, paddingRight: 20, width: '100%', height: '30%' }}>
          <Text style={{ fontSize: 13, fontWeight: 'bold', marginLeft: 5 }}>Justificativa</Text>
          <ScrollView>
            <TextInput
              textAlignVertical="top"
              editable={true}
              multiline={true}
              numberOfLines={4}
              onChangeText={(value) => setJustification(value)}
              value={justification}
              style={{ backgroundColor: '#FFF', borderRadius: 8, fontSize: 14, textAlignVertical: 'top', borderColor: '#e3e3e3', borderWidth: 1 }}
              textBreakStrategy='highQuality'
              disabled={isDisabled}
            />
          </ScrollView>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 15}} pointerEvents={isDisabled ? "none" : undefined}>
          <IconButton
            icon={imageUri == '' ? 'camera' : 'camera-flip'} 
            size={32}
            iconColor={isDisabled ? '#999' : '#093576'}
            onPress={openCamera}
          />
          <Text>{imageUri == '' ? 'Anexar evidência' : 'Tirar outra foto'}</Text>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 15}}>
          <TouchableOpacity style={NewAlertStyles.buttonConfirm} onPress={() => navigation.navigate('Historic', {id: route.params.id})}>
            <Text style={{color: '#FFF'}}>Histórico</Text>
          </TouchableOpacity>           
          <TouchableOpacity 
            style={isDisabled ? NewAlertStyles.buttonDisabled : NewAlertStyles.buttonConfirm} 
            onPress={() => showPrompt()}
            disabled={isDisabled}
          >
            <Text style={{color: '#FFF'}}>Confirmar</Text>
          </TouchableOpacity> 
          <TouchableOpacity 
            style={isDisabled ? NewAlertStyles.buttonDisabled : NewAlertStyles.buttonConfirm}
            onPress={clearForm}
            disabled={isDisabled}
          >
            <Text style={{color: '#FFF'}}>Limpar</Text>
          </TouchableOpacity>           
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}