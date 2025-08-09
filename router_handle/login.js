import db from '../database/index.js'
// 导入bcrypt加密中间件
import bcrypt from 'bcryptjs'
// 导入jwt,用于生成token
import jwt from 'jsonwebtoken'
// 导入jwt配置文件，用于加密与解密
import jwtConfig from '../jwt_config/index.js'
// 引入时间
import formattedDateTime from '../utils/time/getChinaTime.js'

/**
 * 需要参数
 * regInfo:{
 * account,
 * password
 * }
 * 
 */
export const register = (req, res) => {
	const regInfo = req.body
	if (!regInfo.account || !regInfo.password) {
		return res.cc('账号或密码不能为空')
	}
	const sqlSelect = 'select * from users where account = ?'
	// 第一个参数是执行语句，第二个是要执行语句的内容，第三个是回调，用于处理结果
	db.query(sqlSelect, regInfo.account, (err, results) => {
		// 判断账号在数据表中是否大于0
		if (results.length > 0) {
			return res.cc('账号已存在')
		}
		// 创建成功之后，需要为密码加密，使用中间件bcrypt.js
		// bcrypt.hashSync第一个参数是传入的密码，第二个参数是要	加密的长度
		regInfo.password = bcrypt.hashSync(regInfo.password, 10)
		// 把账号密码插入到users表中
		const sqlInsert = 'insert into users set ?'
		// 创建身份
		const identity = '用户'
		// 创建时间
		const create_time = formattedDateTime
		db.query(sqlInsert, {
			account: regInfo.account,
			password: regInfo.password,
			// 身份
			identity,
			// 创建时间
			create_time,
			// 初始未冻结状态为0
			status: 0
		}, (err, results) => {
			// 插入失败情况
			// affectedRows为影响的行数，如果插入失败，就没有影响到行数, 也就是行数不为1
			if (err) console.log(err)
			console.log(results);

			if (results.affectedRows !== 1) {
				return res.send({
					status: 1,
					message: '账号注册失败'
				})
			}
			res.send({
				status: 0,
				message: '账号注册成功'
			})
		})
	})
}

/**
 * 需要参数
 * logInfo:{
 * account,
 * password
 * }
 * 
 */
export const login = (req, res) => {
	const logInfo = req.body
	const sqlSelect = 'select * from users where account = ?'
	db.query(sqlSelect, logInfo.account, (err, results) => {
		// 执行sql语句失败的情况，一般是数据库断开的时候会执行失败
		if (err) return res.cc(err)
		if (results.length !== 1) return res.cc('登录失败')
		// 对前端传过来的密码进行解密
		const compareResult = bcrypt.compareSync(logInfo.password, results[0].password)
		// 跟数据库里密码作对比
		if (!compareResult) return res.cc('账号或密码不正确')
		// 判断账号是否被冻结
		if (results[0].status == 1) return res.cc('账号已冻结')
		// 给前端返回token
		// 剔除加密后的密码，头像，创建时间，更新时间
		const user = {
			...results[0],
			password: '',
			imageUrl: '',
			create_time: '',
			update_time: ''
		}
		// 设置token的有效时长 有效期为7个小时
		const tokenStr = jwt.sign(user, jwtConfig.jwtSecretKey, {
			expiresIn: '7h'
		})
		results[0].password = ''
		res.send({
			results: results[0],
			status: 0,
			message: '登录成功',
			token: 'Bearer ' + tokenStr
		})
	})
}
