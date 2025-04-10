<template>
    <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
        <div class="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
            {{ me.username.charAt(0).toUpperCase() }}
        </div>
        <div class="ml-3 flex-1">
            <p class="text-base font-medium text-gray-800 dark:text-white">{{ me.username }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">Online</p>
        </div>
        <button @click="logout" class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" title="Logout">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
        </button>
    </div>
</template>

<script setup>
import { useProfile } from '../../store/me'
import { useAuthStore } from '../../store/auth'

const auth = useAuthStore()
const { me } = useProfile()

const logout = () => {
    auth.logout()
}
</script>