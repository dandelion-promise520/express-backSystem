import { defineStore } from "pinia";
import { ref } from "vue";
import { getUserInfo } from "@/api/userInfo";

// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。

// 组合式写法
export const useUserInfo = defineStore(
  "userInfo",
  () => {
    const image_url = ref("");
    const account = ref("");
    const name = ref("");
    const sex = ref("");
    const email = ref("");
    const department = ref("");
    const identity  = ref("");

    // 调用获取用户信息接口
    const GetUserInfo = async (id: number) => {
      const res = await getUserInfo({ id });
      // console.log(res);
      image_url.value = res.data.result.image_url;
      account.value = res.data.result.account;
      name.value = res.data.result.name;
      sex.value = res.data.result.sex;
      email.value = res.data.result.email;
      department.value = res.data.result.department;
      identity.value = res.data.result.identity;
    };
    return { image_url, account, name, sex, email, department, identity, GetUserInfo };
  },
  // 配置持久化
  {
    persist: {
      key: "userInfo",
      storage: localStorage,
    },
  }
);

// 选项式写法
// export const useUserInfo = defineStore("userInfo", {
//   state: () => ({
//     return {
//       image_url: "",
//       account: "",
//       name: "",
//       sex: "",
//       email: "",
//     };
//   }),
//   actions: {
//     async GetUserInfo(id: number) {
//       const res = await getUserInfo(id);
//       // console.log(res);
//       this.image_url = res.data.result.image_url;
//       this.account = res.data.result.account;
//       this.name = res.data.result.name;
//       this.sex = res.data.result.sex;
//       this.email = res.data.result.email;
//       // const obj = {
//       //   image_url: this.image_url,
//       //   account: this.account,
//       //   name: this.name,
//       //   sex: this.sex,
//       //   email: this.email,
//       // };
//       // localStorage.setItem("useUserInfo", JSON.stringify(obj));
//     },
//   },
// },persist: {
//     eabled: true,
//     key: "userInfo",
//     storage: localStorage,
//   },);orage: localStorage,
//   },);
