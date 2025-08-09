import joi from 'joi'

//string值只能为字符串
//alphanum a-z A-Z 0-9
//min为最小值，max为最大值
//required为必填项
//pattern为正则，密码要求符合这个正则
//这个正则意为：至少一个小写字母、至少一个大写字母、至少一个数字和至少一个特殊字符。 而 {8,} 则表示密码长度至少为8位。 符号 ^ 和 $ 分别表示字符串的开头和结尾。

const id = joi.required()
const name = joi.string().required()
const department = joi.string().required()
const sex = joi.string().required()
const identity = joi.string().required()
const email = joi.string().pattern(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/).required()
const oldPassword = joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,16}/).required()
const newPassword = joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,16}/).required()
const password = joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,16}/).required()
const account = joi.string().required()

export const name_limit = {
    body: {
        id,
        name
    }
}

export const email_limit = {
    body: {
        id,
        email
    }
}

export const account_limit = {
    body: {
        id,
        account
    }
}

export const password_limit = {
    body: {
        id,
        newPassword,
        oldPassword
    }
}

export const forgetPasswordInLogin_limit = {
    body: {
        id,
        password,
    }
}

export const createAdmin_limit = {
    body: {
        account,
        password,
        name,
        email,
        sex,
        department,
        identity
    }
}

export const editorAdmin_limit = {
    body: {
        id,
        account,
        name,
        sex,
        email,
        department
    }
}