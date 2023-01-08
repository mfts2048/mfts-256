import axios from 'axios'

const request = axios.create({
    baseURL: 'http://111.231.55.202:3000/'
})

type RequestBody = Record<string, any>

export const articleFindAll = (data: RequestBody) => {
    return request({
        url: '/articles/findAll',
        method: 'POST',
        data
    })
}

export const articleDelete = (data: RequestBody) => {
    return request({
        url: '/articles/delete',
        method: 'POST',
        data
    })
}

export const articleUpdate = (data: RequestBody) => {
    return request({
        url: '/articles/update',
        method: 'POST',
        data
    })
}
