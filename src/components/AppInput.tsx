import React from "react";
import { StyleProp, StyleSheet, Text, TextInput, TextInputProps, TextStyle, View, ViewStyle } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../assets/theme/colors";

type AppInputPropsType = {
  setText: (text: string) => void
  text: string
  style?: StyleProp<TextStyle> | StyleProp<ViewStyle>
  label?: string
  // icon?: keyof typeof MaterialCommunityIcons.glyphMap
  // icon?: React.ComponentProps<typeof MaterialCommunityIcons>['name']
  icon?: string
  width?: number | string
  direction?: "left" | "right"
}

export const AppInput = ({
                           style,
                           setText,
                           direction = "left",
                           text,
                           width = "100%",
                           label,
                           icon,
                           ...restProps
                         }: AppInputPropsType & TextInputProps) => {

  return (
    <>
      {label && <View><Text style={styles.label}>{label}</Text></View>}
      <View
        style={[styles.container, { width: width }, { flexDirection: direction === "left" ? "row" : "row-reverse" }]}>
        {icon && <MaterialCommunityIcons name={icon} style={styles.icon} size={20} color={colors.grey} />}
        <TextInput placeholderTextColor={colors.grey} onChangeText={setText} value={text}
                   style={[styles.text, style]} {...restProps} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 25,
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
  },
  label: {
    fontSize: 30,
    fontFamily: "OleoScriptRegular",
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 18,
    color: "black",
    fontFamily: "Roboto",
    flex: 1,
  },
});
