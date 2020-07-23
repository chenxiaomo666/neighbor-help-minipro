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
  verifiesInput(e){
    this.setData({
      verifies: e.detail.value
    })
  },
  addressInput(e) {
    this.setData({
      address: e.detail.value
    })
  },

  changeImg(){
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          headImg: res.tempFilePaths[0],
          imgChange: 1
        })
        console.log(res.tempFilePaths[0]);
        wx.uploadFile({
          url: 'https://dev.mylwx.cn:5000/cxm/upload', 
          filePath: tempFilePaths[0],
          name: 'file',
          formData:{
            'user': 'test'
          },
          success: function(res){
            var data = res.data
            // console.log(res.data);
          }
        })
      }
    })
  },

  submitChange(){
    var that = this;
    var name = null;
    var phone = null;
    var age = null;
    var address = null;
    
    if(that.data.name == null){
      name = that.data.userInfo.name;
    }else{
      name = that.data.name
    }
    if(that.data.phone == null){
      phone = that.data.userInfo.phone;
    }else{
      phone = that.data.phone
    }
    if(that.data.age == null){
      age = that.data.userInfo.age;
    }else{
      age = that.data.age
    }
    if(that.data.address == null){
      address = that.data.userInfo.address;
    }else{
      address = that.data.address
    }
    wx.request({
      url: 'https://dev.mylwx.cn:2333/cxm/user/upsert',
      method: "POST",
      data: {
        user_id: that.data.userInfo.user_id,
        name: name,
        phone: phone,
        age: age,
        address: address,
        head_img: that.data.headImg,
        img_change: that.data.imgChange
      },
      success(res){
        console.log(res.data);
        wx.switchTab({
          url: '/pages/private/private',
        })
      }
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
    }else if(that.data.verifies == null){
      wx.showToast({
        title: '验证码未填写！',
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
        url: 'https://dev.mylwx.cn:2333/cxm/user/upsert',
        method:"POST",
        data: {
          name: that.data.name,
          openid: that.data.openid,
          nickname: that.data.userInfo.nickName,
          head_img: that.data.userInfo.avatarUrl,
          sex: that.data.userInfo.gender,
          phone: that.data.phone,
          age: that.data.age,
          verifies: that.data.verifies,
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
    var isChange = options.isChange;
    this.setData({
      userInfo : userInfo,
      openid : openid,
      isChange: isChange,
      headImg: userInfo.head_img,
      imgChange: 0
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