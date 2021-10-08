// pages/login/login.js
const db = wx.cloud.database();
const util = require('../../utils/util.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: true,
    userInfo: {},
    openid: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
  },

  getUserInfo(e) {
    // 拿用户openid
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        wx.showLoading({
          title: '加载中',
        })
        this.setData({
          openid: res.result.openid
        })
      },
    })
    // 获取用户profile
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: res => {
        this.setData({
          userInfo: res.userInfo,
          signature: res.signature
        })
        // 将用户profile放入storage缓存
        wx.setStorage({
          key: "userInfo",
          data: res.userInfo
        })
        db.collection("user").where({
          _openid: this.data.openid
        }).get().then(res => {
          // 第一次登陆， 保存用户信息user集合
          if (res.data.length === 0) {
            db.collection('user').add({
              data: {
                userInfo: this.data.userInfo,
                signature: this.data.signature
              }
            })
          }
          // 跳去首页
          wx.switchTab({
            url: '/pages/index/index',
          })
          wx.showToast({
            title: '登陆成功',
            icon: 'success',
            duration: 2000
          })
        })
      },
      fail: res => {
        wx.showToast({
          title: '授权失败',
          icon: "error"
        })
      },
      complete: () => {
        wx.hideLoading()
      },
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