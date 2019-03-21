// miniprogram/pages/people/teacher/individual/individual.js
const model = require('../../../../js/model/model.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacherId: '',
    teacher: {
      _id: '',
      subject: '',
      phone: '',
      name: '',
      gender: '',
      age: ''
    },
    genderChecked: '男',
    toChooseSubject: false , 
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
    const mod = new model.MODEL();
    this.setData({
      teacher: mod.teacher
    });
    // console.log(this.data.teacher);
    // console.log(mod);
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      teacherId: options.teacherId
    });
    // console.log(this.data.teacherId)
    this.getTeacherById(options.teacherId);
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
  // 根据id查教师
  getTeacherById: function (id){
    // console.log(this.data.teacherId);
    wx.cloud.callFunction({
      name: 'http',
      data: {
        type: 'getById',
        collectionName: 'teacher',
        prams: id
      },
      success: res => {
        // console.log(res.result.data[0]);
        this.setData({
          teacher: res.result.data[0]
        });
        console.log(this.data.teacher);
        wx.hideLoading();
      },
      fail: console.fail
    })
  },
  // 姓名
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
  phoneInput: function(e) {
    console.log(e.detail.value);
    this.setData({
      ['teacher.phone']: e.detail.value
    })
  },
  genderChange: function(e) {
    console.log(e.detail.value);
    this.setData({
      ['teacher.gender'] : e.detail.value
    })
  },
  subjectChange: function(e) {
    // console.log(e.detail);
    this.setData({
      ['teacher.subject']: e.detail.value
    })
  },
  toChooseSubject: function() {
    if ( this.data.toChooseSubject ) {
      this.setData({
        toChooseSubject: false
      })
    } else {
      this.setData({
        toChooseSubject: true
      })
    }
  },
  toConfirm: function() {
    console.log(this.data.teacher);
    wx.showModal({
      title: '提示',
      content: '确认保存更新的信息吗',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})