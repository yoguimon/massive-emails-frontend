<template>
    <div class="container mt-4">
        <h2>Enviar Nuevo Mensaje</h2>
        
        <!-- Asunto del mensaje -->
        <div class="mb-3">
        <label for="subject" class="form-label">Asunto</label>
        <input type="text" class="form-control" id="subject" v-model="subject" placeholder="Asunto del mensaje">
        </div>

        <!-- Mensaje -->
        <div class="mb-3">
        <label for="message" class="form-label">Mensaje</label>
        <textarea class="form-control" id="message" rows="5" v-model="message" placeholder="Escribe el mensaje"></textarea>
        </div>

        <!-- Opciones para seleccionar destinatarios -->
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

        <!-- Subir archivo -->
        <div v-if="recipientOption === 'file'" class="mb-3">
        <label for="file" class="form-label">Subir archivo con correos electrónicos</label>
        <input type="file" class="form-control" @change="handleFileUpload">
        </div>

        <!-- Seleccionar contactos desde la base de datos -->
        <div v-if="recipientOption === 'database'" class="mb-3">
        <label class="form-label">Seleccionar contactos (Presione Shift y elija los contactos)</label>
        <select class="form-select" multiple v-model="selectedContacts">
            <option v-for="contact in contacts" :key="contact.id" :value="contact.email">
            {{ contact.name }} - {{ contact.email }}
            </option>
        </select>
        </div>

        <!-- Mostrar los correos seleccionados en una lista -->
        <div v-if="recipientOption === 'database'" class="mb-3">
        <label class="form-label">Correos seleccionados:</label>
        <ul class="list-group">
            <li v-for="(email, index) in selectedContacts" :key="index" class="list-group-item">{{ email }}</li>
        </ul>
        </div>

        <!-- Botón para enviar el mensaje -->
        <button type="submit" class="btn btn-primary" @click="sendMessage">Enviar Mensaje</button>
    </div>
</template>

<script setup>
import { getAllContacts } from '@/services/SendMessageService';
import { onMounted, ref } from 'vue'

// Variables reactivas
const subject = ref('')
const message = ref('')
const recipientOption = ref('') // Opción seleccionada ('file' o 'database')
const extractedEmails = ref([]) // Correos extraídos del archivo
const selectedContacts = ref([]) // Correos seleccionados desde la base de datos
const contactsEmailOnly = ref([]) // muestre los correo de todos los contactos

// Ejemplo de datos de contactos (desde la base de datos)
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

// Función para manejar la carga de archivos
const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
        readFile(file)
    }
}

// Leer y procesar archivo
const readFile = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
        const content = e.target.result
        processEmails(content)
    }
    reader.readAsText(file)
}

// Procesar correos electrónicos del archivo
const processEmails = (content) => {
    const emails = content.split(/[\s,]+/).filter(email => validateEmail(email))
    //verifico que no exista email repetido (pendiente...)
    extractedEmails.value = emails
}

// Validar correos electrónicos
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
}

// Función para enviar el mensaje
const sendMessage = () => {
    const payload = {
        user_id: 1,
        subject: subject.value,
        body: message.value,
        emails: recipientOption.value === 'file' ? extractedEmails.value : recipientOption.value === 'allContacts' ? contactsEmailOnly.value : selectedContacts.value
    }
    console.log('Mensaje a enviar:', payload)
    // Aquí puedes hacer la solicitud al backend para enviar los datos
}
const contactFormat = () => {
    contacts.value.forEach(element => {
        if (!contactsEmailOnly.value.includes(element.email)) {
            contactsEmailOnly.value.push(element.email);
        }
    });
}
</script>
  