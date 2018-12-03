//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.systeminfo = res
      },
    })

    // this.globalData = {}
  },
  globalData: {
    // 是否保持常亮，离开小程序失效
    keepscreenon: false,
    systeminfo: {},
  },

})