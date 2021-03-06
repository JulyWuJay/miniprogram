// miniprogram/pages/school/subject/add/addSubject.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subject: {
      name: '科目',
      book: {
        bookId: 'x',
        name: '添加书籍'
      }
    },
    bookList: [],
    isShowBook: false
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
    this.getBook();
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
  getBook: function () {
    wx.cloud.callFunction({
      name: 'http',
      data: {
        type: 'getAll',
        collectionName: 'book',
        prams: null
      },
      success: res => {
        console.log('bookList', res.result.data);
        this.setData({
          bookList: res.result.data
        });
      },
      fail: fail => {
        console.log(fail);
      }
    })
  },
  toChooseBook: function () {
    if (this.data.isShowBook) {
      this.setData({
        isShowBook: false
      })
    } else {
      this.setData({
        isShowBook: true
      })
    }
  },
  bookChange: function (e) {
    console.log(e);
    const bookId = e.detail.value;
    // 根据id查书籍
    wx.cloud.callFunction({
      name: 'http',
      data: {
        type: 'getById',
        collectionName: 'book',
        prams: bookId
      },
      success: res => {
        console.log(res.result.data[0]);
        this.setData({
          ['subject.book.bookId']: res.result.data[0]._id,
          ['subject.book.name']: res.result.data[0].name
        })
      },
      fail: fail => {
        console.log(fail)
      }
    })
  },
  nameInput: function (e) {
    // console.log(e)
    const name = e.detail.value;
    this.setData({
      ['subject.name']: name
    });
  },
  toConfirm: function () {
    const that = this;
    // console.log(this.data.subject);
    wx.showModal({
      title: '保存',
      content: '确认添加信息吗?',
      success(res) {
        if (res.confirm) {
          // console.log(that.data.subject);
          that.confirm();
          // console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });
  },
  confirm: function () {
    const that = this;
    wx.cloud.callFunction({
      name: 'http',
      data: {
        type: 'addSubject',
        collectionName: 'subject',
        prams: that.data.subject
      },
      success: res => {
        // console.log(res);
        wx.showModal({
          title: '成功',
          content: '继续添加吗?',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定');
              that.setData({
                ['subject.name']: '添加课程',
                ['subject.book.name']: '选择书籍',
                ['subject.book.bookId']: 'x'
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      fail: fail => {
        console.log(fail);
        wx.showToast({
          title: '出错了',
          image: '/images/icon/fail.png',
          duration: 2000
        });
      }
    })
  }
})