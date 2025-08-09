// 导入express框架
import express from 'express';
// 创建express实例
const app = express()

app.get('/', (req, res) => {
	res.send('hello');
});


import history from 'connect-history-api-fallback'
app.use(history())

// import { createProxyMiddleware } from 'http-proxy-middleware';
// const proxyMiddleware = createProxyMiddleware<Request>({
// 	target: 'http://127.0.0.1:3007',
// 	changeOrigin: true,
// })
// app.use('/api', proxyMiddleware);

// 导入body-parser
import bodyParser from 'body-parser'

// 导入cors
import cors from 'cors'
// 全局挂载
app.use(cors())

// 导入multer
import multer from 'multer'
// 配置multer
// 在server服务端下新建一个public文件，在public文件下新建upload文件用于存放图片
const upload = multer({ dest: './public/upload' })

app.use(upload.any())
// 静态托管
app.use(express.static("./public"));


// 当extended为false时，值为字符串或数组。当extended为true时，值可以为任意类型
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 全局挂载处理失败情况语句，status为1时为错误
app.use((req, res, next) => {
	res.cc = (err, status = 1) => {
		res.send({
			status,
			// 判断err是错误对象还是字符串
			message: err instanceof Error ? err.message : err
		})
	}
	next()
})

// 引入jwtconfig
// import jwtconfig from './jwt_config/index.js'
// import { expressjwt as jwt } from 'express-jwt'

// app.use(jwt({
// 	secret: jwtconfig.jwtSecretKey, algorithms: ['HS256']
// }).unless({
// 	path: [/^\/api\//]
// }))



// 引入路由模块
import Joi from 'joi';
import loginRouter from './router/login.js';
app.use('/', loginRouter)
import userRouter from './router/userinfo.js'
app.use('/user', userRouter)
import settingRouter from './router/setting.js'
app.use('/setting', settingRouter)

// 对不符合joi规则的进行报错 - 修复错误处理中间件
app.use((err, req, res, next) => {
	if (err instanceof Joi.ValidationError) {
		return res.send({
			status: 1,
			message: '输入的数据不符合验证规则'
		})
	}
	// 处理其他类型的错误
	return res.send({
		status: 1,
		message: err.message || '服务器内部错误'
	})
})

import dotenv from 'dotenv'

const env = process.env.NODE_ENV || 'development'
dotenv.config({ path: `.env.${env}` })

const baseURL = process.env.baseURL;

// 绑定和侦听指定的主机和端口	
const port = '3000';
app.listen(port, () => {
	console.log(`${baseURL}:${port}`)
})