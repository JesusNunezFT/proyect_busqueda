import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';

import 'primevue/resources/themes/aura-light-green/theme.css'; // Tema de PrimeVue, puedes elegir otro si lo prefieres
import 'primevue/resources/primevue.min.css'; // Estilos básicos de PrimeVue


createApp(App).use(PrimeVue).mount('#app')
