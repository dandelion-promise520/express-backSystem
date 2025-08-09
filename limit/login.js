import joi from 'joi'

//string值只能为字符串
//alphanum a-z A-Z 0-9
//min为最小值，max为最大值
//required为必填项
//pattern为正则，密码要求符合这个正则
//这个正则意为：至少一个小写字母、至少一个大写字母、至少一个数字和至少一个特殊字符。 而 {8,} 则表示密码长度至少为8位。 符号 ^ 和 $ 分别表示字符串的开头和结尾。

const account = joi.string().required()

const password = joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,16}/).required()

export const login_limit = {
    body: {
        account,
        password
    }
}