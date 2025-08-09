import db from '../database/index.js'
// 导入bcrypt加密中间件
import bcrypt from 'bcryptjs'

// 导入生成唯一ID的中间件
import crypto from 'crypto'

// 导入fs
import fs from 'fs'

import dayjs from 'dayjs'

import formattedDateTime from '../utils/time/getChinaTime.js'


// 上传头像接口
export const uploadAvatar = (req, res) => {
	const onlyId = crypto.randomUUID()
	const oldName = req.files[0].filename
	const newName = Buffer.from(req.files[0].originalname, 'latin1').toString('utf8')
	fs.renameSync('./public/upload/' + oldName, './public/upload/' + newName)
	const sqlInsert = 'insert into image set ?'
	db.query(sqlInsert, {
		image_url: `/upload/${newName}`,
		onlyId
	}, (err, results) => {
		if (err) return res.cc(err)
		res.send({
			status: 0,
			message: '上传头像成功',
			image_url: `/upload/${newName}`,
			onlyId
		})
	})
}


// 绑定账号接口
export const bandAccount = (req, res) => {
	const { account, image_url, onlyId } = req.body
	const sqlImage = 'update image set account = ? where onlyId = ?'
	const sqlUsers = 'update users set image_url = ? where account = ?'
	db.query(sqlImage, [account, onlyId], (err, results) => {
		if (err) return res.cc(err)
		db.query(sqlUsers, [image_url, account], (err, results) => {
			if (err) return res.cc(err)
			res.send({
				status: 0,
				message: '账号绑定成功',
			})
		})
	})
}

// 修改账号接口
export const changeAccount = (req, res) => {
	let { account, id } = req.body
	const sqlSelect = 'select * from users where id = ?'
	const sqlUpdate = 'update users set account = ? where id = ?'

	db.query(sqlSelect, id, (err, results) => {
		if (account === results[0].account) {
			res.send({
				status: 1,
				message: '您的账号不能与原账号相同'
			})
		} else {
			db.query(sqlUpdate, [account, id], (err, results) => {
				if (err) return res.cc(err)
				res.send({
					status: 0,
					message: '修改账号成功'
				})
			})
		}
	})
}

// 修改密码接口
export const changePassword = (req, res) => {
	let { newPassword, oldPassword, id } = req.body
	const sqlSelect = 'select * from users where id = ?'
	const sqlUpdate = 'update users set password = ? where id = ?'
	db.query(sqlSelect, id, (err, results) => {
		// const compareResult = bcrypt.compareSync(oldPassword, results[0].password)
		if (!bcrypt.compareSync(oldPassword, results[0].password)) return res.cc('您的密码错误')
		if (bcrypt.compareSync(newPassword, results[0].password)) {
			return res.cc('原密码不能与新密码一致')
		}
		newPassword = bcrypt.hashSync(newPassword, 10)
		db.query(sqlUpdate, [newPassword, id], (err, results) => {
			if (err) return res.cc(err)
			res.send({
				status: 0,
				message: '修改密码成功'
			})
		})
	})
}

// 获取用户信息接口 接受参数id
export const getUserInfo = (req, res) => {
	const sqlSelect = 'select * from users where id = ?'
	db.query(sqlSelect, req.body.id, (err, results) => {
		if (err) return res.cc(err)
		results[0].password = ''
		res.send({
			status: 0,
			message: '获取用户信息成功',
			result: results[0]
		})
	})
}

// 修改姓名接口
export const changeName = (req, res) => {
	const sqlUpdate = 'update users set name = ? where id = ?'
	const { id, name } = req.body
	db.query(sqlUpdate, [name, id], (err, results) => {
		if (err) return res.cc(err)
		res.send({
			status: 0,
			message: '修改姓名成功',
		})
	})
}

// 修改性别接口
export const changeSex = (req, res) => {
	const sqlUpdate = 'update users set sex = ? where id = ?'
	const { id, sex } = req.body
	db.query(sqlUpdate, [sex, id], (err, results) => {
		if (err) return res.cc(err)
		res.send({
			status: 0,
			message: '修改性别成功',
		})
	})
}

// 修改邮箱接口
export const changeEmail = (req, res) => {
	const sqlUpdate = 'update users set email = ? where id = ?'
	const { id, email } = req.body
	db.query(sqlUpdate, [email, id], (err, results) => {
		if (err) return res.cc(err)
		res.send({
			status: 0,
			message: '修改邮箱成功',
		})
	})
}

// 邮箱验证接口
export const emailInquiry = (req, res) => {
	let { account, email } = req.body
	const sqlSelect = 'select * from users where account = ?'
	db.query(sqlSelect, account, (err, results) => {
		if (results.length == 0) return res.cc('您的账号或邮箱不正确')
		if (err) return res.cc(err)
		if (email !== results[0].email) return res.cc('您的账号或邮箱不正确')
		res.send({
			status: 0,
			message: '查询成功',
			id: results[0].id
		})
	})
}

// 登录页面修改密码接口
export const forgetPasswordInLogin = (req, res) => {
	const sqlUpdate = 'update users set password = ? where id = ?'
	const sqlSelect = 'select * from users where id = ?'
	// 判断更改密码前后密码是否一致
	db.query(sqlSelect, req.body.id, (err, results) => {
		// console.log(results[0],req.body.password)
		const compareResult = bcrypt.compareSync(req.body.password, results[0].password)
		if (compareResult) return res.cc('您修改的密码不能与原密码一致')
		req.body.password = bcrypt.hashSync(req.body.password, 10)
		db.query(sqlUpdate, [req.body.password, req.body.id], (err, results) => {
			if (err) return res.cc(err)
			res.send({
				status: 0,
				message: '修改密码成功'
			})
		})
	})
}

