import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import DatePicker from '../screens/DatePicker';

const NavigationStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{title: 'Add Rental Details', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="DatePicker"
        component={DatePicker}
        options={{title: 'Select Dates & Times', headerTitleAlign: 'center'}}
      />
    </Stack.Navigator>
  );
};

export default NavigationStack;
