import React from "react";
import { Modal, ScrollView, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import colors from "../../assets/theme/colors";
import Ionicons from "react-native-vector-icons/Ionicons";

type AppModalPropsType = {
  visibleModal: boolean
  setVisibleModal: (value: boolean) => void
  iconName: string
  title: string
  modalBody?: any
  modalFooter?: any
  closeOtTouchOut?:boolean
}

export const AppModal = ({
                           visibleModal,
                           setVisibleModal,
                           modalBody,
                           modalFooter,
                           iconName,
                           closeOtTouchOut,
                           title,
                         }: AppModalPropsType) => {

  return (
    <>
      <Modal visible={visibleModal} transparent>
        <TouchableOpacity onPress={() => {
          if (closeOtTouchOut) {
            setVisibleModal(false)
          }
        }} style={styles.wrap}>
          <View style={styles.modal}>
            <ScrollView>
              <View style={styles.header}>
                <TouchableOpacity onPress={() => setVisibleModal(false)}>
                <Ionicons color={"grey"} style={{ marginRight: 7 }} size={26} name={iconName} />
                </TouchableOpacity>
                <Text style={styles.title}>{title || "Contacts"}</Text>
                <View/>
                <View/>
                <View/>
                <View/>
              </View>
              <View style={styles.footerSeparator} />
              <View style={styles.body}>
                {modalBody}
              </View>
              {modalFooter}
              {!modalFooter && (
                <View>

                  <>
                    <View style={styles.footerSeparator} />
                    <View style={styles.footerItems}>
                      <View style={styles.footer}>
                        <Text style={styles.footerText}>Privacy Policy</Text>
                        <View style={styles.termsView} />
                        <Text style={styles.footerText}>Terms of Service</Text>
                      </View>
                    </View>
                  </>

                </View>)}
            </ScrollView>
          </View>

        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  body: {
    minHeight: 300,
    paddingHorizontal:20,
    paddingVertical:10
  },
  footer: {
    justifyContent: "space-evenly",
    paddingVertical: 7,
    alignItems: "center",
    flexDirection: "row",
  },

  termsView: {
    width: 5,
    height: 5,
    borderRadius: 100,
    backgroundColor: colors.grey,
  },

  footerSeparator: {
    height: 0.5,
    backgroundColor: colors.grey,
  },

  footerItems: {
    width: "100%",
    padding: 10,
  },

  footerText: {
    fontSize: 12,
  },
  title: {
    fontSize: 21,
  },
  header: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  modal: {
    backgroundColor: colors.white,
    minHeight: 300,
    marginHorizontal: 20,
    borderRadius: 5,
  },
  wrap: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    flex: 1,
    justifyContent: "center",
  },

});
