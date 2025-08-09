// 导入express框架
import express from 'express'
// 导入setting的路由处理模块
import { uploadSwiper, getAllSwiper, changeCompanyName, changeCompanyIntroduce, getAllCompanyIntroduce } from '../router_handle/setting.js'
// 使用express框架的路由
const router = express.Router()


// 上传轮播图
router.post('/uploadSwiper', uploadSwiper)
// 获取所有轮播图
router.post('/getAllSwiper', getAllSwiper)
//修改公司名称
router.post('/changeCompanyName', changeCompanyName)
//获取公司名称
// router.post('/getCompanyName',settingHandle.getCompanyName)
// 编辑公司介绍接口
router.post('/changeCompanyIntroduce', changeCompanyIntroduce)
// 获取公司信息介绍接口
router.post('/getAllCompanyIntroduce', getAllCompanyIntroduce)

// 向外暴露路由
export default router