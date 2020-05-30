import { StyleSheet } from 'react-native';

export default (theme: any) => StyleSheet.create({
  votesContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 100,
      paddingLeft: 20
  },
  count: {
      fontSize: 11,
      opacity: 0.5,
    //   marginRight: 10
  }
});
