<template>
    <div class="card m-5">
        <div class="card-header text-center bg-white"><h2>Lista de Contactos</h2></div>
        <div class="card-body">
            <div class="col-11 mt-1 mb-3 text-end">
                <button class="btn btn-primary">Agregar Contacto</button>
            </div>
            <table class="table table-bordered">
                <thead class="table-primary">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Correo</th>
                        <th scope="col" class="text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(contact, index) in contacts">
                        <td>{{ index+1 }}</td>
                        <td>{{ contact.name }}</td>
                        <td>{{ contact.email }}</td>
                        <td class="text-center">
                            <div class="btn-group">
                                <button class="btn btn-primary btn-sm me-3"><i class="fas fa-pencil"
                                    @click="editContact(contact.id)"></i></button>
                                <button class="btn btn-primary btn-sm"><i class="fas fa-trash"
                                    @click="deleteContact(contact.id)"></i></button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup>
import { getAllContacts } from '@/services/SendMessageService';
import { onMounted, ref } from 'vue';

const contacts = ref([]);
onMounted(()=>{
    getContacts();
});
async function getContacts() {
    try {
        const { data } = await getAllContacts();
        contacts.value = data;
    } catch (error) {
        console.log(error);
    }
}
</script>
<style>
    
</style>