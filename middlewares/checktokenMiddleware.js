const jwt = require('jsonwebtoken')
const {secret} = require('../config/config')
module.exports = (req,res,next) => {
    //获取token
    let token = req.get('token')
    //判断
    if(!token) {
      res.json({
        code: '2003',
        msg: 'token 缺失',
        data: null
      })
      jwt.verify(token,secret,(data,err) => {
        if(err) {
          return res.json({
            code: '2004',
            msg: '校验失败',
            data: null
          })
        }
        next()
        req.user = data
      })
    }
}