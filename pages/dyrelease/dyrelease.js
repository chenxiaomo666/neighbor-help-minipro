// pages/dyrelease/dyrelease.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  contentInput(e){
    console.log(e.detail.value);
    this.setData({
      content: e.detail.value
    })
  },

  chooseImage(){
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          imgPath: res.tempFilePaths[0]
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
            console.log(res.data);
          }
        })
      }
    })
  },

  submit(){
    var that = this;
    if(that.data.content==null){
      wx.showToast({
        title: '动态内容未填写！',
        icon: "none",   //success,loading,none
        duration: 2000,
      })
    }else{
      wx.request({
        url: 'https://dev.mylwx.cn:2333/cxm/dynamic/release',
        method: "POST",
        data: {
          user_id: that.data.user_id,
          content: that.data.content,
          img_path: that.data.imgPath
        },
        success(res){
          console.log(res.data);
          wx.switchTab({
            url: '/pages/dynamic/dynamic',
          })
          // wx.navigateTo({
          //   url: '/pages/dynamic/dynamic'
          // })
        }
      })
    }
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