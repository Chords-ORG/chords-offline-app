export const noteDict: Record<string, number> = {
  C: 0,
  Db: 1,
  "C#": 1,
  D: 2,
  Eb: 3,
  "D#": 3,
  E: 4,
  "E#": 5,
  Fb: 5,
  F: 5,
  "F#": 6,
  Gb: 6,
  G: 7,
  "G#": 8,
  Ab: 8,
  A: 9,
  "A#": 10,
  Bb: 10,
  B: 11,
  Cb: 11,
  "B#": 0,
};

export const sharpDict: Record<number, string> = {
  0: "C",
  1: "C#",
  2: "D",
  3: "D#",
  4: "E",
  5: "F",
  6: "F#",
  7: "G",
  8: "G#",
  9: "A",
  10: "A#",
  11: "B",
};

export const bemolDict: Record<number, string> = {
  0: "C",
  1: "Db",
  2: "D",
  3: "Eb",
  4: "E",
  5: "F",
  6: "Gb",
  7: "G",
  8: "Ab",
  9: "A",
  10: "Bb",
  11: "B",
};

export class Note {
  base: number;
  complement: string;
  valid: boolean;
  rawString: string;
  minor: boolean = false;
  constructor(note: string) {
    this.rawString = note;
    const iterator = note[Symbol.iterator]();
    this.complement = "";
    let current = iterator.next();
    if (current.value === undefined) {
      this.base = 0;
      this.valid = false;
      return;
    }
    let base = current.value;
    current = iterator.next();
    if (!current.done && (current.value === "#" || current.value === "b")) {
      base += current.value;
      current = iterator.next();
    }
    if (!current.done && current.value === "m") {
      this.minor = true;
    }
    this.base = noteDict[base];
    this.complement = note.substring(base.length) || "";

    // TODO: add regex validation
    this.valid = this.base !== undefined;
  }
  public toString = (
    chordType: string,
    includeComplement: boolean = true
  ): string => {
    if (!this.valid) return this.rawString;
    let baseNote =
      chordType === "bemol" ? bemolDict[this.base] : sharpDict[this.base];
    if (this.minor) baseNote += "m";
    return baseNote + (includeComplement ? this.complement : "");
  };

  public add(n: number) {
    if (n < 0) n = (11 * -n) % 12;
    this.base = (this.base + n) % 12;
  }
}

export class Chord {
  base: Note;
  inversion?: Note;
  valid: boolean;
  rawString: string;
  constructor(note: string) {
    this.rawString = note;
    const [base, inversion] = note.split("/");
    this.base = new Note(base);
    if (inversion) this.inversion = new Note(inversion);
    this.valid =
      this.base.valid && (this.inversion === undefined || this.inversion.valid);
  }
  public toString = (): string => {
    return this.rawString;
  };

  public toSharp = (): string => {
    if (!this.valid) return this.rawString;
    let res = `${sharpDict[this.base.base]}${this.base.complement}`;
    if (this.inversion)
      res += `/${sharpDict[this.inversion.base]}${this.inversion.complement}`;
    return res.replace("\\", "/");
  };

  public toBemol = (): string => {
    if (!this.valid) return this.rawString;
    let res = `${bemolDict[this.base.base]}${this.base.complement}`;
    if (this.inversion)
      res += `/${bemolDict[this.inversion.base]}${this.inversion.complement}`;
    return res.replace("\\", "/");
  };

  public add(n: number) {
    this.base.add(n);
    if (this.inversion) this.inversion.add(n);
  }

  public static toChord = (tone: string, chordType: string) => {
    return chordType === "sharp"
      ? new Chord(tone).toSharp()
      : new Chord(tone).toBemol();
  };

  public static getChordNumber = (note: string) => {
    const chord = new Chord(note);
    return chord.base.base;
  };
}

export const addSemiTonesToChordLine = (
  chordsLine: string,
  value: number,
  dict: string = "sharp"
): string => {
  let delta = 0;
  let spaces = 0;
  let i = 0;
  const n = chordsLine.length;
  let ans = "";
  while (i < n) {
    if (chordsLine[i] == " ") {
      spaces += 1;
      ++i;
    } else {
      let note = "";
      while (i < n && chordsLine[i] != " ") {
        note += chordsLine[i];
        ++i;
      }
      let chord = new Chord(note);
      chord.add(value);
      let new_note = dict == "bemol" ? chord.toBemol() : chord.toSharp();
      spaces = Math.max(1, spaces + delta);
      while (spaces--) ans += " ";
      ans += new_note;
      spaces = 0;
      delta = note.length - new_note.length;
    }
  }
  return ans;
};
