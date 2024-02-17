import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './src/navigation';
import Toast from 'react-native-toast-message';
import {enableLatestRenderer} from 'react-native-maps';

enableLatestRenderer();

const App = () => {
  return (
    <SafeAreaProvider>
      <AppNavigator />
      <Toast />
    </SafeAreaProvider>
  );
};

export default App;
