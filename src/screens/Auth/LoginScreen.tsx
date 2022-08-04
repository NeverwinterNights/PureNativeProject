import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Screen } from "../../components/Screen";
import { AppInput } from "../../components/AppInput";

type LoginScreenPropsType = {};

export const LoginScreen = ({}: LoginScreenPropsType) => {
  const [text, setText] = useState("");
  return (
    <Screen style={styles.container}>
      <Text style={{marginBottom:20}}>LoginScreen</Text>
      <AppInput icon={<Text>Icon</Text>} label={"Login"} text={text} setText={setText} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {},
});
