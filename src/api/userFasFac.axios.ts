import axios from "axios"
import {useAtom} from "jotai";
import {accessTokenAtom} from "@/data/store.ts";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_SURVEY_API_BASE_URL, // Replace with your API base URL
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use((config) => {
    const token = useAtom(accessTokenAtom); // Replace with your token logic
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;