import React from "react";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { HomeNavigator } from "./HomeNavigator";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAppDispatch } from "../store/store";
import { logOutAC } from "../store/authReducer";


const Drawer = createDrawerNavigator();


const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const dispatch = useAppDispatch();



  const handleLogOut = () => {
    props.navigation.toggleDrawer();
    Alert.alert("Log Out?", "Are you really wanna log out?", [
      {
        text: "Cancel",
        onPress: () => {
        },
      },
      {
        text: "OK",
        onPress: () => {
          dispatch(logOutAC())
        },
      },
    ]);
  };

  return (
    <>
      <View style={styles.logo}>
        <Image style={styles.image} source={require("../../assets/images/img_1.png")} />
      </View>

      <View style={{ flex: 1 }}>
        <DrawerContentScrollView>
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
          </DrawerContentScrollView>
        </DrawerContentScrollView>

        <View>
          <Pressable style={{
            flexDirection: "row", alignItems: "center",
            justifyContent: "center", marginVertical: 20,
          }} onPress={handleLogOut}>
            <Ionicons color={"grey"} style={{marginRight: 10}} size={26} name={"log-out"}/>
            <Text>Log Out</Text>
            {/*<AppText style={{fontFamily: "open-sans-bold"}}>Log Out</AppText>*/}
          </Pressable>
        </View>
      </View>
    </>
  );
};


export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false, drawerType: "front" }}
                      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name={"HomeNavigator"} component={HomeNavigator} options={{
        drawerLabel: "Home",
        drawerLabelStyle: { left: -20 },
        drawerIcon: (drawerConfig) =>
          <Ionicons name={"beer-outline"} size={23}
                    color={drawerConfig.color} />,
      }} />
    </Drawer.Navigator>
  );
};


const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    left: -20,
  },
  logo: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
});
