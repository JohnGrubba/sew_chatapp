<template>
    <div class="flex-1 overflow-y-auto flex flex-col">
        <div class="p-4 border-b border-gray-200 dark:border-gray-700">
            <button @click="openNewChatModal"
                class="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center justify-center">
                <span class="mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            clip-rule="evenodd" />
                    </svg>
                </span>
                New Chat
            </button>
        </div>
        <div v-for="(chat, index) in chats" :key="index" @click="selectChat(index)" :class="[
            'p-4 flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors',
            selectedChatIndex === index ? 'bg-gray-100 dark:bg-gray-700' : ''
        ]">
            <div class="relative">
                <div
                    class="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                    {{ chat.name.charAt(0).toUpperCase() }}
                </div>
                <div v-if="chat.online"
                    class="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800">
                </div>
            </div>
            <div class="ml-3 flex-1 overflow-hidden">
                <p class="text-sm font-medium text-gray-800 dark:text-white truncate">{{ chat.name }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ chat.lastMessage }}</p>
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{{ chat.time }}</div>
        </div>

        <!-- New Chat Modal -->
        <div v-if="showNewChatModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md mx-4 shadow-xl">
                <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h3 class="text-lg font-medium text-gray-900 dark:text-white">New Chat</h3>
                    <button @click="closeNewChatModal"
                        class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="p-4">
                    <div class="mb-4">
                        <input type="text" placeholder="Search users..." v-model="searchQuery"
                            class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
                    </div>
                    <div class="max-h-60 overflow-y-auto">
                        <div v-for="(user, idx) in filteredUsers" :key="idx" @click="toggleUserSelection(user)"
                            class="p-2 flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
                            <div
                                class="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                                {{ user.username.charAt(0).toUpperCase() }}
                            </div>
                            <div class="ml-3">
                                <p class="text-sm font-medium text-gray-800 dark:text-white">{{ user.username }}</p>
                            </div>
                            <div class="ml-auto">
                                <div v-if="selectedUsers.includes(user.username)"
                                    class="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white"
                                        viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-4 flex justify-end">
                        <button @click="closeNewChatModal"
                            class="px-4 py-2 mr-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                            Cancel
                        </button>
                        <button @click="createNewChat"
                            class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
                            :disabled="selectedUsers.length === 0">
                            Start Chat
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { selectChat, chats, selectedChatIndex, addNewChat } from '../../store/chat'
import { apiGetUserList } from '../../api/user'
import { apiCreateChat, apiAddMember } from '../../api/chat'

// Modal state
const showNewChatModal = ref(false)
const searchQuery = ref('')
const selectedUsers = ref([])
const users = ref([])

// Sample users (replace with actual user data from API)
apiGetUserList().then((apiusers) => {
    console.log(apiusers.data)
    users.value = apiusers.data
})


const filteredUsers = computed(() => {
    if (!searchQuery.value) return users.value
    return users.value.filter(user =>
        user.username.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
})

function openNewChatModal() {
    showNewChatModal.value = true
    searchQuery.value = ''
    selectedUsers.value = []
}

function closeNewChatModal() {
    showNewChatModal.value = false
}

function toggleUserSelection(user) {
    const index = selectedUsers.value.indexOf(user.username)
    if (index === -1) {
        selectedUsers.value.push(user.username)
    } else {
        selectedUsers.value.splice(index, 1)
    }
}

async function createNewChat() {
    if (selectedUsers.value.length > 0) {
        const chatUsers = users.value.filter(user => selectedUsers.value.includes(user.username))

        // Create a new chat with the selected users
        const newChatName = chatUsers.length === 1
            ? chatUsers[0].username
            : `${chatUsers[0].username} and ${chatUsers.length - 1} others`

        const chat = await apiCreateChat(newChatName)
        console.log(chat.data.id)

        chatUsers.forEach(user => {
            apiAddMember(chat.data.id, user.username)
        })

        closeNewChatModal()
    }
}
</script>