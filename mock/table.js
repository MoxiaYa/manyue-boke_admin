import Mock from 'mockjs'

const data = Mock.mock({
  items: [
    {
      id: '001',
      name: '一号部门',
      num: '10',
      display_time: '2019-01-01',
      detail: '001',
      use: true
    },
    {
      id: '002',
      name: '二号部门',
      num: '9',
      display_time: '2019-01-01',
      detail: '001',
      use: true
    },
    {
      id: '003',
      name: '三号部门',
      num: '8',
      display_time: '2019-01-01',
      detail: '001',
      use: true
    },
    {
      id: '004',
      name: '四号部门',
      num: '0',
      display_time: '2019-01-01',
      detail: '001',
      use: false
    },
    {
      id: '005',
      name: '五号部门',
      num: '10',
      display_time: '2019-01-01',
      detail: '001',
      use: true
    },
    {
      id: '006',
      name: '六号部门',
      num: '10',
      display_time: '2019-01-01',
      detail: '001',
      use: true
    }
  ]
})

export default [
  // 获取列表
  {
    url: '/table/list',
    type: 'get',
    response: config => {
      var page = config.query.page
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items.slice((page - 1) * 10, page * 10)
        }
      }
    }
  },
  // 搜索列表
  {
    url: '/table/search',
    type: 'get',
    response: config => {
      const items = data.items
      var keywords = config.query.keywords
      const newList = []
      items.forEach(item => {
        if (item.name.indexOf(keywords) !== -1) {
          newList.push(item)
        }
      })
      return {
        code: 20000,
        data: {
          total: newList.length,
          items: newList
        }
      }
    }
  },
  // 添加
  {
    url: '/table/add',
    type: 'get',
    response: config => {
      const info = JSON.parse(config.query.info)
      var id = getNewId()

      var name = info.name
      var detail = info.detail

      var new_info = {
        id: id, name: name, detail: detail, num: 0, display_time: new Date(), use: false
      }

      data.items.push(new_info)

      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // 删除
  {
    url: '/table/del',
    type: 'get',
    response: config => {
      const did = config.query.id

      var index = data.items.findIndex(function(item) {
        return item.id === did
      })

      data.items.splice(index, 1)

      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // 修改
  {
    url: '/table/edit',
    type: 'get',
    response: config => {
      const info = JSON.parse(config.query.info)
      var id = info.id

      var index = data.items.findIndex(function(item) {
        return item.id === id
      })

      var old_info = data.items[index]

      var new_data =
      {
        id: id,
        name: info.name,
        num: old_info.num,
        display_time: old_info.display_time,
        detail: info.detail,
        use: old_info.use
      }
      data.items[index] = new_data

      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/table/moreDel',
    type: 'get',
    response: config => {
      var ids = config.query.ids
      if (ids != null) {
        ids.forEach((item, i) => {
          var index = data.items.findIndex(function(e) {
            return e.id === item
          })
          data.items.splice(index, 1)
        })
        return {
          code: 20000,
          data: 'success'
        }
      } else {
        return {
          code: 500,
          data: 'fail'
        }
      }
    }
  }
]

function getNewId() {
  var now = new Date()
  var year = now.getFullYear()
  var month = now.getMonth()
  var date = now.getDate()
  var hour = now.getHours()
  var min = now.getMinutes()
  var second = now.getSeconds()
  var i = randomNum(10, 99)
  var id = `${year}${month + 1}${date}${hour}${min}${second}${i}`
  return id
}

function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10)

    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)

    default:
      return 0
  }
}

