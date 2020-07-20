// linlixiang/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  clickImg(e){
    // console.log(e);
    var imgUrl = e.currentTarget.dataset.imgurl;
    wx.previewImage({
      urls: [imgUrl], //需要预览的图片http链接列表，注意是数组
      current: '', // 当前显示图片的http链接，默认是第一个
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  messInput(e){
    console.log(e.detail.value);
    this.setData({
      content: e.detail.value
    })
  },

  release(){
    var that = this;
    wx.navigateTo({
      url: '/linlixiang/release/release?type='+that.data.detailsType,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var detailsType = options.type;
    wx.request({
      url: 'https://dev.mylwx.cn:2333/cxm/linlixiang/list',
      data: {
        share_type: detailsType
      },
      method: "GET",
      success(res){
        console.log(res.data.result)
        that.setData({
          detailsType: detailsType,
          messages: res.data.result
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