<template>
    <nav class="bg-dark d-flex flex-column align-items-center p-4 vh-100">
        <a href="#" class="mb-5">
            <img src="../../public/img/logo-email.png" alt="Logo" class="img-fluid" width="50px" height="50px">
        </a>
        <!-- Sidebar links -->
         <div class="w-100 d-flex flex-column align-items-start">
            <router-link to="/dashboard" class="text-white mb-4 text-decoration-none">
                <i class="fas fa-tachometer-alt me-2"></i>
                <span>Dashboard</span>
            </router-link>
            <router-link to="/send-message" class="text-white mb-4 text-decoration-none">
                <i class="fas fa-paper-plane me-2"></i>
                <span>Enviar Mensaje</span>
            </router-link>
            <router-link to="/contacts" class="text-white mb-4 text-decoration-none">
                <i class="fas fa-users me-2"></i>
                <span>Contactos</span>
            </router-link>
            <router-link to="/record" class="text-white mb-4 text-decoration-none">
                <i class="fas fa-history me-2"></i>
                <span>Historial</span>
            </router-link>
        </div>
    </nav>
</template>
<script>
</script>
<style>
    
</style>