// pages/bindSchoolInfo/bindSchoolInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  ageInput(e) {
    this.setData({
      age: e.detail.value
    })
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
    }else if(that.data.age == null){
      wx.showToast({
        title: '年龄未填写！',
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
      console.log(that.data.openid);
      wx.request({
        url: 'https://dev.mylwx.cn:2333/cxm/user/insert',
        method:"POST",
        data: {
          name: that.data.name,
          openid: that.data.openid,
          nickname: that.data.userInfo.nickName,
          head_img: that.data.userInfo.avatarUrl,
          sex: that.data.userInfo.gender,
          phone: that.data.phone,
          age: that.data.age,
          address: that.data.address,
          },
        success(res){
          if(res.data.code==200){
            wx.setStorage({
              data: res.data.user_id,
              key: 'user_id',
            })
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