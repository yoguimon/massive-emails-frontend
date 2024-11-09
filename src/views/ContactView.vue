<template>
    <div class="card m-5">
        <div class="card-header text-center bg-white"><h2>Lista de Contactos</h2></div>
        <div class="card-body">
            <div class="col-11 mt-1 mb-3 text-end">
                <button class="btn btn-primary" @click="showModal()">Agregar Contacto</button>
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
                            <div class="btn-group btn-group-sm">
                                <button class="btn btn-primary me-3" @click="openModal(contact.id)"><i class="fas fa-pencil"></i></button>
                                <button class="btn btn-primary" @click="delContact(contact.id)"><i class="fas fa-trash"></i></button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <!--Modal-->
    <div class="modal fade" id="modalContacts" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel"><i class="me-2"></i>{{idEstado!=0? "Editar Contacto":"Agregar Contacto"}}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <input type="text" v-model="nameInput" class="form-control mb-3 me-3" placeholder="ingrese nombre">
                <input type="email" v-model="emailInput" class="form-control me-3" placeholder="ingrese correo valido">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary me-2" @click="closeModal()"><i class="fas fa-reply me-2"></i>Cerrar</button>
                <button type="button" class="btn btn-primary" @click="saveContact()">Guardar <i class="fas ms-2" :class="{'fa-save': idEstado == 0, 'fa-edit': idEstado!=0}"></i></button>
            </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { getAllContacts } from '@/services/SendMessageService';
import { onMounted, ref } from 'vue';
import { Modal } from 'bootstrap';
import { addContact, deleteContact, getContact, setContact } from '@/services/ContactService';

const contacts = ref([]);
const idEstado = ref(0);
const nameInput = ref('');
const emailInput = ref('');
let modal = null;
let instanciaModal = null;
onMounted(()=>{
    getContacts();
    modal = document.getElementById('modalContacts');
    instanciaModal = new Modal(modal);
});
async function getContacts() {
    try {
        const { data } = await getAllContacts();
        contacts.value = data;
    } catch (error) {
        console.log(error);
    }
}
async function openModal(id) {
    idEstado.value=id;
    showModal();
    try {
        const { data } = await getContact(id);
        nameInput.value = data.name;
        emailInput.value = data.email;
    } catch (error) {
        console.log(error);
    }
}
async function saveContact() {
    try {
        let user = {};
        user.id=1;
        user.name="Jhonny Choque";
        user.email="jhoninformatic4@gmail.com";
        let formulario = {};
        formulario.user=user;
        formulario.name = nameInput.value;
        formulario.email = emailInput.value;
        if(idEstado.value!=0){
            const { data } = await setContact(idEstado.value,formulario);
        }else{
            const { data } = await addContact(formulario);
        }
        closeModal();
        getContacts();
    } catch (error) {
        console.log(error);
    }
}
async function delContact(id) {
    try {
        const { data } = await deleteContact(id);
        getContacts();
    } catch (error) {
        console.log(error);
    }
}
const showModal = () => {
    instanciaModal.show();
}
function closeModal(){
    instanciaModal.hide();
    nameInput.value="";
    emailInput.value="";
    idEstado.value=0;
}
</script>
<style>
    
</style>