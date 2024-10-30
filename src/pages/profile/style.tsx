import { StyleSheet } from 'react-native';

export const ProfileStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: '#093576',
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    alignSelf: 'center',
    marginTop: 0,
    position: 'relative'
  },
  editPhoto: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },  
  name: {
    fontSize: 12,
    color: '#000',
    fontWeight: 'bold'
  },
  body: {
    marginTop: 60,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#4294DD',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: '90%',
    borderRadius: 8,
    backgroundColor: '#093576',
  }
});