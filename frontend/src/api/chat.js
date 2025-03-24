import request from './req'


export const apiGetChats = () => request('GET', '/chat')
export const apiGetMessages = (chatId) => request('GET', `/messages?chat_id=${chatId}`)
export const apiSendMessage = (chatId, message) => request('POST', `/messages`, { content: message, chat_id: chatId })