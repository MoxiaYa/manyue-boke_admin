
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '超级管理员',
    sex: '男',
    age: 20,
    phone: '17806666555',
    routes: 'routers'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor',
    sex: '男',
    age: 20,
    phone: '17806666555',
    routes: 'routers'
  }
}

export default [
  // 登录
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 200,
        data: token
      }
    }
  },

  // 获取信息
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      // const { token } = config.query
      const info = users['admin-token']
      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 200,
        data: info
      }
    }
  },

  // 退出登录
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },

  // 修改资料
  {
    url: '/user/edit',
    type: 'get',
    response: config => {
      const token = config.query.token
      const new_info = JSON.parse(config.query.info)

      users[token].name = new_info.name
      users[token].sex = new_info.sex
      users[token].age = new_info.age
      users[token].phone = new_info.phone

      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
