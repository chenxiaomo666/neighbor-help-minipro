// pages/bindSchoolInfo/bindSchoolInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  nameInput(e) {
    this.setData({
      name: e.detail.value
    })
  },
  phoneInput(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  addressInput(e) {
    this.setData({
      address: e.detail.value
    })
  },
  submit() {
    var that = this;
    if(that.data.name == null){
      wx.showToast({
      title: '姓名未填写！',
      icon: "none",   //success,loading,none
      duration: 2000,
    })
    }else if(that.data.phone == null){
      wx.showToast({
        title: '电话未填写！',
        icon: "none",   //success,loading,none
        duration: 2000,
      })
    }else if(that.data.address == null){
      wx.showToast({
        title: '地址未填写！',
        icon: "none",   //success,loading,none
        duration: 2000,
      })
    }else{
      wx.request({
        url: 'https://dev.mylwx.cn:2333/cxm/user/add',
        method:"POST",
        data: {
          name: that.data.name,
          openid: that.data.openid,
          nickname: that.data.userInfo.nickName,
          head_img: that.data.userInfo.avatarUrl,
          sex: that.data.userInfo.gender,
          phone: that.data.phone,
          address: that.data.address,
          },
        success(res){
          console.log(res.data)
          if(res.data.code==200){
            wx.navigateTo({
              url: '/pages/home/home'
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = JSON.parse(options.userInfo);
    var openid = options.openid;
    this.setData({
      userInfo : userInfo,
      openid : openid,
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