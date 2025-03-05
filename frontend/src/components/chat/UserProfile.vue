<template>
    <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
        <div class="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
            {{ me.username.charAt(0).toUpperCase() }}
        </div>
        <div class="ml-3 flex-1">
            <p class="text-base font-medium text-gray-800 dark:text-white">{{ me.username }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">Online</p>
        </div>
        <button class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
        </button>
    </div>
</template>

<script setup>
import { useProfile } from '../../store/me'

const { me } = useProfile()
</script>