<template>
    <div class="flex h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
        <!-- Sidebar -->
        <div class="w-1/4 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
            <UserProfile />
            <SearchBar />
            <ConversationList />
        </div>

        <!-- Main chat area -->
        <div class="flex-1 flex flex-col">
            <!-- Chat header -->
            <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center bg-white dark:bg-gray-800">
                <div v-if="selectedChat" class="flex items-center flex-1">
                    <div class="relative">
                        <div
                            class="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                            {{ selectedChat.name.charAt(0).toUpperCase() }}
                        </div>
                        <div v-if="selectedChat.online"
                            class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white dark:border-gray-800">
                        </div>
                    </div>
                    <div class="ml-3">
                        <p class="text-base font-medium text-gray-800 dark:text-white">{{ selectedChat.name }}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                            {{ selectedChat.online ? 'Online' : 'Offline' }}
                        </p>
                    </div>
                </div>
                <div class="flex">
                    <button class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                    </button>
                    <button class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    </button>
                    <button class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Messages area -->
            <div class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900" ref="messagesContainer">
                <template v-if="selectedChat">
                    <div v-for="(message, index) in selectedChat.messages" :key="index" :class="[
                        'flex',
                        message.sender === 'me' ? 'justify-end' : 'justify-start'
                    ]">
                        <div :class="[
                            'max-w-[70%] rounded-lg p-3 shadow-sm',
                            message.sender === 'me'
                                ? 'bg-indigo-500 text-white rounded-br-none'
                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-bl-none'
                        ]">
                            <p>{{ message.text }}</p>
                            <p class="text-xs mt-1 opacity-70 text-right">{{ message.time }}</p>
                        </div>
                    </div>
                </template>
                <div v-else class="h-full flex items-center justify-center">
                    <p class="text-gray-500 dark:text-gray-400">Select a conversation to start chatting</p>
                </div>
            </div>

            <!-- Message input -->
            <div class="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <div class="flex items-center">
                    <button class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                    </button>
                    <input v-model="newMessage" type="text" placeholder="Type your message..."
                        class="flex-1 py-2 px-4 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        @keyup.enter="sendMessage" />
                    <button @click="sendMessage"
                        class="ml-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import UserProfile from '../components/chat/UserProfile.vue'
import SearchBar from '../components/chat/SearchBar.vue'
import ConversationList from '../components/chat/ConversationList.vue'
import { useChatStore } from '../store/chat'

const { chats, selectedChatIndex, selectedChat, newMessage, selectChat, sendMessage } = useChatStore()
</script>