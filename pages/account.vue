<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Управление пользователями</h1>
      <button
        @click="handleLogout"
        class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Выход
      </button>
    </div>

    <div class="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 class="text-xl font-semibold mb-4">Фильтры</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Дата создания</label>
          <input
            type="date"
            v-model="dateFilter"
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Отдел</label>
          <select
            v-model="departmentFilter"
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Все отделы</option>
            <option v-for="dept in departments" :key="dept" :value="dept">
              {{ dept }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200 border border-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
              ID
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
              Имя
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
              Фамилия
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
              Статус
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
              Дата создания
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
              Роль
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Отдел
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in filteredUsers" :key="user.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">
              {{ user.id }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
              {{ user.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
              {{ user.surname }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap border-r border-gray-200">
              <span
                :class="{
                  'px-2 inline-flex text-xs leading-5 font-semibold rounded-full': true,
                  'bg-green-100 text-green-800': user.status === 'active',
                  'bg-red-100 text-red-800': user.status === 'inactive'
                }"
              >
                {{ user.status === 'active' ? 'Активен' : 'Неактивен' }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">
              {{ user.date_created }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">
              {{ user.role }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ user.department }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const dateFilter = ref('')
const departmentFilter = ref('')

const departments = computed(() => {
  const depts = new Set(authStore.users.map(user => user.department))
  return Array.from(depts)
})

const filteredUsers = computed(() => {
  return authStore.users.filter(user => {
    // Преобразуем дату из формата DD.MM.YYYY в YYYY-MM-DD для сравнения
    const userDate = user.date_created.split(' ')[0] // Берем только дату без времени
    const [day, month, year] = userDate.split('.')
    const formattedUserDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    
    const matchesDate = !dateFilter.value || formattedUserDate === dateFilter.value
    const matchesDepartment = !departmentFilter.value || user.department === departmentFilter.value
    return matchesDate && matchesDepartment
  })
})

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script> 