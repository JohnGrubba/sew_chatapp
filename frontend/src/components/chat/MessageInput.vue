<template>
    <div class="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center">
            <!-- File input is hidden but can be triggered via the button -->
            <input 
                type="file" 
                ref="fileInput" 
                class="hidden" 
                @change="handleFileSelected"
            />
            <!-- Attachment button now triggers file selection -->
            <button 
                @click="triggerFileSelect"
                class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mr-2"
            >
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
</template>

<script setup>
import { ref } from 'vue';
import { sendMessage, newMessage, sendFile } from '../../store/chat'

// Reference to the file input element
const fileInput = ref(null);

// Function to trigger file selection dialog
const triggerFileSelect = () => {
    fileInput.value.click();
};

// Function to handle the selected file and send it
const handleFileSelected = (event) => {
    const file = event.target.files[0];
    if (file) {
        sendFile(file);
        // Reset file input to allow selecting the same file again
        event.target.value = '';
    }
};
</script>