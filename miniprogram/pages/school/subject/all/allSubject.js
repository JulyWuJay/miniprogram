// miniprogram/pages/school/subject/all/allSubject.js
const url = require('../../../../js/url/url.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    clazz: [],
    imageUrl: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const genderUrl = new url.URL();
    this.setData({
      imageUrl: genderUrl.genderUrl
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
    wx.showLoading({
      title: '加载中',
    });
    this.loadClazz();
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
    this.loadClazz();

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
  // 加载信息
  loadClazz: function () {
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
        wx.hideLoading()
        console.log(res);
        that.setData({
          clazz: res.result.data
        });
        // console.log(that.data.clazz)
      },
      fail: console.error
    });
  }

})