<template>
    <div class="d-flex vh-100 overflow-hidden">
    <!-- Sidebar -->
    <SidebarComponent />

    <!-- Main content area -->
    <div class="d-flex flex-column flex-grow-1 overflow-auto">
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