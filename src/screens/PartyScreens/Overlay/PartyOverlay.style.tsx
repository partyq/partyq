import { StyleSheet } from 'react-native';

export default (theme: any) => StyleSheet.create({
  overlayView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  pageTitle: {
    fontWeight: '700',
    fontSize: 18
  },
});
