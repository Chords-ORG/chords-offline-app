import {
  Button,
  Stack,
  Text,
  Pressable,
  HStack,
  Spacer,
} from "@react-native-material/core";
import ModalDialog from "./ModalDialog";
import useModalDialogState, {
  ModalDialogState,
} from "../hooks/useModalDialogState";
import React from "react";
import { ThemeContext } from "../providers/ThemeProvider";

export interface PickerItem<T> {
  label?: string;
  helpText?: string;
  value: T;
}
export interface PickerProps<T> {
  label?: string;
  items: PickerItem<T>[];
  selectedValue: string;
  onValueChange?: (value: T) => void;
  columns?: number;
  buttonWidth?: number;
}
export default function Picker<T>({
  items,
  label = "",
  selectedValue,
  onValueChange = () => {},
  columns,
  buttonWidth,
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
        columns={columns}
        buttonWidth={buttonWidth}
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
  columns?: number;
  buttonWidth?: number;
}
function PickerDialog<T>({
  state,
  items,
  selectedValue,
  onValueChange,
  columns = 1,
  buttonWidth = 180,
}: PickerDialogProps<T>) {
  const { colors: themeColors } = React.useContext(ThemeContext);

  const itemsColumns = React.useMemo(() => {
    const itemsColumns: PickerItem<T>[][] = [];
    for (let i = 0; i < columns; i++) {
      itemsColumns.push([]);
    }
    items.forEach((item, i) => {
      itemsColumns[i % columns].push(item);
    });
    return itemsColumns;
  }, [items, columns]);

  console.log(itemsColumns.length);
  console.log(itemsColumns);
  return (
    <ModalDialog state={state}>
      <HStack
        center
        spacing={5}
        p={20}
        style={{
          backgroundColor: themeColors.contentBackground,
        }}
      >
        {itemsColumns.map((itemsColumn, i) => {
          return (
            <Stack key={i} divider={<Stack style={{ height: 5 }} />}>
              {itemsColumn.map(({ label, helpText, value }, i) => {
                return (
                  <>
                    {value === selectedValue ? (
                      <Stack
                        style={{
                          backgroundColor: themeColors.buttonDisabledBackground,
                          width: buttonWidth,
                          padding: 15,
                        }}
                        key={i}
                      >
                        <Text style={{ color: themeColors.buttonTint }}>
                          {label}
                        </Text>
                        {helpText && (
                          <Text
                            style={{ color: themeColors.buttonTintSecondary }}
                          >
                            {helpText}
                          </Text>
                        )}
                      </Stack>
                    ) : (
                      <Pressable
                        style={{
                          backgroundColor: themeColors.buttonBackground,
                          padding: 15,
                          width: buttonWidth,
                        }}
                        key={i}
                        onPress={() => {
                          onValueChange(value);
                          state.hide();
                        }}
                        disabled={value === selectedValue}
                      >
                        <Text style={{ color: themeColors.buttonTint }}>
                          {label}
                        </Text>
                        {helpText && (
                          <Text
                            style={{
                              color: themeColors.buttonTintSecondary,
                            }}
                          >
                            {helpText}
                          </Text>
                        )}
                      </Pressable>
                    )}
                  </>
                );
              })}
              <Spacer />
            </Stack>
          );
        })}
      </HStack>
    </ModalDialog>
  );
}
