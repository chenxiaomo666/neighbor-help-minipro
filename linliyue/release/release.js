// linliyue/release/release.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  oneInput(e){
    console.log(e.detail.value);
    this.setData({
      oneInput: e.detail.value
    })
  },
  twoInput(e){
    console.log(e.detail.value);
    this.setData({
      twoInput: e.detail.value
    })
  },
  threeInput(e){
    console.log(e.detail.value);
    this.setData({
      threeInput: e.detail.value
    })
  },

  submit(){
    var that = this;
    if(that.data.oneInput==null){
      wx.showToast({
        title: '第一行未填写！',
        icon: "none",   //success,loading,none
        duration: 2000,
      })
    }else if(that.data.twoInput==null){
      wx.showToast({
        title: '第二行未填写！',
        icon: "none",   //success,loading,none
        duration: 2000,
      })
    }else if(that.data.threeInput==null){
      wx.showToast({
        title: '第三行未填写！',
        icon: "none",   //success,loading,none
        duration: 2000,
      })
    }else{
      wx.request({
        url: 'https://dev.mylwx.cn:2333/cxm/linliyue/release',
        method: "POST",
        data: {
          one_input: that.data.oneInput,
          two_input: that.data.twoInput,
          three_input: that.data.threeInput,
          title: that.data.typeName,
          img_path: that.data.imgPath,
          user_id: that.data.user_id,
          type_id: that.data.type
        },
        success(res){
          console.log(res.data);
          wx.navigateTo({
            url: '/linliyue/details/details?type='+that.data.type,
          })
        }
      })
    }
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type = options.type;
    var typeName = options.typeName;
    this.setData({
      type: type,
      typeName: typeName,
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