import React from "react";
import { Alert, View } from "react-native";
import { RootStackParamList } from "../navigation/navigationTypes";
import { StackScreenProps } from "@react-navigation/stack";
import {
  Box,
  Button,
  Divider,
  HStack,
  Spacer,
  Stack,
  Text,
  Pressable,
} from "@react-native-material/core";
import { Header } from "../components/Header";
import { ThemeContext } from "../providers/ThemeProvider";
import { MusicInfo } from "../types";
import { deleteMusic, getMusicsInfo } from "../services/musicStorage";
import { ScrollView } from "react-native-gesture-handler";
import MusicsList from "../components/MusicsInfoList";

export default function HomeScreen({
  navigation,
}: StackScreenProps<RootStackParamList>) {
  const { styleSheet: themeStyle } = React.useContext(ThemeContext);
  const [musics, setMusics] = React.useState<MusicInfo[]>([]);

  const fetchMusics = async () => {
    const musicsInfos = await getMusicsInfo();
    setMusics(musicsInfos);
  };

  const onDeleteMusic = (musicId: string) => {
    deleteMusic(musicId)
      .then(() => {
        fetchMusics();
      })
      .catch((err) => {
        Alert.alert("Erro", "Não foi possível deletar a cifra");
      });
  };

  React.useEffect(() => {
    fetchMusics();
  }, []);

  return (
    <View>
      <Header showBackButton={false} />
      <Stack style={themeStyle.content} spacing={10} p={10}>
        <HStack>
          <Button
            color={themeStyle.button.backgroundColor}
            tintColor={themeStyle.button.color}
            title="Escrever cifra"
            onPress={() => {
              navigation.navigate("WriteChordScreen", { music: undefined });
            }}
          />
          <Spacer />
          <Button
            title="Cifra de exemplo"
            color={themeStyle.button.backgroundColor}
            tintColor={themeStyle.button.color}
            onPress={() => {
              navigation.navigate("ChordScreen", { sampleMusic: true });
            }}
          />
        </HStack>
        <Text style={{ color: themeStyle.primary_color.color }}>
          Suas cifras
        </Text>
        <Divider
          leadingInset={10}
          trailingInset={10}
          color={themeStyle.divider.color}
        />

        <ScrollView>
          <MusicsList
            musics={musics}
            onPress={(musicId) => {
              navigation.navigate("ChordScreen", {
                musicId: musicId,
              });
            }}
            onDelete={onDeleteMusic}
          />
        </ScrollView>
      </Stack>
    </View>
  );
}
