<template>
    <div class="container mt-4">
        <h2>Enviar Nuevo Mensaje</h2>
        <form>
            <div class="mb-3">
                <label for="subject" class="form-label">Asunto</label>
                <input type="text" class="form-control" id="subject" placeholder="Asunto del mensaje">
            </div>
            <div class="mb-3">
                <label for="message" class="form-label">Mensaje</label>
                <textarea class="form-control" id="message" rows="5" placeholder="Escribe el mensaje"></textarea>
            </div>
            <div class="mb-3">
                <label for="recipients" class="form-label">Destinatarios</label>
                <input type="email" class="form-control" id="recipients" placeholder="Ejemplo: email1@example.com, email2@example.com">
            </div>
            <button type="submit" class="btn btn-primary">Enviar Mensaje</button>
        </form>
    </div>
</template>
<script>
</script>
<style>
    
</style>