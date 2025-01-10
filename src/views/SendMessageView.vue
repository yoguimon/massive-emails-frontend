<template>
    <div class="container mt-4 mb-5">
        <h2>Enviar Nuevo Mensaje</h2>
        
        <div class="mb-3">
        <label for="subject" class="form-label">Asunto</label>
        <input type="text" class="form-control" id="subject" v-model="subject" placeholder="Asunto del mensaje">
        </div>

        <div class="mb-3">
        <label for="message" class="form-label">Mensaje</label>
        <textarea class="form-control" id="message" rows="5" v-model="message" placeholder="Escribe el mensaje"></textarea>
        </div>

        <!--destinatarios-->
        <div class="mb-3">
            <label class="form-label">Seleccione cómo agregar los destinatarios:</label>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="recipientOption" id="fromFile" value="file" v-model="recipientOption">
                <label class="form-check-label" for="fromFile">
                Subir archivo con correos electrónicos (CSV o TXT)
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="recipientOption" id="fromDatabase" value="database" v-model="recipientOption">
                <label class="form-check-label" for="fromDatabase">
                Seleccionar contactos destinatarios
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="allContacts" id="allContacts" value="allContacts" v-model="recipientOption" @click="contactFormat()">
                <label class="form-check-label" for="fromDatabase">
                Enviar a todos los contactos
                </label>
            </div>
        </div>

        <!--subir archivo-->
        <div v-if="recipientOption === 'file'" class="mb-3">
        <label for="file" class="form-label">Subir archivo con correos electrónicos</label>
        <input type="file" class="form-control" @change="handleFileUpload">
        </div>

        <!--seleccionar contactos desde la base de datos-->
        <div v-if="recipientOption === 'database'" class="mb-3">
        <label class="form-label">Seleccionar contactos (Presione Shift y elija los contactos)</label>
        <select class="form-select" multiple v-model="selectedContacts">
            <option v-for="contact in contacts" :key="contact.id" :value="contact.email">
            {{ contact.name }} - {{ contact.email }}
            </option>
        </select>
        </div>

        <!--mostrar los correos seleccionados en una lista-->
        <div v-if="recipientOption === 'database'" class="mb-3">
        <label class="form-label">Correos seleccionados:</label>
        <ul class="list-group">
            <li v-for="(email, index) in selectedContacts" :key="index" class="list-group-item">{{ email }}</li>
        </ul>
        </div>

        <!--enviar el mensaje-->
        <button type="submit" class="btn btn-primary" @click="sendMessage">{{opcion==0?'Enviar Mensaje':'Enviando...'}}<i v-if="opcion==1" class="fas fa-spinner fa-spin ms-2"></i></button>
    </div>
</template>

<script setup>
import { getAllContacts, sendEmails } from '@/services/SendMessageService';
import { onMounted, ref } from 'vue'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router';
//variables reactivas
const subject = ref('');
const message = ref('');
const recipientOption = ref('');
const extractedEmails = ref([]);
const selectedContacts = ref([]);
const contactsEmailOnly = ref([]);
const opcion = ref(0);
const router = useRouter();
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

//funcion para manejar la carga de archivos
const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
        readFile(file)
    }
}

//leer y procesar archivo
const readFile = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
        const content = e.target.result
        processEmails(content)
    }
    reader.readAsText(file)
}

//obtener correos del archivo
const processEmails = (content) => {
    const emails = content.split(/[\s,]+/).filter(email => validateEmail(email))
    extractedEmails.value = emails
}

//validar correos electrónicos
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
}

//enviar el mensaje
async function sendMessage(){
    if(subject.value===""||message.value===""||recipientOption.value===""){
        Swal.fire({
            title: "Completar todos los campos",
            icon: "warning",
            iconColor: "#0D6EFD",
            confirmButtonColor: "#0D6EFD"
        }).then(() => {
            return;
        });
    }
    opcion.value=1;
    const payload = {
        user_id: 1,
        subject: subject.value,
        body: message.value,
        emails: recipientOption.value === 'file' ? extractedEmails.value : recipientOption.value === 'allContacts' ? contactsEmailOnly.value : selectedContacts.value
    }
    try {
        const { data } = await sendEmails(payload);
        opcion.value=0;
        Swal.fire({
            title: "Correos enviados!",
            icon: "success",
            iconColor: "#0D6EFD",
            confirmButtonColor: "#0D6EFD"
        }).then(() => {
            router.push({ path: 'dashboard' });
        });
    } catch (error) {
        console.log(error);
        opcion.value=0;
        Swal.fire({
            title: error.response.data,
            icon: "warning",
            iconColor: "#0D6EFD",
            confirmButtonColor: "#0D6EFD"
        });
    }
}
//para seleccionar contactos desde la base de datos
const contactFormat = () => {
    contacts.value.forEach(element => {
        if (!contactsEmailOnly.value.includes(element.email)) {
            contactsEmailOnly.value.push(element.email);
        }
    });
}
</script>
  