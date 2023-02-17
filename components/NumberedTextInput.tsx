import { TextInput } from "@react-native-material/core";
import React from "react";
import { StyleSheet, View, Text, TextInputProps } from "react-native";

export interface NumberedTextInputProps extends TextInputProps {
  label: string;
  variant: "outlined" | "filled" | "standard";
  color: string;
  helperText?: string;
}

const NumberedTextInput = (props: NumberedTextInputProps) => {
  const { label, color, variant, value, helperText } = props;

  const lines = value?.split("\n") || [];
  const lineNumbers = Array.from({ length: lines.length }, (_, i) => i + 1);

  return (
    <View style={styles.container}>
      <View style={styles.lineNumberContainer}>
        {lineNumbers.map((lineNumber, i) => (
          <Text
            key={lineNumber}
            style={i % 2 === 0 ? styles.lineEvenNumber : styles.lineOddNumber}
          >
            {lineNumber} |
          </Text>
        ))}
      </View>
      <TextInput
        {...props}
        label={label}
        variant={variant}
        color={color}
        helperText={helperText}
        style={styles.input}
        multiline
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  lineNumberContainer: {
    marginTop: 5,
    marginRight: 5,
  },
  lineEvenNumber: {
    color: "#2F80ED",
    marginRight: 5,
  },
  lineOddNumber: {
    color: "gray",
    marginRight: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    paddingTop: 4,
  },
});

export default NumberedTextInput;
