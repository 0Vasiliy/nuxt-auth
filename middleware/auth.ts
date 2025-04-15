import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  
  // Проверяем аутентификацию при загрузке страницы
  authStore.checkAuth()

  // Если пользователь не авторизован и пытается получить доступ к защищенным маршрутам
  if (!authStore.isAuthenticated && to.path !== '/login') {
    return navigateTo('/login')
  }

  // Если пользователь авторизован и пытается получить доступ к странице входа
  if (authStore.isAuthenticated && to.path === '/login') {
    return navigateTo('/account')
  }
}) 