import { StyleSheet } from 'react-native';

export default (theme: any) => StyleSheet.create({
  titleContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  buttonContainer: {
    flex: 0.7,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: '15%',
    width: '100%'
  },
});
