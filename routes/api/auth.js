var express = require('express');
var router = express.Router();
const UserModel = require('../../models/UserModel');
const md5 = require('md5');
const jwt = require('jsonwebtoken')
const {secret} = require('../../config/config')



//登录操作
router.post('/login',(req,res) => {
    let { username,password } = req.body
    UserModel.findOne({username: username,password: md5(password)}).then((data)=>{
        if (data) { // 检查用户是否存在
            //创建token
            let token = jwt.sign({
                username: data.username,
                _id: data._id
            },secret,{
                expiresIn: 60 * 60 * 24 * 7
            })
            //响应token
            res.json({
                code: '0000',
                msg: '登陆成功',
                data: token
            })
            res.render('success', { msg: '登陆成功', url: '/account' });
        } else {
            res.json({
                code: '2002',
                msg: '用户名或密码错误',
                data: null
            })
        }
    }).catch((data,err)=>{
        res.json({
            code: '2001',
            msg: '数据库错误',
            data: null
        })
    })
})
//退出登录
router.post('/logout',(req,res) => {
    req.session.destroy(() => {
        res.render('success',{msg: '退出成功',url: '/login'})
    })
})
module.exports = router;
