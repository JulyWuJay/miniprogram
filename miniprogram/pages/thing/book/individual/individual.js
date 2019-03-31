// miniprogram/pages/thing/book/individual/individual.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookId: '',
    book: {
    },
    deleteNum: 0,
    addNum: 0
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
    this.getBookById(this.data.bookId);
    // console.log(this.data.bookId)
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
  deleteInput: function (e) {
    console.log(e.detail.value);
    const num = Number(e.detail.value);
    this.setData({
      deleteNum: num
    });
  },
  addInput: function (e) {
    const num = Number(e.detail.value);
    this.setData({
      addNum: num
    });
  },

  // 根据id查询书籍
  getBookById: function (id) {
    wx.showLoading({
      title: '加载中',
    });
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
      },
      fail: fail => {
        console.log(fail)
      }
    })
  },
  toAddBook: function () {
    const that = this;
    console.log(this.data.addNum);
    wx.showModal({
      title: '进货',
      content: '确认增加' + this.data.addNum +'本书籍吗',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          wx.showLoading({
            title: '处理中',
          });
          that.addBook(that.data.addNum);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });
  },
  toDeleteBook: function () {
    const that = this;
    console.log(this.data.deleteNum);
    wx.showModal({
      title: '报废',
      content: '确认报废' + this.data.deleteNum + '本书籍吗',
      success(res) {
        if (res.confirm) {
          // console.log('用户点击确定');
          wx.showLoading({
            title: '处理中',
          });
          that.deleteBook(that.data.deleteNum);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });
  },
  addBook: function(num) {
    const that = this;
    wx.cloud.callFunction({
      name: 'book',
      data: {
        type: 'addBook',
        bookId: this.data.bookId,
        num: num
      },
      success: res => {
        that.getBookById(that.data.bookId);
        // wx.showToast({
        //   title: '成功',
        //   icon: 'success',
        //   duration: 2000
        // });
        console.log('webadd', res);
      },
      fail: fail => {
        console.log(fail);
        wx.showToast({
          title: '出错了',
          image: '/images/icon/fail.png',
          duration: 2000
        });
      }
    });
  },
  deleteBook: function(num) {
    const that = this;
    wx.cloud.callFunction({
      name: 'book',
      data: {
        type: 'deleteBook',
        bookId: this.data.bookId,
        num: num
      },
      success: res => {
        that.getBookById(that.data.bookId);
        // wx.showToast({
        //   title: '成功',
        //   icon: 'success',
        //   duration: 2000
        // });
        // this.getBookById(this.data.bookId);
        console.log('webadd', res);
      },
      fail: fail => {
        console.log(fail);
        wx.showToast({
          title: '出错了',
          image: '/images/icon/fail.png',
          duration: 2000
        });
      }
    });
  }
})