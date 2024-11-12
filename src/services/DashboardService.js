import api from '../services/Http';
export const obtenerMensaje = () => {
    return api.get("prueba");
}
export const getInformation = () => {
    return api.get("emails/dashboard");
}