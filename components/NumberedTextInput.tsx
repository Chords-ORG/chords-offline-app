import { Stack, Text } from "@react-native-material/core";
import TextInput from "./TextInput";
import React from "react";
import { StyleSheet, TextInputProps } from "react-native";
import { ThemeContext } from "../providers/ThemeProvider";

export interface NumberedTextInputProps extends TextInputProps {
  label?: string;
  helperText?: string;
  error?: string;
  highlightEvenLine?: boolean;
}

const NumberedTextInput = (props: NumberedTextInputProps) => {
  const {
    label = "",
    value,
    helperText,
    error,
    highlightEvenLine = true,
  } = props;

  const lines = value?.split("\n") || [];
  const lineNumbers = Array.from({ length: lines.length }, (_, i) =>
    (i + 1).toString()
  );
  // padd 0 line number
  const maxLineNumber = lineNumbers[lineNumbers.length - 1];
  const maxLineNumberLength = maxLineNumber.toString().length;
  lineNumbers.forEach((lineNumber, i) => {
    const lineNumberLength = lineNumber.toString().length;
    const diff = maxLineNumberLength - lineNumberLength;
    if (diff > 0) {
      lineNumbers[i] = "0".repeat(diff) + lineNumber;
    }
  });

  const { colors: themeColors } = React.useContext(ThemeContext);
  const lineEvenStyle = {
    color: themeColors.textHighlight,
    ...styles.lineEvenNumber,
  };
  const lineOddStyle = {
    color: themeColors.textSecondary,
    ...styles.lineOddNumber,
  };

  const inputChildrenProps = {
    ...props,
    label: undefined,
    helperText: undefined,
  };

  return (
    <Stack>
      <Text style={{ color: error ? "red" : themeColors.textInputTint }}>
        {label}
      </Text>
      {helperText && (
        <Text style={{ color: themeColors.textSecondary, fontSize: 12 }}>
          {helperText}
        </Text>
      )}
      <Stack>
        <Text style={styles.lineNumberContainer}>
          {lineNumbers.map((lineNumber, i) => (
            <Text
              key={lineNumber}
              style={
                i % 2 === 0 && highlightEvenLine ? lineEvenStyle : lineOddStyle
              }
            >
              {`${lineNumber}|\n`}
            </Text>
          ))}
        </Text>
        <TextInput
          {...inputChildrenProps}
          style={[styles.input, { paddingLeft: 10 + 8 * maxLineNumberLength }]}
          multiline
        />
      </Stack>
    </Stack>
  );
};

const styles = StyleSheet.create({
  lineNumberContainer: {
    position: "absolute",
    top: 10,
    left: 3,
    zIndex: 1,
  },
  lineEvenNumber: {
    marginRight: 5,
    fontFamily: "monospace",
    fontSize: 12,
    marginTop: 1,
  },
  lineOddNumber: {
    marginRight: 5,
    fontFamily: "monospace",
    fontSize: 12,
  },
  input: {
    flex: 1,
    fontFamily: "monospace",
    fontSize: 12,
  },
});

export default NumberedTextInput;
