import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type ContactDetailScreenPropsType = {};

export const ContactDetailScreen = ({}: ContactDetailScreenPropsType) => {
  return (
    <View style={styles.container}>
      <Text>ContactDetailScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
