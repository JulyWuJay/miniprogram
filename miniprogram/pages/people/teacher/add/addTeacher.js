// miniprogram/pages/people/teacher/add/addTeacher.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacher: {
      subject: '选择',
      phone: '请输入',
      name: '填写',
      gender: '男',
      age: '输入'
    },
    genderChecked: '男',
    toChooseSubject: false,
    subject: [
      {
        name: '数据库'
      },
      {
        name: '数学'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  nameInput: function (e) {
    console.log(e.detail.value);
    this.setData({
      ['teacher.name']: e.detail.value
    });
  },
  // age
  ageInput: function (e) {
    console.log(e.detail.value);
    this.setData({
      ['teacher.age']: e.detail.value
    })
  },
  phoneInput: function (e) {
    console.log(e.detail.value);
    this.setData({
      ['teacher.phone']: e.detail.value
    })
  },
  genderChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      ['teacher.gender']: e.detail.value
    })
  },
  subjectChange: function (e) {
    // console.log(e.detail);
    this.setData({
      ['teacher.subject']: e.detail.value
    })
  },
  toChooseSubject: function () {
    if (this.data.toChooseSubject) {
      this.setData({
        toChooseSubject: false
      })
    } else {
      this.setData({
        toChooseSubject: true
      })
    }
  },
  toConfirm: function () {
    // console.log(this.data.teacher);
    // this.confirm();
    const that = this;
    wx.showModal({
      title: '添加',
      content: '确认添加新的信息吗',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          that.addTeacher();
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  },
  addTeacher: function() {
    const that = this;
    wx.cloud.callFunction({
      name: 'http',
      data: {
        type: 'addTeacher',
        collectionName: 'teacher',
        prams: this.data.teacher
      },
      success: res => {
        // console.log(res);
        if (res.errMsg == 'cloud.callFunction:ok') {
          wx.showModal({
            title: '添加成功',
            content: '继续添加信息吗',
            success(res) {
              if (res.confirm) {
                that.onLoad();
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
          })
        }
      },
      fail: res =>  {
        debugger
        console.log(res)
      }
    })
  }
})