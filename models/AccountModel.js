//导入gongoose
const mongoose = require('mongoose')
let AccountSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    time: {
        type: Date
    },
    type: {
        type: Number,
        default: -1
    },
    money: {
        type: Number,
        required: true
    },
    remarks: {
        type: String
    }
})
//创建模型对象  对文档操作的封装对象
let AccountModel = mongoose.model('accounts', AccountSchema)
module.exports = AccountModel