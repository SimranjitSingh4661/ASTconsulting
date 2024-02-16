import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthenticationStack from './stacks/authentication';
import HomeStack from './stacks/home';
import auth from '@react-native-firebase/auth';
import {NavigationService} from '../services';
import {createStackNavigator} from '@react-navigation/stack';
import LoadingScreen from '../screens/loadingScreen';
import config from './config';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  console.log('USER,', user?.email);

  if (initializing) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer ref={ref => NavigationService.setNavigatorRef(ref)}>
      <Stack.Navigator screenOptions={config}>
        {/* <Stack.Screen name="Auth" component={AuthenticationStack} /> */}
        {/* <Stack.Screen name="Home" component={HomeStack} /> */}
        {user?.email ? (
          <Stack.Screen name="Home" component={HomeStack} />
        ) : (
          <Stack.Screen name="Auth" component={AuthenticationStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
