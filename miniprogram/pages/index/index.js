//index.js
//获取应用实例
const app = getApp()

const db = wx.cloud.database()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    swiperCurrent: 0
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          console.log('已经授权登陆');
        } else {
          //用户没有授权
          console.log("用户没有授权");
          wx.switchTab({
            url: '/pages/login/login',
          })
        }
      }
    });
    var that = this;

    that.setData({
      banners: [{
          "id": 1,
          "pic_url": "/images/strlamp.jpg"
        },
        {
          "id": 2,
          "pic_url": "/images/strlamp.jpg"
        },
        {
          "id": 3,
          "pic_url": "/images/strlamp.jpg"
        }
      ]
    })
  },
  scroll: function (e) {
    var that = this,
      scrollTop = that.data.scrollTop;
    that.setData({
      scrollTop: e.detail.scrollTop
    });
  },
  swiperchange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
})