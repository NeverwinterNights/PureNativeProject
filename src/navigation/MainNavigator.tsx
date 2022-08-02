import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AuthNavigator} from './AuthNavigator';
import {DrawerNavigator} from './DrawerNavigator';

export const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name={'Auth'} component={AuthNavigator} />
      <Stack.Screen name={'DrawerNavigator'} component={DrawerNavigator} />
    </Stack.Navigator>
  );
};
