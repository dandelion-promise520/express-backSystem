// 导入mysql数据库
import mysql from 'mysql'
import dotenv from 'dotenv'

// 根据环境加载对应的环境变量
const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${env}` })

// 创建与数据库的连接
const db = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	port: process.env.DB_PORT || 3306,
	// 添加连接池配置
	connectionLimit: 10,
	queueLimit: 0,
	waitForConnections: true
})

// 测试数据库连接
db.getConnection((err, connection) => {
	if (err) {
		console.error('数据库连接失败:', err);
		return;
	}
	console.log('数据库连接成功');
	connection.release();
});

// 对外暴露数据库
export default db