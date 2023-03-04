import { Stack, Text } from "@react-native-material/core";
import React from "react";
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
} from "react-native";
import { ThemeContext } from "../providers/ThemeProvider";

export interface TextInputProps extends RNTextInputProps {
  label?: string;
  helperText?: string;
  error?: string;
}
export default function TextInput({
  label,
  helperText,
  error,
  ...props
}: TextInputProps) {
  const { colors: themeColors } = React.useContext(ThemeContext);

  return (
    <Stack>
      {label && (
        <Text style={{ color: error ? "red" : themeColors.textInputTint }}>
          {label}
        </Text>
      )}
      {helperText && (
        <Text style={{ color: themeColors.textSecondary, fontSize: 12 }}>
          {helperText}
        </Text>
      )}
      <RNTextInput
        {...props}
        style={[
          styles.input,
          {
            backgroundColor: themeColors.textInputBackground,
            color: themeColors.textInputTint,
            borderColor: error ? "red" : themeColors.textInputBorder,
          },
          props.style,
        ]}
        placeholderTextColor={themeColors.textInputPlaceholder}
      />
      <Text style={styles.errorText}>{error}</Text>
    </Stack>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    textAlign: "right",
  },
});
