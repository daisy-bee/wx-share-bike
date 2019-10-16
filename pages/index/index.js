Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: 0,
    latitude: 0,
    controls:[],
    markers:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getLocation({
      success: function(res) {
        // console.log(res);
        var lat=res.latitude;
        var lon=res.longitude;
        that.setData({
          latitude : lat,
          longitude : lon
        });
      },
    })

    wx.getSystemInfo({
      success: function(res) {
        // console.log(res);
        var windowHeight=res.windowHeight;
        var windowWidth=res.windowWidth;

        that.setData({
          controls: [{
            id: 1,
            iconPath: '../../icons/pricon.png',
            position: {
              width: 130,
              height: 45,
              top: windowHeight - 22.5 - 50,
              left: windowWidth / 2 - 65
            },
            clickable: true
          },
          {
            id:2,
            iconPath:'../../icons/payicon.png',
            position:{
              width:25,
              height:25,
              top:windowHeight-25-60,
              left:windowWidth - 25 -15
            },
            clickable:true
          },
          {
            id:3,
            iconPath:'../../icons/repairicon.png',
            position:{
              width:25,
              height:25,
              top:windowHeight-25-30,
              left:windowWidth -25- 15
            },
            clickable: true
          },
          {
            id:4,
            iconPath:'../../icons/opointicon.png',
            position:{
              width:25,
              height:25,
              top:windowHeight-25-30,
              left:15
            },
            clickable: true
          },
          {
            id:5,
            iconPath:'../../icons/position.png',
            position:{
              width:25,
              height:25,
              top:windowHeight / 2 - 12.5,
              left:windowWidth / 2 - 12.5
            },
            clickable: true
          },
          {
            id:6,
            iconPath:'../../icons/add.png',
            position:{
              width:25,
              height:25,
              top:5,
              left:5
            },
            clickable: true
          }]
        })
      },
    })
  },

  controltap: function(e){
    // console.log(e);
    var that=this;
    var cid=e.controlId;
    switch(cid){
      //点击回到原点按钮
      case 4:
        this.mapCtx.moveToLocation();
        break;
      //点击添加单车按钮
      case 6:
        var bikes=that.data.markers;
        bikes.push({
          iconPath: '../../icons/bike.png',
          width: 25,
          height: 25,
          longitude: that.data.longitude,
          latitude: that.data.latitude
        });
        //把添加后的数据重新赋值
        that.setData({
          markers:bikes
        })
        break;
    }
  },

  regionchange:function(e){
    var that=this;
    if(e.type=="end"){
      this.mapCtx.getCenterLocation({
        success:function(res){
          var lat=res.latitude;
          var lon=res.longitude;
          that.setData({
            latitude:lat,
            longitude:lon
          })         
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx=wx.createMapContext('myMap')
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