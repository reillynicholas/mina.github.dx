//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  onLoad: function () {
    var that =this;

    wx.setNavigationBarTitle({
      title: '产品详情',
    })

    that.setData({
      banners: [
          {
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
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  scroll: function (e) {
    var that = this, scrollTop = that.data.scrollTop;
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
