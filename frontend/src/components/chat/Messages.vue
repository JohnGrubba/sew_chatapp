<template>
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
</template>

<script setup>
import { selectedChat } from '../../store/chat'
</script>