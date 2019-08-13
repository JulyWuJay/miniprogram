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
  }
}

function integrationApply(props) {
  return db.collection(dbName).add({
    data: {
      application_date: props.application_date,
      description: props.description,
      integration: props.integration,
      status: props.status
    },
    success: console.success,
    fail: console.fail
  })
}
// 查询未处理过的申请 也就是处于待审核状态的apply 要分页 每页5条数据
// props currentPage 
async function searchUndoApplication(props) {
  const MAX = 5;
  const SKIP = MAX * (props.currentPage - 1);
  // return 'search ok'
  const count = await db.collection(dbName).where({
    status: '待审批'
  }).count();
  const total = (count.total > 5 ) ? Math.ceil(count.total/5) : 1;
  const all =  await db.collection(dbName).skip(SKIP).limit(MAX).where({
    status: '待审批'
  }).get();
  const result = {
    totalPage: total,
    list: all.data,
    currentPage: props.currentPage,
    allListNum: count.total,
    status: 'ok'
  }
  return result
}