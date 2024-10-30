import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

export const AlertsStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    marginTop: 30
  },
  sectionList: {
    width: '95%',
    backgroundColor: '#fff',
    height: '98%',
    borderRadius: 8
  },
  listText: {
    marginLeft: 10,
    fontSize: RFPercentage(1.7),
    fontWeight: 'bold'
  },  
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    width: '100%'        
  },
  modalView: {
      marginTop: 40,
      marginLeft: 30,
      marginRight: 30,
      backgroundColor: 'white',
      borderRadius: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width: '90%'
  },
  modalHeader: {
      width:'100%',
      padding: 10,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#e3e3e3',
      marginBottom: 20
  },  
  buttonFilter: {
    backgroundColor: '#FFF', 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: '#093576',
    marginRight: 10, 
    padding: 4, 
    width: 100, 
    alignItems: 'center', 
    alignSelf: 'stretch'   
  },
  buttonConfirm: {
    backgroundColor: '#093576', 
    borderRadius: 8, 
    marginRight: 10, 
    padding: 4, 
    width: 100, 
    alignItems: 'center', 
    alignSelf: 'stretch'   
  }  
});