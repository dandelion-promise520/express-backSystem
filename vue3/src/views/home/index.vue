<template>
  <!-- 主页外壳 -->
  <div class="home-wrapped">
    <!-- 轮播图外壳 -->
    <div class="swiper-wrapped">
      <el-carousel
        :interval="4000"
        type="card"
        height="300px"
        indicator-position="outside"
      >
        <el-carousel-item v-for="item in swiperInfo" :key="item.id">
          <img
            :src="item.set_value"
            :alt="item.set_name"
            width="100%"
            height="100%"
          />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 栅格布局外壳 -->
    <div class="layout-wrapped">
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in companyIntro" :key="item.id">
          <div class="company-message-area">
            <span>{{ item.set_name }}</span>
            <div v-html="item.set_text"></div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 表格外壳 -->
    <div class="two-table-wrapped">
      <!-- 公司公告 -->
      <div class="company-notice">
        <span>公司公告</span>
        <el-table :data="tableData" style="width: 100%" :show-header="false">
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" />
        </el-table>
      </div>
      <!-- 系统消息 -->
      <div class="system-message">
        <span>系统消息</span>
        <el-table :data="tableData" style="width: 100%" :show-header="false">
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Home">
import { getAllCompanyIntroduce, getAllSwiper } from "@/api/setting";
import { onMounted, ref } from "vue";

// 轮播图模块
const swiperInfo = ref();

// 获取轮播图
const Swiper = async () => {
  const res = await getAllSwiper();
  swiperInfo.value = res.data.results.map((item: any) => ({
    ...item,
    set_value: import.meta.env.VITE_API_BASE_URL + item.set_value,
  }));
};

// 公司信息模块
const companyIntro = ref();

const CompanyIntroduce = async () => {
  const res = await getAllCompanyIntroduce();
  // console.log(res.data.results);
  // 解构  剔除公司名称
  const [name, ...intro] = res.data.results;
  companyIntro.value = intro;
  // console.log(companyIntro);
};

// 表格模块
const tableData: any = [];

onMounted(() => {
  // 初始化获取
  Swiper();
  CompanyIntroduce();
});
</script>

<style lang="css" scoped>
 /* 封装表格的样式 */
@mixin table-class {
  height: 240px;
  width: 48%;
  display: flex;
  flex-direction: column;

  span {
    font-size: 15px;
    border-bottom: 1px solid #ea0709;
  }
}

 /* 主页外壳 */
.home-wrapped {
  display: flex;
  flex-direction: column;
  padding: 8px;

   /* 轮播图外壳 */
  .swiper-wrapped {
    margin-top: 15px;
  }

   /* 栅格布局外壳 */
  .layout-wrapped {
    padding: 8px;

    .company-message-area {
      height: 200px;
      background-color: #f5f5f5;
      cursor: pointer;

      span {
        border-bottom: 2px solid #79bbff;
        font-size: 14px;
      }
    }

    .company-message-area:hover {
      cursor: pointer;
      background-color: #eef5ff;
    }
  }

   /* 表格外壳 */
  .two-table-wrapped {
    display: flex;
    height: 260px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .company-notice {
      @include table-class;
    }

    .system-message {
      @include table-class;
    }
  }
}

 /* 轮播图样式 */
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
