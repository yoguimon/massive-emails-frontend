import api from '../services/Http';
export const obtenerMensaje = () => {
    return api.get("prueba");
}