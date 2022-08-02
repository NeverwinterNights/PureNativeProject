import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type ContactScreenPropsType = {};

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
