import React from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../constants';
import {StyledText, Button} from '../../components/atoms';
import styles from './styles';
import {STRINGS} from '../../constants';

const ErrorScreen = ({onPress}) => {
  return (
    <LinearGradient colors={COLORS.WELCOME_GRADIENT} style={styles.screen}>
      <View>
        <StyledText textStyle={styles.text}>
          {STRINGS.ERROR.SOMETHING_WENT_WRONG}
        </StyledText>
        <Button onPress={onPress} isDisabled text={'Refresh'} />
      </View>
    </LinearGradient>
  );
};

export default ErrorScreen;
