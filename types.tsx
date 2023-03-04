export type ChordLineType = {
  chordsLine: string;
  musicLine: string;
};

export type Music = {
  id?: string;
  lyricsWithChords: string;
  author: string;
  name: string;
  originalTone: string;
  capo: number;
};

export const emptyMusic: Music = {
  lyricsWithChords: "",
  author: "",
  name: "",
  originalTone: "C",
  capo: 0,
};

export type MusicInfo = {
  id?: string;
  author: string;
  name: string;
  originalTone: string;
  capo: number;
};
