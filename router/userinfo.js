// 导入express框架
import express from 'express'

// 使用express框架的路由
const router = express.Router()

// 导入userinfo的路由处理模块
import { uploadAvatar, bandAccount, changeAccount, changePassword, getUserInfo, changeName, changeSex, changeEmail, emailInquiry, forgetPasswordInLogin, createAdmin, getAdminList, editAdmin, changeAdmin, searchUser, filterDepartment, changeUser, getBanUsersList, getAllUser, deleteUser } from '../router_handle/userinfo.js'

// expressJoi作用是对表单的一些数据做一些验证
import expressJoi from '@escook/express-joi'
import { name_limit, email_limit, account_limit, password_limit, forgetPasswordInLogin_limit, editorAdmin_limit, createAdmin_limit } from '../limit/userinfo.js'

// 上传头像
router.post('/uploadAvatar', uploadAvatar)
// 将头像绑定账号
router.post('/bandAccount', bandAccount)
// 修改账号
router.post('/changeAccount', expressJoi(account_limit), changeAccount)
// 修改密码
router.post('/changePassword', expressJoi(password_limit), changePassword)
// 根据id获取用户信息
router.post('/getUserInfo', getUserInfo)
// 修改姓名
router.post('/changeName', expressJoi(name_limit), changeName)
// 修改性别
router.post('/changeSex', changeSex)
// 修改邮箱
router.post('/changeEmail', expressJoi(email_limit), changeEmail)
// 验证邮箱
router.post('/emailInquiry', emailInquiry)
// 登录页面忘记密码
router.post('/forgetPasswordInLogin', expressJoi(forgetPasswordInLogin_limit), forgetPasswordInLogin)
//创建管理员
router.post('/createAdmin', expressJoi(createAdmin_limit), createAdmin)
//获取管理员列表
router.post('/getAdminList', getAdminList)
//编辑管理员账号信息
router.post('/editAdmin', expressJoi(editorAdmin_limit), editAdmin)
//对管理员降职或提权
router.post('/changeAdmin', changeAdmin)
//通过账号搜索用户
router.post('/searchUser', searchUser)
//根据部门搜索用户
router.post('/filterDepartment', filterDepartment)
//冻结或解冻用户
router.post('/changeUser', changeUser)
//获取冻结用户列表
router.post('/getBanUsersList', getBanUsersList)
// 获取所有用户
router.post('/getAllUser', getAllUser)
//删除用户
router.post('/deleteUser', deleteUser)

// 向外暴露路由
export default router