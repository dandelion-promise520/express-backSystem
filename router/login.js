// 登录注册模块路由
// 导入express框架
import express from 'express'
import joi from 'joi'

// 使用express框架的路由
const router = express.Router()

// 导入login的路由处理模块
import { register, login } from '../router_handle/login.js'

// expressJoi作用是对表单的一些数据做一些验证
import expressJoi from '@escook/express-joi'
// 导入limit里的数据限制joi
import { login_limit } from '../limit/login.js'

// 配置expressJoi错误处理
const validateLogin = expressJoi(login_limit, {
    // 自定义错误处理
    onError: (err, req, res, next) => {
        res.send({
            status: 1,
            message: '输入的数据不符合验证规则'
        })
    }
})

router.post('/register', validateLogin, register)

router.post('/login', validateLogin, login)

// 向外暴露路由
export default router