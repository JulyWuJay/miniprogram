// miniprogram/pages/school/clazz/all/allClazz.js
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
    // wx.showLoading({
    //   title: '加载中',
    // });
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
  // 加载全部老师信息
  loadClazz: function () {
    let that = this;
    // 获取班级
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
        wx.hideLoading()
        console.log(res);
        that.setData({
          clazz: res.result.data
        });
        // console.log(that.data.clazz)
      },
      fail: console.error
    });
  },
  toDelete: function (event) {
    console.log(event);
    const id = event.currentTarget.id;
    const collectionName = 'clazz';
    const that = this;
    wx.showModal({
      title: '删除',
      content: '确定删除吗',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          that.deleteById(id, collectionName);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 根据id删除
  deleteById: function (id, collectionName) {
    const that = this;
    // 根据id删除信息
    wx.cloud.callFunction({
      name: 'http',
      data: {
        type: 'deleteById',
        collectionName: collectionName,
        prams: id
      },
      success: res => {
        console.log(res);
        // 如果成功
        if (res.result.errMsg == 'collection.remove:ok') {
          // wx.showToast({
          //   title: '成功',
          //   icon: 'success',
          //   duration: 2000
          // });
          that.loadClazz();
        } else {
          console.log('失败')
        }
      },
      fail: console.error
    })
  }

})