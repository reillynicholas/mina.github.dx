const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
      id: 0,
      latitude: 22.629464,
      longitude: 113.273364,
      width: 50,
      height: 50
    }],
    covers: [{
      id: 1,
      latitude: 22.629464,
      longitude: 113.273364,
      clickable: true
    }],
    isSuperMan: false
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.detail.markerId)
  },
  controltap(e) {
    console.log(e.detail.controlId)
  },
  toUploadpage: function() {
    wx.navigateTo({
      url: '../contact/components/upload-product',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const openId =  wx.getStorageSync('userInfo').openId
    db.collection("super_user").where({
      _openid: openId
    }).get({
      success: res => {
        if (res.data[0] && res.data[0].rule === 1) {
          this.setData({
            isSuperMan: true
          })
        }
      }
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