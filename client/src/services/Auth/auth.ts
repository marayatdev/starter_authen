import axios from "axios";


const API_URL = import.meta.env.VITE_URL_ENDPOINT_API;

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {
            email,
            password,
        });

        if (response.data) {
            localStorage.setItem("Token", JSON.stringify(response.data));
            return response.data;
        }

    } catch (error) {
        throw error;
    }
};


export const register = async (username: string, email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, {
            username,
            email,
            password,
        });

        if (response.data) {
            localStorage.setItem("Token", JSON.stringify(response.data));
            return response.data;
        }
    } catch (error) {
        throw error;
    }
}