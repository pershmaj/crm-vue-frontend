import axios from 'axios'

export const http = axios.create({
    baseURL: 'http://localhost:3000/'
    // baseURL: 'https://djangoapp.na4u.ru/api/v1/'
})