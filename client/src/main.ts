import { createApp, h } from "vue";
import App from "./App.vue";
import router from './router';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import "./styles/index.less";

createApp(App)
    .use(router)
    .use(Antd)
    .mount("#app");
