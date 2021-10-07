const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [],
    bigImg: "",
    productName: "",
    categoryId: "",
    index: 0
  },

  onBindinput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },

  changeBigImg() {
    let that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        });
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let filePath = res.tempFilePaths[0];
        const name = Math.random() * 1000000;
        const cloudPath = name + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath, //云存储图片名字
          filePath, //临时路径
          success: res => {
            console.log('[上传图片] 成功：', res)
            that.setData({
              bigImg: res.fileID, //云存储图片路径,可以把这个路径存到集合，要用的时候再取出来
            });
          },
          complete: () => {
            wx.hideLoading()
          }
        });
      },

    })
  },

  onSubmit() {
    wx.showLoading({
      title: '提交中',
    });
    //把图片存到goods集合表
    db.collection("goods").add({
      data: {
        category_id: String(this.data.index),
        name: this.data.name,
        fileID: this.data.bigImg,
        min_price: "00.00",
        proce: "00.00"
      },
      success: function () {
        wx.showToast({
          title: '图片存储成功',
          'icon': 'none',
          duration: 3000
        })
      },
      fail: function () {
        wx.showToast({
          title: '图片存储失败',
          'icon': 'none',
          duration: 3000
        })
      },
      complete: () => {
        wx.hideLoading()
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    db.collection("categories").get({
      success: res => {
        this.setData({
          categories: res.data
        })
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