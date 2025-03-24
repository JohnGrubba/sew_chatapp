import { ref, computed, watch, nextTick } from 'vue'
import { computedAsync } from '@vueuse/core'
import { apiGetChats, apiGetMessages, apiSendMessage } from '../api/chat'
import { useProfile } from './me'

// Mock data - replace with your actual data source
export const chats = ref([])

function dateFormatter(date) {
    return date.toLocaleDateString(navigator.language, { hour: '2-digit', minute: '2-digit' })
}

const fetchChats = async () => {
    try {
        const res = await apiGetChats()
        chats.value = res.data
    }
    catch (err) {
        console.log("ChatsError", err)
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

export const selectedChatIndex = ref(0)
export const newMessage = ref('')
export const messagesContainer = ref(null)

export const selectedChat = computedAsync(async () => {
    console.log("Chat Switched (load messages)")
    selectedChatIndex.value = selectedChatIndex.value || chats.value[0].id
    console.log("Selected Chat Index", selectedChatIndex.value)

    if (selectedChatIndex.value !== null) {
        const res = await fetchMessages(chats.value[selectedChatIndex.value].id)
        console.log(res)
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

    const message = {
        sender: 'me',
        text: newMessage.value,
        time: dateFormatter(new Date())
    }

    await apiSendMessage(selectedChat.value.id, newMessage.value)

    selectedChat.value.messages.push(message)
    selectedChat.value.lastMessage = `You: ${newMessage.value}`
    selectedChat.value.time = message.time

    newMessage.value = ''

    // Scroll to bottom of messages
    nextTick(() => {
        if (messagesContainer.value) {
            messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
        }
    })
}

// Auto scroll to bottom when messages change
watch(() => selectedChatIndex.value, () => {
    nextTick(() => {
        if (messagesContainer.value) {
            messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
        }
    })
})

fetchChats()