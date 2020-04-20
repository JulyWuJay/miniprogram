// pages/welcome/welcome.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

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
    // 检测用户是否微信授权
    setTimeout(function () {
      wx.getSetting({
        success: res => {
          console.log("welcome-getSetting", res);
          if (res.authSetting['scope.userInfo']) {
            wx.switchTab({
              url: '/pages/index/index'
            })
          }
        }
      })
    }, 300)
  },

  back() {
    wx.navigateBack();
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
   * 用户授权
   */
  getUserInfo: function (e) {
    console.log("welcome-getUserInfo", e)
    debugger
    if (e.detail.userInfo) {
      wx.switchTab({
        url: '/pages/index/index'
      })
    } else {
      wx.showModal({
        title: '获取用户信息授权',
        content: '微信登录需要获取您的用户信息，请前往设置页打开用户信息授权',
        confirmText: "前往设置",
        success: function (res) {
          if (res.confirm) {
            wx.openSetting();
          }
        }
      })
    }
  },

})