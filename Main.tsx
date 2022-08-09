import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MainScreen } from "./src/screens/Main/MainScreen";
import { MainNavigator } from "./src/navigation/MainNavigator";

type MainPropsType = {};

export const Main = ({}: MainPropsType) => {


  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

// const styles = StyleSheet.create({
//   container: {},
// });
