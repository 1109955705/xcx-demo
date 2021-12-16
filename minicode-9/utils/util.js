const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const canvasGoodsPosters = (canvas,ctx,width,height) => {
  const dpr = wx.getSystemInfoSync().pixelRatio
  ctx.scale(dpr, dpr)
  let image = canvas.createImage()
  wx.getImageInfo({
    src: 'https://img.yijian.hk/2020-05-14/20200514195702-fbbd9c95-f0fc-43e5-ab49-b6b66af44f124930596248742728509.png',
    success:(res)=>{
      image.src = res.path
      console.log(res)
      image.onload = (res)=>{
        ctx.drawImage(image,0,0,375,400,0 ,0 ,200, 300)
      }
    }
  })
  
  
}

module.exports = {
  formatTime: formatTime,
  canvasGoodsPosters: canvasGoodsPosters
}
