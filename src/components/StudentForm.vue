<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'add', name: string, isActive: boolean): void
}>()

const name = ref<string>('')
const isActive = ref<boolean>(true)

// 3. FELADAT: Írd meg a handleSubmit függvényt!
const handleSubmit = () => {
  if (name.value.length == 0) {
    return null
  }
  emit('add', name.value, isActive.value)
  name.value = ''
  isActive.value = true
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="bg-white p-4 mb-6 rounded-lg shadow-sm border border-gray-200">
    <div class="flex gap-4 items-end">
      <div class="flex-grow">
        <label class="block text-sm font-medium text-gray-700 mb-1">Tanuló neve</label>
        <input v-model.trim="name" type="text" placeholder="Pl. Gipsz Jakab"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div class="flex items-center h-10">
        <label class="flex items-center cursor-pointer select-none">
          <input v-model="isActive" type="checkbox"
            class="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300" />
          <span class="ml-2 text-sm text-gray-700">Aktív hallgató</span>
        </label>
      </div>

      <button type="submit"
        class="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
        Hozzáadás
      </button>
    </div>
  </form>
</template>
