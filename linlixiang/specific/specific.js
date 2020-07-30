// linlixiang/specific/specific.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  chat(){
    wx.showToast({
      title: '该功能尚未开发',
      icon: "none",   //success,loading,none
      duration: 2000,
    })
  },

  join(){
    var that = this;
    var user_id = wx.getStorageSync('user_id');
    var target_user_id = that.data.message.user_info.user_id;
    var time = that.data.message.time;
    var message_id = that.data.message_id;
    var title = that.data.message.title;
    var name;
    var avail_time;
    if(title=="物品共享"){
      name = that.data.message.name;
    }else if(title=="车位共享"){
      avail_time = that.data.message.avail_time;
    }
    if(user_id==target_user_id){
      wx.showToast({
        title: '信息为本人发布！',
        icon: "none",   //success,loading,none
        duration: 2000,
      })
    }else{
      wx.request({
        url: 'https://dev.mylwx.cn:2333/cxm/news/send',
        method: "POST",
        data: {
          type: "邻里享",
          user_id: user_id,
          target_user_id: target_user_id,
          title: title,
          name: name,
          time: time,
          avail_time: avail_time,
          message_id: message_id
        },
        success(res){
          console.log(res.data);
          that.setData({
            is_join: 1
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
    var message_id = options.message_id;
    wx.request({
      url: 'https://dev.mylwx.cn:2333/cxm/linlixiang/single',
      method: "GET",
      data: {
        message_id: message_id
      },
      success(res){
        that.setData({
          message: res.data.result,
          message_id: message_id
        })
      }
    })
    wx.request({
      url: 'https://dev.mylwx.cn:2333/cxm/news/isjoin',
      method: "GET",
      data: {
        user_id: wx.getStorageSync('user_id'),
        message_id: message_id
      },
      success(res){
        that.setData({
          is_join: res.data.result
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