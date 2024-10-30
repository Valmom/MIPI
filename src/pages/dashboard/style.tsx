import { StyleSheet } from 'react-native';

export const DashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6'
  },
  chartContainer: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  containerMedia: {
    width: '90%',
    marginBottom: 10,
    backgroundColor: '#FFF',
    alignSelf: 'center',
    height: 240,
    borderEndEndRadius: 8,
    borderEndStartRadius: 8
  },
  containerOEE: {
    alignSelf: 'center',
    width: '90%',
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: '#FFF',
    justifyContent: 'space-around',
    borderEndEndRadius: 8,
    borderEndStartRadius: 8,
    padding: 15,
    flexDirection: 'row'    
  },
  headerText: { 
    backgroundColor: '#FFF', 
    alignItems: 'center', 
    paddingTop: 5, 
    width: '90%', 
    alignSelf: 'center', 
    borderTopLeftRadius: 8, 
    borderTopRightRadius: 8 
  },
  points: {
    textAlign: 'center',
    color: '#7591af',
    fontSize: 50,
    fontWeight: '100',
  },
  containerAccumulated: {
    width: '90%',
    padding: 5,
    backgroundColor: '#7367e4',
    borderRadius: 8,
    marginTop: 10,
    justifyContent: 'space-between',
    flexDirection: 'row'        
  },  
  containerAlertsValue: {
      width: '90%',
      padding: 5,
      backgroundColor: '#7367e4',
      borderRadius: 8,
      marginTop: 10,
      justifyContent: 'space-between',
      flexDirection: 'row'        
  },
  mainCardView: {
    alignSelf: 'center',
    backgroundColor: "#FFF",
    borderRadius: 8,
    shadowColor: "#e3e3e3",
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 18,
    width: '90%'
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
  }  
});