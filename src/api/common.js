import axios from 'axios'

export const http = axios.create({
    baseURL: 'http://localhost:3000/'
    // baseURL: 'https://crmback.na4u.ru/'
})