import React, { useCallback, useState } from "react";
import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from "react-native";
import colors from "../../../assets/theme/colors";
import { AppInput } from "../../components/AppInput";
import { CustomButton } from "../../components/CustomButton";
import CountryPicker from "react-native-country-picker-modal";
import { OnChangeParams } from "../Auth/SignUpScreen";
import { Country, CountryCode } from "react-native-country-picker-modal/lib/types";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { clearErrorsAC, createContactsTh } from "../../store/contactsReducer";
import { useFocusEffect } from "@react-navigation/native";
import { useAppNavigation } from "../../navigation/navigationTypes";
import { Message } from "../../components/Message";
import { CreateContact } from "../../api/api";


type FormContactCreateType = {
  firstName: string
  lastName: string
  phoneNumber: string
  countryCode: CountryCode
  phoneCode: string
}



export const CreateContactScreen = () => {
  const [form, setForm] = useState<FormContactCreateType>({} as FormContactCreateType);
  const [error, setError] = useState<FormContactCreateType>({} as FormContactCreateType);
  const dispatch = useAppDispatch();
  const errors = useAppSelector(state => state.contactsReducer.error);
  const navigation = useAppNavigation();
  const loading = useAppSelector(state => state.appReducer.loading);


  // useEffect(()=> {
  //   setForm({} as FormContactCreateType)
  // },[])

  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(clearErrorsAC());
      };
    }, [navigation]),
  );


  const onChange = ({ name, value }: OnChangeParams) => {
    dispatch(clearErrorsAC());
    setForm({
      ...form,
      [name]: value,
    });
    if (value !== "") {
      setError((prev) => ({ ...prev, [name]: "" }));
    }
  };


  const onSubmit = async () => {
    if (!form.firstName) {
      setError((prev) => ({ ...prev, firstName: "First Name is required" }));
    }
    if (!form.lastName) {
      setError((prev) => ({ ...prev, lastName: "Last name is required" }));
    }
    if (!form.phoneNumber) {
      setError((prev) => ({ ...prev, phoneNumber: "Phone number is required" }));
    }
    if (!form.phoneCode || form.countryCode === "AQ") {
      setError((prev) => ({ ...prev, phoneCode: "Phone Code number is required" }));
    }
    if (form.countryCode === "AQ") {
      setError((prev) => ({ ...prev, phoneCode: "Antarctica has no area code" }));
    }

    // const callback = () => {
    //   navigation.goBack();
    // };

    if (Object.values(form).length === 5 &&
      Object.values(form).every((item) => item) &&
      Object.values(error).every((item) => !item) &&
      Object.values(form).every((item) => item.trim().length > 0)) {
      const param: CreateContact = {
        country_code: form.phoneCode,
        first_name: form.firstName,
        last_name: form.lastName,
        phone_number: form.phoneNumber,
        contact_picture: "https://zefirka.net/wp-content/uploads/2018/05/strannye-foto-na-kotoryx-chto-to-ne-tak-1.jpg",
        is_favorite: false,
      };
      const response = await dispatch(createContactsTh(param));
      if (response.type === "contacts/createContactsTh/fulfilled") {
        navigation.goBack();
      }
      // setForm((prev) => ({} as FormContactCreateType));


    }
  };


  const onDismiss = () => {
    // dispatch(clearErrorsAC());
  };

  let combinedErrors = [];

  if (errors !== null) {
    let values: string[] = [];
    Object.values(errors).map((item) => values.push(...item));
    let keys = Object.keys(errors).map((item) => item[0].toUpperCase() + item.slice(1)).map((item) => item.replace("_", " "));
    for (let i = 0; i < keys.length; i++) {
      combinedErrors.push(`${keys[i]}: ${values[i]}`);
    }
  }


  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={"position"} keyboardVerticalOffset={84}>
        <Image style={styles.avatar}
               source={{ uri: "http://cdn01.ru/files/users/images/62/26/6226a248e23a10fccedf0c81e001285d.jpg" }} />
        <Text style={{ textAlign: "center" }}>Choose image</Text>
        {combinedErrors && combinedErrors.map((item, index) => <View key={index}><Message onDismiss={onDismiss}
                                                                                          danger
                                                                                          message={JSON.stringify(item).slice(1, -1)} /></View>)}
        <AppInput
          label={"First name"}
          placeholder={"Enter First name"}
          setText={(value) => onChange({ name: "firstName", value })}
          text={form.firstName}
          error={error.firstName} autoCapitalize={"words"}
        />
        <AppInput
          label={"Last name"}
          placeholder={"Enter Last name"}
          setText={(value) => onChange({ name: "lastName", value })}
          text={form.lastName}
          error={error.lastName} autoCapitalize={"words"}
        />
        <View>
          <View><Text style={styles.label}>Phone Number</Text></View>
          <View style={styles.inputCont}>
            <CountryPicker
              countryCode={form.countryCode || undefined}
              // countryCode={form.countryCode || undefined}
              onSelect={(country: Country) => {
                setError({
                  ...error,
                  phoneCode: "",
                });
                setForm(
                  {
                    ...form,
                    countryCode: country.cca2,
                    phoneCode: country.callingCode[0],
                  },
                );
              }}
              withCallingCodeButton
              withCountryNameButton={false}
              withFilter
              withEmoji
              withCallingCode
              withFlag />
            <TextInput placeholderTextColor={colors.grey}
                       onChangeText={(value) => onChange({ name: "phoneNumber", value })}
                       value={form.phoneNumber}
                       placeholder={"Enter Phone number"}
                       style={styles.text} />
          </View>
          {error.phoneCode && <Text style={{ color: "red", marginBottom: 3 }}>{error.phoneCode}</Text>}
          {error.phoneNumber && <Text style={{ color: "red", marginBottom: 3 }}>{error.phoneNumber}</Text>}
        </View>
        <CustomButton loading={loading} disable={loading} onPress={onSubmit}>{"Create Contact"}</CustomButton>
      </KeyboardAvoidingView>
    </View>
  );
};


const styles = StyleSheet.create({
  inputCont: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 2,
    paddingLeft: 10,
    marginVertical: 5,
    alignItems: "center",
    borderColor: colors.grey,
    borderWidth: 1,
    width: "100%",
    flexDirection: "row",
  },
  avatar: {
    alignSelf: "center",
    width: 150,
    height: 150,
    borderRadius: 200 / 2,
    marginVertical: 10,
  },
  label: {
    fontSize: 24,
    fontFamily: "OleoScriptRegular",
  },
  text: {
    fontSize: 18,
    color: "black",
    fontFamily: "Roboto",
    flex: 1,
    paddingLeft: 20,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});
