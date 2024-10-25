import axios from 'axios';

export async function signUpUser(data) {
    try {
        const response = await axios.post('/api/signup', data);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 409) {
            throw new Error("This email/username is already registered. Please use a different one or log in.");
        } else {
            throw new Error("An unexpected error occurred. Please try again later.");
        }
    }
}
