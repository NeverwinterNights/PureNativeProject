import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../assets/theme/colors";


type PicturePickerPropsType = {
  onClose: () => void
  onOpen: () => void
}


export const PicturePicker = React.forwardRef(({ onClose, onOpen }: PicturePickerPropsType, ref) => {
  const options = [
    {
      name: "Take photo from a camera", icon: <MaterialCommunityIcons style={styles.icon}  color={colors.grey}   size={24} name={"camera"} />, onPress: () => {
      },
    },
    {
      name: "Choose from gallery", icon: <MaterialCommunityIcons style={styles.icon} color={colors.grey}  size={24} name={"view-gallery"} />, onPress: () => {
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
          <TouchableOpacity style={styles.picker} key={name}>
            {icon}
            {<Text style={{fontSize:18}}>{name}</Text>}
          </TouchableOpacity>,
        )}
      </View>
    </RBSheet>
  );
});

const styles = StyleSheet.create({
  container: {},
  icon: {
    marginRight:15,
  },
  pickerContainer: {
    paddingHorizontal:20
  },
  picker: {
    flexDirection: "row",
    paddingTop: 20,
    alignItems:"center",
  },

});
