Page({
  data: {
    hospitalName: '',
    departmentName: '',
    doctorName: '',
    showCalendar: false,
    selectedDate: '',
    minDate: new Date().getTime(),
    maxDate: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30天内
    timeSlots: [
      { time: '08:00-09:00', available: true },
      { time: '09:00-10:00', available: true },
      { time: '10:00-11:00', available: true },
      // ... 更多时间段
    ],
    timeSlot: '',
    patientName: '',
    idCard: '',
    phone: '',
    registrationFee: 50, // 挂号费用
  },

  onLoad(options) {
    // 获取上一页传递的医院、科室、医生信息
    this.setData({
      hospitalName: options.hospitalName,
      departmentName: options.departmentName,
      doctorName: options.doctorName
    });
  },

  showCalendar() {
    this.setData({ showCalendar: true });
  },

  onCloseCalendar() {
    this.setData({ showCalendar: false });
  },

  onSelectDate(event) {
    this.setData({
      selectedDate: this.formatDate(event.detail),
      showCalendar: false
    });
  },

  onTimeSlotChange(event) {
    this.setData({ timeSlot: event.detail });
  },

  onSubmitRegistration() {
    // 表单验证
    if (!this.validateForm()) {
      return;
    }

    // 提交预约信息
    wx.showLoading({ title: '提交中...' });
    
    // 调用预约API
    wx.cloud.callFunction({
      name: 'createRegistration',
      data: {
        hospitalName: this.data.hospitalName,
        departmentName: this.data.departmentName,
        doctorName: this.data.doctorName,
        appointmentDate: this.data.selectedDate,
        timeSlot: this.data.timeSlot,
        patientName: this.data.patientName,
        idCard: this.data.idCard,
        phone: this.data.phone
      }
    }).then(res => {
      wx.hideLoading();
      wx.showToast({
        title: '预约成功',
        icon: 'success'
      });
      // 跳转到预约成功页面
      wx.navigateTo({
        url: '/pages/registrationSuccess/registrationSuccess'
      });
    }).catch(err => {
      wx.hideLoading();
      wx.showToast({
        title: '预约失败',
        icon: 'error'
      });
    });
  },

  validateForm() {
    // 表单验证逻辑
    if (!this.data.selectedDate) {
      wx.showToast({
        title: '请选择就诊日期',
        icon: 'none'
      });
      return false;
    }
    // ... 其他验证
    return true;
  },

  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
}); 