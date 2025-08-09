import moment from 'moment-timezone';

// 获取当前的UTC时间
const currentTime = moment.utc();

// 将当前时间转换为北京时间
const beijingTime = currentTime.tz('Asia/Shanghai');

// 格式化输出为MySQL DATETIME格式
const formattedDateTime = beijingTime.format('YYYY-MM-DD HH:mm:ss');

// 导出formattedDateTime
export default formattedDateTime;