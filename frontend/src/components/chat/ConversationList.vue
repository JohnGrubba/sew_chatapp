<template>
    <div class="flex-1 overflow-y-auto">
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
    </div>
</template>

<script setup>
import { selectChat, chats, selectedChatIndex } from '../../store/chat'
</script>