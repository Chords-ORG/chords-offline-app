import { AsyncStorage } from 'react-native';

export async function setItem(item: string, value: any) {
    await AsyncStorage.setItem(item, value)
        .catch((error) => {
            throw ({ title: 'Erro', message: error })
        })
}
export async function getItem(item:string, def:any=null) {
    const value = await AsyncStorage.getItem(item)
        .catch((error) => {
            throw ({ title: 'Erro', message: error })
        })
    if(value)
        return value
    else 
        return def
}
export async function removeItem(item: string) {
    await AsyncStorage.removeItem(item)
        .catch((error) => {
            throw ({ title: 'Erro', message: error })
        })
}