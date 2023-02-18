import React from "react";
import { StyleSheet } from "react-native";
import { Chord } from "../functions/chords";
import { ModalDialogState } from "../hooks/useModalDialogState";
import ModalDialog from "./ModalDialog";
import { ThemeContext } from "../providers/ThemeProvider";
import {
  Button,
  HStack,
  Stack,
  Text,
} from "@react-native-material/core";

export interface CapoDialogProps {
  dialogState: ModalDialogState;
  selectedCapo: number;
  tone: string;
  onSelect: (value: number) => void;
}

export default function CapoDialog({
  dialogState,
  selectedCapo,
  tone,
  onSelect,
}: CapoDialogProps) {
  const { styleSheet: themeStyle } = React.useContext(ThemeContext);
  return (
    <ModalDialog state={dialogState}>
      <Stack style={[styles.modalView, themeStyle.dialog]} spacing={20}>
        <Text style={{ color: themeStyle.dialog.color }}>Selecione a casa</Text>
        <Stack spacing={10}>
          {value_lists.map((values, i) => {
            return (
              <HStack spacing={10} key={i} center>
                {values.map((value) => {
                  let text =
                    value == 0 ? "Sem capotraste\n" : `${value}ª casa\n`;
                  const chord = new Chord(tone);
                  chord.add(value);
                  text += `(Forma de ${chord.toSharp()})`;
                  return (
                    <Button
                      style={{ width: 160 }}
                      color={themeStyle.button.backgroundColor}
                      tintColor={themeStyle.button.color}
                      disabled={selectedCapo == value}
                      key={value}
                      onPress={() => {
                        onSelect(value);
                        dialogState.hide();
                      }}
                      title={text}
                      uppercase={false}
                      titleStyle={{ textAlign: "center", fontSize: 14 }}
                    />
                  );
                })}
              </HStack>
            );
          })}
        </Stack>
      </Stack>
    </ModalDialog>
  );
}

const value_lists = [
  [0, 1],
  [2, 3],
  [4, 5],
  [6, 7],
  [8, 9],
  [10, 11],
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00000066",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    borderRadius: 5,
    padding: 15,
    //alignItems: "center",
  },
  h1: {
    color: "#333333",
    fontFamily: "roboto-bold",
    fontSize: 16,
  },
  separator: {
    width: 300,
    borderBottomWidth: 1,
    height: 10,
  },
  buttons_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  button_text: {
    fontFamily: "roboto-bold",
    fontSize: 14,
    color: "#FFFFFF",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#BDBDBD",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 140,
    borderRadius: 5,
  },
});
