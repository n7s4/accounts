//导入gongoose
const mongoose = require('mongoose')
let BookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true  //表明该属性必须不为空
    },
    // name: String,
    author: String,
    price: Number,
    gender: {
        type: String,
        enum: ['男', '女']
    }
})
//创建模型对象  对文档操作的封装对象
let BookModel = mongoose.model('books', BookSchema)
module.exports = BookModel