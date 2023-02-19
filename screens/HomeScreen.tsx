import React from "react";
import { View } from "react-native";
import { RootStackParamList } from "../navigation";
import { StackScreenProps } from "@react-navigation/stack";
import { Button, Divider, Stack } from "@react-native-material/core";
import { Header } from "../components/Header";
import { ThemeContext } from "../providers/ThemeProvider";
import { MusicInfo } from "../types";
import { getMusicsInfo } from "../services/musicStorage";

export default function HomeScreen({
  navigation,
}: StackScreenProps<RootStackParamList>) {
  const { styleSheet: themeStyle } = React.useContext(ThemeContext);
  const [musics, setMusics] = React.useState<MusicInfo[]>([]);

  const fetchMusics = async () => {
    const musicsInfos = await getMusicsInfo();
    setMusics(musicsInfos);
    console.log(musicsInfos);
  };

  React.useEffect(() => {
    fetchMusics();
  }, []);

  return (
    <View>
      <Header showBackButton={false} />
      <View style={[themeStyle.content, { padding: 10 }]}>
        <Button
          title="Cifra de exemplo"
          color={themeStyle.button.backgroundColor}
          tintColor={themeStyle.button.color}
          onPress={() => {
            navigation.navigate("ChordScreen", { chord_id: 1 });
          }}
        />

        <Divider style={{ marginVertical: 20 }} leadingInset={16} />

        <Button
          color={themeStyle.button.backgroundColor}
          tintColor={themeStyle.button.color}
          title="Escrever cifra"
          onPress={() => {
            navigation.navigate("WriteChordScreen");
          }}
        />
        <Stack>
          {musics.map((music) => {
            return (
              <Button
                key={music.id}
                title={music.name}
                color={themeStyle.button.backgroundColor}
                tintColor={themeStyle.button.color}
              />
            );
          })}
        </Stack>
      </View>
    </View>
  );
}
