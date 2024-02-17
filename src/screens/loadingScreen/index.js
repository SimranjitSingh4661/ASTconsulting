import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../constants';
import {StyledText} from '../../components/atoms';
import styles from './styles';

const LoadingScreen = ({fetchData = false}) => {
  return (
    <LinearGradient colors={COLORS.WELCOME_GRADIENT} style={styles.screen}>
      <View>
        {fetchData && (
          <StyledText textStyle={styles.text}>
            {'Fetching nearby hospitals...'}
          </StyledText>
        )}
        <ActivityIndicator color={COLORS.PRIMARY} size={'large'} />
      </View>
    </LinearGradient>
  );
};

export default LoadingScreen;
