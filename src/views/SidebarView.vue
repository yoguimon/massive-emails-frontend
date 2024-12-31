<template>
    <div class="d-flex vh-100 overflow-hidden">
    <!-- sidebar -->
    <SidebarComponent />

    <!--main-->
    <div class="d-flex flex-column flex-grow-1 overflow-auto">
      <!-- header -->
      <HeaderComponent />

      <!--content-->
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