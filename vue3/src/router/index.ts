import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "login",
  },
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    name: "menu",
    path: "/menu",
    redirect: "home",
    component: () => import("@/views/menu/index.vue"),
    children: [
      {
        name: "home",
        path: "/home",
        component: () => import("@/views/home/index.vue"),
      },
      {
        name: "systemOverview",
        path: "/systemOverview",
        component: () => import("@/views/systemOverview/index.vue"),
      },
      {
        name: "productManager ",
        path: "/productManager",
        component: () => import("@/views/userManagement/productManager/index.vue"),
      },
      {
        name: "userManager",
        path: "/userManager",
        component: () => import("@/views/userManagement/userManager/index.vue"),
      },
      {
        name: "messageManager",
        path: "/messageManager",
        component: () => import("@/views/userManagement/messageManager/index.vue"),
      },
      {
        name: "userList",
        path: "/userList",
        component: () => import("@/views/userManagement/userList/index.vue"),
      },
      {
        name: "productList",
        path: "/productList",
        component: () => import("@/views/productManagement/productList/index.vue"),
      },
      {
        name: "outboundList",
        path: "/outboundList",
        component: () => import("@/views/productManagement/outboundList/index.vue"),
      },
      {
        name: "messageList",
        path: "/messageList",
        component: () => import("@/views/messageManagement/messageList/index.vue"),
      },
      {
        name: "recycleBin",
        path: "/recycleBin",
        component: () => import("@/views/messageManagement/recycleBin/index.vue"),
      },
      {
        name: "contractManagement",
        path: "/contractManagement",
        component: () => import("@/views/contractManagement/index.vue"),
      },
      {
        name: "operationLog",
        path: "/operationLog",
        component: () => import("@/views/operationLog/index.vue"),
      },
      {
        name: "loginLog",
        path: "/loginLog",
        component: () => import("@/views/loginLog/index.vue"),
      },
      {
        name: "set",
        path: "/set",
        component: () => import("@/views/set/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
