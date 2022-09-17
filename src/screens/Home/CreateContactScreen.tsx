import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView, NativeModules, Platform, ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../../../assets/theme/colors";
import { AppInput } from "../../components/AppInput";
import { CustomButton } from "../../components/CustomButton";
import CountryPicker from "react-native-country-picker-modal";
import { FormType, OnChangeParams } from "../Auth/SignUpScreen";
import { Country, CountryCode } from "react-native-country-picker-modal/lib/types";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { clearErrorsAC, createContactsTh, updateContactsTh } from "../../store/contactsReducer";
import { useFocusEffect } from "@react-navigation/native";
import { CreateContactScreenPropsType, useAppNavigation } from "../../navigation/navigationTypes";
import { Message } from "../../components/Message";
import { CreateContact, LoginData } from "../../api/api";
import RBSheet from "react-native-raw-bottom-sheet";
import { PicturePicker } from "../../components/PicturePicker";
import uploadImage from "../../helpers/uploadImage";
import countryCodes from "../../data/countryCodes";
import { Controller, useForm } from "react-hook-form";
import { ErrorType } from "../../store/authReducer";


type FormContactCreateType = {
  firstName: string
  lastName: string
  phoneNumber: string
  countryCode: CountryCode
  phoneCode: string
  is_favorite: boolean
  image: string
  fake: CountryCode
}


export type ImageLocalFileType = {
  cropRect: { height: number, width: number, x: number, y: number },
  height: number,
  mime: string,
  modificationDate: string,
  path: string,
  size: number,
  width: number
}