//创建管理员
export const createAdmin = (req, res) => {
	const { account, password, name, department, sex, email, identity } = req.body
	const sqlSelect = 'select * from users where account = ?'
	db.query(sqlSelect, account, (err, results) => {
		// 判断账号在数据表中是否大于0
		if (results.length > 0) {
			return res.cc('账号已存在')
		}
		// 创建成功之后，需要为密码加密，使用中间件bcrypt.js
		// bcrypt.hashSync第一个参数是传入的密码，第二个参数是要加密的长度
		let encryptionPassword = bcrypt.hashSync(password, 10)
		// 把账号密码插入到users表中
		const sqlInsert = 'insert into users set ?'
		// 创建时间
		const create_time = formattedDateTime
		db.query(sqlInsert, {
			account,
			password: encryptionPassword,
			// 身份
			identity,
			name,
			department,
			sex,
			email,
			// 创建时间
			create_time,
			// 初始未冻结状态为0
			status: 0
		}, (err, results) => {
			// 插入失败情况
			// affectedRows为影响的行数，如果插入失败，就没有影响到行数, 也就是行数不为1
			if (err) console.log(err)
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
//获取管理员列表
export const getAdminList = (req, res) => {
	const sqlSelect = 'select * from users where identity = ?'
	db.query(sqlSelect, req.body.identity, (err, results) => {
		if (err) return res.cc(err)
		results.forEach(item => {
			item.password = '',
				item.image_url = '',
				item.create_time = '',
				item.status = ''
		})
		res.send(results)
	})
}
//编辑管理员账号信息
export const editAdmin = (req, res) => {
	const data = {
		...req.body,
		update_time: formattedDateTime
	}

	const sqlUpdate = 'update users set ? where id = ?'
	db.query(sqlUpdate, [data, req.body.id], (err, results) => {
		if (err) return res.cc(err)
		if (results.affectedRows !== 1) {
			return res.cc(err)
		}
		res.send({
			status: 0,
			message: '更新信息成功'
		})
	})
}
// 对管理员降职或提权
export const changeAdmin = (req, res) => {
	const { identity, id } = req.body
	const sqlUpdate = 'update users set identity = ? where id = ?'
	db.query(sqlUpdate, [identity, id], (err, results) => {
		if (err) return res.cc(err)
		let message = '升职成功'
		if (identity == '用户') {
			message = '降职成功'
		}
		res.send({
			status: 0,
			message
		})
	})
}
//通过账号搜索用户
export const searchUser = (req, res) => {
	let sqlSelect = 'select * from users where account LIKE ? order by id'
	let sqlParams = [`%${req.body.account}%`];
	// identity为可有可无参数
	// 如果有identity则加上identity的判断条件
	if (req.body.identity) {
		sqlSelect = 'select * from users where account LIKE ? and identity = ? order by id'
		sqlParams = [`%${req.body.account}%`, req.body.identity];
	}
	db.query(sqlSelect, sqlParams, (err, results) => {
		if (err) return res.cc(err)
		results.forEach(item => {
			item.password = '',
				item.image_url = ''
		})
		res.send(results)
	})
}
// 根据部门搜索用户
export const filterDepartment = (req, res) => {
	const sqlSelect = 'select * from users where department = ? order by id'
	db.query(sqlSelect, req.body.department, (err, results) => {
		if (err) return res.cc(err)
		results.forEach(item => {
			item.password = '',
				item.image_url = ''
		})
		res.send(results)
	})
}
//冻结或解冻用户
export const changeUser = (req, res) => {
	const { status, id } = req.body
	const sqlUpdate = 'update users set status = ? where id = ?'
	db.query(sqlUpdate, [status, id], (err, results) => {
		if (err) return res.cc(err)
		let message = '解冻成功'
		if (status == 1) {
			message = '冻结成功'
		}
		res.send({
			status: 0,
			message
		})
	})
}
//获取冻结用户列表
export const getBanUsersList = (req, res) => {
	const sqlSelect = 'select * from users where status = 1'
	db.query(sqlSelect, (err, results) => {
		if (err) return res.cc(err)
		res.send(results)
	})
}

// 获取所有用户列表
export const getAllUser = (req, res) => {
	const sqlSelect = 'select * from users order by id'
	db.query(sqlSelect, (err, results) => {
		if (err) return res.cc(err)
		results.forEach(item => {
			item.password = '',
				item.create_time = dayjs(item.create_time).format('YYYY-MM-DD')
		});
		res.send(results)
	})
}

//删除用户
export const deleteUser = (req, res) => {
	const sqlDelete = 'delete from users where id = ?'
	const sqlDeleteImage = 'delete from image where account = ?'
	db.query(sqlDelete, req.body.id, (err, results) => {
		if (err) return res.cc(err)
		db.query(sqlDeleteImage, req.body.account, (err, results) => {
			if (err) return res.cc(err)
			res.send({
				status: 0,
				message: '删除用户成功'
			})
		})
	})
}