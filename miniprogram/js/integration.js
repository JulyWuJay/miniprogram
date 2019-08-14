export class integration {
  // 查询分数
  searchIntegration() {
    wx.cloud.callFunction({
      name:'apply',
      data: {
        type: 'searchIntegration'
      }
    }).then(
      res => {
        // console.log(res.result.data[0])
        return res.result.data[0]
      }
    )
  }
}