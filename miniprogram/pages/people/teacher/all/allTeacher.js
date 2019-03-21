// miniprogram/pages/people/teacher/all/allTeacher.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // {
    //   _id: '',
    //   name: '',
    //   age: '',
    //   gender: '',
    //   phone: '',
    //   subject: '' , 
    // }
    teacher: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    this.loadTeacher()

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
  // 加载全部老师信息
  loadTeacher: function() {
    let that = this;
    // 获取班级
    wx.cloud.callFunction({
      // 云函数名称
      name: 'http',
      // 传给云函数的参数
      data: {
        type: 'getAll',
        collectionName: 'teacher',
        prams: null
      },
      success(res) {
        wx.hideLoading()
        console.log(res);
        that.setData({
          teacher: res.result.data
        });
        console.log(that.data.teacher)
      },
      fail: console.error
    });
  }

})