import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../assets/theme/colors";

type MessagePropsType = {
  message: string
  primary?: boolean
  danger?: boolean
  info?: any
  success?: boolean
  onDismiss?: () => void
  retry?: any
  retryFn?: () => void
}

export const Message = ({
                          message,
                          onDismiss,
                          retry,
                          retryFn,
                          primary,
                          danger,
                          info,
                          success,
                        }: MessagePropsType) => {

  const [userDismissed, setDismissed] = useState(false);


  const getBgColor = () => {
    if (primary) {
      return colors.primary;
    }
    if (danger) {
      return colors.danger;
    }
    if (success) {
      return colors.success;
    }
    if (info) {
      return colors.secondary;
    }
  };

  return (
    <>
      {userDismissed ? null :
        <TouchableOpacity
          style={[styles.wrapper, { backgroundColor: getBgColor() }]}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <Text
              style={{
                color: colors.white,
                flex: retry ? 0 : 1,
                textAlign: "center",
              }}>
              {message}
            </Text>
            {retry  && typeof onDismiss !== "function" &&  (
              <TouchableOpacity onPress={retryFn}>
                <Text
                  style={{
                    color: colors.white,
                  }}>
                  Retry
                </Text>
              </TouchableOpacity>
            )}

            {typeof onDismiss === "function" && (
              <TouchableOpacity
                onPress={() => {
                  setDismissed(true);
                  onDismiss();
                }}>
                <Text
                  style={{
                    color: colors.white,
                  }}>
                  X
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      }
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 42,
    paddingHorizontal: 5,
    paddingVertical: 13,
    marginVertical: 5,
    borderRadius: 4,
    // alignItems: 'center',
    // justifyContent: 'space-evenly',
  },

  loaderSection: {
    flexDirection: "row",
  },

  textInput: {
    flex: 1,
    width: "100%",
  },

  error: {
    color: colors.danger,
    paddingTop: 4,
    fontSize: 12,
  },
});
