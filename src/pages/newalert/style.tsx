import { Platform, StyleSheet } from 'react-native';

export const NewAlertStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonConfirm: {
    backgroundColor: '#093576', 
    borderRadius: 8, 
    marginRight: 10, 
    padding: 6, 
    width: 100, 
    alignItems: 'center', 
    alignSelf: 'stretch'   
  },  
  buttonFilter: {
    backgroundColor: '#FFF', 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: '#093576',
    marginRight: 10, 
    padding: 6, 
    width: 100, 
    alignItems: 'center', 
    alignSelf: 'stretch'   
  },
  fieldSet:{
    margin: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 10,
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    borderColor: '#000',
    width: '93%'
  },
  legend:{
      position: 'absolute',
      top: -12,
      left: 10,
      fontWeight: 'bold',
      backgroundColor: '#f6f6f6'
  },
  buttonDisabled: {
    backgroundColor: '#999',
    color: '#000',
    borderRadius: 8, 
    marginRight: 10, 
    padding: 6, 
    width: 100, 
    alignItems: 'center', 
    alignSelf: 'stretch'       
  }
});