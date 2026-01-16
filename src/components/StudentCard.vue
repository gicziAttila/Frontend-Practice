<script setup lang="ts">
import type { Student } from '../classes/Student'
defineProps<{
  student: Student
}>()
const emit = defineEmits<{
  (e: 'delete', id: number): void
}>()
</script>
<template>
  <RouterLink :to="'/student/' + student.id + '?active=' + student.isActive">
    <div
      class="flex justify-between items-center bg-white p-4 mb-3 border border-gray-200 rounded-lg shadow-sm hover: shadow-md transition-shadow"
      :class="{ 'opacity-60 bg-gray-50': !student.isActive }">
      <div>
        <h3 class="text-lg font-semibold text-gray-800">{{ student.name }}</h3>
        <span v-if="student.isActive"
          class="inline-block px-2 py-1 mt-1 text-xs font-medium text-white bg-green-500 rounded">Aktív</span>
        <span v-else
          class="inline-block px-2 py-1 mt-1 text-xs font-medium text-white bg-red-500 rounded">Inaktív</span>
      </div>
      <button @click="emit('delete', student.id)"
        class="px-3 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition-colors">
        Törlés
      </button>
    </div>
  </RouterLink>
</template>
