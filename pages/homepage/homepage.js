const order = ['demo1', 'demo2', 'demo3']
const WXAPI = require('apifm-wxapi')
WXAPI.init('Lr2002')
Page({
  onShareAppMessage() {
    return {
      title: 'scroll-view',
      path: 'utils\\utils\\WIN_20210502_13_26_56_Pro.jpg'
    }
  },
  onLoad: function(e){
    WXAPI.province().then(res => {
      console.log('查看你的省份：',res)
    })
    WXAPI.banners().then(res => {
      if (res.code == 0 )
      {
        this.setData({
          banners:res.data
        })
      }
    })
    
  },
  tapBanner: function(e){
    const url = e.currentTarget.dateset.url
    if(url)
    {
      wx.navigateTo(
        {
          url
        }
      )
    }
  },
  async initBanners(){
    const _data = {}
    const res1= await   WXAPI.banners({
      type: 'index'
    })
    if(res1.code == 700)
    {
      wx.showModal({
        title:'提示',
        content:'请在后台添加banner的轮播图片',
        showCancel:false
      })
    }
    else{
      _data.banners=res1.data
    }
  },
  data: {
    toView: 'green'
  },

  upper(e) {
    console.log(e)
  },

  lower(e) {
    console.log(e)
  },

  scroll(e) {
    console.log(e)
  },

  scrollToTop() {
    this.setAction({
      scrollTop: 0
    })
  },

  tap() {
    for (let i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1],
          scrollTop: (i + 1) * 200
        })
        break
      }
    }
  },

  tapMove() {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  }
})