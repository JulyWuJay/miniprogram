// miniprogram/pages/school/time/chooseSubject/chooseSubject.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    target: '',
    clazz: {},
    allSubject: [],
    chosedSubject: {
      id: '',
      name: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const pages = getCurrentPages();
    // 上一个页面
    const prePage = pages[pages.length - 2];
    const target = options.target;
    this.setData({
      target: target,
      clazz: prePage.data.clazz
    });
    console.log(this.data);
    // 加载学科
    this.loadSubject();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 加载学科信息
  loadSubject: function () {
    let that = this;
    // 获取班级
    wx.cloud.callFunction({
      // 云函数名称
      name: 'http',
      // 传给云函数的参数
      data: {
        type: 'getAll',
        collectionName: 'subject',
        prams: null
      },
      success(res) {
        that.setData({
          allSubject: res.result.data
        });
      },
      fail: console.error
    });
  },
  subjectChange: function (e) {
    const that = this;
    const id = e.detail.value;
    wx.cloud.callFunction({
      name: 'http',
      data: {
        type: 'getById',
        collectionName: 'subject',
        prams: id
      },
      success: res => {
        console.log(res);
        that.setData({
          ['chosedSubject.id']: id,
          ['chosedSubject.name']: res.result.data[0].name
        });
        console.log(that.data.chosedSubject);
      },
      fail: fail => {
        console.log(fail)
      }
    })
  },
  toConfirm: function () {
    const that = this;
    wx.showModal({
      title: '保存',
      content: '确定选择该课程吗？',
      success(res) {
        if (res.confirm) {
          // console.log('用户点击确定')
          // console.log(that.data)
          that.confirm();
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  },
  confirm: function () {
    const target = this.data.target;
    const chosedSubject = this.data.chosedSubject;
    const clazzId = this.data.clazz._id;
    const that = this;
    switch (target) {
      case '11': {
        that.setData({
          ['clazz.time.monday.morning.subjectId']: chosedSubject.id,
          ['clazz.time.monday.morning.subjectName']: chosedSubject.name,
        });
        break;
      }
      case '12': {
        that.setData({
          ['clazz.time.monday.afternoon.subjectId']: chosedSubject.id,
          ['clazz.time.monday.afternoon.subjectName']: chosedSubject.name,
        });
        break;
      }
      case '21': {
        that.setData({
          ['clazz.time.tuesday.morning.subjectId']: chosedSubject.id,
          ['clazz.time.tuesday.morning.subjectName']: chosedSubject.name,
        });
        break;
      } case '22': {
        that.setData({
          ['clazz.time.tuesday.afternoon.subjectId']: chosedSubject.id,
          ['clazz.time.tuesday.afternoon.subjectName']: chosedSubject.name,
        });
        break;
      } case '31': {
        that.setData({
          ['clazz.time.wednesday.morning.subjectId']: chosedSubject.id,
          ['clazz.time.wednesday.morning.subjectName']: chosedSubject.name,
        });
        break;
      } case '32': {
        that.setData({
          ['clazz.time.wednesday.afternoon.subjectId']: chosedSubject.id,
          ['clazz.time.wednesday.afternoon.subjectName']: chosedSubject.name,
        });
        break;
      } case '41': {
        that.setData({
          ['clazz.time.thursday.morning.subjectId']: chosedSubject.id,
          ['clazz.time.thursday.morning.subjectName']: chosedSubject.name,
        });
        break;
      } case '42': {
        that.setData({
          ['clazz.time.thursday.afternoon.subjectId']: chosedSubject.id,
          ['clazz.time.thursday.afternoon.subjectName']: chosedSubject.name,
        });
        break;
      } case '51': {
        that.setData({
          ['clazz.time.friday.morning.subjectId']: chosedSubject.id,
          ['clazz.time.friday.morning.subjectName']: chosedSubject.name,
        });
        break;
      } case '52': {
        that.setData({
          ['clazz.time.friday.afternoon.subjectId']: chosedSubject.id,
          ['clazz.time.friday.afternoon.subjectName']: chosedSubject.name,
        });
        break;
      }
    }
    that.updateClazzTime();
    that.addUsingBook( chosedSubject.id , clazzId);
  },
  updateClazzTime: function () {
    const that = this;
    wx.cloud.callFunction({
      name: 'http',
      data: {
        type: 'updateClazzTime',
        prams: that.data.clazz
      },
      success: res => {
        console.log(res);
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        });
      },
      fail: res => console.log(res)
    })
  },
  addUsingBook: function (subjectId, clazzId) {
    const that = this;
    // 判断是否已经选过该课程 选过true 如果选过，就不添加usingbook
    const target = this.checkHadSubject(subjectId);
    if ( target ) {
      console.log('已经选过，无需在添加usingbook')
    } else {
      // 根据subjectId获取bookId
      wx.cloud.callFunction({
        name: 'http',
        data: {
          type: 'getById',
          collectionName: 'subject',
          prams: subjectId
        },
        success: res => {
          // console.log(res);
          const bookId = res.result.data[0].book.bookId;
          // 获取到了bookId
          // 根据clazzId获取学生数量
          wx.cloud.callFunction({
            name: 'http',
            data: {
              type: 'getStudentByClazz',
              collectionName: 'student',
              prams: clazzId
            },
            success: res => {
              // 学生数量
              const stuNum = res.result.data.length;
              // 加上学生数量的book 
              wx.cloud.callFunction({
                name: 'book',
                data: {
                  type: 'addUsingBook',
                  bookId: bookId,
                  num: stuNum
                },
                success: res => {
                  console.log('webadd', res);
                },
                fail: fail => {
                  console.log(fail);
                }
              });

            },
            fail: console.error
          });
          // 根据clazzId获取学生数量结束
        },
        fail: res => console.log(res)
      });
    }
  },
  // 检查是否已经选了该课程了 
  checkHadSubject: function (subjectId) {
    const time = this.data.clazz.time;
    console.log(time);
    let target = 0;
    for (let day in time) {
      for (let noon in time[day]) {
        for (let subject in time[day][noon]) {
          // console.log(id)
          if (time[day][noon][subject] === subjectId) {
            target++;
            // console.log('y', day)
          }
        }
      }
    };
    if (target >= 2) {
      return true;
    } else {
      return false;
    }
  } 

})