import GoDB from 'godb'

// 定义数据库结构
const schema = {
  users: {
    id: {
      type: String,
      unique: true,
    },
    name: String,
    age: Number,
    sex: String,
  }
}

// 连接数据库
const myDB = new GoDB('myGoDB', schema)
// 建表
const user = myDB.table('users')

// 去除proxy
const removeProxy = (data) => JSON.parse(JSON.stringify(data))
// 新增
const add = (data) => user.add(removeProxy(data))

//   获取单个
const read = (id) => user.get(id)

//   获取所有
const readAll = () => user.getAll()

//   更新
const update = (data) => user.put(data)

//   删除
const remove = (id) => user.delete(id)

// 一次性添加多条数据
const addMany = (data) => user.addMany(data)

// 在浏览器打印出数据
const getInfo = () => user.consoleTable()

// 查找数据
const searchByName = (name) => user && user.find((item) => item?.name === name)

export { add, read, readAll, update, remove, searchByName, addMany, getInfo }
