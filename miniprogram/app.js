//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'test-rak6l',
        traceUser: true,
      })
    }
    if(wx.getStorageSync('userInfo')) {
      wx.switchTab({
        url: '/pages/index/index',
      })
    } else {
      wx.reLaunch({
        url: '/pages/login/login',
      })
    }
  }
})
