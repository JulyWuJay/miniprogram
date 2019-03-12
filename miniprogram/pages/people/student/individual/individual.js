// miniprogram/pages/people/student/individual/individual.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    student: { 
      _id: "", 
      age: "", 
      clazzId: "", 
      contacts: "", 
      contactsName: "", 
      gender: '' , 
      name: '' 
    },
    genderChecked: '',
    toChooseClazz: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    wx.cloud.callFunction({
      name: 'http',
      data: {
        type: 'getById',
        collectionName: 'student',
        prams: options.stuId
      },
      success: res => {
        console.log(res);
        that.setData({
          student: res.result.data[0],
          genderChecked: res.result.data[0].gender
        });
        console.log(that.data.student)
      },
      fail: console.error
    })
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
  toConfirm: function () {
    console.log(this.data.student);
  },
  // 姓名
  nameInput: function (e) {
    // console.log(e.detail.value);
    this.setData({
      ['student.name'] : e.detail.value
    });
  },
  ageInput: function (e) {
    this.setData({
      ['student.age'] : e.detail.value
    })
  },
  phoneInput: function (e) {
    this.setData({
      ['student.phone'] : e.detail.value
    })
  },
  contactsNameInput: function(e) {
    this.setData({
      ['student.contactsName'] : e.detail.value
    })
  },
  contactsInput: function(e) {
    this.setData({
      ['student.contacts'] : e.detail.value
    })
  },
  genderChange: function(e) {
    // console.log(e.detail.value);
    this.setData({
      ['student.gender'] : e.detail.value
    })
  },
  // 去选择班级
  toChooseClazz: function() {
    if (this.data.toChooseClazz) {
      this.setData({
        toChooseClazz: false
      })
    } else {
      this.setData({
        toChooseClazz: true
      })
    }
    // console.log(e)
  }

})