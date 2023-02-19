import {
  getItemObjectOrDefault,
  removeItem,
  setItemObject,
  tryGetItemObject,
} from "../functions/storage";
import { Music, MusicInfo } from "../types";

const MUSICS_INFO_KEY = "musics_info";
const MUSIC_KEY_PREFIX = "music_";

const toMusicInfo = (music: Music) => {
  return {
    id: music.id,
    name: music.name,
    author: music.author,
    capo: music.capo,
    originalTone: music.originalTone,
  } as MusicInfo;
};

export const getMusicsInfo = () => {
  return getItemObjectOrDefault<MusicInfo[]>(MUSICS_INFO_KEY, []);
};

export const saveMusic = async (music: Music) => {
  music.id = music.id || crypto.randomUUID();
  const musics = await getMusicsInfo();
  const index = musics.findIndex((m) => m.id === music.id);
  if (index >= 0) musics[index] = toMusicInfo(music);
  else musics.push(toMusicInfo(music));
  await setItemObject(MUSICS_INFO_KEY, musics);
  await setItemObject(MUSIC_KEY_PREFIX + music.id, music);
};

export const getMusic = async (id: string) => {
  return tryGetItemObject<Music>(MUSIC_KEY_PREFIX + id);
};

export const deleteMusic = async (id: string) => {
  const musics = await getMusicsInfo();
  const index = musics.findIndex((m) => m.id === id);
  if (index >= 0) musics.splice(index, 1);
  await setItemObject(MUSICS_INFO_KEY, musics);
  await removeItem(MUSIC_KEY_PREFIX + id);
};
