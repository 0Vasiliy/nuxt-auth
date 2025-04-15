<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-4">Добро пожаловать!</h1>
    <p class="text-lg mb-4">Это главная страница приложения.</p>
    <div class="flex gap-4">
      <NuxtLink to="/login" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Войти
      </NuxtLink>
      <NuxtLink to="/account" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
        Аккаунт
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script> 