import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import { HistoricStyles } from './style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/auth';
import { Loading } from '../../components/PageLoading';

const url = "https://mipi.equatorialenergia.com.br/mipiapi/api/v1";

export function Historic({route}) {
  const [historic, setHistoric] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = useAuth().authData?.token;
  const options = {
    method: "GET",
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  };

  async function loadHistoric() {
    try {
      let list = [];

      const data = await fetch(url + '/alertas/historico-alerta?AlertaId=' + route.params.id, options);

      const json = await data.json();

      for (let i = 0; i < json.length; ++i) {
        const obj = {
          time: json[i].dataOcorrencia,
          title: json[i].status,
          description: json[i].descricaoAlerta,
          lineColor: '#009688',
          circleColor: ReturnColor(json[i].status)
        }

        list.push(obj);
      }

      setHistoric(list);
      setIsLoading(false);
    }
    catch(error) {
      setIsLoading(false);
      console.error(error);
    }    
  }
  
  useEffect(() => {
    loadHistoric();
  }, []);

  return (
    <SafeAreaView style={{paddingBottom: 100}}>
      <View style={{paddingBottom: 30, marginLeft: 20}}>
        <Text style={{fontSize: 16}}>Histórico de Justificativas de Anomalias</Text>
      </View>
      <View style={HistoricStyles.exampleContainer}>
        <Timeline
          data={historic}
          isUsingFlatlist={true}
          circleSize={20}
          descriptionStyle={{color:'gray', top: -12}}
          titleStyle={{top: -10}}
          timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13, marginRight: 10}}
          timeContainerStyle={{minWidth:52}}
          columnFormat='two-column'
          innerCircle={'dot'}
          detailContainerStyle={{marginBottom: 20, padding: 10, backgroundColor: "#BBDAFF", borderRadius: 10,}}
        />
      </View>
      <Loading load={isLoading} />
    </SafeAreaView>
  )
}

function ReturnColor(description: string) {
  switch (description) {
    case 'Aprovado': return '#00b48b';
    case 'Aguardando Resposta': return '#f04324';
    case 'Aguardando Aprovação': return '#0e459c';
    case 'Não Respondido': return '#d63333';
    case 'Recusado': return '#f04324';
    case 'Não Avaliado': return 'orange';
    default: return '#038a25';
  }
}