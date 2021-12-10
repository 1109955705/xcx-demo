const XLSX = require('../utils/excel.js')

Page({
  data: {

  },
  onLoad() {

  },
  exportData() {
    // 数据源
    const data = [{
      code: 1,
      name: 'A',
    }, {
      code: 2,
      name: 'B',
    }, {
      code: 3,
      name: 'C',
    }, {
      code: 4,
      name: 'D',
    }]

    // 构建一个表的数据
    let sheet = []
    let title = ['序号', '姓名']
    sheet.push(title)
    data.forEach(item => {
      let rowcontent = []
      rowcontent.push(item.code)
      rowcontent.push(item.name)
      sheet.push(rowcontent)
    })

    // XLSX插件使用
    var ws = XLSX.utils.aoa_to_sheet(sheet);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "寻一科技");
    var fileData = XLSX.write(wb, {
      bookType: "xlsx",
      type: 'base64'
    });

    let filePath = `${wx.env.USER_DATA_PATH}/寻一科技.xlsx`

    // 写文件
    const fs = wx.getFileSystemManager()
    fs.writeFile({
      filePath: filePath,
      data: fileData,
      encoding: 'base64',
      success(res) {
        console.log(res)
        const sysInfo = wx.getSystemInfoSync()
        // 导出
        if (sysInfo.platform.toLowerCase().indexOf('windows') >= 0) {
          // 电脑PC端导出
          wx.saveFileToDisk({
            filePath: filePath,
            success(res) {
              console.log(res)
            },
            fail(res) {
              console.error(res)
              util.tips("导出失败")
            }
          })
        } else {
          // 手机端导出
          // 打开文档
          wx.openDocument({
            filePath: filePath,
            success: function (res) {
              console.log('打开文档成功')
            },
            fail: console.error
          })
        }

      },
      fail(res) {

        console.error(res)
        if (res.errMsg.indexOf('locked')) {
          wx.showModal({
            title: '提示',
            content: '文档已打开，请先关闭',
          })
        }

      }
    })
  }
})