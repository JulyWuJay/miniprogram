// miniprogram/pages/people/student/individual/individual.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    student: { 
      _id: "", 
      age: "", 
      clazz: {
        clazzId: '01' , 
        clazzName: '测试'
      }, 
      contacts: "", 
      contactsName: "", 
      gender: '' , 
      name: '' 
    },
    genderChecked: '',
    toChooseClazz: false,
    clazz: [{ _id: '01', name: '测试的' }],
    checkedClazz: {
      clazzId: '',
      name: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 加载动画
    wx.showLoading({
      title: '加载中',
    });
    const that = this;
    wx.cloud.callFunction({
      name: 'http',
      data: {
        type: 'getById',
        collectionName: 'student',
        prams: options.stuId
      },
      success: res => {
        wx.hideLoading();
        // console.log('xx' , res);
        that.setData({
          student: res.result.data[0],
          genderChecked: res.result.data[0].gender,
          checkedClazz: res.result.data[0].clazz
        });
        console.log(that.data.student)
      },
      fail: console.error
    });
    wx.cloud.callFunction({
      name: 'http',
      data: {
        type: 'getAll',
        collectionName: 'clazz'
        // prams: options.stuId
      },
      success: res =>{
        // console.log(res);
        this.setData({
          clazz: res.result.data
        })
      },
      fail: console.fail
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.onLoad()
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.onLoad(this.data.stuId)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.showLoading({
      title: '加载中',
    });
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
  // 姓名
  nameInput: function (e) {
    // console.log(e.detail.value);
    this.setData({
      ['student.name'] : e.detail.value
    });
  },
  ageInput: function (e) {
    this.setData({
      ['student.age'] : e.detail.value
    })
  },
  phoneInput: function (e) {
    this.setData({
      ['student.phone'] : e.detail.value
    })
  },
  contactsNameInput: function(e) {
    this.setData({
      ['student.contactsName'] : e.detail.value
    })
  },
  contactsInput: function(e) {
    this.setData({
      ['student.contacts'] : e.detail.value
    })
  },
  genderChange: function(e) {
    // console.log(e.detail.value);
    this.setData({
      ['student.gender'] : e.detail.value
    })
  },
  // 去选择班级
  toChooseClazz: function() {
    if (this.data.toChooseClazz) {
      this.setData({
        toChooseClazz: false
      })
    } else {
      this.setData({
        toChooseClazz: true
      })
    }
    // console.log(e)
  },
  clazzChange: function(e) {
    const id = e.detail.value;
    // console.log(id);
    // 选中之后根据班级id查找班级名称
    wx.cloud.callFunction({
      name: 'http',
      data: {
        type: 'getById',
        collectionName: 'clazz',
        prams: id
      },
      success: res => {
        const clazz = res.result.data[0];
        // console.log(clazz);
        this.setData({
          ['student.clazz.clazzId']: clazz._id,
          ['student.clazz.clazzName']: clazz.name
        })
      },
      fail: console.fail
    })
  },
  toConfirm: function() {
    console.log(this.data.student);
    const that = this;
    wx.showModal({
      title: '提示',
      content: '确认保存更新的信息吗',
      success(res) {
        if (res.confirm) {
          // console.log('用户点击确定')
          that.confirm();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  confirm: function() {
    const that = this;
    wx.cloud.callFunction({
      name: 'http',
      data: {
        type: 'updateStudent',
        collectionName: 'student',
        prams: this.data.student
      },
      success: res => {
        // console.log(res.errMsg)
        if (res.errMsg == 'cloud.callFunction:ok'){
          console.log('ok')
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000
          })

        } else {
          // /pages/home / home
          wx.showToast({
            title: '出错了',
            image: '/images/icon/fail.png',
            duration: 2000
          })
        }
      },
      fail: console.fail
    })
  }

})