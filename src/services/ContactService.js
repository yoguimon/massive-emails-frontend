import api from '../services/Http';
export const addContact = data => {
    return api.post("contacts",data);
}
export const setContact = (id,data) => {
    return api.put("contacts/"+id,data);
}
export const getContact = (id) => {
    return api.get("contacts/"+id);
}
export const deleteContact = (id) => {
    return api.delete("contacts/"+id);
}
