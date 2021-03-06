// pages/private/private.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  changeInfo(){
    var userInfoStr = JSON.stringify(this.data.user_info);
    console.log(userInfoStr);
    console.log(this.data.user_info);
    wx.navigateTo({
      url: '/pages/bindInfo/bindInfo?userInfo='+userInfoStr+'&isChange='+1, // 进去绑定信息页面
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
              wx.request({
                url: 'https://dev.mylwx.cn:2333/cxm/user/info',
                method: "GET",
                data: {
                  user_id: user_id
                },
                success(res){
                  console.log(res.data.result);
                  that.setData({
                    user_info: res.data.result,
                    user_id: user_id
                  })
                }
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
    var that = this;
    var user_id = wx.getStorageSync('user_id');  // 如果没有该关键字，对应返回为空字符串""

    that.setData({
      user_id: user_id
    })
    
    if(user_id != ""){
      wx.request({
        url: 'https://dev.mylwx.cn:2333/cxm/user/info',
        method: "GET",
        data: {
          user_id: user_id
        },
        success(res){
          that.setData({
            user_info: res.data.result,
            // user_id: user_id
          })
        }
      })
    }
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
    console.log(that.data.user_id);
    console.log(that.data.user_id=='');
    if(that.data.user_id!=""){
      wx.request({
        url: 'https://dev.mylwx.cn:2333/cxm/user/info',
        method: "GET",
        data: {
          user_id: that.data.user_id
        },
        success(res){
          that.setData({
            user_info: res.data.result,
            // user_id: user_id
          })
        }
      })
    }
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