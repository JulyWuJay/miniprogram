// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

// const MAX_LIMIT = 100
// 云函数入口函数
exports.main = (event, context) => {
  // event: {
  //   type: 'getAll',
  //   collectionName: 'clazz',
  //   prams: null
  // }, 
  return chooseFunction(event);
};


function chooseFunction(event){
  switch(event.type){
    case 'getAll':{
      const result = getAll(event.collectionName);
      return result;
    }
    case 'getStudentByClazz':{
      return getStudentByClazz(event);
    }
    case 'getTotalNum' :{
      return getTotalNum(event);
    }
    // 根据id查个体
    case 'getById' :{
      return getById(event);
    }
    case 'updateStudent' : {
      return updateStudent(event);
    }
  }
}


// 获取集合的全部数据  20条
function getAll(collectionName){
  const result = db.collection(collectionName).get({
    success: res => {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      console.log(res.data);
    }
  });
  return result;
  // const countResult = await db.collection(collectionName).count();
}
// 获取集合有多少条数据
function getTotalNum(event){
  return db.collection(event.collectionName).count({
    success(res) {
      console.log(res.total)
    }
  })
}
// 根据班级查询
function getStudentByClazz(event){
  const result = db.collection(event.collectionName).where({
    ['clazz.clazzId']: event.prams
  }).get({
    success: console.log,
    fail: console.error
  });
  return result;
}

function getById(event){
  const result = db.collection(event.collectionName).where({
    _id: event.prams
  }).get({
    success: console.log,
    fail: console.error
  });
  return result;
}

function updateStudent(event){
  // return 'ok'
  // try {
  //   return await db.collection('student').where({_id: 'XGpIe-SiwXKAQp9K'}).update({
  //     // data 传入需要局部更新的数据
  //     data: {
  //       // _id: "",
  //       age: "12",
  //       clazz: {
  //         clazzId: 'XIduyeSiwXKAQrZh',
  //         clazzName: '三班'
  //       },
  //       contacts: "13511701064",
  //       contactsName: "妈妈",
  //       gender: '0',
  //       name: '吴大哥' 
  //     }
  //   })
  // } catch (e) {
  //   console.log(e)
  // }
}