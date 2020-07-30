// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  read(){
    wx.navigateTo({
      url: '/pages/readInfo/readInfo?is_read=101&user_id='+this.data.user_id,
    })
  },

  unread(){
    wx.navigateTo({
      url: '/pages/readInfo/readInfo?is_read=100&user_id='+this.data.user_id,
    })
  },

  getUserInfo(e){
    console.log("啊，脑袋，你竟然还没登陆");
    var that = this;
    // app.globalData.userInfo = e.detail.userInfo;
    // console.log(app.globalData.userInfo);
    wx.login({
      success(res) {
        var code = res.code;
        wx.request({
          url: 'https://dev.mylwx.cn:2333/cxm/user/query',
          data: {
            js_code: res.code,
            grant_type: "authorization_code"
          },
          method: "GET",
          success(res) {
            console.log(res.data)
            var isBind = res.data.is_bind;
            if(isBind){
              var user_id = res.data.user_id
              wx.setStorage({
                data: user_id,
                key: 'user_id',
              })
              that.setData({
                user_id: user_id
              })
            }
            else{
              var userInfoStr = JSON.stringify(e.detail.userInfo);
              wx.navigateTo({
                url: '/pages/bindInfo/bindInfo?userInfo='+userInfoStr+'&openid='+res.data.open_id, // 进去绑定信息页面
              })
            }
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user_id: wx.getStorageSync('user_id')
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