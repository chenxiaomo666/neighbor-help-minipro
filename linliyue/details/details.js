// linliyue/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    names: ['兴趣团体', '游玩组队', '节日活动'],
  },

  specific(e){
    var id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '/linliyue/specific/specific?message_id='+id,
    })
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
    var that = this;
    var type = that.data.type;
    wx.navigateTo({
      url: '/linliyue/release/release?type='+type+'&typeName='+that.data.names[type],
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var type = options.type;
    var typeName = that.data.names[type];
    wx.request({
      url: 'https://dev.mylwx.cn:2333/cxm/linliyue/list',
      method: "GET",
      data: {
        type_id: type
      },
      success(res){
        console.log(res.data.result);
        that.setData({
          type: type,
          typeName: typeName,
          messages: res.data.result
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