import {
  Stack,
  Text,
  Pressable,
  HStack,
  Spacer,
  PressableProps,
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
export interface PickerProps<T> extends PressableProps {
  label?: string;
  items: PickerItem<T>[];
  selectedValue: T;
  onValueChange?: (value: T) => void;
  columns?: number;
  buttonWidth?: number;
  disabled?: boolean;
}
export default function Picker<T>(props: PickerProps<T>) {
  const {
    items,
    label = "",
    selectedValue,
    onValueChange = () => {},
    columns,
    buttonWidth,
    disabled = false,
  } = props;
  const modalDialogState = useModalDialogState();
  const { styleSheet: themeStyle, colors: themeColors } =
    React.useContext(ThemeContext);
  const labelSelected = items.find(
    (item) => item.value === selectedValue
  )?.label;
  return (
    <Pressable
      onPress={modalDialogState.show}
      {...props}
      style={[
        {
          padding: 10,
          backgroundColor: disabled
            ? themeColors.disabledCardBackground
            : themeColors.cardBackground,
          borderRadius: 5,
        },
        props.style,
      ]}
      disabled={disabled}
    >
      <PickerDialog
        state={modalDialogState}
        items={items}
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        columns={columns}
        buttonWidth={buttonWidth}
      />
      <Text style={{ color: themeColors.textPrimary }}>{label}</Text>
      <Text style={{ color: themeColors.textSecondary }}>{labelSelected}</Text>
    </Pressable>
  );
}

interface PickerDialogProps<T> {
  state: ModalDialogState;
  items: PickerItem<T>[];
  selectedValue: T;
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
              {itemsColumn.map(({ label, helpText, value }, j) => {
                return (
                  <Stack key={j}>
                    {value === selectedValue ? (
                      <Stack
                        style={{
                          backgroundColor: themeColors.buttonDisabledBackground,
                          width: buttonWidth,
                          padding: 15,
                        }}
                      >
                        <Text style={{ color: themeColors.buttonTint }}>
                          {label}
                          {helpText && (
                            <Text
                              style={{ color: themeColors.buttonTintSecondary }}
                            >
                              {helpText}
                            </Text>
                          )}
                        </Text>
                      </Stack>
                    ) : (
                      <Pressable
                        style={{
                          backgroundColor: themeColors.buttonBackground,
                          padding: 15,
                          width: buttonWidth,
                        }}
                        onPress={() => {
                          onValueChange(value);
                          state.hide();
                        }}
                      >
                        <Text
                          style={{
                            color: themeColors.buttonTint,
                          }}
                        >
                          {label}
                          {helpText && (
                            <Text
                              style={{
                                color: themeColors.buttonTintSecondary,
                              }}
                            >
                              {helpText}
                            </Text>
                          )}
                        </Text>
                      </Pressable>
                    )}
                  </Stack>
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
