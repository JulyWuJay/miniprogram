// miniprogram/pages/thing/book/add/addBookKind.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: {
      name: '',
      all: 0,
      stock: 0,
      using: 0
    },
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
      ['book.name'] : e.detail.value
    })
  },
  numInput: function (e) {
    const num = Number(e.detail.value)
    console.log(typeof(num));
    this.setData({
      ['book.all']: num ,
      ['book.stock'] : num
    });
  },
  toAddNewBook: function () {
    const that = this;
    wx.showModal({
      title: '添加',
      content: '确认添加' + that.data.book.name + '吗？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          that.addNewBook();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });
  },
  addNewBook: function () {
    const that = this;
    wx.cloud.callFunction({
      name: 'http',
      data: {
        type: 'addNewBook',
        collectionName: 'book',
        prams: {
          name: that.data.book.name,
          all: that.data.book.all,
          stock: that.data.book.stock,
        }
      },
      success: res => {
        console.log(res)
      },
      fail: fail => console.log(fail)
    })
  }
})