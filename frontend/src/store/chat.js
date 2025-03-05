import { defineStore } from 'pinia'
import { ref, computed, watch, nextTick } from 'vue'

export const useChatStore = () => {
    // Mock data - replace with your actual data source
    const chats = ref([
        {
            name: 'Alehandras Sholz',
            lastMessage: 'Dere',
            time: '12:30',
            online: true,
            messages: [
                { sender: 'other', text: 'Dere', time: '12: 30' },
                { sender: 'me', text: "Servus", time: '12: 31' }
            ]
        },
        {
            name: 'Yeyo Yayiya',
            lastMessage: 'Nonamiga',
            time: '12:30',
            online: true,
            messages: [
                { sender: 'other', text: 'Nenonayoyas', time: '12: 30' },
                { sender: 'me', text: "Senonasonas", time: '12: 31' }
            ]
        },
    ])

    const selectedChatIndex = ref(0)
    const newMessage = ref('')
    const messagesContainer = ref(null)

    const selectedChat = computed(() => {
        return selectedChatIndex.value !== null ? chats.value[selectedChatIndex.value] : null
    })

    const selectChat = (index) => {
        selectedChatIndex.value = index
    }

    const sendMessage = () => {
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

    return {
        chats,
        selectedChatIndex,
        newMessage,
        messagesContainer,
        selectedChat,
        selectChat,
        sendMessage
    }
}