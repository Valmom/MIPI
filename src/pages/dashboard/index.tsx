import React, { useEffect, useState } from "react";
import { Alert, Dimensions, ScrollView, Text, View } from "react-native";
import axios, { AxiosRequestConfig } from "axios";
import { useAuth } from '../../contexts/auth';
import CircularProgress from '../../components/CircularProgress';
import { DashboardStyles } from "./style";
import { BarChart } from "react-native-gifted-charts";
import { Skeleton } from "../../components/Skeleton";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { Avatar, Card } from 'react-native-paper';

const url = "https://mipi.equatorialenergia.com.br/mipiapi/api/v1";
const windowWidth = Dimensions.get('window').width;

export function Dashboard() {
  const [isLoading, setIsLoading] = useState<null | boolean>(true);
  const [dataOEE, setDataOEE] = useState<null | any>({});
  const [title, setTitle] = useState<null | string>('');
  const [value1, setValue1] = useState<null | number>(0);
  const [value2, setValue2] = useState<null | number>(0);
  const [value3, setValue3] = useState<null | number>(0);
  const [value4, setValue4] = useState<null | number>(0);
  const [maxValue, setMaxValue] = useState<number>(50);
  const [label1, setLabel1] = useState<null | string>('');
  const [label2, setLabel2] = useState<null | string>('');
  const [label3, setLabel3] = useState<null | string>('');
  const [label4, setLabel4] = useState<null | string>('');
  const [qtdeAlertas, setQtdeAlertas] = useState<null | string>('');
  const [novoAlerta, setNovoAlerta] = useState<null | string>('');
  const [qtdeAlertaAguardandoResposta, setQtdeAlertaAguardandoResposta] = useState<null | string>('');
  const [qtdeAlertasRespodidos, setQtdeAlertasRespodidos] = useState<null | string>('');
  const isFocused = useIsFocused();

  const token = useAuth().authData?.token; 
  const user = useAuth().authData;

  const options = {
    method: "GET",
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  };

  async function loadOEE() {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: url + '/alertas/grafico-oee',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    }

    await axios(config).then((response) => {
      setDataOEE(response.data);
    }).catch((error) => {
      const err = error.request.response ? error.request?.response : error.request?._response;
    });
  }
  
  async function loadMedia() {
    user.userName === 'Eletricista' ? setTitle('Média UPS') : setTitle('Média Qtde');
    let endpoint = user.userName === 'Eletricista' ? 'media-ups' : 'media-qtde';

    try {
      const data = await fetch(url + '/graficos/' + endpoint, options);
      const json = await data.json();

      if (json.data.datasets.length > 1 && json.data.datasets[0].data[0] !== null && json.data.datasets[1].data[0] !== null) {
        var sum1 = await json.data.datasets[0].data.reduce(function(accumulator, value) {
          return accumulator + value
        }, 0);

        var sum2 = await json.data.datasets[1].data.reduce(function(accumulator, value) {
          return accumulator + value
        }, 0);

        const v1: number = await sum2;
        const v2: number = await sum1;
        const l1 = await json.data.datasets[1].label;
        const l2 = await json.data.datasets[0].label;

        const m1 = await Math.max(v1, v2);

        await setValue1(v1);
        await setValue2(v2);

        await setLabel1(l1);
        await setLabel2(l2);
        await setMaxValue(m1*1.3); 

        setIsLoading(false);
      }
      else {
        setIsLoading(false);
      }
    }
    catch(error) {
      if (error.response) {
        Alert.alert('Erro', error.response.data.errors[0]);
      } else if (error.request) {
        Alert.alert(error.request);
      } else {
        Alert.alert('Error', error.message);
      }      
      setIsLoading(false);      
    }
  }

  async function loadAtribuidoDiario() {
    try {
      const data = await fetch(url + '/graficos/equipe-meta-atribuido-diario', options);
      const json = await data.json();
      
      if (json.data.datasets[0].data[0] !== null && json.data.datasets[1].data[0] !== null) {

        var sum1 = await json.data.datasets[0].data.reduce(function(accumulator, value){
          return accumulator + value
        }, 0);

        var sum2 = await json.data.datasets[1].data.reduce(function(accumulator, value){
          return accumulator + value
        }, 0);

        const v1: number = await sum2;
        const v2: number = await sum1;
        const l1 = await json.data.datasets[1].label;
        const l2 = await json.data.datasets[0].label;
        const l3 = await json.data.datasets[2].label;
        const l4 = await json.data.datasets[3].label;

        const m1 = await Math.max(v1, v2);

        await setValue1(v1);
        await setValue2(v2);

        await setLabel1(l1);
        await setLabel2(l2);
        await setMaxValue(m1*1.3); 

        setIsLoading(false);
      }
      else {
        setIsLoading(false);
      }
    }
    catch(error) {
      console.error(error);
    }   
  }

  async function loadQtdeAlertas() {
    try {
      const data = await fetch(url + '/alertas/quantidade-alerta', options);

      const json = await data.json();
      setQtdeAlertas(json.total);
    }
    catch(error) {
      console.error(error);
    }    
  }

  const loadNovoAlerta = async () => {
    try {
      const data = await fetch(url + '/alertas/novo-alerta', options);

      const json = await data.json();

      if (json.length > 0) {
        setNovoAlerta(json[0].descricao.toUpperCase());
      }
      else {
        setNovoAlerta('Não há novos alertas');
      }
    }
    catch(error) {
      console.error(error);
    }    
  }

  const loadQtdeAlertaAguardandoResposta = async () => {
    try {
      const data = await fetch(url + '/alertas/quantidade-alerta-aguardando-resposta', options);
      const json = await data.json();

      setQtdeAlertaAguardandoResposta(json.total);
    }
    catch(error) {
      console.error(error);
    }
  }

  const loadQtdeAlertasRespondidos = async () => {
    try {
      const data = await fetch(url + '/alertas/quantidade-alerta-respondido', options);
      const json = await data.json();

      setQtdeAlertasRespodidos(json.total);
    }
    catch(error) {
      console.error(error);
    }
  }

  const loadMetaAtribuidoReal = async () => {
    const data = await fetch(url + '/graficos/equipe-meta-atribuido-real', options);

    const json = await data.json();
      
      if (json.data.datasets[0].data[0] !== null && json.data.datasets[1].data[0] !== null) {

        var sum1 = await json.data.datasets[0].data.reduce(function(accumulator, value){
          return accumulator + value
        }, 0);

        var sum2 = await json.data.datasets[1].data.reduce(function(accumulator, value){
          return accumulator + value
        }, 0);

        const v1: number = await sum2;
        const v2: number = await sum1;
        const l1 = await json.data.datasets[1].label;
        const l2 = await json.data.datasets[0].label;
        const l3 = await json.data.datasets[2].label;
        const l4 = await json.data.datasets[3].label;

        const m1 = await Math.max(v1, v2);

        await setValue1(v1);
        await setValue2(v2);

        await setLabel1(l1);
        await setLabel2(l2);
        await setMaxValue(m1*1.3); 

        setIsLoading(false);
      }
      else {
        setIsLoading(false);
      }
  }

  useEffect(() => {
    const getAllInformations = async () => {
      setIsLoading(true);
      loadMedia();
      user.userFunction === 'Eletricista' ? loadMetaAtribuidoReal() : loadAtribuidoDiario;
      loadQtdeAlertas();
      loadNovoAlerta();
      loadQtdeAlertaAguardandoResposta();
      loadQtdeAlertasRespondidos();
      setIsLoading(false);      
    }

    getAllInformations();

  }, [isFocused]);

  useFocusEffect(
    React.useCallback(() => {
      const loadData = () => {
        setIsLoading(true);
        loadMedia();
        loadQtdeAlertas();
        loadNovoAlerta();
        loadQtdeAlertaAguardandoResposta();
        loadQtdeAlertasRespondidos();
        setIsLoading(false);  
      };
  
      // Configurando o intervalo para 15 minutos (900000 milissegundos)
      const interval = setInterval(loadData, 900000);
  
      // Limpar o intervalo ao desmontar o componente para evitar vazamento de memória
      return () => clearInterval(interval);

    }, [])
  );

  return (
    <ScrollView style={DashboardStyles.container}>
      {/*<View style={{
        flexDirection: 'row', padding: 10, backgroundColor: '#fff', borderRadius: 8, borderBottomWidth: 1, borderBottomColor: '#e3e3e3',
        justifyContent: 'flex-end'
      }}>
        <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>    
          <TouchableOpacity style={DashboardStyles.buttonFilter}>
            <Text style={{ color: '#093576' }}>Filtro</Text>
          </TouchableOpacity>
        </View>
      </View> */}     
      <>        
      { isLoading ? <View style={{paddingTop: 10}}><Skeleton width={windowWidth - 60} height={120} /></View> :       
        <View style={[DashboardStyles.mainCardView, {display: 'none'}]}>
          <View style={{alignItems: 'center'}}>
            <CircularProgress
              percentage={dataOEE.oee}
              
            >
              <View>
                <Text>{dataOEE.oee}%</Text>
              </View>
            </CircularProgress>
            <Text style={{fontSize: 10}}>OEE</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <CircularProgress
              percentage={dataOEE.disponibilidade}
            >
              <View>
                <Text>{dataOEE.disponibilidade}%</Text>
              </View>
            </CircularProgress>  
            <Text style={{fontSize: 10}}>Disponibilidade</Text>
          </View>  
          <View style={{alignItems: 'center'}}>
            <CircularProgress
              percentage={dataOEE.performance}
            >
              <View>
                <Text>{dataOEE.performance}%</Text>
              </View>
            </CircularProgress>  
            <Text style={{fontSize: 10}}>Performance</Text>
          </View>    
          <View style={{alignItems: 'center'}}>
            <CircularProgress
              percentage={dataOEE.qualidade}
            >
              <View>
                <Text>{dataOEE.qualidade}%</Text>
              </View>
            </CircularProgress>  
            <Text style={{fontSize: 10}}>Qualidade</Text>
          </View>                  
        </View>        
      }
      </>
      <>
      { isLoading && maxValue !== 50 ? <View style={{paddingTop: 15, paddingBottom: 20}}><Skeleton width={windowWidth - 60} height={170} /></View> :             
        <View style={[DashboardStyles.mainCardView, {marginTop: 20}]}>
          <View style={{alignItems: 'center', width: '100%'}}>
            <Text style={{ color: '#7367e4', fontSize: 14, fontWeight: 'bold', marginBottom: 10 }}>{title}</Text>
            <BarChart 
              data={[
                {
                  label: label1, 
                  value: value1, 
                  frontColor: '#EF233C',
                  topLabelComponent: () => (
                    <Text style={{color: '#000', fontSize: 14, marginBottom: 6}}>{value1}</Text>
                  )           
                },
                {
                  label: label2, 
                  value: value2, 
                  frontColor: '#001D4F',
                  topLabelComponent: () => (
                    <Text style={{color: '#000', fontSize: 14, marginBottom: 6}}>{value2}</Text>
                  )
                }
              ]} 
              height={100}
              width={Dimensions.get('window').width - 150}
              barWidth={Dimensions.get('screen').width * 0.166}
              yAxisThickness={0}
              xAxisThickness={0}
              maxValue={isLoading !== true ? maxValue : 50}
              hideYAxisText
              hideRules
              isAnimated
              spacing={Dimensions.get('screen').width * 0.166}
            />
          </View>
        </View>        
      }          
      </>     
      { isLoading ? <View style={{paddingBottom: 20}}><Skeleton width={windowWidth - 60} height={80} /></View> :
        <>
          {/* <Card.Title
            title='Quantidade de Alertas'
            subtitle={qtdeAlertas}            
            left={(props) => <Avatar.Icon {...props} icon='alert' />}
            style={DashboardStyles.mainCardView}
          /> */}
          {/* <View style={DashboardStyles.mainCardView}>
            <View style={{alignItems: 'center', width: '100%'}}>
              <Text style={{ color: '#7367e4', fontSize: 14, fontWeight: 'bold', marginBottom: 10 }}>Quantidade de Alertas</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{qtdeAlertas}</Text>
            </View>      
          </View> */}
        </>
      }
      { isLoading ? <View style={{paddingBottom: 20}}><Skeleton width={windowWidth - 60} height={80} /></View> :
        <>     
          <Card.Title
            title='Último Alerta Recebido'
            subtitle={novoAlerta}
            left={(props) => <Avatar.Icon {...props} icon='access-point' style={{backgroundColor: '#3498db'}} />}
            right={(props) => <Avatar.Icon {...props} icon='arrow-right-bold' style={{backgroundColor: '#3DDB35'}} />}
            style={DashboardStyles.mainCardView}
          />        
          {/* <View style={DashboardStyles.mainCardView}>
            <View style={{alignItems: 'center', width: '100%'}}>
              <Text style={{ color: '#7367e4', fontSize: 14, fontWeight: 'bold', marginBottom: 10 }}>Notificação de Novo Alerta</Text>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{novoAlerta}</Text>
            </View>      
          </View>   */}
        </> 
      }
      { isLoading ? <View style={{paddingBottom: 20}}><Skeleton width={windowWidth - 60} height={80} /></View> :
        <>  
          <Card.Title
            title='Quantidade de Alertas Aguardando Resposta'
            subtitle={qtdeAlertaAguardandoResposta}
            left={(props) => <Avatar.Icon {...props} icon='calendar-clock' style={{backgroundColor: '#ffbc05'}} />}
            style={DashboardStyles.mainCardView}
          />   

          {/* <View style={DashboardStyles.mainCardView}>
            <View style={{alignItems: 'center', width: '100%'}}>
              <Text style={{ color: '#7367e4', fontSize: 14, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' }}>Quantidade de Alertas Aguradando Resposta</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{qtdeAlertaAguardandoResposta}</Text>
            </View>      
          </View> */}
        </>
      }
      { isLoading ? <View style={{paddingBottom: 20}}><Skeleton width={windowWidth - 60} height={80} /></View> :
        <>        
          <Card.Title
            title='Quantidade de Alertas Respondidos'
            subtitle={qtdeAlertasRespodidos}                        
            left={(props) => <Avatar.Icon {...props} icon='calendar-check' style={{backgroundColor: '#8DFFCD'}} />}
            style={DashboardStyles.mainCardView}
          />           
          {/* <View style={DashboardStyles.mainCardView}>
            <View style={{alignItems: 'center', width: '100%'}}>
              <Text style={{ color: '#7367e4', fontSize: 14, fontWeight: 'bold', marginBottom: 10 }}>Quantidade de Alertas Respondidos</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{qtdeAlertasRespodidos}</Text>
            </View>      
          </View>  */}
        </>
      }               
    </ScrollView>
  );
}