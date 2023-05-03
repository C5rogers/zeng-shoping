import './bootstrap';
import { createApp } from 'vue';
import Welcome from './pages/Welcome.vue'
import '../css/app.css'
import '../css/admin.css'

import router from './router';
import { store } from './store/store';


//this is where we need to import the store and router too
createApp(Welcome).use(store).use(router).mount("#app")