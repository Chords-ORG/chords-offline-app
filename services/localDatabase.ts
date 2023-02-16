import { getItemObject, setItemObject } from "../functions/storage"

const getChords = async () => {
    const chords = await getItemObject('chords')
    if(chords)
        return chords
    else
        return []
}
const getChord = async (id: number) => {
    const chords = await getChords()
    return chords.find((chord: Chord) => chord.id === id)
}

const addChord = async (chord: Chord) => {
    const chords = await getChords()
    chords.push(chord)
    await setItemObject('chords', chords)
}

const updateChord = async (chord: Chord) => {
    const chords = await getChords()
    const index = chords.findIndex((item: Chord) => item.id === chord.id)
    if(index === -1)
        throw new Error('Chord not found')
    chords[index] = chord
    await setItemObject('chords', chords)
}

const deleteChord = async (id: number) => {
    const chords = await getChords()
    const index = chords.findIndex((item: Chord) => item.id === id)
    if(index === -1)
        throw new Error('Chord not found')
    chords.splice(index, 1)
    await setItemObject('chords', chords)
}

export { getChords, getChord, addChord, updateChord, deleteChord }
