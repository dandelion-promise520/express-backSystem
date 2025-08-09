<template>
  <div class="common-layout">
    <Breadcrumb ref="breadcrumb" :item="item"></Breadcrumb>
    <el-header class="header-wrapped">
      <div class="header-content">
        <div class="header-left">
          <div class="header-content-left">
            <el-avatar :size="100" :src="image_url" />
            <span class="text">所属部门：总裁办</span>
            <span class="text">所属公司：云边有个舒芙蕾</span>
          </div>
          <div class="line-wrapped">
            <div class="line"></div>
          </div>
          <div class="header-content-right">
            <span>姓名：蔓蔓</span>
            <span>性别：女</span>
            <span>身份：总裁</span>
            <span>分管领域：总裁部</span>
            <span>权限：管理员权限</span>
          </div>
        </div>
        <!-- 右上图表 -->
        <div class="header-right" ref="contrastChartDom"></div>
      </div>
    </el-header>

    <el-main class="main-wrapped">
      <div class="main-content">
        <div class="main-left" ref="totalPriceChartDom"></div>
        <div class="main-right">
          <div class="title">常用管理</div>
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content">
                <SvgIcon icon-name="users"></SvgIcon>
                <span>用户管理</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <SvgIcon icon-name="product"></SvgIcon>
                <span>产品管理</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <SvgIcon icon-name="systemMessage"></SvgIcon>
                <span>系统消息</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <SvgIcon icon-name="person"></SvgIcon>
                <span>个人信息</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <SvgIcon icon-name="departmentMessage"></SvgIcon>
                <span>部门信息</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <SvgIcon icon-name="setting"></SvgIcon>
                <span>系统管理</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-main>

    <el-footer class="footer-wrapped">
      <div class="footer-content">
        <div class="footer-left" ref="gradeChartDom"></div>
        <div class="footer-right" ref="loginChartDom"></div>
      </div>
    </el-footer>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from "@/components/Breadcrumb.vue";
import { ref } from "vue";
import { useUserInfo } from "@/store/userInfo";
import {
  useContrastChartDom,
  usetotalPriceChartDom,
  usegradeChartDom,
  useloginChartDom,
} from "./hooks/useEchats";
import SvgIcon from "@/components/SvgIcon.vue";
// 引入头像
const { image_url } = useUserInfo();

// 引入面包屑
const item = ref({
  first: "系统概览",
});

// 图表处理
// 管理与用户对比图图表
const contrastChartDom = ref(null);
useContrastChartDom(contrastChartDom);

// 管理类别库存总价图
const totalPriceChartDom = ref(null);
usetotalPriceChartDom(totalPriceChartDom);

// 公告等级分布图
const gradeChartDom = ref(null);
usegradeChartDom(gradeChartDom);

// 每日登录人数图
const loginChartDom = ref(null);
useloginChartDom(loginChartDom);
</script>

<style lang="scss" scoped>
// 页面样式初始化
.el-header,
.el-main,
.el-footer {
  --el-header-padding: 0;
  --el-main-padding: 0;
  --el-footer-padding: 0;
}

.common-layout {
  background-color: #f3f4fb;
  height: 100%;
}

// 头部样式
.header-wrapped {
  height: 27vh;

  .header-content {
    display: flex;
    justify-content: space-evenly;
    height: 27vh;

    // 头部左侧
    .header-left {
      background-color: #fff;
      width: 49%;
      display: flex;

      //左上左边区域
      .header-content-left {
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;

        .text {
          margin-top: 8px;
          font-size: 12px;
        }
      }

      // 左上竖线
      .line-wrapped {
        height: 100%;
        display: flex;
        align-items: center;

        .line {
          height: 80%;
          border: 1px solid #d8d8d8;
        }
      }

      // 左上右边区域
      .header-content-right {
        width: 50%;
        height: 100%;
        line-height: 42px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        span {
          font-size: 12px;
          font-weight: normal;
          margin-left: 60px;
        }
      }
    }

    // 头部右侧
    .header-right {
      background-color: #fff;
      width: 49%;
    }
  }
}

// 主体样式
.main-wrapped {
  margin-top: 10px;

  .main-content {
    display: flex;
    justify-content: space-evenly;
    height: 27vh;

    .main-left {
      background-color: #fff;
      width: 59%;
    }

    // 主体右侧
    .main-right {
      background-color: #fff;
      width: 39%;

      .title {
        font-size: 14px;
        font-weight: bold;
        margin: 8px;
      }

      .grid-content {
        margin: 8px;
        height: 84px;
        background-color: #f3f3f3;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        span {
          margin-top: 10px;
          font-size: 12px;
          font-weight: normal;
        }
      }
    }
  }
}

// 脚部样式
.footer-wrapped {
  margin-top: 10px;

  .footer-content {
    display: flex;
    justify-content: space-evenly;
    height: 32vh;

    .footer-left {
      background-color: #fff;
      width: 29%;
    }

    .footer-right {
      background-color: #fff;
      width: 69%;
    }
  }
}
</style>
