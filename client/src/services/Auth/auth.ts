import axios from "axios";


const API_URL = import.meta.env.VITE_URL_ENDPOINT_API;

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {
            email,
            password,
        });

        if (response.data) {
            localStorage.setItem("token", JSON.stringify(response.data));
            localStorage.setItem("isAuth", "true");
            localStorage.setItem("userRole", response.data.role.toString());
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

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function loadUser() {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/api/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error("Failed to load user");
    }
}

export async function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuth");
    localStorage.removeItem("userRole");
    window.location.reload();
    document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}