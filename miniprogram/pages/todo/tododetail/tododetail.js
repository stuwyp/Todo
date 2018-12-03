// pages/index/tododetail/tododetail.js
var utils = require('../../../utils/util.js')
var todayDate = new Date()
var todayNow = todayDate.toLocaleString().replace(/\//g, '-').replace(/[上下]午/, '')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todo_title: "",
    todo_content: "",
    todo_id: 0,
    deadline_date: "",
    deadline_time: "",
    level: 0,
    array: ['重要且紧急', '重要不紧急', '紧急不重要', '不重要不紧急'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
    this.setData({
      todo_id: options.todoid
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.queryTodoData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      deadline_date: e.detail.value
    })
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      level: e.detail.value
    })
  },
  goHomeIndex: function() {
    wx.navigateBack();
  },

  updateTodo: function(e) {
    const db = wx.cloud.database()


    var id = this.data.todo_id
    db.collection('todo').doc(id).update({
      data: {
        content: e.todo_content,
        title: e.todo_title,
        deadline_date: this.data.deadline_date,
        deadline_time: this.data.deadline_time,
        // release_time: today.getTime(),
        level: this.data.level,
      },
      success: res => {
        wx.showToast({
          title: '修改成功',
        })
        this.setData({
          data
        })

      },
      fail: err => {
        icon: 'none',
        console.error('[数据库] [更新记录] 失败：', err)
      }
    })

    setTimeout(function() {
      wx.navigateBack();
    }, 2000) //延迟时间 这里是2秒
  },
  /**
   * 表单提交
   */
  formSubmit: function(e) {
    this.updateTodo(e.detail.value);
  },
  deleteTodo: function() {
    const db = wx.cloud.database()
    var id = this.data.todo_id
    db.collection('todo').doc(id).update({
      data: {
        deleted: true
      },
      success: res => {
        this.setData({
          deleted: true
        })
        wx.showToast({
          title: '删除成功',
        })
      },
      fail: err => {
        icon: 'none',
        console.error('[数据库] [更新记录] 失败：', err)
      }
    })
    setTimeout(function() {
      wx.navigateBack();
    }, 1500) //延迟时间 这里是1.5秒
  },
  queryTodoData: function() {
    const db = wx.cloud.database()
    db.collection('todo').where({
      _openid: this.data.openid,
      _id: this.data.todo_id
    }).get({
      success: res => {
        console.log(res.data[0])
        this.setData({
          todo_content: res.data[0].content,
          todo_title: res.data[0].title,
          deadline_date: res.data[0].deadline_date,
          deadline_time: res.data[0].deadline_time,
          level: res.data[0].level,

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
})