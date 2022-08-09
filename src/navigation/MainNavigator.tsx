import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AuthNavigator} from './AuthNavigator';
import {DrawerNavigator} from './DrawerNavigator';
import { MainScreen } from "../screens/Main/MainScreen";

export const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown:false}} name={'Main'} component={MainScreen} />
      <Stack.Screen options={{headerShown:false}} name={'AuthNavigator'} component={AuthNavigator} />
      <Stack.Screen name={'DrawerNavigator'} component={DrawerNavigator} />
    </Stack.Navigator>
  );
};
