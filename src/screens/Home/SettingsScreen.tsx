import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../../assets/theme/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppModal } from "../../components/AppModal";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

type SettingsPropsType = {};

// export const ContactScreenOptions = ({navigation, route }: any) => {
//   return {
//     headerTitle: "Settings",
//     headerTitleAlign: "center" as const,
//   }
// }

type UserType = {
  username: string
  first_name: string
  last_name: string
  email: string
}


export const SettingsScreenOptions = ({ navigation }: any) => {
  return {
    headerTitle: "Settings",
    headerTitleAlign: "center" as const,
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Ionicons color={"grey"} style={{ marginRight: 7 }} size={26} name={"menu"} />
      </TouchableOpacity>
    ),

  };
};


export const SettingsScreen = ({}: SettingsPropsType) => {
  const [email, setEmail] = useState("");
  const [visibleModal, setVisibleModal] = useState(false);
  const [sortBySetting, setSortBySetting] = useState<string | null>(null);

  const settingsData = [
    {
      title: "My Info", subTitle: "Setup your profile", onPress: () => {
      },
    },
    {
      title: "Accounts", subTitle: null, onPress: () => {
      },
    },
    {
      title: "Default account for new contacts", subTitle: email, onPress: () => {
      },
    },
    {
      title: "Contacts to display", subTitle: "All contacts", onPress: () => {
      },
    },
    {
      title: "Sort by", subTitle: sortBySetting, onPress: () => setModalVisible(),
    },
    {
      title: "Name format", subTitle: "First name first", onPress: () => {
      },
    },
    {
      title: "Import", subTitle: null, onPress: () => {
      },
    },
    {
      title: "Export", subTitle: null, onPress: () => {
      },
    },
    {
      title: "Blocked numbers", subTitle: null, onPress: () => {
      },
    },
    {
      title: "About RNContacts", subTitle: null, onPress: () => {
      },
    },
  ];

  const prefArray = [
    {
      name: "First name", selected: sortBySetting === "First name", onPress: () => {
        saveSettings("sortBy", "First name");
        setSortBySetting((prev) => "First name");
        setModalVisible();
      },
    },
    {
      name: "Last name", selected: sortBySetting === "Last name", onPress: () => {
        saveSettings("sortBy", "Last name");
        setSortBySetting((prev) => "Last name");
        setModalVisible();
      },
    },
  ];


  const saveSettings = async (key: string, value: string) => {
    await AsyncStorage.setItem(key, value);
  };

  const setModalVisible = () => {
    setVisibleModal((prev) => !prev);
  };

  const getSettings = async () => {
    const user = await AsyncStorage.getItem("user");
    if (user) {
      const userData: UserType = JSON.parse((user));
      setEmail((prev) => userData.email);
    }
    const sortBy = await AsyncStorage.getItem("sortBy");
    if (sortBy) {
      setSortBySetting((prev) => sortBy);
    }

  };

  useEffect(() => {
    getSettings();
  }, []);

  return (
    <>
      <AppModal closeOtTouchOut={false} modalFooter={<></>} modalBody={
        <View>
          {prefArray.map((item) => <View key={item.name}>
            <TouchableOpacity onPress={item.onPress} style={{ flexDirection: "row", paddingVertical:5, alignItems: "center" }}>
              {item.selected && <MaterialCommunityIcons size={20} name={"check-bold"} />}
              <Text style={{ fontSize: 18, paddingLeft: item.selected ? 15 : 35 }}>{item.name}</Text>
            </TouchableOpacity>
          </View>)}
        </View>} visibleModal={visibleModal} iconName={"close"} setVisibleModal={setVisibleModal} title={"Sort by"} />

      <FlatList style={{ backgroundColor: colors.white }} data={settingsData} keyExtractor={(item) => item.title}
                renderItem={({ item }) => <TouchableOpacity onPress={item.onPress}>
                  <View style={styles.item}>
                    <Text style={styles.title}>{item.title}</Text>
                    {item.subTitle && <Text style={styles.subTitle}>{item.subTitle}</Text>}
                  </View>
                  <View style={styles.line} />
                </TouchableOpacity>} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  subTitle: {
    fontSize: 14,
    opacity: 0.5,
    paddingTop: 5,
  },
  title: {
    fontSize: 17,
  },
  item: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 20,
  },
  line: {
    height: 0.5,
    backgroundColor: colors.grey,
  },
});
