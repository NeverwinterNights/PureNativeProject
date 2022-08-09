import React from "react";
import { StyleSheet } from "react-native";
import { useAppSelector } from "../../store/store";
import { AuthNavigator } from "../../navigation/AuthNavigator";
import { DrawerNavigator } from "../../navigation/DrawerNavigator";

type MainPropsType = {

}

export const MainScreen = ({}:MainPropsType) => {
  const isLoggingIn = useAppSelector(state => state.authReducer.isLogging)
 return (
   <>
   {!isLoggingIn ? <AuthNavigator /> : <DrawerNavigator />}
   </>
 )
};
const styles = StyleSheet.create({
  container: {

  }
});
