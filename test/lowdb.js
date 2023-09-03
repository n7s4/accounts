//导入lowdb
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
//初始化数据
// db.defaults({ posts:[], user: {} }).write()
//添加数据
// db.get('posts').push({id:1,title:'今天天气还不错~~'}).write()
//删除数据
// db.get('posts').remove({id:1}).write()
//更新数据
db.get('posts').find({id:2}).assign({title:'今天下了点小雨！！！'}).write()
//获取数据
console.log(db.get('posts').value());
