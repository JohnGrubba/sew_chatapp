import { ref, computed, watch, nextTick } from 'vue'
import { apiGetChats } from '../api/chat'

// Mock data - replace with your actual data source
export const chats = ref([])

const fetchChats = async () => {
    try {
        const res = await apiGetChats()
        chats.value = res.data
        console.log(chats.value)
    }
    catch (err) {
        console.log("ChatsError", err)
    }
}


export const selectedChatIndex = ref(0)
export const newMessage = ref('')
export const messagesContainer = ref(null)

export const selectedChat = computed(() => {
    console.log("Chat Switched (load messages)")
    if (selectedChatIndex.value !== null) {
        chats.value[selectedChatIndex.value].messages = [
            { sender: 'me', text: 'Hello', time: '12:00 PM' },
        ]
        return chats.value[selectedChatIndex.value]
    }
    return null
})

export const selectChat = (index) => {
    selectedChatIndex.value = index
}

export const sendMessage = () => {
    if (!newMessage.value.trim() || !selectedChat.value) return

    const message = {
        sender: 'me',
        text: newMessage.value,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

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