const app = getApp()

Page({
  data: {
    
  },
  onLoad: function () {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
    let that=this
    if(global.userInfo){
      that.setData({
        userInfo:global.userInfo,
        isLogin:true
      })
    }
  },
  bindgetuserinfo:function(e){
    let that=this;
    if(e.detail.errMsg!="getUserInfo:ok"){
      wx.showToast({
        title: '登录失败,请检查网络连接',
        icon:"none"
      })
      return
    }
    else{
      let userInfo=e.detail.userInfo
      global.userInfo=userInfo
      that.setData({
        userInfo,
        isLogin:true
      })
    }
  },
  bindgettrashbin: function (e) {
    wx.navigateTo({
      url: 'trashbin/trashbin',
    })
  },
  bindgetfavourite:function(e){
    wx.navigateTo({
      url: 'favourite/favourite',
    })
  },
  bindgetfavourite: function (e) {
    wx.navigateTo({
      url: 'feedback/feedback',
    })
  },
  bindgetfavourite: function (e) {
    wx.navigateTo({
      url: 'about/about',
    })
  }
})
