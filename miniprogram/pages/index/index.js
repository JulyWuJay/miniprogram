//index.js
const app = getApp();
Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    integration: 0,
    spinShow: false,
    currentPage: 0,
    totalPage: 1,
    detailList: [],
    detailLoading: true
  },

  onLoad: function() {
    // if (!wx.cloud) {
    //   wx.redirectTo({
    //     url: '../chooseLib/chooseLib',
    //   })
    //   return
    // }
    // 获取积分数量
    this.getIntegration();
    // 查询积分详情
    this.searchDoneApplication()
    this.onGetOpenid()
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // console.log('u',res)
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },
  // 触底
  onReachBottom() {
    // 先判断当前页码是不是大于总页码，大于就不加载了
    if( this.data.currentPage < this.data.totalPage ){
      this.searchDoneApplication();
    } else {
      console.log('不加载')
      this.setData({
        detailLoading: false
      })
    }
  },
  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },
  onPullDownRefresh: function() {
    const that = this;
    this.setData({
      currentPage: 0
    })
    this.searchDoneApplication()
    wx.cloud.callFunction({
      name: 'apply',
      data: {
        type: 'searchIntegration'
      }
    }).then(
      res => {
        console.log('查询积分成功')
        wx.stopPullDownRefresh()
        that.setData({
          integration: res.result.data[0].integration,
          spinShow: false
        })
      }
    )
  },
  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.setStorage({
          key: "openId",
          data: res.result.openid
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  getIntegration () {
    const that = this;
    this.setData({
      spinShow: true
    });
    wx.cloud.callFunction({
      name: 'apply',
      data: {
        type: 'searchIntegration'
      }
    }).then(
      res => {
        console.log('查询积分成功')
        that.setData({
          integration: res.result.data[0].integration,
          spinShow: false
        })
      }
    )
  },
  // 查询处理过的积分详情
  searchDoneApplication() {
    const that =this;
    this.setData({
      detailLoading: true
    })
    wx.cloud.callFunction({
      name: 'apply',
      data: {
        type:'searchDoneApplication',
        props: {
          currentPage: that.data.currentPage + 1
        }
      }
    }).then(
      res => {
        console.log(res.result)
        that.setData({
          detailList: res.result.list,
          totalPage: res.result.totalPage,
          currentPage: res.result.currentPage,
          detailLoading: false
        })
        console.log(that.data.currentPage)
      }
    )
  }

})
