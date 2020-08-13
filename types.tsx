export type defaultDict = {
  [key: string]: string
}

export type RootStackParamList = {
  Root: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
  Settings: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
}

export type SearchStackParamList = {
  Search: undefined;
  ChoseVersion: { music_id: string };
  ChordScreen: { chord_id: number };
  ProfileView: undefined;
  ArtistScreen: undefined;
}

export type SettingsStackParamList = {
  Settings: undefined;
}

export type ProfileStackParamList = {
  ProfileTabs: undefined;
  MyList: undefined;
  AddChord: undefined;
  ChoseVersion: undefined;
  ChoseMusic: undefined;
  WriteChord: undefined;
  PreviewScreen: undefined;
  ChordsDict: undefined;
  Login: undefined;
  Register: undefined;
  PickIcon: { name: string };
  EditProfile: undefined
};

export type ProfileTabsParamList = {
  Chords: undefined;
  Lists: undefined;
  MoreOptions: undefined;
}
