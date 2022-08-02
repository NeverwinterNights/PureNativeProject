import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type CreateContactScreenPropsType = {};

export const CreateContactScreen = ({}: CreateContactScreenPropsType) => {
  return (
    <View style={styles.container}>
      <Text>CreateContactScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
