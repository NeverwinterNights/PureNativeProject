import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {LoginScreen} from '../screens/Auth/LoginScreen';
import {SignUpScreen} from '../screens/Auth/SignUpScreen';

export const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name={'LoginScreen'} component={LoginScreen} />
      <Stack.Screen name={'SignUpScreen'} component={SignUpScreen} />
    </Stack.Navigator>
  );
};
