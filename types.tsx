export type defaultDict = {
  [key: string]: string
}

export type RootStackParamList = {
  Root: undefined;
};

export type BottomTabParamList = {
  Home:undefined;
  Search: undefined;
  Profile: undefined;
  Settings:undefined;
};

export type HomeStackParamList = {
  Home:undefined;
}

export type SearchStackParamList = {
  Search:undefined;
  ChoseVersion:undefined;
  ChordScreen:undefined;
}

export type SettingsStackParamList = {
  Settings:undefined;
}

export type ProfileStackParamList = {
  ProfileTabs:undefined;
  MyList:undefined;
  AddChord:undefined;
  ChoseVersion:undefined;
  ChoseMusic:undefined;
  WriteChord:undefined;
  PreviewScreen:undefined;
  ChordsDict:undefined;
  Login:undefined;
  Register:undefined;
  PickIcon:undefined;
};

export type ProfileTabsParamList = {
  Chords:undefined;
  Lists:undefined;
  MoreOptions:undefined;
}
