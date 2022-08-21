import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type SettingsPropsType = {};

// export const ContactScreenOptions = ({navigation, route }: any) => {
//   return {
//     headerTitle: "Settings",
//     headerTitleAlign: "center" as const,
//   }
// }



export const SettingsScreen = ({}: SettingsPropsType) => {
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
