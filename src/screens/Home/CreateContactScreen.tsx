import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import colors from "../../../assets/theme/colors";
import { AppInput } from "../../components/AppInput";
import { CustomButton } from "../../components/CustomButton";

type CreateContactScreenPropsType = {};

export const CreateContactScreenOptions = ({ navigation, route }: any) => {
  return {
    headerTitle: "Create Contact",
    headerTitleAlign: "center" as const,

  };
};


export const CreateContactScreen = ({}: CreateContactScreenPropsType) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");


  return (
    <View style={styles.container}>
      <AppInput label={"First name"} placeholder={"Enter First name"} setText={setFirstName} text={firstName} />
      <AppInput label={"Last name"} placeholder={"Enter Last name"} setText={setLastName} text={lastName} />
      <AppInput label={"Phone Number"} placeholder={"Enter Phone number"} setText={setPhoneNumber} text={phoneNumber} />
      <CustomButton>{"Create Contact"}</CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingVertical:20,
    paddingHorizontal:10
  },
});
