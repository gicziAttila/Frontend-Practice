<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div class="min-h-screen bg-gray-100 font-sans">

        <nav class="bg-white shadow-sm border-b border-gray-200">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex items-center">
                        <span class="text-xl font-bold text-blue-600 mr-8">DiákApp</span>

                        <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <RouterLink to="/"
                                class="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-blue-500 text-sm font-medium"
                                active-class="border-blue-500">
                                Diákok
                            </RouterLink>

                            <RouterLink to="/about"
                                class="text-gray-500 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-blue-500 text-sm font-medium"
                                active-class="border-blue-500">
                                Rólunk
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <main class="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
            <RouterView />
        </main>

    </div>
</template>