import db from '../database/index.js'

// 导入fs
import fs from 'fs'

// 上传轮播图接口
export const uploadSwiper = (req,res)=>{
	const {set_name} = req.body
	// res.send(req.files[0])
	const oldName = req.files[0].filename
	const newName = Buffer.from(req.files[0].originalname,'utf8').toString()
	fs.renameSync('./public/upload/'+oldName,'./public/upload/'+newName)
	const sqlUpdate = 'update setting set set_value = ? where set_name = ?'
	let id
	const sqlSelect = 'select * from setting where set_name = ?'
	db.query(sqlSelect,set_name,(err,results)=>{
		if(err) return res.cc(err)
		id = results[0].id
	})
	db.query(sqlUpdate,[`/upload/${newName}`,set_name],(err)=>{
		if(err) return res.cc(err)
		res.send({
			status:0,
			message:'上传轮播图成功',
			img_url: `/upload/${newName}`,
			id
		})
	})
}

// 获取所有轮播图接口
export const getAllSwiper = (req,res)=>{
	const sqlSelect = 'select * from setting where set_name like "轮播图%"'
	db.query(sqlSelect,(err,results)=>{
		if(err) return res.cc(err)
		res.send({
			status:0,
			message:'获取轮播图成功',
			results
		})
	})
}

// 修改公司名称接口
export const changeCompanyName = (req,res)=>{
	const sqlUpdate = 'update setting set set_value = ? where set_name = "公司名称"'
	db.query(sqlUpdate,req.body.set_value,(err)=>{
		if(err) return res.cc(err)
		res.send({
			status:0,
			message:'修改公司名称成功',
		})
	})
}

// 获取公司名称接口
// exports.getCompanyName = (req,res)=>{
// 	const sqlSelect = 'select * from setting where set_name ="公司名称"'
// 	db.query(sqlSelect,(err,results)=>{
// 		if(err) return res.cc(err)
// 		res.send({
// 			status:0,
// 			message:'获取公司名称成功',
// 			results
// 		})
// 	})
// }

// 编辑公司信息接口
export const changeCompanyIntroduce= (req,res)=>{
	const{set_text,id} = req.body
	const sqlUpdate = 'update setting set set_text = ? where id = ?'
	db.query(sqlUpdate,[set_text,id],(err)=>{
		if(err) return res.cc(err)
		res.send({
			status:0,
			message:'修改公司信息成功',
		})
	})
}

// 获取公司信息接口
export const getAllCompanyIntroduce = (req,res)=>{
	const sqlSelect = 'select * from setting where set_name like "公司%" order by id'
	db.query(sqlSelect,(err,results)=>{
		if(err) return res.cc(err)
		res.send({
			status:0,
			message:'获取公司信息成功',
			results
		})
	})
}