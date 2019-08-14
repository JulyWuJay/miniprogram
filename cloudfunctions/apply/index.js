// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const dbName = 'integration_apply';

// 云函数入口函数
exports.main = async (event, context) => {
  return chooseFunction(event);
}
function chooseFunction(event) {
  switch (event.type) {
    case 'integrationApply': return integrationApply(event.props);
    case 'searchUndoApplication': return searchUndoApplication(event.props);
    case 'agreeApply': return agreeApply(event.props);
  }
}
// 添加申请
function integrationApply(props) {
  return db.collection(dbName).add({
    data: {
      application_date: props.application_date,
      description: props.description,
      integration: props.integration,
      status: props.status,
      time: props.time
    },
    success: console.success,
    fail: console.fail
  })
}
// 删除一条记录
function  deleteIntegrationApply (id) {
  return db.collection(dbName).where({
    _id: id
  }).remove()
}
// 查询未处理过的申请 也就是处于待审核状态的apply 要分页 每页5条数据
// props currentPage 
async function searchUndoApplication(props) {
  const MAX = 10;
  const SKIP = MAX * (props.currentPage - 1);
  // return 'search ok'
  const count = await db.collection(dbName).count();
  const total = (count.total > MAX ) ? Math.ceil(count.total/MAX) : 1;
  const all = await db.collection(dbName).orderBy('time', 'desc').skip(SKIP).limit(MAX).get();
  const result = {
    totalPage: total,
    list: all.data,
    currentPage: props.currentPage,
    allListNum: count.total,
    status: 'ok'
  }
  return result 
}

// 同意申请
async function agreeApply (props) {
  const id = props.id;
  // 先根据id查申请的信息
  const applyInfo = await db.collection(dbName).where({
    _id: id
  }).get()
  const applyInfoData = applyInfo.data[0];
                // application_date: "2019-08-14 10:54"
                // description: "hahah"
                // integration: 60
                // status: "待审批"
                // time: 1565751279560
                // _id: "890198e15d5377f31398dd3b31fd2938"
  // 加分
     // 先获取当前的分数
  const nowIntegration = await db.collection('integration').get();
  // 当前的分数
  const nowIntegrationData = nowIntegration.data[0];
  const trueIntegration = applyInfoData.integration + nowIntegrationData.integration;
  // 更新分数
  // const result =  await db.collection('integration').where({
  //   _id: nowIntegrationData._id
  // }).update({
  //   integration: trueIntegration
  // })
  // 加分记录写进detail
  // 删除申请的信息
  return nowIntegrationData;

} 