import { Pressable, Stack, Text } from "@react-native-material/core";
import { MusicInfo } from "../types";
import { ThemeContext } from "../providers/ThemeProvider";
import React from "react";
import { Alert, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export interface MusicsInfoListProps {
  musics: MusicInfo[];
  onPress?: (musicId: string) => void;
  onDelete?: (musicId: string) => void;
  onRefresh?: () => Promise<void>;
}
export default function MusicsInfoList({
  musics,
  onPress = () => {},
  onDelete = () => {},
  onRefresh: onRefreshProps = async () => {},
}: MusicsInfoListProps) {
  const { styleSheet: themeStyle, colors: themeColors } =
    React.useContext(ThemeContext);

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await onRefreshProps();
    setRefreshing(false);
  }, [onRefreshProps]);

  return (
    <FlatList
      refreshing={refreshing}
      onRefresh={onRefresh}
      data={musics.filter((music) => music.id)}
      contentContainerStyle={{ paddingBottom: 200 }}
      renderItem={({ item: music }) => (
        <Pressable
          onPress={() => {
            if (music.id) {
              onPress(music.id);
            }
          }}
          key={music.id}
          style={[themeStyle.card, { padding: 10, marginBottom: 5 }]}
          onLongPress={() => {
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
      )}
      keyExtractor={(music) => music.id || ""}
    />
  );
}
