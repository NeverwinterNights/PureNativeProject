import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AppModal } from "../../components/AppModal";
import { Message } from "../../components/Message";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { ContactData, getContactsTh } from "../../store/contactsReducer";
import colors from "../../../assets/theme/colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useAppNavigation } from "../../navigation/navigationTypes";

type ContactScreenPropsType = {};


export const ContactScreenOptions = ({ navigation }: any) => {
  return {
    headerTitle: "Contacts",
    headerTitleAlign: "center" as const,
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Ionicons color={"grey"} style={{ marginRight: 7 }} size={26} name={"menu"} />
      </TouchableOpacity>
    ),

  };
};


export const ContactScreen = ({}: ContactScreenPropsType) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const contactsData = useAppSelector(state => state.contactsReducer.data);
  const isLoading = useAppSelector(state => state.appReducer.loading);
  const contactsError = useAppSelector(state => state.contactsReducer.error);
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();

  useEffect(() => {
    dispatch(getContactsTh());
  }, []);

  const createContact = () => {
    navigation.navigate("DrawerNavigator", { screen: "HomeNavigator", params: { screen: "CreateContactScreen" } });
  };


  const listEmptyComponent = () => {
    return (
      <View style={styles.empty}>
        <Message info message={"No contacts found"} />
      </View>
    );
  };


  const renderFunc = (item: ContactData) => {
    return (
      <TouchableOpacity style={styles.item}>
        <View style={styles.main}>
          {item.contact_picture ? <Image style={styles.image} source={{ uri: item.contact_picture }} /> :
            <View style={styles.fakeAvatar}>
              <Text style={{ fontSize: 16, marginRight: item.last_name ? 3 : 0 }}>{item.first_name[0]}</Text>
              <Text style={{ fontSize: 16 }}>{item.last_name[0]}</Text>
            </View>}
          <View style={{ paddingLeft: 10 }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.text}>{item.first_name}</Text>
              {item.last_name && <Text style={styles.text}> {item.last_name}</Text>}
            </View>
            <Text style={styles.phone}>{`+ ${item.country_code} ${item.phone_number}`}</Text>
          </View>
        </View>
        <MaterialCommunityIcons color={colors.grey} name={"chevron-right"} size={26} />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <AppModal modalBody={<View><Text>Modal</Text></View>} iconName={"close"} title={"Profile"}
                  visibleModal={visibleModal} setVisibleModal={setVisibleModal} />

        {/*<CustomButton children={"Text"} onPress={() => setVisibleModal(true)} />*/}
        <View style={[styles.empty, { padding: isLoading ? 100 : 0 }]}>
          {isLoading && <ActivityIndicator color={colors.primary} size={"large"} />}
        </View>
        {!isLoading && contactsData &&
        <FlatList data={contactsData}
                  renderItem={({ item }) => renderFunc(item)}
                  ItemSeparatorComponent={() => (<View style={{ height: 0.5, backgroundColor: colors.grey }} />)}
                  ListFooterComponent={<View style={{ height: 100 }} />}
                  ListEmptyComponent={listEmptyComponent} keyExtractor={(item) => item.id.toString()} />
        }
      </View>
      <TouchableOpacity onPress={createContact} style={styles.addButton}>
        <MaterialCommunityIcons color={colors.white} name={"plus-circle-outline"} size={30} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  text: {
    fontSize: 18,
  },
  addButton: {
    backgroundColor: "red",
    width: 55,
    height: 55,
    position: "absolute",
    bottom: 25,
    right: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 55 / 2,
  },
  addButton2: {
    backgroundColor: "red",
    width: 55,
    height: 55,
    position: "absolute",
    bottom: 50,
    left: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 55 / 2,
  },

  phone: {
    color: colors.grey,
    fontSize: 14,
    paddingVertical: 10,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 20,
  },
  main: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,

  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
  },
  fakeAvatar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 45,
    height: 45,
    backgroundColor: colors.grey,
    borderRadius: 45 / 2,
  },
  empty: {},
});
