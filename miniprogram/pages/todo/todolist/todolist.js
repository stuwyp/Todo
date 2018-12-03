// pages/todo/index.js
var utils = require('../../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: [true, false],

    doing_todo: [
      // {
      //   "title": "背单词背单词背单词背单词",
      //   "deadline_time": "12:00",
      //   'isTouchMove': false //默认全隐藏删除
      // }, {
      //   "title": "跑步",
      //   "deadline_time": "17:00",
      //   'isTouchMove': false //默认全隐藏删除
      // }
    ],
    finished_todo: [
      // {
      //   "title": "背单词",
      //   "deadline_time": "2018-12-12",
        

      // }, {
      //   "title": "跑步",
      //   "deadline_time": "周二 17:00",
      // }
    ]
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
    this.data.isShow[0] = true
    this.data.isShow[1] = false
    this.queryDoing()
    this.queryFinished()
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

  /**
   * 新建Todo
   */
  addTodo: function () {
    wx.navigateTo({
      url: '../todoadd/todoadd',
    });
  },
  delTodo: function (e) {
    const db = wx.cloud.database()
    var id = e.currentTarget.dataset.id
    console.log(id)
    db.collection('todo').doc(id).update({
        data: {
          deleted:true
        },
        success: res => {
          this.setData({
            deleted: true
          })
          wx.showToast({
            title: '删除成功',
          })
          this.onShow()
        },
        fail: err => {
          icon: 'none',
            console.error('[数据库] [更新记录] 失败：', err)
        }
      })
    
    },
  
  updateTodo: function (id,status) {
    const db = wx.cloud.database()
    var check 
    console.log(status)
    if (status == '') {
      check = false
    }
    else {
      check = true
    }
    
    db.collection('todo').doc(id).update({
      data: {
        status: !check
      },
      success: res => {
        this.setData({
          status: !check
        })
        if(status==true){
          wx.showToast({
          title: '恭喜你完成',
        })}
        this.onShow()
      },
      fail: err => {
        icon: 'none',
          console.error('[数据库] [更新记录] 失败：', err)
      }
    })

  },

 
 
  
  /**
   * 查看已完成Todo
   */
  showTodoDetail: function (e) {
    wx.navigateTo({
      url: '../tododetail/tododetail?todoid=' + e.target.dataset.id,
    });
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
  queryDoing: function () {
    const db = wx.cloud.database()
    
    db.collection('todo').where({
      _openid: this.data.openid,
      status:false,
      deleted:false,
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
  queryFinished: function () {
    const db = wx.cloud.database()
    db.collection('todo').where({
      _openid: this.data.openid,
      status: true,
      deleted: false,
    }).get({
      success: res => {
        this.data.finished_todo = []
        for (var item in res.data) {
          console.log(res.data[item].deadline_time)
          this.data.finished_todo.push(res.data[item])
        }
        this.setData({
          finished_todo: this.data.finished_todo,
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
  checkboxChange: function (e) {
    console.log(e.currentTarget.dataset.id, e.detail.value[0])
    this.updateTodo(e.currentTarget.dataset.id,e.detail.value[0])
  }
})