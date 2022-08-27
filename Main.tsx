import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MainScreen } from "./src/screens/Main/MainScreen";
import { MainNavigator } from "./src/navigation/MainNavigator";
import { navigationRef } from "./src/api/api";

type MainPropsType = {};

export const Main = ({}: MainPropsType) => {


  return (
    // <NavigationContainer ref={navigationRef}>
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

// const styles = StyleSheet.create({
//   container: {},
// });
