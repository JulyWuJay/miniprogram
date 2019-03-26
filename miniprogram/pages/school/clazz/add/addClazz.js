// miniprogram/pages/school/clazz/add/addClazz.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clazz: {
      // _id: '',
      name: '添加',
      admin: '选择'
    },
    // 所有的教师
    allTeacher: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllTeacher()
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
  getAllTeacher: function () {
    wx.cloud.callFunction({
      name: 'http',
      data: {
        type: 'getAll',
        collectionName: 'teacher',
        prams: null
      },
      success: res => {
        console.log(res);
        this.setData({
          allTeacher: res.result.data
        });
        console.log(this.data.allTeacher)
      },
      fail: fail => {
        console.log(fail)
      }
    })
  },
  nameInput: function (e) {
    console.log(e.detail.value)
    this.setData({
      ['clazz.name'] : e.detail.value
    })
  },
  teacherChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      ['clazz.admin'] : e.detail.value
    })
  },
  toConfirm: function () {
    const that = this;
    console.log(this.data.clazz);
    wx.cloud.callFunction({
      name: 'http',
      data: {
        type: 'addClazz',
        collectionName: 'clazz',
        prams: this.data.clazz
      },
      success: res => {
        // console.log(res);
        if (res.result.errMsg == 'collection.add:ok') {
          wx.showModal({
            title: '添加成功',
            content: '继续添加信息吗',
            success(res) {
              if (res.confirm) {
                // that.onLoad();
                that.setData({
                  ['clazz.name']: '添加',
                  ['clazz.admin'] : '选择',
                  allTeacher: []
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        } else {
          wx.showToast({
            title: '出错了',
            image: '/images/icon/fail.png',
            duration: 2000
          });
        }
      },
      fail: fail => {
        consol.log(fail);
        wx.showToast({
          title: '出错了',
          image: '/images/icon/fail.png',
          duration: 2000
        });
      }
    })
  }
})