import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import { ContactScreen, ContactScreenOptions } from "../screens/Home/ContactScreen";
import {ContactDetailScreen} from '../screens/Home/ContactDetailScreen';
import {CreateContactScreen} from '../screens/Home/CreateContactScreen';
import {SettingsScreen} from '../screens/Home/SettingsScreen';

export const HomeNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={ContactScreenOptions} initialRouteName={'Contact'}>
      <Stack.Screen name={'Contact'} component={ContactScreen} />
      <Stack.Screen
        name={'ContactDetailScreen'}
        component={ContactDetailScreen}
      />
      <Stack.Screen
        name={'CreateContactScreen'}
        component={CreateContactScreen}
      />
      <Stack.Screen name={'SettingsScreen'} component={SettingsScreen} />
    </Stack.Navigator>
  );
};
