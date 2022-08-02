import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type SignUpScreenPropsType = {};

export const SignUpScreen = ({}: SignUpScreenPropsType) => {
  return (
    <View style={styles.container}>
      <Text>SignUpScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
