// components/integration-detail/integration-detail.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    detail:{
      type: Object,
      value:{
        _id:'',
        date:'',
        description:'',
        integration:'',
        status:'',
        time:''
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showDetail: function(){
      let isShow = !this.data.isShow;
      this.setData({
        isShow: isShow
      })
    }
  }
})
