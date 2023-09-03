const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

//导入moment
const moment = require('moment')
const AccountModel = require('../../models/AccountModel')
let checktokenMiddleware = require('../../middlewares/checktokenMiddleware')
/* GET home page. */
//记账本的列表
router.get('/account',checktokenMiddleware, function(req, res, next) {

  //获取账单信息
  // const account = db.get('account').value()
  AccountModel.find().sort({time:-1}).catch((err,data) => {
    if(err) {
      res.json({
        code: '1001',
        msg: '读取失败',
        data: null
      })
      return 
    }
  }).then((data)=>{
    res.json({
        code: '0000',
        msg: '读取成功',
        data: data
    })
  })

});
//添加记录
router.get('/account/create',checktokenMiddleware,function(req,res,next){
  res.render('create')
})
//新增记录
router.post('/account',checktokenMiddleware,function(req,res,next) {
  //写入文件
  //2023-8-14  => moment  => new Data()
  AccountModel.create({
    ...req.body,
    time: moment(req.body.time).toDate()
  }).then((data) => {
    //成功提醒
    // res.render('success',{msg:'添加成功了',url:'/account'})
    res.json({
      code:'1001',
      msg:'创建成功',
      data: data
    })
  })

})
//删除记录
router.delete('/account/:id',checktokenMiddleware,(req,res) => {
  let id = req.params.id
  // db.get('account').remove({id:id}).write()
  AccountModel.deleteOne({_id:id}).then(() => {
    //提醒
    // res.render('success',{msg:'删除成功了',url:'/account'})
    res.json({
      code:'1001',
      msg:'删除成功',
      data:{}
    })
  }).catch((err) => {
    res.json({
      code:'1002',
      msg:'删除失败',
      data:null
    })
  })

})
//获取单个账户的信息
router.get('/account/:id',checktokenMiddleware,(req,res) => {
  let {id} = req.params
  //查询数据库
  AccountModel.findById(id).then((data)=> {
    res.json({
      code: '1001',
      msg: '读取成功',
      data: data
    })
  }).catch((err) => {
    res.json({
      code:' 1004',
      msg: '读取失败！',
      data: err
    })
  }) 
})
//更新账单
router.patch('/account/:id',checktokenMiddleware,(req,res) => {
  let {id} = req.params
  AccountModel.updateOne({_id:id},req.body).then((data) => {
    res.json({
      code: '1001',
      msg: '更新成功',
      data: data
    })
  }).catch((err) => {
    res.json({
      code:' 1005',
      msg: '更新失败！',
      data: err
    })
  })
})
module.exports = router;
