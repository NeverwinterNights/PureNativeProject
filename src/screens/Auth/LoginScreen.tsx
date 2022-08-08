import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Screen } from "../../components/Screen";
import { AppInput } from "../../components/AppInput";
import { CustomButton } from "../../components/CustomButton";
import colors from "../../../assets/theme/colors";

type LoginScreenPropsType = {};

export const LoginScreen = ({}: LoginScreenPropsType) => {
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Screen style={styles.container}>
      <View style={styles.logo}>
        <Image style={styles.image} source={require("../../../assets/images/img_1.png")} />
      </View>
      <Text style={{marginVertical:20, textAlign:"center", fontSize:25, fontWeight:"bold"}}>Welcome To The Jungle!</Text>
      <AppInput placeholder={"Enter Your Name"} icon={"emoticon-angry-outline"} label={"Login"} text={text}
                setText={setText} />
      <AppInput placeholder={"Enter Password"} direction={"right"} icon={"eye"} label={"Password"}
                secureTextEntry={true} text={password}
                setText={setPassword} />
      <View style={styles.buttonWrapper}><CustomButton color={"accent"}>Submit</CustomButton></View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  image: {
    width:200,
    height:200,

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
