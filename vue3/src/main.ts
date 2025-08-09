import { createApp } from "vue";
import App from "./App.vue";
// 路由
import router from "./router";
// pinia
import pinia from "./store";
// element
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import zhCn from "element-plus/es/locale/lang/zh-cn";
// 导入svg图标
import "virtual:svg-icons-register";

const app = createApp(App);

app.use(ElementPlus, { locale: zhCn });
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(router);
app.use(pinia);

app.mount("#app");
