import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAppNavigation } from "../../navigation/navigationTypes";
import { Screen } from "../../components/Screen";
import { AppInput } from "../../components/AppInput";
import { CustomButton } from "../../components/CustomButton";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { authTh, clearAuthStateAC } from "../../store/authReducer";
import { useFocusEffect } from "@react-navigation/native";
import { PasswordInput } from "../../components/PasswordInput";
import { Controller, useForm } from "react-hook-form";
import { LoginData } from "../../api/api";

// import envs from "../../config/env";
// import {DEV_BACKEND_URL, PROD_BACKEND_URL} from "@env"


type SignUpScreenPropsType = {};

export type  OnChangeParams = {
  name: string,
  value: string
}

export type  FormType = {
  username: string
  firstName: string
  lastName: string
  email: string
  password: string

}

export const SignUpScreen = ({}: SignUpScreenPropsType) => {
  // const [form, setForm] = useState<FormType>({} as FormType);
  // const [error, setError] = useState<FormType>({} as FormType);
  const dispatch = useAppDispatch();
  const error = useAppSelector(state => state.authReducer.error);
  const loading = useAppSelector(state => state.appReducer.loading);
  const data = useAppSelector(state => state.authReducer.data);
  const navigation = useAppNavigation();
  const { control, handleSubmit, reset, formState: { errors }, getValues } = useForm<FormType>({
    mode: "onChange",
  });


  useEffect(() => {
    if (data) {
      navigation.navigate("AuthNavigator", { screen: "LoginScreen" });
    }
  }, [data]);


  useFocusEffect(
    useCallback(() => {
      return () => {
        if (data || errors) {
          dispatch(clearAuthStateAC());
        }
      };
    }, [data, errors]),
  );


  const onSubmit = (dataInput: FormType) => {
    dispatch(authTh({
      email: dataInput.email,
      password: dataInput.password,
      username: dataInput.username,
      first_name: dataInput.firstName,
      last_name: dataInput.lastName,
    }));
    reset();
  };



  // const onSubmit = () => {
  //
  //   if (Object.values(form).length === 5 &&
  //     Object.values(form).every((item) => item.trim().length > 0) &&
  //     Object.values(error).every((item) => !item)) {
  //     dispatch(authTh({
  //       email: form.email,
  //       password: form.password,
  //       username: form.username,
  //       first_name: form.firstName,
  //       last_name: form.lastname,
  //     }));
  //   }
  // };


  return (
    <Screen style={styles.container}>
      <Text style={{ marginVertical: 15, textAlign: "center", fontSize: 25, fontWeight: "bold" }}>Register</Text>

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        name={"username"}
        render={({ field: { onChange, onBlur, value } }) =>
          <AppInput placeholder={"Enter Username"} icon={"emoticon-angry-outline"} label={"Username"}
                    autoCapitalize={"words"}
                    onBlur={onBlur} onChange={onChange} value={value}
          />
        }
      />
      {errors.username || error?.username?.[0] && <Text style={{ color: "red" }}>User name is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        name={"firstName"}
        render={({ field: { onChange, onBlur, value } }) =>
          <AppInput placeholder={"Enter First Name"} icon={"emoticon-angry-outline"} label={"First Name"}
                    autoCapitalize={"words"}
                    onBlur={onBlur} onChange={onChange} value={value}
          />
        }
      />
      {errors.firstName || error?.first_name?.[0] && <Text style={{ color: "red" }}>First name is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        name={"lastName"}
        render={({ field: { onChange, onBlur, value } }) =>
          <AppInput placeholder={"Enter Last Name"} icon={"emoticon-angry-outline"} label={"Last Name"}
                    autoCapitalize={"words"}
                    onBlur={onBlur} onChange={onChange} value={value}
          />
        }
      />
      {errors.lastName || error?.last_name?.[0] && <Text style={{ color: "red" }}>Last name is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        name={"email"}
        render={({ field: { onChange, onBlur, value } }) =>
          <AppInput placeholder={"Enter Your Email"} icon={"emoticon-angry-outline"} label={"Email"}
                    autoCapitalize={"words"}
                    onBlur={onBlur} onChange={onChange} value={value}
          />
        }
      />
      {errors.email || error?.email?.[0] && <Text style={{ color: "red" }}>Email is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must have at least 6 characters",
          },
        }}
        name={"password"}
        render={({ field: { onChange, onBlur, value } }) =>
          <PasswordInput direction={"right"} onChange={onChange}
                         placeholder={"Enter Password"} onBlur={onBlur} value={value} />
        }
      />
      {errors.password && <Text style={{ color: "red" }}>{errors.password.message}</Text>}

      <View style={styles.buttonWrapper}><CustomButton loading={loading} disable={loading}
                                                       onPress={handleSubmit(onSubmit)}
                                                       color={"accent"}>Submit</CustomButton></View>
      <TouchableOpacity onPress={()=> navigation.goBack()}><Text
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
