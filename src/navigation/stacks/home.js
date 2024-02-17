import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../screens/homeScreen';
import {NAVIGATION} from '../../constants';
import config from '../config';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator screenOptions={config}>
      <Stack.Screen name={NAVIGATION.AUTH.HOME_SCREEN} component={HomeScreen} />
    </Stack.Navigator>
  );
};