export const CreateContactScreen = ({ route }: CreateContactScreenPropsType) => {
  const [form, setForm] = useState<FormContactCreateType>({ is_favorite: false } as FormContactCreateType);
  // const [error, setError] = useState<FormContactCreateType>({} as FormContactCreateType);
  const [localFilePicture, setLocalFilePicture] = useState<ImageLocalFileType | null>(null);
  const [loadingToFirebase, setLoadingToFirebase] = useState(false);

  const dispatch = useAppDispatch();
  const errorsFromApi = useAppSelector(state => state.contactsReducer.error);
  const navigation = useAppNavigation();
  const loading = useAppSelector(state => state.appReducer.loading);
  const contact = route.params?.contact;

  const { control, handleSubmit, reset, getValues, setValue, formState: { errors } } = useForm<FormContactCreateType>({
    mode: "onChange",
  });


  useEffect(() => {
    if (contact) {
      setForm({
        ...form,
        firstName: contact.first_name,
        lastName: contact.last_name,
        phoneNumber: contact.phone_number,
        is_favorite: contact.is_favorite,
        image: contact.contact_picture,
        phoneCode: contact.country_code,
      });
      const country = countryCodes.find((item) => {
        return item.value.replace("+", "") === contact?.country_code;
      });
      if (country) {
        setForm(prev => {
          return {
            ...prev,
            countryCode: country.key.toUpperCase() as CountryCode,
          };
        });
      }
      setValue("firstName", contact.first_name)
      setValue("lastName", contact.last_name)
      setValue("phoneNumber", contact.phone_number)
      setValue("is_favorite", contact.is_favorite)
    }
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: contact ? "Edit Contact" : "Create Contact",
      headerTitleAlign: "center",
    });
  }, [navigation, contact]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(clearErrorsAC());
      };
    }, [navigation]),
  );


  // const onChange = ({ name, value }: OnChangeParams) => {
  //   dispatch(clearErrorsAC());
  //   setForm({
  //     ...form,
  //     [name]: value,
  //   });
  //   if (value !== "") {
  //     setError((prev) => ({ ...prev, [name]: "" }));
  //   }
  // };


  const onSubmit = async (data: FormContactCreateType) => {

    const param: CreateContact = {
      country_code: form.phoneCode,
      first_name: data.firstName,
      last_name: data.lastName,
      phone_number: data.phoneNumber,
      // contact_picture: form.image ? form.image : "https://messenge.ru/wp-content/cache/thumb/c7/8b24ddd420ec2c7_730x440.jpg",
      contact_picture: (!data.image && !contact?.contact_picture) ? "https://null.jpg" : data.image ? data.image : contact?.contact_picture || data.image,
      is_favorite: data.is_favorite,
    };


    const response = await dispatch(!contact ? createContactsTh(param) : updateContactsTh({ id: contact.id, ...param }));

    if (response.type === "contacts/createContactsTh/fulfilled") {
      // navigation.goBack();
      navigation.navigate("DrawerNavigator", {
        screen: "HomeNavigator",
        params: { screen: "ContactDetailScreen", params: { item: response.payload } },
      });
      // setForm({ is_favorite: false } as FormContactCreateType);

    }
    if (response.type === "contacts/updateContactsTh/fulfilled") {

      // navigation.goBack();
      navigation.navigate("DrawerNavigator", { screen: "HomeNavigator", params: { screen: "ContactScreen" } });
      // setForm({ is_favorite: false } as FormContactCreateType);
    }

    reset();

  };


  const onDismiss = () => {
    /////////////////// dispatch(clearErrorsAC());
  };

  let combinedErrors = [];

  if (errorsFromApi !== null) {
    let values: string[] = [];
    Object.values(errorsFromApi).map((item) => values.push(...item));
    let keys = Object.keys(errorsFromApi).map((item) => item[0].toUpperCase() + item.slice(1)).map((item) => item.replace("_", " "));
    for (let i = 0; i < keys.length; i++) {
      combinedErrors.push(`${keys[i]}: ${values[i]}`);
    }
  }

  // const toggleSwitch = () => {
  //   setForm({
  //     ...form,
  //     is_favorite: !form.is_favorite,
  //   });
  // };

  const sheetRef = useRef<RBSheet | null>(null);

  const closeSheet = () => {
    if (sheetRef.current) {
      // @ts-ignore
      sheetRef.current.close();
    }
  };

  const openSheet = () => {
    if (sheetRef.current) {
      sheetRef.current?.open();
    }
  };

  const onFileSelected = (images: ImageLocalFileType) => {
    closeSheet();
    setLocalFilePicture(images);
    // if (localFilePicture) {
    //   onChange({name:"image", value:localFilePicture})
    // }

    if (images) {
      setLoadingToFirebase(true);
      uploadImage(images)((url: string) => {
        setLoadingToFirebase(false);
        // onChangeimage({ name: "image", value: url });
        setValue("image", url);
      })((err: any) => {
        setLoadingToFirebase(false);
        console.log("err", err);
      });
    }
  };


  return (
    <ScrollView keyboardShouldPersistTaps={"handled"}>
      {loadingToFirebase ? <ActivityIndicator /> :
        <View style={styles.container}>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior={"position"} keyboardVerticalOffset={88}>
            <>
              <Image style={styles.avatar}
                     source={{ uri: localFilePicture?.path || contact?.contact_picture || "http://cdn01.ru/files/users/images/62/26/6226a248e23a10fccedf0c81e001285d.jpg" }} />
              <TouchableOpacity onPress={openSheet}>
                <Text style={{ textAlign: "center" }}>Choose image</Text>
              </TouchableOpacity>

              {combinedErrors && combinedErrors.map((item, index) => <View key={index}><Message onDismiss={onDismiss}
                                                                                                danger
                                                                                                message={JSON.stringify(item).slice(1, -1)} /></View>)}

              <Controller
                control={control}
                // defaultValue={contact?.first_name ? contact?.first_name : getValues("firstName")}
                //  defaultValue={contact?.first_name }
                rules={{
                  required: true,
                }}
                name={"firstName"}
                render={({ field: { onChange, value } }) =>
                  <AppInput placeholder={"Enter First Name"} icon={"emoticon-angry-outline"} label={"First Name"}
                            autoCapitalize={"words"} onChange={onChange} value={value}
                  />
                }
              />
              {(errors.firstName || errorsFromApi?.first_name?.[0]) &&
                <Text style={{ color: "red" }}>First name is required.</Text>}

              <Controller
                control={control}
                // defaultValue={contact?.last_name}
                rules={{
                  required: true,
                }}
                name={"lastName"}
                render={({ field: { onChange, value } }) =>
                  <AppInput placeholder={"Enter Last Name"} label={"Last name"}
                            autoCapitalize={"words"} onChange={onChange} value={value}
                  />
                }
              />
              {(errors.lastName || errorsFromApi?.last_name?.[0]) &&
                <Text style={{ color: "red" }}>Last name is required.</Text>}


              <View>
                <View><Text style={styles.label}>Phone Number</Text></View>
                <View style={styles.inputCont}>
                  <CountryPicker
                    countryCode={form.countryCode || undefined}
                    onSelect={(country: Country) => {
                      // setError({
                      //   ...error,
                      //   phoneCode: "",
                      // });
                      setForm(
                        {
                          ...form,
                          countryCode: country.cca2,
                          phoneCode: country.callingCode[0],
                        },
                      );
                    }}
                    // withCallingCodeButton
                    withCountryNameButton={false}
                    withFilter
                    withEmoji
                    withCallingCode
                    withFlag />

                  <Controller
                    control={control}
                    // defaultValue={contact?.phone_number}
                    rules={{
                      required: true,
                    }}
                    name={"phoneNumber"}
                    render={({ field: { onChange, value } }) =>

                      <TextInput placeholderTextColor={colors.grey}
                                 onChangeText={onChange}
                                 value={value}
                                 placeholder={"Enter Phone number"}
                                 style={styles.text} />
                    }
                  />
                </View>
                {/*{errors.phoneCode && <Text style={{ color: "red", marginBottom: 3 }}>{errors.phoneCode.message}</Text>}*/}
                {errors.phoneNumber &&
                  <Text style={{ color: "red", marginBottom: 3 }}>Phone number is required.</Text>}
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <Text style={{ fontSize: 16 }}>Add to favorites</Text>


                  <Controller
                    control={control}
                    // rules={{
                    //   required: true,
                    // }}
                    // defaultValue={contact?.is_favorite}
                    name={"is_favorite"}
                    render={({ field: { onChange, value } }) =>
                      <Switch
                        trackColor={{ false: colors.grey, true: colors.primary }}
                        thumbColor={form.is_favorite ? colors.accent : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"

                        onValueChange={onChange}
                        value={value}
                      />
                    }
                  />
                </View>
                <CustomButton loading={loading} disable={loading}
                              onPress={handleSubmit(onSubmit)}>{!contact ? "Create Contact" : "Update Contact"}</CustomButton>
              </View>

              <PicturePicker onFileSelected={onFileSelected} ref={sheetRef} onClose={closeSheet} onOpen={openSheet} />
            </>
          </KeyboardAvoidingView>
        </View>
      }
    </ScrollView>
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
