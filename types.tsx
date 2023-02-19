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
}

export type MusicInfo = {
  id?: string;
  author: string;
  name: string;
  originalTone: string;
  capo: number;
}