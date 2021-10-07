// pages/login/login.js
const db = wx.cloud.database();
const util = require('../../utils/util.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: "", //保存昵称
    avatarUrl: "", //保存头像,
    canIUse: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
  },

  getUserInfo(e) {
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        wx.showLoading({
          title: '加载中',
        })
        const openid = res.result.openid
        const userInfo = res.result.event.userInfo

        db.collection('user').where({
          _openid: openid
        }).get().then(res => {
          //确保数据库只有一份该用户的信息
          if (res.data.length === 0) {
            this.setData({
              isFirstLogin: 1
            })
            wx.switchTab({
              url: '/pages/index/index',
            })
            db.collection('user').add({
              data: {
                nickName: e.detail.userInfo.nickName,
                avatarUrl: e.detail.userInfo.avatarUrl,
                time: util.formatDateTime(new Date(), 'MM/dd/yyyy HH:mm'),
              }
            })
          } else {
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
          wx.setStorage({
            key: "userInfo",
            data: userInfo
          })
        })
      },
      suscces: () =>{
        wx.hideLoading()
      }
    })
    this.setData({
      nickName: e.detail.userInfo.nickName,
      avatarUrl: e.detail.userInfo.avatarUrl
    })
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

  }
})