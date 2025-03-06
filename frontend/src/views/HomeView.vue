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
            <ChatHeader />
            <Messages />
            <MessageInput />
        </div>
    </div>
</template>

<script setup>
import UserProfile from '../components/chat/UserProfile.vue'
import SearchBar from '../components/chat/SearchBar.vue'
import ConversationList from '../components/chat/ConversationList.vue'
import ChatHeader from '../components/chat/ChatHeader.vue'
import Messages from '../components/chat/Messages.vue'
import MessageInput from '../components/chat/MessageInput.vue'
</script>