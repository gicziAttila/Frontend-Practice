import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Student } from '../classes/Student'

export const useStudentStore = defineStore('studentStore', () => {
  const students = ref<Student[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const getStudentById = (id: number) => {
    return students.value.find((s) => s.id === id)
  }
  const fetchStudents = async () => {
    if (students.value.length > 0) return // Ha már le vannak töltve, ne töltsük újra!

    isLoading.value = true
    error.value = null
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      if (!response.ok) throw new Error('Hiba a letöltéskor')
      const data = await response.json()

      students.value = data.map((user: any) => ({
        id: user.id,
        name: user.name,
        isActive: Math.random() < 0.5,
      }))
    } catch (err: any) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }
  // Frissítés (Update) - Itt a varázslat!
  // Nem csak a szervernek küldjük el, hanem a HELYI listát is frissítjük
  const updateStudent = async (updatedStudent: Student) => {
    // 1. Elküldjük a szervernek (hogy lássák, tudunk ilyet)
    await fetch(`https://jsonplaceholder.typicode.com/users/${updatedStudent.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedStudent),
    })

    // 2. FRISSÍTJÜK A HELYI LISTÁT IS!
    // Megkeressük az indexét a tömbben
    const index = students.value.findIndex((s) => s.id === updatedStudent.id)
    if (index !== -1) {
      // Kicseréljük az újra
      students.value[index] = updatedStudent
    }
  }

  // Törlés
  const deleteStudent = (id: number) => {
    students.value = students.value.filter((s) => s.id !== id)
  }

  // Hozzáadás
  const addStudent = (name: string, isActive: boolean) => {
    const newStudent = { id: Date.now(), name, isActive }
    students.value.unshift(newStudent)
  }

  // Visszaadjuk, amit a komponensek használhatnak
  return {
    students,
    isLoading,
    error,
    fetchStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    addStudent,
  }
})
