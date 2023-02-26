import { Button, Stack, Text, Pressable } from "@react-native-material/core";
import ModalDialog from "./ModalDialog";
import useModalDialogState, {
  ModalDialogState,
} from "../hooks/useModalDialogState";
import React from "react";
import { ThemeContext } from "../providers/ThemeProvider";

export interface PickerItem<T> {
  label: string;
  value: T;
}
export interface PickerProps<T> {
  label?: string;
  items: PickerItem<T>[];
  selectedValue: string;
  onValueChange?: (value: T) => void;
}
export default function Picker<T>({
  items,
  label = "",
  selectedValue,
  onValueChange = () => {},
}: PickerProps<T>) {
  const modalDialogState = useModalDialogState();
  const { styleSheet: themeStyle } = React.useContext(ThemeContext);
  const labelSelected = items.find(
    (item) => item.value === selectedValue
  )?.label;
  return (
    <Pressable
      onPress={modalDialogState.show}
      style={[themeStyle.card, { padding: 10 }]}
    >
      <PickerDialog
        state={modalDialogState}
        items={items}
        selectedValue={selectedValue}
        onValueChange={onValueChange}
      />
      <Text style={{ color: themeStyle.primary_color.color }}>{label}</Text>
      <Text style={{ color: themeStyle.secondary_color.color }}>
        {labelSelected}
      </Text>
    </Pressable>
  );
}

interface PickerDialogProps<T> {
  state: ModalDialogState;
  items: PickerItem<T>[];
  selectedValue: string;
  onValueChange: (value: T) => void;
}
function PickerDialog<T>({
  state,
  items,
  selectedValue,
  onValueChange,
}: PickerDialogProps<T>) {
  const { styleSheet: themeStyle, colors } = React.useContext(ThemeContext);
  return (
    <ModalDialog state={state}>
      <Stack style={[themeStyle.dialog]} spacing={20}>
        <Stack spacing={10} p={20}>
          {items.map(({ label, value }, i) => {
            return (
              <Button
                style={{ width: 160 }}
                color={colors.buttonBackground}
                tintColor={colors.buttonTint}
                key={i}
                onPress={() => {
                  onValueChange(value);
                  state.hide();
                }}
                title={label}
                uppercase={false}
                titleStyle={{ textAlign: "center", fontSize: 14 }}
                disabled={value === selectedValue}
              />
            );
          })}
        </Stack>
      </Stack>
    </ModalDialog>
  );
}
