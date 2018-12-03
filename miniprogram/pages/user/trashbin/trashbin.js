// pages/user/trashbin/trashbin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: [true],
    delete_todo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.querydeleted()
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  querydeleted: function () {
    const db = wx.cloud.database()

    db.collection('todo').where({
      _openid: this.data.openid,
      deleted: true,
    }).get({
      success: res => {
        this.data.doing_todo = []
        for (var item in res.data) {

          this.data.doing_todo.push(res.data[item])
        }
        this.setData({
          doing_todo: this.data.doing_todo,
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  recoverTodo:function(e) {
    const db = wx.cloud.database()
    var id = e.currentTarget.dataset.id
    console.log(id)
    db.collection('todo').doc(id).update({
      data: {
        deleted: false
      },
      success: res => {
        this.setData({
          deleted: false
        })
        wx.showToast({
          title: '恢复成功',
        })
        this.onShow()
      },
      fail: err => {
        icon: 'none',
          console.error('[数据库] [更新记录] 失败：', err)
      }
    })

  },
  showItems: function (e) {
    let that = this
    let id = Number.parseInt(e.currentTarget.dataset.id)
    let isShow = that.data.isShow
    isShow[id] = !isShow[id]
    that.setData({
      isShow
    })
  },
  deleteTodo:function(e){
    var id = e.currentTarget.dataset.id
    if (id) {
      const db = wx.cloud.database()
      db.collection('todo').doc(id).remove({
        success: res => {
          wx.showToast({
            title: '删除成功',
          })
          this.setData({
            counterId: '',
            count: null,
          })
          this.onShow()  //当前页面刷新
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '删除失败',
          })
          console.error('[数据库] [删除记录] 失败：', err)
        }
      })
    } else {
      wx.showToast({
        title: '无记录可删，请见创建一个记录',
      })
    }
  }
})