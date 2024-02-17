import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import {
  Input,
  StyledText,
  Button,
  ButtonSelector,
} from '../../components/atoms';
import LinearGradient from 'react-native-linear-gradient';
import {SharedStyles} from '../../shared';
import {COLORS} from '../../constants';
import {STRINGS} from '../../constants';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import styles from './styles';

const WelcomeScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('Register');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!!error) {
      Toast.show({
        type: 'error',
        text1: error,
      });
    }
  }, [error]);

  const onRegister = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Account Loged In',
        });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setError(STRINGS.ERROR.EMAIL_ALREADY_IN_USE);
        }
        if (error.code === 'auth/invalid-email') {
          setError(STRINGS.ERROR.EMAIL_INVALID);
        }
        if (!error) {
          setError(STRINGS.ERROR.SOMETHING_WENT_WRONG);
        }
      });
  };

  const onLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Account Loged In',
        });
      })
      .catch(error => {
        if (error.code === 'auth/invalid-credential') {
          setError(STRINGS.ERROR.CREDENTIAL_IS_INCORRECT);
        }
        if (!error) {
          setError(STRINGS.ERROR.SOMETHING_WENT_WRONG);
        }
      });
  };

  const validateEmail = email => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const onSubmit = () => {
    if (!validateEmail(email)) {
      Toast.show({
        type: 'error',
        text1: 'Please enter a valid email address.',
      });
      return;
    }
    if (password.length < 8) {
      Toast.show({
        type: 'error',
        text1: 'Password must be at least 8 characters long.',
      });
      return;
    }
    setError('');
    if (activeTab == 'Register') {
      onRegister();
    } else {
      onLogin();
    }
  };

  return (
    <LinearGradient colors={COLORS.WELCOME_GRADIENT} style={styles.screen}>
      <View style={SharedStyles.fullFlex}>
        <StyledText
          textStyle={styles.titleText}
          containerStyle={styles.titleContainer}>
          {'AST consulting'}
        </StyledText>
        <ButtonSelector
          activeTab={activeTab}
          onChange={setActiveTab}
          btns={['Login', 'Register']}
        />
        <Input
          value={email}
          label={'Enter Email'}
          onChangeText={setEmail}
          placeholder={'Enter Your Email'}
          containerStyle={styles.inputContainer}
        />
        <Input
          value={password}
          label={'Enter Password'}
          onChangeText={setPassword}
          placeholder={'Enter Your Password'}
        />
        <View style={styles.btn}>
          <Button
            text={'Submit'}
            onPress={onSubmit}
            isDisabled={!!email && !!password}
          />
        </View>
      </View>
      <View>
        <StyledText
          textStyle={styles.footerText}
          containerStyle={styles.footerContainer}>
          {'Login to check nearby hospitals in your area displayed on the map.'}
        </StyledText>
      </View>
    </LinearGradient>
  );
};

export default WelcomeScreen;
