// pages/index/index.js
const app = getApp()

Page({
  
  /**
   * 页面的初始数据
   */
  data: {

  },

  getUserInfo(e){
    var that = this;
    app.globalData.userInfo = e.detail.userInfo;
    console.log(app.globalData.userInfo);
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
              wx.navigateTo({
                url: '/pages/home/home'
              })
            }
            else{
              var userInfoStr = JSON.stringify(e.detail.userInfo);
              wx.navigateTo({
                url: '/pages/bindInfo/bindInfo?userInfo='+userInfoStr+'&openid='+res.data.openid, // 进去绑定信息页面
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