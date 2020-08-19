export type defaultDict = {
  [key: string]: string
}

export type RootStackParamList = {
  Root: undefined;
  ChordScreen: { chord_id: number },
  ProfileScreen: { username: string },
  ArtistScreen: { artist_id: number },
  VersionStack: undefined,
};

export type VersionStackParamList = {
  FindMusic: undefined;
  WriteChords: { version_id: number };
  PreviewVersion: undefined;
}

export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
  Settings: undefined;
};

export type SpinnerPropsType = {
  visible: boolean;
}
export type UserType = {
  username: string,
  email?: string,
  is_staff?: boolean,
  is_superuser?: boolean,
}
export type ProfileType = {
  name: string,
  photo_url: string,
  user: UserType,
}
export type ArtistType = {
  id: number,
  name: string,
  total_visits: number,
  season_visits: number,
}
export type MusicType = {
  artist: ArtistType,
  id: number,
  name: string,
}
export type VersionType = {
  name: string,
  id: number,
  likes: number,
  unlikes: number,
  season_visits: number,
  total_visits: number,
  view_mode: string,
  author: ProfileType,
  music: MusicType

}
export type MusicLineType = {
  //id:number,
  line: string
}
export type ChordLineType = {
  //id:number
  chords_line: string,
  music_line: MusicLineType,
}

export type GuitarFinger = {
  house: number,
  string: number,
  size: number,
}
export type GuitarChordPosition = {
  start_house: number,
  fingers: GuitarFinger[],
  strings: string[],
}

export type GuitarChordPropsType = {
  Capo: number,
  ChordName: string,
}
export type CapoDialogPropsType = {
  visible: boolean;
  closeDialog: () => void;
  selected_capo: number;
  tone: string;
  onSelect: (value: number, delta: number) => void;
}
export type HomeStackParamList = {
  Home: undefined;
}

export type SearchStackParamList = {
  Search: undefined;
  ChoseVersion: { music_id: number };
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
