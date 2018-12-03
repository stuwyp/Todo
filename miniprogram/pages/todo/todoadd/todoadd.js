// pages/todo/todoadd/todoadd.js
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
    deadline_date: utils.formatDate(new Date()),
    level: 0,
    array: ['重要且紧急', '重要不紧急', '紧急不重要', '不重要不紧急']

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

  addTodo: function(e) {
    const db = wx.cloud.database()
    // var deadline = new Date(e.timeText)
    var today = new Date(todayNow)

    db.collection('todo').add({
      data: {
        title: e.todo_title,
        content: e.todo_content,
        // deadline_time: deadline.getTime(),
        deadline_date: this.data.deadline_date,
        deadline_time: this.data.deadline_time,
        release_time: today.getTime(),
        level: this.data.level,
        status: false,
        deleted: false,
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          todoId: res._id,
        })
        wx.showToast({
          title: '新增成功',
        })
        console.log('[数据库] [新增Todo] 成功，记录 _id: ', res._id)


      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增Todo] 失败：', err)
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
    console.log(e.detail.value);
    this.addTodo(e.detail.value);
    // this.showErrorMessage("内容不能为空");
  },
  queryDoing: function() {
    const db = wx.cloud.database()
    db.collection('todo').where({
      _openid: this.data.openid,
      status: false,
      deleted: false,
    }).get({
      success: res => {

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
})