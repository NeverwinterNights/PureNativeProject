import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAppNavigation } from "../../navigation/navigationTypes";
import { Screen } from "../../components/Screen";
import { AppInput } from "../../components/AppInput";
import { CustomButton } from "../../components/CustomButton";
import { useAppDispatch } from "../../store/store";
import { authTh } from "../../store/authReducer";
// import envs from "../../config/env";
// import {DEV_BACKEND_URL, PROD_BACKEND_URL} from "@env"


type SignUpScreenPropsType = {};

type  OnChangeParams = {
  name: string,
  value: string
}

type  FormType = {
  username: string
  firstName: string
  lastname: string
  email: string
  password: string

}

export const SignUpScreen = ({}: SignUpScreenPropsType) => {
  const [form, setForm] = useState<FormType>({} as FormType);
  const [error, setError] = useState<FormType>({} as FormType);
  const dispatch = useAppDispatch();


  const navigation = useAppNavigation();

  const onChange = ({ name, value }: OnChangeParams) => {
    setForm({
      ...form,
      [name]: value,
    });
    if (value !== "") {
      setError((prev) => ({ ...prev, [name]: "" }));
    }
  };


  const onSubmit = () => {
    if (!form.username) {
      setError((prev) => ({ ...prev, username: "User name is required" }));
    }
    if (!form.firstName) {
      setError((prev) => ({ ...prev, firstName: "First name is required" }));
    }
    if (!form.lastname) {
      setError((prev) => ({ ...prev, lastname: "Last name is required" }));
    }
    if (!form.email) {
      setError((prev) => ({ ...prev, email: "Email is required" }));
    }
    if (!form.password) {
      setError((prev) => ({ ...prev, password: "Password is required" }));
    }

    if (Object.values(form).length === 5 &&
      Object.values(form).every((item) => item.trim().length > 0) &&
      Object.values(error).every((item) => !item)) {
      dispatch(authTh({
        email: form.email,
        password: form.password,
        username: form.username,
        first_name: form.firstName,
        last_name: form.lastname,
      }));
    }

  };

  return (
    <Screen style={styles.container}>
      <Text style={{ marginVertical: 15, textAlign: "center", fontSize: 25, fontWeight: "bold" }}>Register</Text>
      <AppInput placeholder={"Enter Username"} icon={"emoticon-angry-outline"} label={"Username"} text={form.username}
                setText={(value) => onChange({ name: "username", value })} error={error.username} />
      <AppInput placeholder={"Enter First"} icon={"emoticon-angry-outline"} label={"First"} text={form.firstName}
                setText={(value) => onChange({ name: "firstName", value })} error={error.firstName} />
      <AppInput placeholder={"Enter Your Lastname"} icon={"emoticon-angry-outline"} label={"Lastname"}
                text={form.lastname}
                setText={(value) => onChange({ name: "lastname", value })} error={error.lastname} />
      <AppInput placeholder={"Enter Your Email"} keyboardType={"email-address"} icon={"emoticon-angry-outline"}
                label={"Email"} text={form.email}
                setText={(value) => onChange({ name: "email", value })} error={error.email} />
      <AppInput placeholder={"Enter Password"} direction={"right"} icon={"eye"} label={"Password"}
                secureTextEntry={true} text={form.password}
                setText={(value) => onChange({ name: "password", value })} error={error.password} />
      <View style={styles.buttonWrapper}><CustomButton onPress={onSubmit} color={"accent"}>Submit</CustomButton></View>
      <TouchableOpacity onPress={() => navigation.navigate("AuthNavigator", { screen: "LoginScreen" })}><Text
        style={{ textAlign: "right" }}>Login</Text></TouchableOpacity>
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
