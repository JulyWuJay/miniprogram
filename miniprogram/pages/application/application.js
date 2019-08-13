// miniprogram/pages/application/application.
const {
  $Message
} = require('../../dist/base/index');
const timer = require('../../js/changeTime.js')
Page({
  /**
   * Page initial data
   */
  data: {
    rate: 1,
    integration_apply: {
      application_date: null,
      description: null,
      integration: 10,
      status: "待审批"
    },
    spinShow: true,
    currentPage: 1,
    totalPage: 1,
    allListNum: 0,
    isApplication: false,
    // 确认添加积分的模态框异步按钮
    applyAction: [
      {
        name: '取消'
      },
      {
        name: '确认',
        color: '#1c2438',
        loading: false
      }
    ],
    // 申请记录
    applicationList: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.searchUndoApplication()
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () { },

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

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },
  chooseRate(e) {
    const index = e.detail.index;
    this.setData({
      rate: index,
      ['integration_apply.integration']: index * 10
    })
  },
  // 分页
  pageChange({
    detail
  }) {
    const type = detail.type;
    if (type === 'next') {
      this.setData({
        currentPage: this.data.currentPage + 1
      });
      this.searchUndoApplication()
    } else if (type === 'prev') {
      this.setData({
        currentPage: this.data.currentPage - 1
      });
      this.searchUndoApplication()
    }
  },
  // 点击加分申请按钮
  toApply() {
    if (!this.data.integration_apply.description) {
      $Message({
        content: '请填写申请原因',
        type: 'warning'
      });
    } else {
      const time = timer.changeTime(new Date());
      this.setData({
        ['integration_apply.application_date']: time,
        isApplication: true
      })
    }
  },
  // 申请理由输入框
  descriptionInput({
    detail: {
      detail: {
        value
      }
    }
  }) {
    this.setData({
      ['integration_apply.description']: value
    })
  },
  confirmApplication({ detail }) {
    // 点击取消
    if (detail.index === 0) {
      this.setData({
        isApplication: false
      })
    } else {
      // 点击确认
      const action = [...this.data.applyAction];
      action[1].loading = true;
      this.setData({
        applyAction: action
      });
      console.log(this.data.integration_apply)
      this.apply();
    }
  },
  // 提交加分申请
  apply() {
    wx.cloud.callFunction({
      name: 'apply',
      data: {
        type: 'integrationApply',
        props: this.data.integration_apply
        // prams: options.stuId
      },
      success: res => {
        console.log('积分申请成功', res)
        $Message({
          content: '积分申请成功，等待贝塔审核！',
          type: 'success'
        });
        const action = [...this.data.applyAction];
        action[1].loading = false;
        this.setData({
          // 取消确认后的异步转圈
          applyAction: action,
          isApplication: false
        });
        // 提交积分申请成功后，再查询一下
        this.searchUndoApplication()
      },
      fail: fail => {
        $Message({
          content: '失败！请联系贝塔先森',
          type: 'error'
        });
        const action = [...this.data.applyAction];
        action[1].loading = false;
        this.setData({
          // 取消确认后的异步转圈
          applyAction: action,
          isApplication: false
        });
        console.log(fail)
      }
    })
  },
  searchUndoApplication() {
    // 加载圈
    this.setData({
      spinShow: true
    });
    console.log(this.data.currentPage)
    wx.cloud.callFunction({
      name: 'apply',
      data: {
        type: 'searchUndoApplication',
        props: {
          currentPage: this.data.currentPage
        }
      },
      success: res => {
        console.log('查询', res);
        this.setData({
          spinShow: false,
          applicationList: res.result.list,
          totalPage: res.result.totalPage,
          allListNum: res.result.allListNum
        });
      },
      fail: err => {
        console.log('错误', err)
      }

    })
  }

})