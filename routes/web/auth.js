var express = require('express');
var router = express.Router();
const UserModel = require('../../models/UserModel');
const md5 = require('md5');

router.get('/reg',(req,res) => {
    res.render('auth/reg')
})
//注册用户
router.post('/reg',(req,res) => {
    UserModel.create({...req.body,password:md5(req.body.password)}).then(()=>{
        res.render('success',{msg: '注册成功',url: '/login'})
    }).catch(()=>{
        res.status(500).send('注册失败，请稍后再试')
    })
})
//登录页面
router.get('/login', (req, res) => {
    //响应 HTML 内容
    res.render('auth/login');
})
//登录操作
router.post('/login',(req,res) => {
    let { username,password } = req.body
    UserModel.findOne({username: username,password: md5(password)}).then((data)=>{
        if (data) { // 检查用户是否存在
            req.session.username = data.username
            req.session._id = data._id
            res.render('success', { msg: '登陆成功', url: '/account' });
        } else {
            res.send('账号或密码错误');
        }
    }).catch((err)=>{
        res.status(500).send('登陆失败！');
    })
})
//退出登录
router.post('/logout',(req,res) => {
    req.session.destroy(() => {
        res.render('success',{msg: '退出成功',url: '/login'})
    })
})
module.exports = router;
