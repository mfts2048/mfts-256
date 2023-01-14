import { createApp, h } from "vue";
import App from "./App.vue";
import "./styles/index.scss";
import router from './router';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

createApp(App)
    .use(router)
    .use(Antd)
    .mount("#app");
