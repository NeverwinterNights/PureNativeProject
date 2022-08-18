import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useAppSelector } from "../../store/store";
import { AuthNavigator } from "../../navigation/AuthNavigator";
import { DrawerNavigator } from "../../navigation/DrawerNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";

type MainPropsType = {}

export const MainScreen = ({}: MainPropsType) => {
  const isLoggingIn = useAppSelector(state => state.authReducer.isLogging);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        setIsLoaded(true);
        setIsAuthenticated(true);
      } else {
        setIsLoaded(true);
        setIsAuthenticated(false);
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    getUser();
  }, [isLoggingIn]);

  return (
    <>
      {isLoaded ? (
          isAuthenticated ? <DrawerNavigator /> : <AuthNavigator />)
        : (
          <ActivityIndicator />
        )
      }
    </>
  );
};
