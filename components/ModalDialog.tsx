import React from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { ModalDialogState } from "../hooks/useModalDialogState";

export interface ModalDialogProps {
  state: ModalDialogState;
  children: React.ReactNode;
}
export default function ModalDialog({ state, children }: ModalDialogProps) {
  const { hide, visible } = state;
  return (
    <Modal visible={visible} transparent>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          hide();
        }}
        activeOpacity={0}
      >
        <View style={styles.modalView}>{children}</View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00000066",
    zIndex: 0,
  },
  modalView: {
    borderRadius: 5,
    zIndex: 1,
  }
});
