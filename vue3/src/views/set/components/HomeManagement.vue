<template>
  <div class="homeManagement-wrapped">
    <div
      class="homeManagement-content"
      v-for="item in swiperInfo"
      :key="item.id"
    >
      <!-- 轮播图 -->
      <span>{{ item.set_name }}:</span>
      <div class="swiper-content">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleSwiperSuccess"
          :before-upload="beforeSwiperUpload"
          :data="item"
        >
          <img v-if="item.set_value" :src="item.set_value" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAllSwiper } from "@/api/setting";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage, type UploadProps } from "element-plus";
import { onMounted, ref } from "vue";

const uploadUrl = ref(
  import.meta.env.VITE_API_BASE_URL + "/setting/uploadSwiper"
); // 上传的图片服务器地址

const swiperInfo = ref();

// 获取轮播图
const Swiper = async () => {
  const res = await getAllSwiper();
  swiperInfo.value = res.data.results.map((item: any) => ({
    ...item,
    set_value: import.meta.env.VITE_API_BASE_URL + item.set_value,
  }));
};
onMounted(() => {
  // 初始化获取
  Swiper();
});

// 对图片的格式进行判断,轮播图上传之前的函数
const beforeSwiperUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("图片必须是jpg格式!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("图片大小必须小于2MB!");
    return false;
  }
  return true;
};
// 轮播图上传成功的函数
const handleSwiperSuccess: UploadProps["onSuccess"] = (
  response
  // uploadFile,
) => {
  // console.log(uploadFile);

  // console.log(response);
  if (response.status !== 0) {
    ElMessage.error("图片上传失败，请重新上传");
    return;
  }
  ElMessage({
    message: response.message,
    type: "success",
  });
  Swiper();
};
</script>

<style lang="css" scoped>
/* 轮播图外壳 */
.homeManagement-wrapped {
  display: flex;
  flex-wrap: wrap;

  /* 轮播图内容 */
  .homeManagement-content {
    padding: 15px 50px;
    display: flex;
    align-items: center;
    font-size: 14px;
    margin-bottom: 64px;

    .swiper-content {
      padding: 0 35px;

      .avatar-uploader .avatar {
        width: 237px;
        height: 178px;
        display: block;
      }

      .el-icon.avatar-uploader-icon {
        width: 237px;
        height: 178px;
      }
    }
  }
}
</style>
