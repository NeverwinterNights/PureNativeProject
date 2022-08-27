import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../assets/theme/colors";
import ImagePicker from "react-native-image-crop-picker";
import { ImageLocalFileType } from "../screens/Home/CreateContactScreen";


type PicturePickerPropsType = {
  onClose: () => void
  onOpen: () => void
  onFileSelected: (images: ImageLocalFileType) => void
}


export const PicturePicker = React.forwardRef(({ onClose, onOpen, onFileSelected }: PicturePickerPropsType, ref) => {
  const options = [
    {
      name: "Take photo from a camera",
      icon: <MaterialCommunityIcons style={styles.icon} color={colors.grey} size={24} name={"camera"} />,
      onPress: () => {
        ImagePicker.openCamera({
          width: 300,
          height: 300,
          cropping: true,
          freeStyleCropEnabled: true,
        })
          .then((data) => {
            onFileSelected(data as ImageLocalFileType);
          })
          .catch((err) => {
            console.log("err", err);
          });
      },
    },
    {
      name: "Choose from gallery",
      icon: <MaterialCommunityIcons style={styles.icon} color={colors.grey} size={24} name={"view-gallery"} />,
      onPress: () => {
        ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: true,
          freeStyleCropEnabled: true,
        })
          .then((data) => {
            onFileSelected(data as ImageLocalFileType);
          })
          .catch((err) => {
            console.log("err", err);
          });
      },
    },
  ];
  return (
    <RBSheet
      // @ts-ignore
      ref={ref}
      height={200}
      openDuration={250}
      closeOnDragDown
      customStyles={{
        container: {
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        },
      }}
    >
      <View style={styles.pickerContainer}>
        {options.map(({ name, onPress, icon }) =>
          <TouchableOpacity onPress={onPress} style={styles.picker} key={name}>
            {icon}
            {<Text style={{ fontSize: 18 }}>{name}</Text>}
          </TouchableOpacity>,
        )}
      </View>
    </RBSheet>
  );
});

const styles = StyleSheet.create({
  container: {},
  icon: {
    marginRight: 15,
  },
  pickerContainer: {
    paddingHorizontal: 20,
  },
  picker: {
    flexDirection: "row",
    paddingTop: 20,
    alignItems: "center",
  },

});
