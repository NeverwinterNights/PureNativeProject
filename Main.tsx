import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {DrawerNavigator} from './src/navigation/DrawerNavigator';
import {AuthNavigator} from './src/navigation/AuthNavigator';
import { useAppSelector } from "./src/store/store";

type MainPropsType = {};

export const Main = ({}: MainPropsType) => {

  const isLoggingIn = useAppSelector(state => state.authReducer.isLogging)


  return (
    <NavigationContainer>
      {!isLoggingIn ? <AuthNavigator /> : <DrawerNavigator />}
    </NavigationContainer>
  );
};

// const styles = StyleSheet.create({
//   container: {},
// });
