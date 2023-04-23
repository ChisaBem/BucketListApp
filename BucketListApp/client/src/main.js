import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

library.add(faTrash, faPenToSquare);

import App from './App.vue'

import './assets/main.css'

const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon)

app.use(createPinia())

app.mount('#app')
