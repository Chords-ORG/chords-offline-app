import React from "react";
import { View } from "react-native";
import { RootStackParamList } from "../navigation";
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
import { getMusicsInfo } from "../services/musicStorage";
import { ScrollView } from "react-native-gesture-handler";

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
      <Stack style={themeStyle.content} spacing={10} p={10}>
        <HStack>
          <Button
            color={themeStyle.button.backgroundColor}
            tintColor={themeStyle.button.color}
            title="Escrever cifra"
            onPress={() => {
              navigation.navigate("WriteChordScreen");
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
          <Stack spacing={10}>
            {musics.map((music) => {
              return (
                music.id !== undefined && (
                  <Pressable
                    onPress={() => {
                      navigation.navigate("ChordScreen", {
                        musicId: music.id as string,
                      });
                    }}
                    key={music.id}
                    style={[themeStyle.card, { padding: 10 }]}
                  >
                    <Text style={{ color: themeStyle.primary_color.color }}>
                      {music.name}
                    </Text>
                    <Text style={{ color: themeStyle.secondary_color.color }}>
                      {music.author}
                    </Text>
                  </Pressable>
                )
              );
            })}
          </Stack>
        </ScrollView>
      </Stack>
    </View>
  );
}
