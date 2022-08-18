import React, { useState } from "react";
import { Image, KeyboardAvoidingView, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Screen } from "../../components/Screen";
import { AppInput } from "../../components/AppInput";
import { CustomButton } from "../../components/CustomButton";
import { useAppNavigation } from "../../navigation/navigationTypes";
import { AuthNavigator } from "../../navigation/AuthNavigator";
import { Message } from "../../components/Message";
import { OnChangeParams } from "./SignUpScreen";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { LoginData } from "../../api/api";
import { loginTh } from "../../store/authReducer";


type LoginScreenPropsType = {};

export const LoginScreen = ({}: LoginScreenPropsType) => {
  const [formLoginData, setFormLoginData] = useState<LoginData>({} as LoginData);
  const [error, setError] = useState<LoginData>({} as LoginData);
  const [type, setType] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const errors = useAppSelector(state => state.authReducer.error);
  const loading = useAppSelector(state => state.authReducer.loading);
  const navigation = useAppNavigation();


  const typeChangeHandler = () => {
    setType((prev) => !prev);
  };

  const retryFn = () => {
    // console.log("hhhhh");
  };

  const onDismiss = () => {
    // console.log("hhhhh");
  };

  const onChange = ({ name, value }: OnChangeParams) => {
    setFormLoginData({
      ...formLoginData,
      [name]: value,
    });
    if (value !== "") {
      setError((prev) => ({ ...prev, [name]: "" }));
    }
  };


  const onSubmit = () => {
    if (!formLoginData.username) {
      setError((prev) => ({ ...prev, username: "User name is required" }));
    }
    if (!formLoginData.password) {
      setError((prev) => ({ ...prev, password: "Password is required" }));
    }
    if (formLoginData.password && formLoginData.password.length < 8) {
      setError((prev) => ({ ...prev, password: "Password is 8 character minimum" }));
    }

    if (Object.values(formLoginData).length === 2 &&
      Object.values(formLoginData).every((item) => item.trim().length > 0) &&
      Object.values(error).every((item) => !item)) {
      dispatch(loginTh({ username: formLoginData.username, password: formLoginData.password }));
    }
  };

  return (
    <Screen style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={"position"} keyboardVerticalOffset={30}>
        <View style={styles.logo}>
          <Image style={styles.image} source={require("../../../assets/images/img_1.png")} />
        </View>
        <Text style={{ marginVertical: 20, textAlign: "center", fontSize: 25, fontWeight: "bold" }}>Welcome To The
          Jungle!</Text>

        {/*<Message retryFn={retryFn} onDismiss={onDismiss} retry message={"Invalid data"} primary />*/}

        {errors && errors.detail && <Message onDismiss={onDismiss} primary message={errors.detail} />}
        <AppInput placeholder={"Enter Your Name"} icon={"emoticon-angry-outline"} label={"Login"}
                  text={formLoginData.username} error={error.username}
                  setText={(value) => onChange({ name: "username", value })} />
        <AppInput onPress={typeChangeHandler} placeholder={"Enter Password"} direction={"right"}
                  icon={type ? "eye" : "eye-off"} label={"Password"}
                  secureTextEntry={type} text={formLoginData.password} error={error.password}
                  setText={(value) => onChange({ name: "password", value })} />
        <View style={styles.buttonWrapper}><CustomButton disable={loading} loading={loading} onPress={onSubmit}
                                                         color={"accent"}>Submit</CustomButton></View>
        <TouchableOpacity onPress={() => navigation.navigate("AuthNavigator", { screen: "SignUpScreen" })}><Text
          style={{ textAlign: "right" }}>Register</Text></TouchableOpacity>
      </KeyboardAvoidingView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {},
  image: {
    width: 200,
    height: 200,

  },
  logo: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWrapper: {
    width: "100%",
    flexDirection: "row",
  },
});
