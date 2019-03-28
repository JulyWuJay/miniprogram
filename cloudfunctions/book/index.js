// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  // event: {
  //   prams: {
  //     bookId: '',
  //     num: 
  //   }
  // }, 
  return chooseFunction(event);
}

function chooseFunction(event) {
  switch(event.type){
    case 'addBook' :
      return addBook(event);
    case 'deleteBook':
      return deleteBook(event);
  }
}

async function addBook(event) {
  // 调用 根据id获取数据 获得书籍的数目
  try{
    const getBookById = await cloud.callFunction({
      name: 'http',
      data: {
        type: 'getById',
        collectionName: 'book',
        prams: event.bookId
      },
      success: res => {
        console.log(res)
      },
      fail: fail => {
        console.log(fail);
      }
    });
    const databaseBook = getBookById.result.data[0];
    // 加上传来的需要添加的书本之后的值
    const newAll = databaseBook.all + event.num;
    const newStock = databaseBook.stock + event.num;
    const newUsing = databaseBook.using;
    const updateBook = await cloud.callFunction({
      name: 'http',
      data: {
        type: 'updateBook',
        collectionName: 'book',
        prams: {
          all: newAll,
          stock: newStock,
          using: newUsing
        },
        success: res => {
          console.log(res);
        },
        fail: fail => {
          console.log(fail)
        }
      }
    });
    return updateBook.result;
  } catch (err) {
    return 'fail';
  }
}

async function deleteBook(event) {
  try {
    // 先获取数据库里的书籍信息
    const getBookById = await cloud.callFunction({
      name: 'http',
      data: {
        type: 'getById',
        collectionName: 'book',
        prams: event.bookId
      },       
      success: res => {
        console.log(res);
      },
      fail: fail => {
        console.log(fail)
      }
    });
    const databaseBook = getBookById.result.data[0];
    const newAll = databaseBook.all - event.num;
    const newStock = databaseBook.stock - event.num;
    const newUsing = databaseBook.using;
    // 减去数量
    const updateBook = await cloud.callFunction({
      name: 'http',
      data: {
        type: 'updateBook',
        collectionName: 'book',
        prams: {
          all: newAll,
          stock: newStock,
          using: newUsing
        },
        success: res => {
          console.log(res);
        },
        fail: fail => {
          console.log(fail)
        }
      }
    });
    return updateBook.result;
  } catch (err) {
    return err;
  }
}