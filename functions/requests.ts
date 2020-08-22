import { API_URL } from '../constants/LocalConstants'
import axios from 'axios'
import { setItem, getItem, setItemObject, getItemObject } from './storage'
import Constants from 'expo-constants';

const CACHE_LIMIT = 10;
var dict = new Map()
dict.set('password', 'Senha')
dict.set('non_field_errors', 'Erro')
dict.set('username', 'Username')
dict.set('email', 'Email')
dict.set('password1', 'Senha')
dict.set('password2', 'Senha')

const TOP_LIST_SIZE = 10

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

export async function set_profile(name: string, photo_url: string) {
    const token = await getItem('token')
    let data = { token: token, name: name, photo_url: photo_url }
    let url = `${API_URL}/profile/set/`;
    const response = await post(url, data);
    return response;
}

export async function get_top_versions() {
    let data = { list_size: TOP_LIST_SIZE }
    let url = `${API_URL}/version/top/`
    const response = await post(url, data);
    return response;
}

export async function get_top_artists() {
    let data = { list_size: TOP_LIST_SIZE }
    let url = `${API_URL}/artist/top/`
    const response = await post(url, data);
    return response;
}

export async function get_artist(artist_id: number) {
    var device_id = Constants.sessionId;
    let data = { device_id: device_id, artist_id: artist_id }
    let url = `${API_URL}/artist/get/`
    const response = await post(url, data);
    return response;
}

export async function get_artist_musics(artist_id: number) {
    let data = { artist_id: artist_id }
    let url = `${API_URL}/music/artist_musics/`
    const response = await post(url, data);
    return response;
}
export async function get_other_profile(username: string) {
    let data = { username: username }
    let url = `${API_URL}/profile/get/`
    const response = await post(url, data);
    return response;
}
export async function get_user_versions(username: string) {
    let data = { username: username }
    let url = `${API_URL}/version/get_user_versions/`
    const response = await post(url, data);
    return response;
}
export async function search_music(search: string) {
    let data = { search: search }
    let url = `${API_URL}/music/filter/`
    const response = await post(url, data);
    return response;
}
export async function get_music_versions(music_id: number) {
    let data = { music_id: music_id }
    let url = `${API_URL}/version/get_music_versions/`
    const response = await post(url, data);
    return response;
}
export async function get_lyrics(music_id: number) {
    let data = { music_id: music_id }
    let url = `${API_URL}/version/get_lyrics/`
    const response = await post(url, data);
    return response;
}
export async function get_chords_lines(version_id: number) {
    var device_id = Constants.sessionId;
    let data = { version_id: version_id, device_id: device_id }
    let url = `${API_URL}/version/get_chords/`

    var idx = -1;
    var my_versions = await getItemObject('cache@versions', []);
    for (let i = 0; i < my_versions.length; ++i)
        if (my_versions[i].id == version_id) idx = i;

    var response = await post(url, data).catch((error) => {
        if (idx != -1 && error.title == 'Erro ao se comunicar com o servidor')
            return my_versions[idx]['chords_lines'];
        throw (error);
    });

    if (idx == -1) {
        var version = { id: version_id, chords_lines: response }
        my_versions.push(version);
    }
    else{
        my_versions[idx]['chords_lines'] = response;
    }
    if (my_versions.length > CACHE_LIMIT) my_versions.shift();
    await setItemObject('cache@versions', my_versions);

    return response;
}
export async function get_version(version_id: number) {
    let data = { version_id: version_id }
    let url = `${API_URL}/version/get/`

    var idx = -1;
    var my_versions = await getItemObject('cache@versions', []);
    for (let i = 0; i < my_versions.length; ++i)
        if (my_versions[i].id == version_id) idx = i;

    var response = await post(url, data).catch((error) => {
        if (idx != -1 && error.title == 'Erro ao se comunicar com o servidor')
            return my_versions[idx];
        throw (error);
    });

    if (idx == -1) {
        response['chords_lines'] = [];
        my_versions.push(response);
    }
    else {
        response['chords_lines'] = my_versions[idx]['chords_lines'];
        my_versions[idx] = response;
    }
    if (my_versions.length > CACHE_LIMIT) my_versions.shift();
    await setItemObject('cache@versions', my_versions);

    return response;
}
export async function like_version(version_id: number) {
    const token = await getItem('token')
    let data = { version_id: version_id, token: token }
    let url = `${API_URL}/version/like/`
    const response = await post(url, data);
    return response;
}
export async function unlike_version(version_id: number) {
    const token = await getItem('token')
    let data = { version_id: version_id, token: token }
    let url = `${API_URL}/version/unlike/`
    const response = await post(url, data);
    return response;
}
export async function get_rate_version(version_id: number) {
    const token = await getItem('token')
    let data = { version_id: version_id, token: token }
    let url = `${API_URL}/version/get_rate/`
    const response = await post(url, data);
    return response;
}
export async function get_music(music_id: number) {
    let data = { music_id: music_id }
    let url = `${API_URL}/music/get/`
    const response = await post(url, data);
    return response;
}