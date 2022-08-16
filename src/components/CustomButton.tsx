import React from "react";
import { ActivityIndicator, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import colors from "../../assets/theme/colors";


type CustomButtonPropsType = {
  children: any
  onPress?: () => void
  color?: keyof typeof colors
  style?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>;
  disable?: boolean
  loading?: boolean
}


export const CustomButton = ({
                               children,
                               onPress,
                               disable = false,
                               style,
                               labelStyle,
                               loading,
                               color = "primary",
                             }: CustomButtonPropsType) => {
  return (
    <TouchableOpacity disabled={disable} activeOpacity={0.6} onPress={onPress}
                      style={[styles.button, style, { backgroundColor: disable ? colors.grey : colors[color] }]}>
      <Text style={[styles.text, labelStyle]}>{loading ? <ActivityIndicator /> : children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    // backgroundColor:  colors.primary,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginVertical: 10,
    width: "100%",
  },
  text: {
    color: colors.white,
    fontFamily: "open-sans",
    fontSize: 16,
    textTransform: "uppercase",
  },
});
