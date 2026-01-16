<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStudentStore } from '../stores/studentStore' // 1. Store importálása
import type { Student } from '../classes/Student'

const route = useRoute()
const router = useRouter()
const store = useStudentStore() // 2. Store példányosítása

const isLoading = ref(true)
const isSaving = ref(false)
const student = ref<Student | null>(null)

onMounted(async () => {
  // Megnézzük, hányas ID kell
  const id = Number(route.params.id)

  // 3. OKOS BETÖLTÉS:
  // Először megnézzük, megvan-e már a Store-ban (mert a listából jöttünk)
  let foundStudent = store.getStudentById(id)

  // Ha nincs meg (pl. F5-öt nyomott a user ezen az oldalon, és üres a store),
  // akkor gyorsan letöltjük az összeset.
  if (!foundStudent) {
    await store.fetchStudents() // Ez feltölti a store-t
    foundStudent = store.getStudentById(id) // Most már meg kell lennie
  }

  if (foundStudent) {
    // 4. MÁSOLAT KÉSZÍTÉSE (Fontos!)
    // Nem a store-ban lévő objektumot szerkesztjük közvetlenül (v-model),
    // hanem csinálunk egy másolatot. Csak mentéskor írjuk vissza.
    // A {...foundStudent} egy egyszerű módja az objektum másolásnak.
    student.value = { ...foundStudent }
  } else {
    // Ha még így sincs (pl. nem létező ID)
    alert('Nincs ilyen tanuló!')
    router.push('/')
  }

  isLoading.value = false
})

const saveStudent = async () => {
  if (!student.value) return

  isSaving.value = true

  try {
    // 5. MENTÉS A STORE-ON KERESZTÜL
    // Nem itt fetch-elünk kézzel, hanem szólunk a "Főnöknek" (Store), hogy intézze el.
    await store.updateStudent(student.value)

    // Visszajelzés és navigálás
    alert('Sikeres mentés!')
    router.push('/') // Vissza a listára
  } catch (error) {
    alert('Hiba történt: ' + error)
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto mt-10 p-5 bg-white shadow-md rounded-lg">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Tanuló szerkesztése (Pinia)</h1>

    <div v-if="isLoading" class="text-blue-600 animate-pulse">Adatok betöltése...</div>

    <div v-else-if="student">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Név</label>
        <input v-model="student.name" type="text"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>

      <div class="mb-6">
        <label class="flex items-center cursor-pointer">
          <input v-model="student.isActive" type="checkbox" class="form-checkbox h-5 w-5 text-blue-600" />
          <span class="ml-2 text-gray-700">Aktív hallgató</span>
        </label>
      </div>

      <div class="flex items-center justify-between">
        <RouterLink to="/" class="text-gray-500 hover:text-gray-800"> Mégse </RouterLink>

        <button @click="saveStudent" :disabled="isSaving"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50">
          {{ isSaving ? 'Mentés...' : 'Mentés' }}
        </button>
      </div>
    </div>
  </div>
</template>
