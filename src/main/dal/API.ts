import axios from "axios"


export const API = {
    getJoke() {
        return axios.get<ResponseType>('https://api.chucknorris.io/jokes/random')
    }
}

type ResponseType = {
    categories: string[]
    created_at: string
    icon_url: string
    id: string
    updated_at: string
    url: string
    value: string
}
