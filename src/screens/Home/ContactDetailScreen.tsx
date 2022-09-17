import React, { useLayoutEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ContactDetailScreenPropsType, useAppNavigation } from "../../navigation/navigationTypes";
import colors from "../../../assets/theme/colors";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { HeaderBackButton } from "@react-navigation/elements";
import { HeaderBackButtonProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { CustomButton } from "../../components/CustomButton";
import { createContactsTh, deleteContactsTh, updateContactsTh } from "../../store/contactsReducer";
import { logOutAC } from "../../store/authReducer";
import RBSheet from "react-native-raw-bottom-sheet";
import { PicturePicker } from "../../components/PicturePicker";
import uploadImage from "../../helpers/uploadImage";
import { ImageLocalFileType } from "./CreateContactScreen";
import { isLoadingAC } from "../../store/appReducer";


export const ContactDetailScreen = ({ route }: ContactDetailScreenPropsType) => {
  const { item } = route.params;
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const [loading, setLoading] = useState(false);
  // const [picture, setPicture] = useState<ImageLocalFileType | null>(null);
  const [pic, setPic] = useState<string | null>(null);
  const isLoading = useAppSelector(state => state.appReducer.loading);


  const deleteContactHandler = async () => {
    Alert.alert("Delete contact?", "Are you really wanna delete this contact?", [
      {
        text: "Cancel",
        onPress: () => {
        },
      },
      {
        text: "OK",
        onPress: async () => {
          const response = await dispatch(deleteContactsTh({ id: item.id }));
          if (response.type === "contacts/deleteContactsTh/fulfilled") {
            navigation.navigate("DrawerNavigator", {
              screen: "HomeNavigator",
              params: { screen: "ContactScreen" },
            });
            setPic(null);
          }
        },
      },
    ]);
  };


  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${item.first_name} ${item.last_name}`,
      headerTitleAlign: "center",
      headerStyle: { backgroundColor: colors.white },
      headerLeft: (props: HeaderBackButtonProps) => {
        return (
          <HeaderBackButton style={{ left: -13 }} onPress={() => {
            navigation.navigate("DrawerNavigator", {
              screen: "HomeNavigator",
              params: { screen: "ContactScreen" },
            });
            setPic(null);
          }} {...props} />
        );
      },
      headerRight: (props: HeaderBackButtonProps) => {
        return (
          <View style={styles.headerIcon}>
            <TouchableOpacity style={{ marginRight: 6 }}>
              <MaterialCommunityIcons size={24} name={item.is_favorite ? "star" : "star-outline"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteContactHandler}>
              <MaterialCommunityIcons size={24} name={"delete"} />
            </TouchableOpacity>
          </View>
        );
      },
    });
  }, [navigation, item]);

  const onError = () => {
    setLoading(false);

  };
  const onLoadEnd = () => {    setLoading(false);

  };
  const onLoadStart = () => {
    setLoading(true);
  };

  const editContactHandler = () => {
    navigation.navigate("DrawerNavigator", {
      screen: "HomeNavigator",
      params: { screen: "CreateContactScreen", params: { contact: item } },
    });
  };


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
    dispatch(isLoadingAC({ value: true }));
    closeSheet();
    if (images) {
      uploadImage(images)((url: string) => {
        dispatch(updateContactsTh({
          id: item.id,
          country_code: item.country_code,
          first_name: item.first_name,
          last_name: item.last_name,
          phone_number: item.phone_number,
          contact_picture: url,
          is_favorite: item.is_favorite,
        }));
        setPic(url);
        setLoading(false);
      })((err: any) => {
        setLoading(false);
        console.log("err", err);
      });
    }
  };



  return (
    <>
      {isLoading ?
        <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}><ActivityIndicator size={"large"}
                                                                                                     color={colors.primary} /></View> :
        <View style={styles.container}>
          {/*{loading && <View style={styles.noImage}><Text style={styles.noImageText}>Loading photo</Text></View>}*/}
          {isLoading && <View style={styles.loading}><Text style={styles.noImageText}>Loading photo</Text></View>}
          {item.contact_picture !== "https://null.jpg" || pic ?
            <Image onError={onError} onLoadStart={onLoadStart} onLoadEnd={onLoadEnd} style={styles.image}
                   source={{ uri: pic ? pic : item.contact_picture }} /> :
            <>
              <Image style={styles.avatar}
                     source={{ uri: pic || "http://cdn01.ru/files/users/images/62/26/6226a248e23a10fccedf0c81e001285d.jpg" }} />
              <TouchableOpacity onPress={openSheet}>
                <Text style={{ textAlign: "center" }}>Choose image</Text>
              </TouchableOpacity>
              <PicturePicker onFileSelected={onFileSelected} ref={sheetRef} onClose={closeSheet} onOpen={openSheet} />
            </>
            // <View style={styles.noImage}><Text
            //   style={styles.noImageText}>{`${item.first_name[0]} ${item.last_name[0]}`}</Text></View>
          }
          <View style={styles.bodyName}>
            <Text style={styles.textName}>{`${item.first_name} ${item.last_name}`}</Text>
          </View>
          <View style={styles.bodyItems}>
            <View style={styles.itemIcon}>
              <TouchableOpacity style={styles.touch}>
                <MaterialCommunityIcons style={{ marginBottom: 5 }} name={"phone-outline"} color={colors.primary}
                                        size={26} />
                <Text style={styles.label}>Call</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.itemIcon}>
              <TouchableOpacity style={styles.touch}>
                <MaterialCommunityIcons style={{ marginBottom: 5 }} size={26} color={colors.primary}
                                        name={"message-text"} />
                <Text style={styles.label}>Text</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.itemIcon}>
              <TouchableOpacity style={styles.touch}>
                <MaterialCommunityIcons style={{ marginBottom: 5 }} name={"video"} color={colors.primary} size={26} />
                <Text style={styles.label}>Video</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.call}>

            <View style={styles.callInfo}>
              <TouchableOpacity>
                <MaterialCommunityIcons style={{ marginRight: 8 }} name={"phone-outline"} color={colors.primary}
                                        size={26} />
              </TouchableOpacity>
              <View style={styles.data}>
                <Text style={{ fontSize: 14 }}>{`+ ${item.country_code} ${item.phone_number}`}</Text>
                <Text style={styles.type}>Mobile</Text>
              </View>
            </View>
            <View style={styles.callIcon}>
              <TouchableOpacity>
                <MaterialCommunityIcons style={{ marginBottom: 5 }} name={"video"} color={colors.primary} size={26} />
              </TouchableOpacity>
            </View>
            <View style={[styles.callIcon, { alignItems: "flex-end" }]}>
              <TouchableOpacity>
                <MaterialCommunityIcons style={{ marginBottom: 5 }} size={26} color={colors.primary}
                                        name={"message-text"} />
              </TouchableOpacity>
            </View>

          </View>
          <View style={styles.button}><CustomButton onPress={editContactHandler} style={{ width: "50%" }}
                                                    children={"Edit Contact"} /></View>
        </View>
      }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  data: {},
  loading: {
    alignItems: "center",
    position: "absolute",
    width: "100%",
    height: 200,
    justifyContent: "center",
  },
  avatar: {
    alignSelf: "center",
    width: 150,
    height: 150,
    borderRadius: 200 / 2,
    marginVertical: 10,
  },
  headerIcon: {
    flexDirection: "row",
    width: 65,
    justifyContent: "space-between",
  },
  callIcon: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingHorizontal: 15,
    height: 100,
  },
  type: {},
  callInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  call: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    height: 100,
    justifyContent: "center",
    borderBottomColor: colors.grey,
    borderBottomWidth: 0.5,
    paddingHorizontal: 15,
  },
  callContainer: {
    width: 225,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: 100,
  },

  label: {
    color: colors.primary,
  },
  touch: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  itemIcon: {
    width: 100,
    height: 75,
    alignItems: "center",
    justifyContent: "center",
  },
  bodyName: {
    paddingHorizontal: 15,
    borderBottomColor: colors.grey,
    borderBottomWidth: 0.5,
    height: 75,
    alignItems: "center",
    justifyContent: "center",
  },
  bodyItems: {
    paddingHorizontal: 15,
    borderBottomColor: colors.grey,
    borderBottomWidth: 0.5,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  noImageText: {
    fontWeight: "bold",
    fontSize: 30,
  },
  textName: {
    fontWeight: "bold",
    fontSize: 26,
    // textAlign: "center",
    alignSelf: "flex-start",
  },
  noImage: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: colors.grey,
    borderBottomWidth: 0.5,
  },
});
