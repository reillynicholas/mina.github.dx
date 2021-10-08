//index.js
//获取应用实例
var app = getApp();
const db = wx.cloud.database();
Page({
    data: {
        indicatorDots: true,
        loadingHidden: false, // loading
        swiperCurrent: 0,
        categories: [],
        activeCategoryId: 0,
        goods: [],
        scrollTop: "0",
        searchInput: '',
        processing: false
    },
    onLoad: function () {
        wx.setNavigationBarTitle({
            title: '产品展示',
        })
    },

    onShow: function () {
        this.getBannerAndCat()
    },

    getBannerAndCat: function () {
        let that = this
        db.collection('categories').get({
            success: res => {
                this.setData({
                    categories: res.data
                })
            }
        })
        db.collection('goods').get({
            success: res => {
                this.setData({
                    goods: res.data,
                    banners: res.data
                })
            }
        })
        // this.setData({
        //     activeCategoryId: 0
        // })
    },
    scroll: function (e) {
        var that = this,
            scrollTop = that.data.scrollTop;
        that.setData({
            scrollTop: e.detail.scrollTop
        });
    },
    //事件处理函数
    swiperchange: function (e) {
        this.setData({
            swiperCurrent: e.detail.current
        })
    },
    listenerSearchInput: function (e) {
        this.setData({
            searchInput: e.detail.value
        });
    },
    toSearch: function (e) {
        this.setData({
            goods: [],
        });
        this.getGoodList();
    },
    tapBanner: function (e) {
        if (e.currentTarget.dataset.id != 0) {
            wx.navigateTo({
                url: "/pages/food/info?id=" + e.currentTarget.dataset.id
            });
        }
    },
    toDetailsTap: function (e) {
        wx.navigateTo({
            url: "/pages/product/info?id=" + e.currentTarget.dataset.id
        });
    },
    catClick: function (e) {
        this.setData({
            activeCategoryId: e.currentTarget.id
        });
        this.setData({
            goods: []
        });
        if (this.data.activeCategoryId == 0) {
            db.collection('goods').get({
                success: res => {
                    this.setData({
                        goods: this.data.goods.concat(res.data)
                    })
                }
            })
        } else {
            this.getGoodList()
        }
    },

    getGoodList: function () {
        let that = this
        if (that.data.processing) {
            return;
        }

        that.setData({
            processing: true
        });

        db.collection('goods').where({
            name: db.RegExp({
                regexp: this.data.searchInput,
                options: 'i'
            }),
            category_id: this.data.activeCategoryId
        }).get({
            success: res => {
                this.setData({
                    goods: this.data.goods.concat(res.data),
                    processing: false
                })
            }
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
});