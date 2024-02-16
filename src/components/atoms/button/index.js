import React, {Fragment} from 'react';
import StyledText from '../styledText';
import {COLORS} from '../../../constants';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

const Button = ({text, onPress, isDisabled = false}) => {
  return (
    <Fragment>
      {!isDisabled ? (
        <View style={styles.disabled}>
          <StyledText color={COLORS.BLUE} textStyle={styles.text}>
            {text}
          </StyledText>
        </View>
      ) : (
        <TouchableOpacity style={styles.btn} onPress={onPress}>
          <StyledText color={COLORS.BLUE} textStyle={styles.text}>
            {text}
          </StyledText>
        </TouchableOpacity>
      )}
    </Fragment>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    marginTop: 20,
    elevation: 4,
    borderRadius: 50,
    paddingVertical: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
  },
  disabled: {
    flex: 1,
    marginTop: 20,
    elevation: 4,
    borderRadius: 50,
    paddingVertical: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#c4c6cc',
    opacity: 0.6,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
