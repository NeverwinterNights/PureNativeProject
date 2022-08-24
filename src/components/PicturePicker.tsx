import React, { ForwardedRef } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


type PicturePickerPropsType = {
  onClose: () => void
  onOpen: () => void
}


export const PicturePicker = React.forwardRef(({ onClose, onOpen }: PicturePickerPropsType, ref) => {
  const options = [
    {
      name: "Take photo from a camera", icon: <MaterialCommunityIcons size={24} name={"camera"} />, onPress: () => {
      },
    },
    {
      name: "Choose from gallery", icon: <MaterialCommunityIcons size={24} name={"view-gallery"} />, onPress: () => {
      },
    },
  ];
  return (
    <RBSheet
      // @ts-ignore
      ref={ref}
      height={300}
      openDuration={250}
      customStyles={{
        container: {
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      {options.map(({ name, onPress, icon }) =>
        <TouchableOpacity key={name}>
          {icon}
          {<Text>{name}</Text>}
        </TouchableOpacity>,
      )}
    </RBSheet>
  );
});

const styles = StyleSheet.create({
  container: {},
});
