import request from './req'


export const apiGetChats = () => request('GET', '/chat')