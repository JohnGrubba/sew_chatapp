import request from './req'


export const apiGetChats = () => request('GET', '/chat')
export const apiGetMessages = (chatId) => request('GET', `/messages?chat_id=${chatId}`)
export const apiSendMessage = (chatId, message) => request('POST', `/messages`, { content: message, chat_id: chatId })
export const apiGetMembers = (chatId) => request('GET', `/chat/members?chat_id=${chatId}`)
export const apiCreateChat = (name) => request('POST', '/chat', { name: name })
export const apiAddMember = (chatId, username) => request('POST', '/chat/add_member', { chat_id: chatId, username: username })
export const apiRemoveChat = (chatId) => request('DELETE', `/chat?chat_id=${chatId}`,)