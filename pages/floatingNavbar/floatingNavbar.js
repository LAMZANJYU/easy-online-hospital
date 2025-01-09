Component({
  data: {},
  methods: {
    onButtonClick(e) {
      const page = e.currentTarget.dataset.page;
      wx.navigateTo({
        url: `/pages/${page}/${page}`,
      });
    },
  },
});