import { API_URL } from '../constants/LocalConstants'
import axios from 'axios'
import { setItem, getItem } from './storage'
var dict = new Map()
dict.set('password', 'Senha')
dict.set('non_field_errors', 'Erro')

function translate(word: string) {
    if (dict.has(word))
        return dict.get(word)
    else return word
}

async function post(url: string, data: any) {
    var response = await axios.post(url, data)
        .catch((error) => {
            if (error.response) {
                console.log('error data', error.response.data)
                var response_data = error.response.data
                var key = Object.keys(response_data)[0]
                throw ({ title: translate(key), message: translate(response_data[key][0]) })
            }
            else {
                console.log('error', error)
                throw ({ title: 'Erro ao se comunicar com o servidor', message: 'Verifique sua conexão com a internet' })
            }
        })
    return response.data
}
export async function login(username: string, password: string) {
    let data = { username: username, password: password }
    let url = `${API_URL}/rest_auth/login/`
    const response = await post(url, data)
    await setItem('token', response.token)
    return response;
}

export async function get_profile(){
    console.log('get_profile')
    const token = await getItem('token')
    let data = {token:token}
    let url = `${API_URL}/profile/set/`
    const response = await post(url, data)
    return response;
}