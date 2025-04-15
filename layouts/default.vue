<template>
  <div>
    <header class="bg-gray-800 text-white p-4">
      <nav class="container mx-auto flex justify-between items-center">
        <NuxtLink to="/" class="text-xl font-bold">Nuxt Auth App</NuxtLink>
        <div class="flex gap-4">
          <NuxtLink to="/" class="hover:text-gray-300">Главная</NuxtLink>
          <NuxtLink to="/login" class="hover:text-gray-300">Войти</NuxtLink>
          <NuxtLink to="/account" class="hover:text-gray-300">Аккаунт</NuxtLink>
        </div>
      </nav>
    </header>
    <main class="min-h-screen">
      <slot />
    </main>
    <footer class="bg-gray-800 text-white p-4 mt-8">
      <div class="container mx-auto text-center">
        <p>&copy; 2024 Nuxt Auth App. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
</script> 