<template>
    <div class="d-flex">
    <!-- Sidebar -->
    <SidebarComponent />

    <!-- Main content area -->
    <div class="flex-grow-1">
      <!-- Header -->
      <HeaderComponent />

      <!-- Dynamic content based on route -->
      <div class="container mt-4">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script setup>
    import SidebarComponent from '@/components/SidebarComponent.vue';
    import HeaderComponent from '@/components/HeaderComponent.vue';
</script>
<style>
    
</style>