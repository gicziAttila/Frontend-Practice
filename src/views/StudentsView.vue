<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useStudentStore } from '../stores/studentStore' // 1. Importáljuk a raktárt
import { storeToRefs } from 'pinia' // Ez kell, hogy a reaktivitás megmaradjon destructuring-nál
import StudentCard from '../components/StudentCard.vue'
import StudentForm from '../components/StudentForm.vue'

// 2. Példányosítjuk a store-t
const store = useStudentStore()

// 3. Kiszedjük az adatokat (state) és a függvényeket (actions)
// FONTOS: Az adatokhoz kell a storeToRefs, különben nem frissül a UI!
const { students, isLoading, error } = storeToRefs(store)
const { fetchStudents, deleteStudent, addStudent } = store

// 4. Keresés logika (Ez maradhat itt, mert ez csak View-specifikus dolog)
import { ref } from 'vue'
const searchQuery = ref('')

const filteredStudents = computed(() => {
  if (searchQuery.value.trim() === '') return students.value
  return students.value.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

// 5. Betöltés (Már a store intézi, hogy ne töltsön újra feleslegesen!)
onMounted(() => {
  fetchStudents()
})
</script>

<template>
  <div class="max-w-2xl mx-auto mt-10 p-5 bg-gray-50 min-h-screen font-sans">
    <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">Tanulók (Pinia Store)</h1>

    <div v-if="isLoading" class="text-center py-10">
      <span class="text-blue-600 animate-pulse">Adatok betöltése...</span>
    </div>

    <div v-else-if="error" class="text-red-500 text-center py-10">
      {{ error }}
    </div>

    <div v-else>
      <div class="mb-8">
        <StudentForm @add="addStudent" />
      </div>

      <div class="mb-6">
        <input v-model="searchQuery" type="text" placeholder="Keresés..." class="w-full px-4 py-2 border rounded-lg" />
      </div>

      <div class="space-y-4">
        <StudentCard v-for="s in filteredStudents" :key="s.id" :student="s" @delete="deleteStudent" />
      </div>
    </div>
  </div>
</template>
