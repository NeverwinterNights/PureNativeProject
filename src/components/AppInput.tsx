import React from "react";
import { StyleProp, StyleSheet, Text, TextInput, TextStyle, View, ViewStyle } from "react-native";
import colors from "../assets/theme/colors";

type AppInputPropsType = {
  setText: (text: string) => void
  text: string
  style?: StyleProp<TextStyle> | StyleProp<ViewStyle>
  label?: string
  icon?: keyof typeof MaterialCommunityIcons.glyphMap
}

export const AppInput = ({ style, setText, text, label, icon }: AppInputPropsType) => {

  return (
    <>
      {label && <View><Text>{label}</Text></View>}
      <View style={[styles.input, style]}>
        <View>{icon && icon}</View>
        <TextInput
          onChangeText={setText}
          value={text}
        />
      </View>

    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height:42,
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 10,
  },
});
