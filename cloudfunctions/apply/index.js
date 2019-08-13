// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();


// 云函数入口函数
exports.main = async (event, context) => {
  return chooseFunction(event);
}
function chooseFunction(event) {
  switch (event.type) {
    case 'integrationApply': {
      return integrationApply(event.props);
    }
  }
}

async function integrationApply(props) {
  return db.collection('integration_apply').add({
    data: {
      application_date: props.application_date,
      description: props.description,
      integration: props.integrtation,
      status: props.status
    },
    success: console.success,
    fail: console.fail
  })
}