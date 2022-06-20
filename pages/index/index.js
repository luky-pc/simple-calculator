// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    currentVal: 0,
    actionArr: [],
    numberArr: [],
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
    const currentVal = parseFloat(this.data.currentVal) || '';
    this.setData(
      {currentVal: currentVal + number}
    );
  },

  clear: function () {
    this.setData(
      {
        numberArr: [],
        actionArr: [],
        currentVal: 0,
      }
    );
  },
  percent: function() {
    const currentVal = parseFloat(this.data.currentVal);
    if (!currentVal) return;
    this.setData(
      { currentVal: currentVal / 100 }
    );
  },
  reverse: function() {
    const currentVal = parseFloat(this.data.currentVal);
    if (!currentVal) return;
    this.setData(
      { currentVal: -currentVal }
    );
  },
  setDot: function () {
    const currentVal = this.data.currentVal;
    if (!currentVal) {
      this.setData(
        {currentVal: this.data.currentVal + '0.'}
      );
    } if (currentVal.indexOf('.') === -1) {
      this.setData(
        {currentVal: this.data.currentVal + '.'}
      );
    }
  },
  setAction: function (e) {
    const { currentVal, numberArr, actionArr} = this.data;
    const action = e.currentTarget.dataset['action'];
    if (currentVal) {
      const lastNumber = parseFloat(numberArr.pop());
      const lastAction = actionArr.pop();
      switch (lastAction) {
        case '*': 
          numberArr.push(lastNumber * parseFloat(currentVal));
          break;
        case '/':
          numberArr.push(lastNumber / parseFloat(currentVal));
          break;
        default:
          !isNaN(lastNumber) && numberArr.push(lastNumber);
          numberArr.push(currentVal);
          lastAction && actionArr.push(lastAction);
          break;
      }
      actionArr.push(action);
    } else { // 连续输入 操作符 认为前一个操作符 无效
      actionArr.pop();
      actionArr.push(action);
    }
    this.setData(
      {
        numberArr: numberArr,
        actionArr: actionArr,
        currentVal: '',
      }
    );
  },
  calcResult: function (e) {
    let result;
    const { currentVal, numberArr, actionArr} = this.data;
    if (!numberArr.length) return; 
    result = parseFloat(numberArr.shift());
    numberArr.push(currentVal);
    while(numberArr.length) {
      let action = actionArr.shift();
      let current = parseFloat(numberArr.shift());
      switch (action) {
        case '+': result += current;
          break;
        case '-': result-= current;
          break;
        case '*': result *= current;
          break;
        case '/': result /= current;
          break;
        default: break;
      }
    }
    this.setData(
      { currentVal: result }
    );
  }
})
