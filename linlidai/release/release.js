// linlidai/release/release.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  addressInput(e){
    console.log(e.detail.value);
    this.setData({
      address: e.detail.value
    })
  },
  getMethodInput(e){
    console.log(e.detail.value);
    this.setData({
      getMethod: e.detail.value
    })
  },
  massListInput(e){
    console.log(e.detail.value);
    this.setData({
      massList: e.detail.value
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
    if(that.data.address==null){
      wx.showToast({
        title: '目的地未填写！',
        icon: "none",   //success,loading,none
        duration: 2000,
      })
    }else if(that.data.getMethod==null){
      wx.showToast({
        title: '取货方式未填写！',
        icon: "none",   //success,loading,none
        duration: 2000,
      })
    }else if(that.data.massList==null){
      wx.showToast({
        title: '物品清单未填写！',
        icon: "none",   //success,loading,none
        duration: 2000,
      })
    }else{
      wx.request({
        url: 'https://dev.mylwx.cn:2333/cxm/linlidai/release',
        method: "POST",
        data: {
          user_id: that.data.user_id,
          img_path: that.data.imgPath,
          type_id: that.data.type,
          address: that.data.address,
          get_method: that.data.getMethod,
          mass_list: that.data.massList
        },
        success(res){
          wx.navigateTo({
            url: '/linlidai/details/details?type='+that.data.type,
          })
        }
      })
    }
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