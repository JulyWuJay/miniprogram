// miniprogram/pages/school/time/individual/individual.js
const url = require('../../../../js/url/url.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clazzId: '',
    clazz: undefined ,
    plusUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      clazzId: options.clazzId
    });
    this.getClazzById(this.data.clazzId);
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
    console.log(id);
    wx.cloud.callFunction({
      name: 'http',
      data: {
        type: 'getById',
        collectionName: 'clazz',
        prams: id
      },
      success: res => {
        const result = res.result.data[0];
        this.setData({
          clazz: result
        })
        console.log(this.data.clazz);
      },
      fail: res => console.log(res)
    })
  }
})