import { StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

export const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f6f6f6'
  },
  containerItem: {
    width: '90%',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    borderColor: 'gray',
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center'
  },
  conatinerItemText: {
    color: '#5E72E4',
    fontSize: 16
  },
  conatinerItemValue: {
    color: '#000',
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold'
  },  
  containerValue: {
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
    padding: 10,
    borderColor: '#000',
    borderWidth: 1,
    width: '90%'
  },
  textTitle: {
    color: '#FFF',
    fontSize: 20,
    paddingBottom: 10,
    alignSelf: 'center'
  },
  textValue: {
    fontSize: RFPercentage(2),
    fontWeight: 'bold'
  },
  containerMenu: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    flexWrap: 'wrap'
  },
  menu: {
    borderRadius: 8,
    width: '48%',
    backgroundColor: '#FFF',
    padding: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
      backgroundColor: '#093576',
      width: 200,
      height: 45,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      marginTop: 40
  }
});