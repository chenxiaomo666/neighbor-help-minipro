// linlixiang/release/release.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2018-01-01',//默认起始时间  
    date2: '2018-01-24',//默认结束时间 
  },

  bindDateChange(e) {
    var that = this;
    console.log(e.detail.value)
    that.setData({
      date: e.detail.value,
    })
  },
  bindDateChange2(e) {
    var that = this;
    that.setData({
      date2: e.detail.value,
    })

  },

  messNameInput(e){
    console.log(e.detail.value);
    this.setData({
      messName: e.detail.value
    })
  },

  submit(){
    var that = this;
    console.log("提交！啊，脑袋！");
    if(that.data.detailsType==1){   // 物品共享
      if(that.data.messName==null){
        wx.showToast({
          title: '物品名字未填写！',
          icon: "none",   //success,loading,none
          duration: 2000,
        })
      }else{
        wx.request({
          url: 'https://dev.mylwx.cn:2333/cxm/linlixaing/release',
          data: {
            user_id: that.data.user_id,
            mess_name: that.data.messName,
            img_path: that.data.imgPath,
            share_name: "物品共享"
          },
          method: "POST",
          success(res){
            console.log(res.data);
            wx.navigateTo({
              url: '/linlixiang/details/details?type='+that.data.detailsType,
            })
          }
        })
      }
    }else{   // 车位共享
      wx.request({
        url: 'https://dev.mylwx.cn:2333/cxm/linlixaing/release',
        data: {
          user_id: that.data.user_id,
          start_time: that.data.date,
          end_time: that.data.date2,
          img_path: that.data.imgPath,
          share_name: "车位共享"
        },
        method: "POST",
        success(res){
          console.log(res.data);
          wx.navigateTo({
            url: '/linlixiang/details/details?type='+that.data.detailsType,
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
            //do something
          }
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var detailsType = options.type;
    var that = this;

    wx.getStorage({
      key: 'user_id',
      success (res) {
        console.log(res.data)
        that.setData({
          user_id: res.data,
          detailsType: detailsType
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