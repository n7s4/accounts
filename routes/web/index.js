var express = require('express');
var router = express.Router();
//导入moment
const moment = require('moment')
const AccountModel = require('../../models/AccountModel')
//声明中间件检测登录
let checkLoginMiddleware = require('../../middlewares/checkLoginMiddleware')
/* GET home page. */
//首页
router.get('/',(req,res) => {
  res.redirect('/account')
})
//记账本的列表
router.get('/account', checkLoginMiddleware,function(req, res, next) {
  //获取账单信息
  // const account = db.get('account').value()
  AccountModel.find().sort({time:-1}).catch((err,data) => {
    if(err) {
      res.status(500).send('读取失败')
      return 
    }
  }).then((data)=>{
    res.render('list',{account:data,moment:moment})
  })

});
//添加记录
router.get('/account/create',checkLoginMiddleware,function(req,res,next){
  res.render('create')
})
//新增记录
router.post('/account',checkLoginMiddleware,function(req,res,next) {
  //写入文件
  //2023-8-14  => moment  => new Data()
  AccountModel.create({
    ...req.body,
    time: moment(req.body.time).toDate()
  }).then(() => {
    //成功提醒
    res.render('success',{msg:'添加成功了',url:'/account'})
  })

})
//删除记录
router.get('/account/:id',checkLoginMiddleware,(req,res) => {
  let id = req.params.id
  // db.get('account').remove({id:id}).write()
  AccountModel.deleteOne({_id:id}).then(() => {
      //提醒
  res.render('success',{msg:'删除成功了',url:'/account'})
  }).catch((err) => {
    if(err) {
      res.status(500).send('删除失败')
      return 
    }
  })

})


module.exports = router;
