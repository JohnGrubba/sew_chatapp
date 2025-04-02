import { ref, watch, nextTick } from 'vue'
import { computedAsync } from '@vueuse/core'
import { apiGetChats, apiGetMembers, apiGetMessages, apiSendMessage } from '../api/chat'

// Mock data - replace with your actual data source
export const chats = ref([])

function dateFormatter(date) {
    return date.toLocaleDateString(navigator.language, { hour: '2-digit', minute: '2-digit' })
}

export const fetchChats = async () => {
    try {
        const res = await apiGetChats()
        chats.value = res.data
    }
    catch (err) {
        console.log("ChatsError", err)
    }
}

const fetchMembers = async (chatId) => {
    try {
        const res = await apiGetMembers(chatId)
        return res.data
    }
    catch (err) {
        console.log("MembersError", err)
    }
}

const fetchMessages = async (chatId) => {
    try {
        console.log("Fetching messages for chat", chatId)
        const res = await apiGetMessages(chatId)
        return res.data
    }
    catch (err) {
        console.log("MessagesError", err)
    }
}

export const selectedChatIndex = ref(null)
export const newMessage = ref('')
export const messagesContainer = ref(null)

export const selectedChat = computedAsync(async () => {
    console.log("Chat Switched (load messages)")
    if (selectedChatIndex.value !== null) {
        const res = await fetchMessages(chats.value[selectedChatIndex.value].id)
        console.log("Messages:", res)
        const members = await fetchMembers(chats.value[selectedChatIndex.value].id)
        console.log("Members:", members)
        chats.value[selectedChatIndex.value].members = members
        chats.value[selectedChatIndex.value].messages = res.map((message) => {
            return {
                sender: message.sender,
                text: message.content,
                time: dateFormatter(new Date(message.sent_at))
            }
        })
        return chats.value[selectedChatIndex.value]
    }
    return null
})

export const selectChat = (index) => {
    selectedChatIndex.value = index
}

export const sendMessage = async () => {
    if (!newMessage.value.trim() || !selectedChat.value) return

    const sent = await apiSendMessage(selectedChat.value.id, newMessage.value)

    const message = {
        sender: 'me',
        text: newMessage.value,
        time: dateFormatter(new Date(sent.data.sent_at))
    }

    selectedChat.value.messages.push(message)
    selectedChat.value.lastMessage = `You: ${newMessage.value}`
    selectedChat.value.time = new Date(sent.data.sent_at).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })

    newMessage.value = ''

    // Scroll to bottom of messages
    nextTick(() => {
        if (messagesContainer.value) {
            messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
        }
    })
}

// Add this function to your existing chat store
export function addNewChat(chat) {
    chats.value.unshift(chat) // Add new chat to the beginning of the list
    selectChat(0) // Select the newly created chat
}

// Auto scroll to bottom when messages change
watch(() => selectedChatIndex.value, () => {
    nextTick(() => {
        if (messagesContainer.value) {
            messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
        }
    })
})
