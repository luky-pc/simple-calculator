// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    currentVal: '',
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
  },
  setNumber: function (e) {
    const number = e.currentTarget.dataset['number'];
    this.setData(
      {currentVal: this.data.currentVal + number}
    );
  }
})
