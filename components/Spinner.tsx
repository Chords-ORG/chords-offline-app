import React from "react";
import { Modal, StyleSheet, View, ActivityIndicator } from "react-native";

export interface SpinnerProps {
  visible: boolean;
}
export default function Spinner(props: SpinnerProps) {
  return (
    <Modal visible={props.visible} transparent>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00000066",
  },
});
