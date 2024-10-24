import api from '../services/Http';
export const getAllContacts = () => {
    return api.get("contacts");
}