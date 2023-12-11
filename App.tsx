/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import NavigationStack from './src/navigation/NavigationStack';
import {Provider} from 'react-redux';
import { store } from './src/app/store';

function App(): JSX.Element {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <NavigationStack />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
