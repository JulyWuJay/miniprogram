// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

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
    // 更新学生信息
    case 'updateStudent' : {
      return updateStudent(event);
    }
    // 添加学生信息
    case 'addStudent' : {
      return addStudent(event);
    }
    // 根据id删除
    case 'deleteById' : {
      return deleteById(event);
    }
    // 教师
    case 'updateTeacher' : {
      return updateTeacher(event);
    }
    case 'addTeacher' : {
      return addTeacher(event);
    }
    // 班级
    case 'updateClazz' : {
      return updateClazz(event);
    }
    case 'addClazz' : {
      return addClazz(event);
    }
    case 'updateClazzTime' : {
      return updateClazzTime(event);
    }
    // 根据id更新书籍
    case 'updateBook' : {
      return updateBook(event);
    }
    case 'addNewBook' : {
      return addNewBook(event);
    }
    case 'updateSubject' : {
      return updateSubject(event);
    }
    case 'addSubject' : {
      return addSubect(event);
    }
  }
}


// 获取集合的全部数据
function getAll(collectionName){
  const result = db.collection(collectionName).get({
    success: res => {
      // res.data 是一个包含集合中有权限访问的所有记录的数据
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
// 根据id查询
function getById(event){
  return db.collection(event.collectionName).where({
    _id: event.prams
  }).get({
    success: res => console.log("get success"),
    fail: console.error
  });
}
// 根据id删除
function deleteById(event){
  return db.collection(event.collectionName).where({
    _id: event.prams
  }).remove();
}

// 更新学生
function updateStudent(event){
  const student = event.prams;
  return db.collection('student').where({
    _id: student._id
  }).update({
    data: {
      age: student.age,
      clazz: student.clazz,
      contacts: student.contacts,
      contactsName: student.contactsName,
      gender: student.gender,
      name: student.name 
    },
    success: console.log,
    fail: console.fail
  })
}

// 添加学生
function addStudent(event){
  const student = event.prams;
  return db.collection('student').add({
    data:{
      age: student.age,
      clazz: student.clazz,
      contacts: student.contacts,
      contactsName: student.contactsName,
      gender: student.gender,
      name: student.name 
    },
    success: console.success,
    fail: console.fail
  })
}

// 更新教师
function updateTeacher(event){
  const teacher = event.prams;
  return db.collection('teacher').where({
    _id: teacher._id
  }).update({
    data: {
      age: teacher.age,
      gender: teacher.gender,
      name: teacher.name,
      phone: teacher.phone,
      subject: teacher.subject
    },
    success: console.log,
    fail: console.fail
  })
}

function updateBook(event){
  const book = event.prams;
  return db.collection('book').where({
    _id: book._id
  }).update({
    data: {
      all: book.all,
      stock: book.stock,
      using: book.using
    },
    success: res => {
      console.log(res);
    },
    fail: fail => {
      console.log(fail)
    }
  })
}

// 添加教师
function addTeacher(event) {
  const teacher = event.prams;
  return db.collection('teacher').add({
    data: {
      name: teacher.name,
      age: teacher.age,
      gender: teacher.gender,
      phone: teacher.phone,
      subject: teacher.subject
    },
    success: console.success,
    fail: console.fail
  })
}


// 更新班级
function updateClazz(event) {
  const clazz = event.prams;
  return db.collection('clazz').where({
    _id: clazz._id
  }).update({
    data: {
      name: clazz.name,
      admin: clazz.admin
    },
    success: res => console.log(res),
    fail: fail => console.log(fail)
  })
}

// 添加班级
function addClazz(event) {
  const clazz = event.prams;
  return db.collection('clazz').add({
    data: {
      name: clazz.name,
      admin: clazz.admin,
      time: {
        monday: {
          morning: {
            subjectId: '',
            subjectName: ''
          },
          afternoon: {
            subjectId: '',
            subjectName: ''
          }
        },
        tuesday: {
          morning: {
            subjectId: '',
            subjectName: ''
          },
          afternoon: {
            subjectId: '',
            subjectName: ''
          }
        },
        wednesday: {
          morning: {
            subjectId: '',
            subjectName: ''
          },
          afternoon: {
            subjectId: '',
            subjectName: ''
          }
        },
        thursday: {
          morning: {
            subjectId: '',
            subjectName: ''
          },
          afternoon: {
            subjectId: '',
            subjectName: ''
          }
        },
        friday: {
          morning: {
            subjectId: '',
            subjectName: ''
          },
          afternoon: {
            subjectId: '',
            subjectName: ''
          }
        }
      }
    },
    success: console.success,
    fail: console.fail
  })
}
// 更新班级
function updateClazzTime(event) {
  const clazz = event.prams;
  return db.collection('clazz').where({
    _id: clazz._id
  }).update({
    data: {
      ['time.monday.morning.subjectId']: clazz.time.monday.morning.subjectId,
      ['time.monday.morning.subjectName']: clazz.time.monday.morning.subjectName,
      ['time.tuesday.morning.subjectId']: clazz.time.tuesday.morning.subjectId,
      ['time.tuesday.morning.subjectName']: clazz.time.tuesday.morning.subjectName,
      ['time.thursday.morning.subjectId']: clazz.time.thursday.morning.subjectId,
      ['time.thursday.morning.subjectName']: clazz.time.thursday.morning.subjectName,
      ['time.wednesday.morning.subjectId']: clazz.time.wednesday.morning.subjectId,
      ['time.wednesday.morning.subjectName']: clazz.time.wednesday.morning.subjectName,
      ['time.friday.morning.subjectId']: clazz.time.friday.morning.subjectId,
      ['time.friday.morning.subjectName']: clazz.time.friday.morning.subjectName,

      ['time.monday.afternoon.subjectId']: clazz.time.monday.afternoon.subjectId,
      ['time.monday.afternoon.subjectName']: clazz.time.monday.afternoon.subjectName,
      ['time.tuesday.afternoon.subjectId']: clazz.time.tuesday.afternoon.subjectId,
      ['time.tuesday.afternoon.subjectName']: clazz.time.tuesday.afternoon.subjectName,
      ['time.thursday.afternoon.subjectId']: clazz.time.thursday.afternoon.subjectId,
      ['time.thursday.afternoon.subjectName']: clazz.time.thursday.afternoon.subjectName,
      ['time.wednesday.afternoon.subjectId']: clazz.time.wednesday.afternoon.subjectId,
      ['time.wednesday.afternoon.subjectName']: clazz.time.wednesday.afternoon.subjectName,
      ['time.friday.afternoon.subjectId']: clazz.time.friday.afternoon.subjectId,
      ['time.friday.afternoon.subjectName']: clazz.time.friday.afternoon.subjectName,

    },
    success: res => console.log(res),
    fail: fail => console.log(fail)
  })
}




// 添加书籍
function addNewBook(event) {
  const book = event.prams;
  return db.collection('book').add({
    data: {
      name: book.name,
      all: book.all,
      stock: book.stock,
      using: 0
    },
    success: console.success,
    fail: console.fail
  })
}

  
// 更新学科
function updateSubject(event) {
  const subject = event.prams;
  return db.collection('subject').where({
    _id: subject._id
  }).update({
    data: {
      name: subject.name,
      ['book.bookId']: subject.book.bookId,
      ['book.name']: subject.book.name
    },
    success: res => console.log(res),
    fail: fail => console.log(fail)
  })
}
// 添加学科
function addSubect(event) {
  const subject = event.prams;
  return db.collection('subject').add({
    data: {
      name: subject.name,
      book: {
        name: subject.book.name,
        bookId: subject.book.bookId
      }
    },
    success: console.success,
    fail: console.fail
  })
}