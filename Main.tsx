import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {DrawerNavigator} from './src/navigation/DrawerNavigator';
import {AuthNavigator} from './src/navigation/AuthNavigator';

type MainPropsType = {};

export const Main = ({}: MainPropsType) => {
  const isLoggingIn = false;
  return (
    <NavigationContainer>
      {!isLoggingIn ? <AuthNavigator /> : <DrawerNavigator />}
    </NavigationContainer>
  );
};

// const styles = StyleSheet.create({
//   container: {},
// });
