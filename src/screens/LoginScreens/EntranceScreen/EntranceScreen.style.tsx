import { StyleSheet } from 'react-native';

export default (theme: any) => StyleSheet.create({
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%'
  },
  padding: {
    flex: 3
  },
  description: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20
  }
});
