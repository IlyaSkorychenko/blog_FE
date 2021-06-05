import axios from "axios";
import outputServerError from "../helpers/outputServerError";

class AxiosController {
    token;
    instance;

    constructor({baseURL}) {
        this.instance = axios.create({
            baseURL
        })
        this.init();
    }

    setToken(token) {
        this.token = token;
    }

    init() {
        this.instance.interceptors.request.use((config) => {
            if (this.token) {
                config.headers['Authorization'] = `Bearer ${this.token}`;
            }
            return config;
        }, error => error);

        this.instance.interceptors.response.use(response => response, error => {
            outputServerError(error);
            return Promise.reject(error);
        });
    }
}

export const apiClient = new AxiosController({baseURL: process.env.API_URL})

export const axiosNextApiInstance = axios.create({
    baseURL: '/api/'
});

axiosNextApiInstance.interceptors.response.use(response => response, error => {
    outputServerError(error);
    return Promise.reject(error);
})
