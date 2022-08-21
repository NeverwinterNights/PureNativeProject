import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";




export const Screen = ({ children, style }: any) => {
  return (
    <ScrollView style={styles.container}>
      <View style={[styles.wrapper, style]}>
        {children}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  wrapper: {
    padding: 20,

  },
});
