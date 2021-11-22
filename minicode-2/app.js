require('./utils/overWrite')
App({
  onLaunch: function () {
    
  },
  setProp: function(target, prop, value, writable) {
    Object.defineProperty(target, prop, {
      configurable: true,
      enumerable: false,
      writable: !!writable,
      value: value
    });
    if(target){
      var syncProps = target.syncProps || {}
      syncProps[prop] = target[prop]
      target.syncProps = syncProps
    }
    return target
  },
  globalData: {
    appName: "小程序名"
  }
})