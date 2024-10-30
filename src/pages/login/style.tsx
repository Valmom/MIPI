import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  container: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    borderRadius: 8,
    paddingTop: 10,
    paddingBottom: 30
  },
  titleText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 15
  },
  logoEquatorial: {
    marginTop: Platform.OS === 'android' ? '5%' : '5%',
    marginBottom: '5%'
  },
  text: {
    color: '#000'
  },
  input: {
    width: '90%',
    height: 40,
    backgroundColor: '#F4F3F3',
    marginBottom: 25,
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  inputPassword: { 
    flex: 1, 
    color: '#333', 
    backgroundColor: '#F4F3F3',
    paddingVertical: 6, 
    paddingRight: 10,
  },   
  loginButton: {
    backgroundColor: '#272c7d',
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  loginText: {
    color: '#FFF',
    fontSize: 16
  },
  switchContainer: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  switch: {
    transform: [{ scaleX: .8 }, { scaleY: .8 }]
  },
  logoSintech: {
    position: 'absolute',
    bottom: 20
  },
  logoSafDespesas: {
    marginBottom: 20,
    marginTop: 20
  },
  time: {
    display: 'flex',
    fontSize: 14
  },
  icon: { 
    marginLeft: 10, 
  },
  inputContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#f3f3f3', 
    borderRadius: 5, 
    paddingHorizontal: 14, 
    width: '90%',
    borderWidth: 1,
    borderColor: '#e0e0e0'        
  }   
});