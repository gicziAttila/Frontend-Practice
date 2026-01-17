import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useStudentStore } from './studentStore'
describe('Student Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('should verify initial state is empty', () => {
    const store = useStudentStore()
    expect(store.students.length).toBe(0)
  })
  it('should add a new student', () => {
    const store = useStudentStore()

    // Hozzáadunk valakit
    store.addStudent('Teszt Elek', true)

    // ELLENŐRZÉS:
    // 1. A lista hossza nőtt 1-re?
    expect(store.students.length).toBe(1)
    // 2. Az első ember neve tényleg az, amit megadtunk?
    expect(store.students[0]?.name).toBe('Teszt Elek')
    // 3. Az ID-t legenerálta? (nem undefined)
    expect(store.students[0]?.id).toBeDefined()
  })
  it('should delete a student', () => {
    const store = useStudentStore()

    store.addStudent('Törlendő Ödön', false)
    const idToDelete = store.students[0]?.id

    store.deleteStudent(idToDelete!)

    expect(store.students.length).toBe(0)
  })
})
