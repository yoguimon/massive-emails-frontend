<template>
    <nav class="bg-dark d-flex flex-column align-items-center p-3 vh-100">
        <a href="#" class="mb-4">
            <img src="../../public/img/logo-email.png" alt="Logo" class="img-fluid" width="50px" height="50px">
        </a>
        <!-- Sidebar links -->
        <router-link to="/dashboard" class="text-white mb-3">
            <i class="fas fa-tachometer-alt"></i>
            <span>Dashboard</span>
        </router-link>
        <router-link to="/send-message" class="text-white mb-3">
            <i class="fas fa-paper-plane"></i>
            <span>Enviar Mensaje</span>
        </router-link>
        <router-link to="/history" class="text-white mb-3">
            <i class="fas fa-history"></i>
            <span>Historial</span>
        </router-link>
    </nav>
</template>
<script>
</script>
<style>
    
</style>