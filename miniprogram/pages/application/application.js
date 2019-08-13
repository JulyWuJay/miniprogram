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
    current: 1,
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
    ]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () { },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    this.setData({
      spinShow: false
    });
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
        current: this.data.current + 1
      });
    } else if (type === 'prev') {
      this.setData({
        current: this.data.current - 1
      });
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
      const time = timer.changeTime(new Date())
      this.setData({
        // ['integration_apply.application_date']: 't',
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
      this.apply();
    }
  },
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
  }

})