import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type LoginScreenPropsType = {};

export const LoginScreen = ({}: LoginScreenPropsType) => {
  return (
    <View style={styles.container}>
      <Text>LoginScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
