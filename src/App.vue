<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
//1. Adatmodell (class/interface)$$
import type { Student } from './classes/Student';
import StudentCard from './components/StudentCard.vue';
import StudentForm from './components/StudentForm.vue';
//Lista létrehozása
const students = ref<Student[]>([]);
const isLoading = ref(false);
const error = ref<string | null>(null);
const searchQuery = ref('');
const filteredStudents = computed(() => {
    if (searchQuery.value.trim() === '') {
        return students.value
    }
    else {
        return students.value.filter((s) => s.name.toLowerCase().includes(searchQuery.value.toLocaleLowerCase()));
    }
})

const fetchStudents = async () => {
    isLoading.value = true;
    error.value = null;
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Hiba történt berültéskor!');
        const data = await response.json();
        students.value = data.map((user: any) => ({
            id: user.id,
            name: user.name,
            isActive: Math.random() < 0.5
        }));
    } catch (err: any) {
        error.value = 'Nem sikerült betölteni az adatokat: ' + err.message;
    } finally {
        isLoading.value = false;
    }
};
onMounted(() => {
    fetchStudents();
});
//Függvény
const deleteStudents = (id: number) => {
    students.value = students.value.filter(s => s.id !== id);
}
const addStudent = (name: string, isActive: boolean) => {
    // Létrehozzuk az új objektumot
    const newStudent: Student = {
        id: Date.now(), // Egyedi azonosító generálása (időbélyeg alapján)
        name: name,
        isActive: isActive
    };
    students.value.unshift(newStudent);
}
</script>
<template>
    <div class="max-w-2xl mx-auto mt-10 p-5 bg-gray-50 min-h-screen font-sans">
        <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">Tanulók nyilvántartása</h1>
        <div v-if="isLoading" class="text-center py-10">
            <span class="text-blue-600 text-lg animate-pulse">Adatok betöltése...</span>
        </div>
        <div v-else-if="error">
            <p class="text-center text-red-500 mt-8 italic">A betöltés során hiba lépett fel</p>
            {{ error }}
            <button @click="fetchStudents" class="block mx-auto mt-2 underline">Újrapróbálom</button>
        </div>

        <div class="mb-8" v-else>
            <StudentForm @add="addStudent" />
            <div class="mb-6">
                <input v-model="searchQuery" type="text" placeholder="Keresés név alapján..."
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                <p v-if="searchQuery" class="text-sm text-gray-500 mt-1">
                    Találatok száma: {{ filteredStudents.length }}
                </p>
            </div>
        </div>
        <div class="space-y-4">
            <StudentCard v-for="s in filteredStudents" :key="s.id" :student="s" @delete="deleteStudents" />
        </div>
        <p v-if="students.length === 0" class="text-center text-gray-500 mt-8 italic">
            Nincs több tanuló a listában.
        </p>
    </div>
</template>