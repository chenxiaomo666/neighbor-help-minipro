// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  release(){
    var businessId = this.data.businessId;
    wx.navigateTo({
      url: '/pages/releaseInfo/releaseInfo?businessId='+businessId,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var businessId = options.businessId;
    console.log(businessId);
    var that = this;
    wx.request({
      url: 'https://dev.mylwx.cn:2333/cxm/message/list',
      data: {
        business_id: businessId
      },
      method: "GET",
      success(res){
        console.log(res.data.result)
        that.setData({
          messages: res.data.result
        })
      }
    });
    wx.request({
      url: 'https://dev.mylwx.cn:2333/cxm/message/name',
      data: {
        business_id : businessId
      },
      method: "GET",
      success(res){
        that.setData({
          businessId: businessId,
          businessName: res.data.message_name
        })
      }
    });
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