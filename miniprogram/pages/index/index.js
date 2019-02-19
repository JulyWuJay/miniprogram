//index.js
const common = require('../../js/common/common.js');
const app = getApp();

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    tabIconUrl: {
        school: '../../images/icon/index-footer/school-chosed.png',
        thing: '../../images/icon/index-footer/thing.png',
        people: '../../images/icon/index-footer/people.png' 
    },
    tabText: {
      school: 'tab-text-chosed',
      thing: '',
      people: '' 
    },
    mainShow: {
      school: '',
      thing: 'none',
      people: 'none'
    }    
  },  
  onLoad: function() {
    if (wx.cloud) {
      wx.redirectTo({
        url: '../people/student/all/allStudent',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              if (res.userInfo.nickName != '我不了地Jay'){
                wx.redirectTo({
                  url: '../error/needLogin/needLogin',
                })
              }
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              });
              console.log(res.userInfo);
            }
          })
        }
      }
    })
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

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid;
        if (res.result.openid == 'oGVOe4nP51bXMbxoHQAAV5rby_dg' ){
          console.log('管理员');
        }
        // wx.navigateTo({
        //   url: '../userConsole/userConsole',
        // })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        // wx.navigateTo({
        //   url: '../deployFunctions/deployFunctions',
        // })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },
  // 切换底部栏
  chooseTab: function(event){
    if(event.currentTarget.id == 'school'){
      console.log('s');
      // wx.showToast({
      //   title: '无记录可删，请见创建一个记录',
      // })
      common.sayHello();
      this.setData({
        tabIconUrl: {
          school: '../../images/icon/index-footer/school-chosed.png',
          thing: '../../images/icon/index-footer/thing.png',
          people: '../../images/icon/index-footer/people.png'
        },
        tabText: {
          school: 'tab-text-chosed',
          thing: '',
          people: ''
        },
        mainShow: {
          school: '',
          thing: 'none',
          people: 'none'
        } 
      });
    }else if(event.currentTarget.id == 'thing'){
      console.log('t');
      this.setData({
        tabIconUrl: {
          school: '../../images/icon/index-footer/school.png',
          thing: '../../images/icon/index-footer/thing-chosed.png',
          people: '../../images/icon/index-footer/people.png'
        },
        tabText: {
          school: '',
          thing: 'tab-text-chosed',
          people: ''
        },
        mainShow: {
          school: 'none',
          thing: '',
          people: 'none'
        } 
      });
    }else if(event.currentTarget.id == 'people'){
      console.log('p');
      this.setData({
        tabIconUrl: {
          school: '../../images/icon/index-footer/school.png',
          thing: '../../images/icon/index-footer/thing.png',
          people: '../../images/icon/index-footer/people-chosed.png'
        },
        tabText: {
          school: '',
          thing: '',
          people: 'tab-text-chosed'
        },
        mainShow: {
          school: 'none',
          thing: 'none',
          people: ''
        } 
      });
    }
  }

})
