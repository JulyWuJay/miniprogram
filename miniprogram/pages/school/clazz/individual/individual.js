// miniprogram/pages/school/clazz/individual/individual.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clazz: {
      _id: '',
      name: '',
      admin: ''
    },
    // 所有的教师
    allTeacher: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.getClazzById(options.clazzId);
    this.setData({
      ['clazz._id'] : options.clazzId
    });
    this.getAllTeacher();
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
  getClazzById: function (id) {
    console.log(id);
    wx.cloud.callFunction({
      name: 'http',
      data: {
        type: 'getById',
        collectionName: 'clazz',
        prams: id
      },
      success: res => {
        // console.log(res.result.data[0]);
        const result = res.result.data[0];
        this.setData({
          ['clazz.name'] : result.name,
          ['clazz.admin']: result.admin,
        });
        console.log(this.data.clazz);
      },
      fail: res =>  console.log(res)
    })
  },
  nameInput: function (e) {
    this.setData({
      ['clazz.name'] : e.detail.value
    })
  },
  teacherChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      ['clazz.admin'] : e.detail.value
    })
  },
  // 去保存
  toConfirm: function () {
    console.log(this.data.clazz)
    wx.cloud.callFunction({
      name: 'http',
      data: {
        type: 'updateClazz',
        collectionName: 'clazz',
        prams: this.data.clazz
      },
      success: res => {
        console.log(res);
        if ( res.result.errMsg == 'collection.update:ok' ) {
        // debugger
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000
          });
        }
      },
      fail: fail => {
        console.log(fail);
        wx.showToast({
          title: '出错了',
          image: '/images/icon/fail.png',
          duration: 2000
        })
      }
    })
  }
})