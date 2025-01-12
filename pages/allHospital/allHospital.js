Page({
  data: {},
  handlerGobackClick(delta) {
    const pages = getCurrentPages();
    if (pages.length >= 2) {
      wx.navigateBack({
        delta: delta
      });
    } else {
      wx.navigateTo({
        url: '/pages/main/main'
      });
    }
  },
  handlerGohomeClick() {
    wx.navigateTo({
      url: '/pages/main/main'
    });
  }
});