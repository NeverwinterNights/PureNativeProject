import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import { ContactScreen, ContactScreenOptions } from "../screens/Home/ContactScreen";
import {ContactDetailScreen} from '../screens/Home/ContactDetailScreen';
import { CreateContactScreen } from "../screens/Home/CreateContactScreen";
import {SettingsScreen} from '../screens/Home/SettingsScreen';
import { HeaderBackButton } from '@react-navigation/elements';
import { useAppNavigation } from "./navigationTypes";

export const HomeNavigator = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useAppNavigation();

  return (
    <Stack.Navigator initialRouteName={'Contact'}>
      <Stack.Screen name={'ContactScreen'} component={ContactScreen} options={ContactScreenOptions} />
      <Stack.Screen
        name={'ContactDetailScreen'}
        component={ContactDetailScreen}
      />
      <Stack.Screen
        name={'CreateContactScreen'}
        component={CreateContactScreen}
        options={{
          headerTitle:"Create Contact",
          headerTitleAlign:"center",
          headerLeft: (props) => {
            return (
                <HeaderBackButton style={{left:-13}} onPress={navigation.goBack} {...props} />
            );
          },
        }}
      />
      <Stack.Screen name={'SettingsScreen'} component={SettingsScreen} options={{
        headerTitle:"Settings",
        headerTitleAlign:"center",
        headerLeft: (props) => {
          return (
            <>
              {<HeaderBackButton style={{left:30}} onPress={navigation.goBack} {...props} />}
            </>
          );
        },

      }} />
    </Stack.Navigator>
  );
};
