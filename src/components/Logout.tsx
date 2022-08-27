import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useAppNavigation } from "../navigation/navigationTypes";
import { useAppDispatch } from "../store/store";
import { logOutAC } from "../store/authReducer";

type LogoutPropsType = {}

export const Logout = ({}: LogoutPropsType) => {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(logOutAC());
    navigation.navigate("AuthNavigator", { screen: "LoginScreen" });
  }, []);

  return (
    <ActivityIndicator />
  );
};


