// miniprogram/pages/people/student/all/allStudent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左边是否选择中
    leftChosed: '1'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      // 云函数名称
      name: 'http',
      // 传给云函数的参数
      data: {
        type: 'getAll',
        collectionName: 'clazz',
        prams: null
      },
      success(res) {
        console.log(res);
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
  chooseClazz: function (event){
    // console.log(event.target.id);
    // console.log(event);
    this.setData({
      leftChosed: event.target.id
    })

  }
})