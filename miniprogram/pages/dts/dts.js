// miniprogram/pages/dts/dts.js
const timer = require('../../js/changeTime.js')

Page({

  /**
   * Page initial data
   */
  data: {
    currentPage: 0,
    totalPage: 1,
    detailList: [],
    detailLoading: true,
    // dts分数
    dts:{
      all:0,
      dts:0
    }

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.init()
    // this.searchDtsDetail()
    // this.searchDts()
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {
    this.init()
  },

  /**
   * Called when page reach bottom
   */

  // 触底
  onReachBottom() {
    // 先判断当前页码是不是大于总页码，大于就不加载了
    if (this.data.currentPage < this.data.totalPage) {
      this.searchDtsDetail();
    } else {
      console.log('不加载')
      this.setData({
        detailLoading: false
      })
    }
  },
  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },
  init() {
    this.setData({
      totalPage: 1,
      currentPage: 0
    })
    this.searchDts();
    this.searchDtsDetail()
  },
  searchDtsDetail() {
    // 查询处理过的积分详情
    const that = this;
    this.setData({
      detailLoading: true
    })
    wx.cloud.callFunction({
      name: 'apply',
      data: {
        type: 'searchDtsDetail',
        props: {
          currentPage: that.data.currentPage + 1
        }
      }
    }).then(
      res => {
        console.log('datalist', res.result)
        that.setData({
          detailList: res.result.list,
          totalPage: res.result.totalPage,
          currentPage: res.result.currentPage,
          detailLoading: false
        })
        console.log(that.data.currentPage)
      }
    )
  },
  searchDts() {
    const that = this;
    wx.cloud.callFunction({
      name: 'apply',
      data: {
        type: 'searchDts'
      }
    }).then(
      res => {
        console.log('dts', res)
        that.setData({
          dts: res.result
        })
        console.log(that.data.dts)
      }
    )
  },
  toUseDts() {
    const that = this;
    if (this.data.dts.dts < 1) {
      // console.log(this.data.integration)
      wx.showToast({
        title: '笨蛋，DTS不足',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.showModal({
        title: '使用DTS',
        content: '确定使用1个DTS吗',
        success(res) {
          if (res.confirm) {
            that.useDts()
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  useDts() {
    console.log('使用dts')
    const that = this;
    console.log('exchange')
    const date = timer.changeTime(new Date());
    const time = Date.now();
    // const time = Date.now()
    console.log(time)
    wx.cloud.callFunction({
      name: 'apply',
      data: {
        type: 'useDts',
        props: {
          time: time,
          date: date
          // currentPage: that.data.currentPage + 1
        }
      }
    }).then(
      res => {
        console.log(res)
        that.init()
      }
    )
  }
})