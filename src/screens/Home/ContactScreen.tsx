import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAppNavigation } from "../../navigation/navigationTypes";

type ContactScreenPropsType = {};


export const ContactScreenOptions = ({ navigation }: any) => {


  return {
    headerTitle: "Contacts",
    headerTitleAlign: "center" as const,
    headerLeft: () => (
      <TouchableOpacity onPress={()=> navigation.toggleDrawer()}>
        <Text style={{ padding: 7 }}>nav</Text>
      </TouchableOpacity>
    ),

  };
};


export const ContactScreen = ({}: ContactScreenPropsType) => {


  return (
    <View style={styles.container}>
      <Text>ContactScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
