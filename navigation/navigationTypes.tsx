import { Music } from "../types";

export type RootStackParamList = {
  Root: undefined;
  ChordScreen: { musicId?: string; sampleMusic?: boolean };
  WriteChordScreen: {
    music?: Music;
  };
  PreviewScreen: {
    music: Music;
  };
};
