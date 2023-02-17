import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setItem(item: string, value:string) {
    await AsyncStorage.setItem(item, value)
        .catch((error: Error) => {
            throw ({ title: 'Erro', message: error })
        })
}
export async function getItem(item:string, def:string|null=null) {
    const value = await AsyncStorage.getItem(item)
        .catch((error: Error) => {
            throw ({ title: 'Erro', message: error })
        })
    if(value)
        return value
    else 
        return def
}
export async function removeItem(item: string) {
    await AsyncStorage.removeItem(item)
        .catch((error: Error) => {
            throw ({ title: 'Erro', message: error })
        })
}

export async function setItemObject(item: string, value:object) {
    await AsyncStorage.setItem(item, JSON.stringify(value))
        .catch((error: Error) => {
            throw ({ title: 'Erro', message: error })
        })
}

export async function getItemObject(item:string, def:any=null) {
    const value = await AsyncStorage.getItem(item)
        .catch((error: Error) => {
            throw ({ title: 'Erro', message: error })
        })
    if(value)
        return JSON.parse(value)
    else 
        return def
}