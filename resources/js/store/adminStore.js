import { createStore } from "vuex";
import router from "../router";
import axios from "axios";
import $api from "../api/api";

axios.defaults.baseURL = "http://localhost:8000/api/"

export const adminStore = createStore({
    state: {},
    getters: {},
    mutations: {},
    actions: {}
});