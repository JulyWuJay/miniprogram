// miniprogram/pages/people/student/all/allStudent.js
const url = require('../../../../js/url/url.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左边是否选择中
    leftChosed: '',
    allClazz: null,
    student: [],
    PAGESIZE: 8,
    pageNum:1 ,//页数
    imageUrl:{
      // boy: '/images/icon/common/boy.png',
      // girl: '/images/icon/common/girl.png'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 导入男女图标的url
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
        // console.log(res);
        that.setData({
          // 第一个班级背景变白
          leftChosed: res.result.data[0]._id,
          allClazz: res.result.data
        });
        that.getStudentByClazz(res.result.data[0]._id);
      },
      fail: console.error
    })
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
    // wx.showNavigationBarLoading()
    this.onLoad();
  },
  // onPullDownRefresh() {
  //   wx.stopPullDownRefresh()
  // }
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  chooseClazz: function (event){
    // console.log(event);
    this.setData({
      leftChosed: event.target.id
    })
    // console.log(event.currentTarget.id)
    // console.log(event.target.id)
    // 根据班级id获取学生信息
    this.getStudentByClazz(event.target.id);
  },

  // 根据班级id查学生
  getStudentByClazz: function(id){
    const that = this;
    // 根据班级id获取学生信息
    wx.cloud.callFunction({
      name: 'http',
      data: {
        type: 'getStudentByClazz',
        collectionName: 'student',
        prams: id
      },
      success: res => {
        wx.hideLoading()
        // console.log(res);
        that.setData({
          student: res.result.data
        });
        // console.log(that.data.student);
      },
      fail: console.error
    })
  },

  // 更多操作
  toStudentDetail: function(event){
    console.log(event)
  },
  toDelete: function(event) {
    console.log(event);
    const id = event.currentTarget.id;
    const collectionName = 'student';
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
  deleteById: function(id , collectionName) {
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
          that.onShow();
        } else {
          console.log('失败')
        }
      },
      fail: console.error
    })
  }
})