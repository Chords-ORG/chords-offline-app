export type RootStackParamList = {
  Root: undefined;
};

export type BottomTabParamList = {
  Search: undefined;
  Profile: undefined;
  Settings:undefined;
};

export type defaultDict = {
  [key: string]: string
}
export type ProfileStackParamList = {
  MyProfile:undefined;
  Login: undefined;
  Registration:undefined;
  MyLists:undefined;
  MyChords:undefined;
  WriteChord:undefined;
  PreviewScreen:{ lyric:string, chords_lines:defaultDict };
};
