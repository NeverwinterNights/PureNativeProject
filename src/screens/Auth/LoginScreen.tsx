import React, { useEffect, useState } from "react";
import { Image, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppInput } from "../../components/AppInput";
import { CustomButton } from "../../components/CustomButton";
import { useAppNavigation } from "../../navigation/navigationTypes";
import { AuthNavigator } from "../../navigation/AuthNavigator";
import { Message } from "../../components/Message";
import { OnChangeParams } from "./SignUpScreen";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { LoginData } from "../../api/api";
import { loginTh } from "../../store/authReducer";
import { PasswordInput } from "../../components/PasswordInput";
import { SubmitHandler, useForm, Controller } from "react-hook-form";


type LoginScreenPropsType = {};

export const LoginScreen = ({}: LoginScreenPropsType) => {
  // const [formLoginData, setFormLoginData] = useState<LoginData>({} as LoginData);
  // const [error, setError] = useState<LoginData>({} as LoginData);
  const [registeredUser, setRegisteredUser] = useState("");

  const dispatch = useAppDispatch();
  const error = useAppSelector(state => state.authReducer.error);
  const loading = useAppSelector(state => state.appReducer.loading);
  const navigation = useAppNavigation();
  const data = useAppSelector(state => state.authReducer.data);

  const { control, handleSubmit, reset, formState: { errors } } = useForm<LoginData>({
    mode: "onChange",
  });



  useEffect(() => {
    if (data) {
      // setFormLoginData({ ...formLoginData, username: data.username });
      setRegisteredUser(data.username);
      // navigation.navigate("MainScreen")
    }
  }, []);



  const retryFn = () => {
    // console.log("hhhhh");
  };

  const onDismiss = () => {
    // console.log("hhhhh");
  };


  // const onChange = ({ name, value }: OnChangeParams) => {
  //   setFormLoginData({
  //     ...formLoginData,
  //     [name]: value,
  //   });
  //   // if (value !== "") {
  //   //   setError((prev) => ({ ...prev, [name]: "" }));
  //   // }
  //
  //
  //
  // };


  // const onSubmit = () => {
  //   if (!formLoginData.username) {
  //     setError((prev) => ({ ...prev, username: "User name is required" }));
  //   }
  //   if (!formLoginData.password) {
  //     setError((prev) => ({ ...prev, password: "Password is required" }));
  //   }
  //   if (formLoginData.password && formLoginData.password.length < 8) {
  //     setError((prev) => ({ ...prev, password: "Password is 8 character minimum" }));
  //   }
  //
  //   if (Object.values(formLoginData).length === 2 &&
  //     Object.values(formLoginData).every((item) => item.trim().length > 0) &&
  //     Object.values(error).every((item) => !item)) {
  //     dispatch(loginTh({ username: formLoginData.username, password: formLoginData.password }));
  //   }
  // };


  const onSubmit = (dataInput: LoginData) => {
    dispatch(loginTh({ username: dataInput.username, password: dataInput.password }));

  };

  const returnToRegisterHandler = () => {
    reset();
     navigation.navigate("AuthNavigator", { screen: "SignUpScreen" })
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={"position"} keyboardVerticalOffset={-10}>
        <View style={styles.logo}>
          <Image style={styles.image} source={require("../../../assets/images/img_1.png")} />
        </View>
        <Text style={{ marginVertical: 20, textAlign: "center", fontSize: 25, fontWeight: "bold" }}>Welcome To The
          Jungle!</Text>

        {registeredUser &&
          <Message onDismiss={onDismiss} primary message={`User ${registeredUser} successfully created`} />}
        {error && error.detail && <Message onDismiss={onDismiss} danger message={error.detail} />}

        <Controller
          control={control}
          rules={{
            required: true,

          }}
          name={"username"}
          render={({ field: { onChange, onBlur, value } }) =>
            <AppInput placeholder={"Enter Your Name"} icon={"emoticon-angry-outline"} label={"Login"}
                      autoCapitalize={"words"}
                      onBlur={onBlur} onChange={onChange} value={value}
            />
          }
        />

        {errors.username && <Text style={{ color: "red" }}>Login is required.</Text>}

        <Controller
          control={control}
          rules={{
            // required: "Password is required",
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


        <View style={styles.buttonWrapper}><CustomButton disable={loading} loading={loading}
                                                         onPress={handleSubmit(onSubmit)}
                                                         color={"accent"}>Submit</CustomButton></View>
        <TouchableOpacity onPress={returnToRegisterHandler}><Text
          style={{ textAlign: "right" }}>Register</Text></TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
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
