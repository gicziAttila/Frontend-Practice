<script setup lang="ts">
import { ref } from 'vue';
//1. Adatmodell (class/interface)$$
import type { Student } from './classes/Student';
import StudentCard from './components/StudentCard.vue';
import StudentForm from './components/StudentForm.vue';
//Lista létrehozása
const students = ref<Student[]>([
    { id: 1, name: "Kiss Béla", isActive: true },
    { id: 2, name: "Nagy Anna", isActive: false },
    { id: 3, name: "Kovács János", isActive: true },
])
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
        <div class="mb-8">
            <StudentForm @add="addStudent" />
        </div>
        <div class="space-y-4">
            <StudentCard v-for="s in students" :key="s.id" :student="s" @delete="deleteStudents" />
        </div>
        <p v-if="students.length === 0" class="text-center text-gray-500 mt-8 italic">
            Nincs több tanuló a listában.
        </p>
    </div>
</template>