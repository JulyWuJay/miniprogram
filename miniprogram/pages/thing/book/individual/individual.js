// miniprogram/pages/thing/book/individual/individual.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookId: '',
    book: {

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      bookId: options.bookId
    });
    // this.getBookById(options.bookId)
    // console.log(this.data.bookId)
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
    })
    this.getBookById(this.data.bookId)
    console.log(this.data.bookId)
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
  // 根据id查询书籍
  getBookById: function (id) {
    wx.cloud.callFunction({
      name: 'http',
      data: {
        type: 'getById',
        collectionName: 'book',
        prams: id
      },
      success: res => {
        const book = res.result.data[0];
        this.setData({
          book : book
        });
        wx.hideLoading();
        console.log(book);
        console.log(this.data.book);
      },
      fail: fail => {
        console.log(fail)
      }
    })
  }
})