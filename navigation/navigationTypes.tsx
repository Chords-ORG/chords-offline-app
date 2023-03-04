import { Music } from "../types";

export type RootStackParamList = {
  Root: undefined;
  ChordScreen: { musicId?: string; sampleMusic?: boolean };
  WriteChordScreen: {
    musicId?: string;
  };
  PreviewScreen: {
    music: Music;
  };
};
