// miniprogram/pages/people/student/all/allStudent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左边是否选择中
    leftChosed: '',
    allClazz: null,
    student: [],
    PAGENUM: 6,
    page:{
      pages:1//页数
    },
    imageUrl:{
      boy: '../../../../images/icon/common/boy.png',
      girl: '../../../../images/icon/common/girl.png'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
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
  chooseClazz: function (event){
    // console.log(event);
    this.setData({
      leftChosed: event.target.id
    })
    // console.log(event.currentTarget.id)
    console.log(event.target.id)
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
        console.log(res);
        that.setData({
          student: res.result.data
        });
        console.log(that.data.student);
      },
      fail: console.error
    })
  }
})