import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { AppInput } from "./AppInput";
import { OnChangeParams } from "../screens/Auth/SignUpScreen";

type PasswordInputPropsType = {
  text: string
  error?: string
  onChange: ({name, value}:OnChangeParams) => void
  placeholder:string
  direction?: "left" | "right"
}

export const PasswordInput = ({ text, error, direction, onChange, placeholder }: PasswordInputPropsType) => {
  const [type, setType] = useState<boolean>(true);

  const typeChangeHandler = () => {
    setType((prev) => !prev);
  };

  return (
    <AppInput onPress={typeChangeHandler} placeholder={placeholder} direction={direction}
              icon={type ? "eye" : "eye-off"} label={"Password"}
              secureTextEntry={type} text={text} error={error}
              setText={(value) => onChange({ name: "password", value })} />
  );
};

const styles = StyleSheet.create({
  container: {},
});
