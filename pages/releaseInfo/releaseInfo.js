// pages/releaseInfo/releaseInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  titleInput(e){
    this.setData({
      title: e.detail.value
    })
  },

  contentInput(e){
    this.setData({
      content: e.detail.value
    })
  },

  submit(){
    var that = this;
    if(that.data.title == null){
      wx.showToast({
      title: '标题未填写！',
      icon: "none",   //success,loading,none
      duration: 2000,
    })
    }else if(that.data.content == null){
      wx.showToast({
        title: '内容未填写！',
        icon: "none",   //success,loading,none
        duration: 2000,
      })
    }else{
      wx.request({
        url: 'https://dev.mylwx.cn:2333/cxm/message/add',
        data: {
          business_id: that.data.businessId,
          title: that.data.title,
          content: that.data.content,
          user_id: that.data.user_id
        },
        method: "POST",
        success(res){
          wx.showToast({
            title: '提交成功',
            icon: "success",   //success,loading,none
            duration: 2000,
          })
          wx.navigateTo({
            url: '/pages/home/home?businessId='+that.data.businessId
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var businessId = options.businessId;
    console.log(businessId);
    wx.getStorage({
      key: 'user_id',
      success (res) {
        console.log(res.data)
        that.setData({
          user_id: res.data,
          businessId: businessId
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