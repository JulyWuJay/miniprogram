// miniprogram/pages/school/time/individual/individual.js
const url = require('../../../../js/url/url.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clazzId: '',
    clazz: {} ,
    plusUrl: '',
    timeTarget: '',  // 星期几上午下午
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      clazzId: options.clazzId
    });
    const imgUrl = new url.URL();
    this.setData({
      plusUrl: imgUrl.plusUrl
    });
    // console.log(imgUrl);
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
    wx.showLoading({
      title: '加载中',
    });
    this.getClazzById(this.data.clazzId);
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
  getClazzById: function (id) {
    // console.log(id);
    wx.cloud.callFunction({
      name: 'http',
      data: {
        type: 'getById',
        collectionName: 'clazz',
        prams: id
      },
      success: res => {
        wx.hideLoading();
        const result = res.result.data[0];
        this.setData({
          clazz: result
        })
        console.log(this.data.clazz);
      },
      fail: res => console.log(res)
    })
  },
  confirmTime: function (e) {
    console.log(e)
  },
  toDeleteSubject: function (e) {
    const that =  this;
    const target = e.currentTarget.id;
    this.setData({
      timeTarget: target
    });
    wx.showModal({
      title: '移除',
      content: '确认移除该课程嘛',
      success(res) {
        if (res.confirm) {
          // console.log('用户点击确定')
          that.deleteSubject(target);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    console.log(target);
  },
  deleteSubject: function (target) {
    const that = this;
    const subjectId = that.data.clazz.time.monday.morning.subjectId;
    const clazzId = that.data.clazz._id;
    switch (target) {
      case '11' : {
        that.setData({
          ['clazz.time.monday.morning.subjectId']: '',
          ['clazz.time.monday.morning.subjectName']: '',
        });
        break;
      }
      case '12': {
        that.setData({
          ['clazz.time.monday.afternoon.subjectId']: '',
          ['clazz.time.monday.afternoon.subjectName']: '',
        });
        break;
      }
      case '21': {
        that.setData({
          ['clazz.time.tuesday.morning.subjectId']: '',
          ['clazz.time.tuesday.morning.subjectName']: '',
        });
        break;
      } case '22': {
        that.setData({
          ['clazz.time.tuesday.afternoon.subjectId']: '',
          ['clazz.time.tuesday.afternoon.subjectName']: '',
        });
        break;
      } case '31': {
        that.setData({
          ['clazz.time.wednesday.morning.subjectId']: '',
          ['clazz.time.wednesday.morning.subjectName']: '',
        });
        break;
      } case '32': {
        that.setData({
          ['clazz.time.wednesday.afternoon.subjectId']: '',
          ['clazz.time.wednesday.afternoon.subjectName']: '',
        });
        break;
      } case '41': {
        that.setData({
          ['clazz.time.monday.morning.subjectId']: '',
          ['clazz.time.monday.morning.subjectName']: '',
        });
        break;
      } case '42': {
        that.setData({
          ['clazz.time.thursday.afternoon.subjectId']: '',
          ['clazz.time.thursday.afternoon.subjectName']: '',
        });
        break;
      } case '51': {
        that.setData({
          ['clazz.time.friday.morning.subjectId']: '',
          ['clazz.time.friday.morning.subjectName']: '',
        });
        break;
      } case '52': {
        that.setData({
          ['clazz.time.friday.afternoon.subjectId']: '',
          ['clazz.time.friday.afternoon.subjectName']: '',
        });
        break;
      }
    }
    // 更新数据库
    this.updateClazzTime();
    //  减少usingbook
    this.removeUsingBook( subjectId , clazzId);
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
        // 移除书籍
        // that.removeUsingBook(subjectId, clazzId);
      },
      fail: res => console.log(res)
    })
  },
  removeUsingBook: function ( subjectId , clazzId ) {
    const that = this;
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
        // console.log(bookId);
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
                type: 'removeUsingBook',
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

})