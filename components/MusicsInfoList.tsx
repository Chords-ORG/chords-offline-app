import { Pressable, Stack, Text } from "@react-native-material/core";
import { MusicInfo } from "../types";
import { ThemeContext } from "../providers/ThemeProvider";
import React from "react";
import { Alert } from "react-native";

export interface MusicsInfoListProps {
  musics: MusicInfo[];
  onPress?: (musicId: string) => void;
  onDelete?: (musicId: string) => void;
}
export default function MusicsInfoList({
  musics,
  onPress = () => {},
  onDelete = () => {},
}: MusicsInfoListProps) {
  const { styleSheet: themeStyle, colors: themeColors } =
    React.useContext(ThemeContext);

  return (
    <Stack spacing={10}>
      {musics.map((music) => {
        return (
          music.id !== undefined && (
            <Pressable
              onPress={() => {
                if (music.id) {
                  onPress(music.id);
                }
              }}
              key={music.id}
              style={[themeStyle.card, { padding: 10 }]}
              onLongPress={(event) => {
                Alert.alert("Excluir", "Deseja excluir essa cifra?", [
                  {
                    text: "Sim",
                    onPress: () => {
                      if (music.id) {
                        onDelete(music.id);
                      }
                    },
                  },
                  {
                    text: "Não",
                    onPress: () => {},
                  },
                ]);
              }}
            >
              <Text style={{ color: themeColors.textPrimary }}>
                {music.name || "Sem título"}
              </Text>
              <Text style={{ color: themeColors.textSecondary }}>
                {music.author || "Sem autor"}
              </Text>
            </Pressable>
          )
        );
      })}
    </Stack>
  );
}
