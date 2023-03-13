import { Button, Stack, Text } from "@react-native-material/core";
import React from "react";
import NumberedTextInput from "./NumberedTextInput";
import { ThemeContext } from "../providers/ThemeProvider";

export interface ChordsWrittenTextInputProps {
  text?: string;
  onChange?: (text: string) => void;
}

type InputState = "chords" | "lyrics";
const ChordsWrittenTextInput = (props: ChordsWrittenTextInputProps) => {
  const {
    text: lyrics = "",
    onChange: setLyrics = () => {
      return;
    },
  } = props;

  const [lyricsBeforeChords, setLyricsBeforeChords] = React.useState("");
  const [inputState, setInputState] = React.useState<InputState>("lyrics");

  const inputLabel = inputState === "chords" ? "Cifra" : "Letra";
  const inputHelperText =
    inputState === "chords"
      ? "Utilize as linhas azuis para inserir os acordes"
      : "Escreva a letra da música e pressione o botão 'Escrever cifra' para inserir os acordes.";

  const buttonTitle =
    inputState === "chords" ? "Retornar para letra" : "Escrever cifra";

  const onChangeToChords = () => {
    const lines = lyrics.split("\n");
    const maxLineLength = Math.max(...lines.map((line) => line.length));
    const emptyLine = " ".repeat(maxLineLength);
    const linesWithEmptyLineAbove = lines.map((line) => {
      return `${emptyLine}\n${line}`;
    });
    setLyrics(linesWithEmptyLineAbove.join("\n"));
    setLyricsBeforeChords(lyrics);
    setInputState("chords");
  };

  const onChangeToLyrics = () => {
    setLyrics(lyricsBeforeChords);
    setInputState("lyrics");
  };

  const { colors: themeColors } = React.useContext(ThemeContext);
  return (
    <Stack>
      <Button
        title={buttonTitle}
        color={themeColors.buttonBackground}
        tintColor={themeColors.buttonTint}
        onPress={inputState === "chords" ? onChangeToLyrics : onChangeToChords}
      />
      <NumberedTextInput
        label={inputLabel}
        highlightEvenLine={inputState === "chords"}
        onChange={(e) => setLyrics(e.nativeEvent.text)}
        value={lyrics}
        numberOfLines={40}
        style={{ height: 800 }}
        editable
        textAlignVertical="top"
        autoComplete="off"
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType="ascii-capable"
        helperText={inputHelperText}
      />
    </Stack>
  );
};

export default ChordsWrittenTextInput;
