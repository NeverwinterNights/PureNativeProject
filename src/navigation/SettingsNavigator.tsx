import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { SettingsScreen } from "../screens/Home/SettingsScreen";
import { HeaderBackButton } from "@react-navigation/elements";
import { useAppNavigation } from "./navigationTypes";

export const SettingsNavigator = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useAppNavigation();

  return (
    <Stack.Navigator>

      <Stack.Screen name={"SettingsScreen"} component={SettingsScreen} options={{
        headerTitle: "Settings",
        headerTitleAlign: "center",
        headerLeft: (props) => {
          return (
            <HeaderBackButton style={{ left: -13 }} onPress={navigation.goBack} {...props} />
          );
        },
      }} />
    </Stack.Navigator>
  );
};
