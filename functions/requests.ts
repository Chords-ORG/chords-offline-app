import { API_URL } from '../constants/LocalConstants'
import axios from 'axios'
import { setItem, getItem } from './storage'
var dict = new Map()
dict.set('password', 'Senha')
dict.set('non_field_errors', 'Erro')
dict.set('username', 'Username')
dict.set('email', 'Email')
dict.set('password1', 'Senha')
dict.set('password2', 'Senha')


function translate(word: string) {
    if (dict.has(word))
        return dict.get(word)
    else return word
}

async function post(url: string, data: any) {
    var response = await axios.post(url, data, { timeout: 20000 })
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

export async function register(username: string, email: string, password1: string, password2: string) {
    let data = { username: username, email: email, password1: password1, password2: password2 }
    let url = `${API_URL}/rest_auth/registration/`
    const response = await post(url, data);
    await setItem('token', response.token);
    return response;
}

export async function get_profile() {
    const token = await getItem('token')
    let data = { token: token }
    let url = `${API_URL}/profile/set/`
    const response = await post(url, data)
    return response;
}

export async function set_profile(name:string, photo_url:string){
    const token = await getItem('token')
    let data = { token: token, name: name, photo_url: photo_url }
    let url = `${API_URL}/profile/set/`;
    const response = await post(url, data);
    return response;
}