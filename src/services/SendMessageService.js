import api from '../services/Http';
export const getAllContacts = () => {
    return api.get("contacts");
}
export const sendEmails = form => {
    return api.post("emails/send",form);
}