// pages/dynamic/dynamic.js
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

  release(){
    wx.navigateTo({
      url: '/pages/dyrelease/dyrelease'
    })
  },

  getUserInfo(e){
    console.log("登录ing.......");
    var that = this;
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
              that.setData({
                user_id: res.data.user_id,
              })
              wx.setStorage({
                data: res.data.user_id,
                key: 'user_id',
              })
              // wx.navigateTo({
              //   url: '/pages/dyrelease/dyrelease'
              // })
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
    var that = this;
    wx.request({
      url: 'https://dev.mylwx.cn:2333/cxm/dynamic/list',
      method: "GET",
      data: {
      },
      success(res){
        that.setData({
          messages: res.data.result,
          user_id: wx.getStorageSync('user_id')
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
    var that = this;
    wx.request({
      url: 'https://dev.mylwx.cn:2333/cxm/dynamic/list',
      method: "GET",
      data: {
      },
      success(res){
        that.setData({
          messages: res.data.result,
          user_id: wx.getStorageSync('user_id')
        })
      }
    })
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