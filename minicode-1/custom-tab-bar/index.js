Component({
  data: {
    show: true,
    selected: 0,
    color: '#CCCCCC',
    selectedColor: '#000000',
    list: [
      {
        "pagePath": "/pages/home/index",
        "name": "首页",
      },
      {
        "pagePath": "/pages/mine/index",
        "name": "我的",
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const { path } = e.currentTarget.dataset
      wx.switchTab({
        url: path
      })
    }
  }
})