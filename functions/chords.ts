import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import { ChordLineType } from '../types'
import { getItemObject, setItemObject } from '../functions/storage'
var note_dict = new Map()
var sharp_dict = new Map()
var bemol_dict = new Map()

// Setting note_dict
note_dict.set('C', 0)
note_dict.set('Db', 1)
note_dict.set('C#', 1)
note_dict.set('D', 2)
note_dict.set('Eb', 3)
note_dict.set('D#', 3)
note_dict.set('E', 4)
note_dict.set('E#', 5)
note_dict.set('Fb', 5)
note_dict.set('F', 5)
note_dict.set('F#', 6)
note_dict.set('Gb', 6)
note_dict.set('G', 7)
note_dict.set('G#', 8)
note_dict.set('Ab', 8)
note_dict.set('A', 9)
note_dict.set('A#', 10)
note_dict.set('Bb', 10)
note_dict.set('B', 11)
note_dict.set('Cb', 11)
note_dict.set('B#', 0)

// Setting sharp dict
sharp_dict.set(0, 'C')
sharp_dict.set(1, 'C#')
sharp_dict.set(2, 'D')
sharp_dict.set(3, 'D#')
sharp_dict.set(4, 'E')
sharp_dict.set(5, 'F')
sharp_dict.set(6, 'F#')
sharp_dict.set(7, 'G')
sharp_dict.set(8, 'G#')
sharp_dict.set(9, 'A')
sharp_dict.set(10, 'A#')
sharp_dict.set(11, 'B')

// Setting bemol dict
bemol_dict.set(0, 'C')
bemol_dict.set(1, 'Db')
bemol_dict.set(2, 'D')
bemol_dict.set(3, 'Eb')
bemol_dict.set(4, 'E')
bemol_dict.set(5, 'F')
bemol_dict.set(6, 'Gb')
bemol_dict.set(7, 'G')
bemol_dict.set(8, 'Ab')
bemol_dict.set(9, 'A')
bemol_dict.set(10, 'Bb')
bemol_dict.set(11, 'B')

class Note {
    base: number;
    complement: string;
    constructor(note: string) {
        let base = note[0]
        if (note.length > 1 && (note[1] == '#' || note[1] == 'b'))
            base += note[1]
        this.base = note_dict.get(base)
        this.complement = note.substring(base.length) || ''
    }
    public toString = (): string => {
        return `Base: ${this.base} - Complement:${this.complement}`;
    }
    public add(n: number) {
        if (n < 0)
            n = (11 * (-n)) % 12;
        this.base = (this.base + n) % 12;
    }
}

export class Chord {
    base: Note;
    inversion: any;
    constructor(note: string) {
        var [base, inversion] = note.split('/')
        this.base = new Note(base)
        if (inversion)
            this.inversion = new Note(inversion)
    }
    public toString = (): string => {
        if (this.inversion)
            return `Base:\n${this.base.toString()}\nInversion:\n${this.inversion.toString()}`;
        else
            return `Base:\n${this.base.toString()}`;
    }

    public toSharp = (): string => {
        var res = `${sharp_dict.get(this.base.base)}${this.base.complement}`
        if (this.inversion)
            res += `/${sharp_dict.get(this.inversion.base)}${this.inversion.complement}`
        return res.replace('\\' ,'/');
    }

    public toBemol = (): string => {
        var res = `${bemol_dict.get(this.base.base)}${this.base.complement}`
        if (this.inversion)
            res += `/${bemol_dict.get(this.inversion.base)}${this.inversion.complement}`
        return res.replace('\\' ,'/');
    }
    public add(n: number) {
        this.base.add(n)
        if (this.inversion)
            this.inversion.add(n)
    }
    public static toChord = (tone: string, chordType: string) => {
        return chordType === "sharp"
          ? new Chord(tone).toSharp()
          : new Chord(tone).toBemol();
      }; 
}

export const addToChordLine = (chords_line: string, value: number, dict: string = 'sharp'): string => {
    var delta = 0
    var spaces = 0
    var i = 0
    var n = chords_line.length
    var ans = ''
    while (i < n) {
        if (chords_line[i] == ' ') {
            spaces += 1;
            ++i;
        }
        else {
            var note = '';
            while (i < n && chords_line[i] != ' ') {
                note += chords_line[i];
                ++i;
            }
            var chord = new Chord(note);
            chord.add(value);
            var new_note = dict == 'bemol' ? chord.toBemol() : chord.toSharp();
            spaces = Math.max(1, spaces + delta);
            while (spaces--) ans += ' ';
            ans += new_note;
            spaces = 0;
            delta = note.length - new_note.length
        }
    }
    return ans
}

export const addToChordLines = (chords_lines: any, value: number, dict: string = 'sharp') => {
    var ans = chords_lines;
    for (let i = 0; i < chords_lines.length; ++i) {
        ans[i].chords_line = addToChordLine(ans[i].chords_line, value, dict);
    }
    return ans
}

export const numberToNote = (value: number, dict: string = 'sharp'): string => {
    return dict == 'bemol' ? bemol_dict.get(value) : sharp_dict.get(value);
}
export const noteToNumber = (note: string): number => {
    var chord = new Chord(note)
    return chord.base.base;
}

export function get_positions(chord_name: string) {
    return chord_pos;
}
export function LoadChords(chords_lines: ChordLineType[]) {
    var chord_positions = new Set<string>()
        for (let i = 0; i < chords_lines.length; i++) {
        var chords = chords_lines[i].chords_line.split(' ')
        for (let j = 0; j < chords.length; ++j) {
            if (chords[j] == '') continue;
            let chord_name = chords[j]
            chord_positions.add(chord_name);
        }
    }
    return chord_positions;
}

const chord_pos = {
    start_house: 0,
    fingers: [
        {
            house: 1,
            string: 2,
            size: 1
        },
        {
            house: 3,
            string: 4,
            size: 1
        },
        {
            house: 4,
            string: 5,
            size: 1
        },
        {
            house: 0,
            string: 0,
            size: 1
        },
        {
            house: 0,
            string: 0,
            size: 1
        },
    ],
    strings: ['normal', 'normal', 'normal', 'normal', 'bass', 'none']
}