<template>
    <div class="mb-5">
        <h1>Dashboard</h1>
    </div>
    <div class="row">
        <div class="col-md-6 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Mensajes Enviados</h5>
                    <p class="card-text">
                        <strong>10</strong> mensajes enviados.
                    </p>
                </div>
            </div>
        </div>
        <div class="col-md-6 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Nuevo Mensaje</h5>
                    <p class="card-text">Enviar un nuevo mensaje.</p>
                    <router-link to="/send-message" class="btn btn-primary">Agregar Nuevo Mensaje</router-link>
                </div>
            </div>
        </div>
    </div>

    <div class="mt-4">
        <h5>Último mensaje enviado</h5>
        <ul class="list-group">
        <li class="list-group-item">Asunto: Venta de producto</li>
        <li class="list-group-item">Fecha: 13/10/2024</li>
        <li class="list-group-item">Destinatarios: 15</li>
        </ul>
    </div>
</template>
<script setup>
import { obtenerMensaje } from '@/services/DashboardService';
import { onMounted, ref } from 'vue';
const mensaje = ref("Aqui el mensaje");
onMounted(()=>{
    //getMensaje();
});
async function getMensaje() {
    try {
        const { data } = await obtenerMensaje();
        mensaje.value = data;
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
</script>
<style>
    
</style>