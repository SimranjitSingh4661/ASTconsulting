import {StyleSheet} from 'react-native';
import {SCREEN_PADDING} from '../../constants';

export default styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: SCREEN_PADDING,
  },
  inputContainer: {
    marginBottom: 20,
  },
  titleContainer: {
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  footerContainer: {
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  btn: {
    flexDirection: 'row',
    marginHorizontal: 50,
    justifyContent: 'center',
  },
});
