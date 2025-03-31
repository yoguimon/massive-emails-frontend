<template>
    <div class="mb-5">
        <h1>Dashboard</h1>
    </div>
    <div class="row justify-content-center">
        <div class="col-md-5 mb-4">
            <div class="card">
                <div class="card-body text-center m-4">
                    <h5 class="card-title">Mensajes Enviados</h5>
                    <p class="card-text">
                        <strong>{{ number }}</strong> mensajes enviados.
                    </p>
                </div>
            </div>
        </div>
        <div class="col-md-5 mb-4">
            <div class="card">
                <div class="card-body text-center m-3">
                    <h5 class="card-title">Nuevo Mensaje</h5>
                    <p class="card-text">Enviar un nuevo mensaje.</p>
                    <router-link to="/send-message" class="btn btn-primary">Agregar Nuevo Mensaje</router-link>
                </div>
            </div>
        </div>
    </div>

    
    <div class="m-5">
        <h5>Últimos mensajes enviados</h5>
        <table class="table table-bordered">
            <thead class="table-primary">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Asunto</th>
                    <th scope="col">Mensaje</th>
                    <th scope="col">Destinatarios</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(message, index) in messages">
                    <td>{{ index+1 }}</td>
                    <td>{{ message[0] }}</td>
                    <td>{{ message[1] }}</td>
                    <td>{{ message[2] }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    
</template>
<script setup>
import Swal from 'sweetalert2'
import { getInformation } from '@/services/DashboardService';
import { onMounted, ref } from 'vue';
const number = ref(0);
const messages = ref([]);
onMounted(()=>{
    getDataOfDashboard();
    Swal.fire({
        title: "Es posible que la carga de datos sea lenta, ya que tanto el backend, el frontend como la base de datos están alojados en servidores gratuitos y sus recursos son limitados. ¡Gracias por tu comprensión!",
        icon: "warning",
        iconColor: "#0D6EFD",
        confirmButtonColor: "#0D6EFD"
    });
});
async function getDataOfDashboard() {
    try {
        const { data } = await getInformation();
        number.value = data.number;
        messages.value = data.messages;
    } catch (error) {
        console.log(error);
    }
}
</script>
<style>
    
</style>