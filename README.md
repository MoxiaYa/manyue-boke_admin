# 萌新框架
- 基于[Vue-Admin-Template](https://github.com/PanJiaChen/vue-admin-template)
---
## 模态弹框
### alert
- 使用： **fw.elAlert(this,{配置})**
- 配置：
   * 基于element-ui $alert 详细文档：https://element.eleme.cn/#/zh-CN/component/message-box
   * @param {*} _this 实例对象
   * @param {*} param1 :
   * title:弹框标题 
   * text:弹框内容 
   * okText:确定按钮内容 
   * htmlMessage:弹框内容是否作为HTML片段处理
   * type:消息类型（用来显示图标，默认没有图标) (success / info / warning / error)
   * callback:若不使用 Promise，可以使用此参数指定 MessageBox 关闭后的回调↓
   * function(action, instance)，action 的值为'confirm', 'cancel'或'close', instance 为 MessageBox 实例，可以通过它访问实例上的属性和方法
   * center:是否居中布局,默认为否
   * distinguishCancelAndClose:是否将取消（点击取消按钮）与关闭（点击关闭按钮或遮罩层）进行区分
   * closeOnClickModal:是否可通过点击遮罩关闭 MessageBox
   * 实例:
```javascript
this.fw.elAlert(this, 
        { title: 'hello', text: '你确定要删除吗', type: 'warning' }
    ).then(() => {
        console.log('选择了删除')
    }).catch(() => {
        console.log('选择了取消')
})
```

### confirm
- 使用： **fw.elConfirm(this,{配置})**
- 配置： 
   * 基于element-ui $alert 详细文档：https://element.eleme.cn/#/zh-CN/component/message-box
   * @param {*} _this 实例对象
   * @param {*} param1 :
   * title:弹框标题 
   * text:弹框内容 
   * cancelText:取消按钮文本内容
   * okText:确定按钮内容 
   * htmlMessage:弹框内容是否作为HTML片段处理
   * type:消息类型（用来显示图标，默认没有图标) (success / info / warning / error)
   * callback:若不使用 Promise，可以使用此参数指定 MessageBox 关闭后的回调↓
   * function(action, instance)，action 的值为'confirm', 'cancel'或'close', instance 为 MessageBox 实例，可以通过它访问实例上的属性和方法
   * center:是否居中布局,默认为否
   * distinguishCancelAndClose:是否将取消（点击取消按钮）与关闭（点击关闭按钮或遮罩层）进行区分
   * closeOnClickModal:是否可通过点击遮罩关闭 MessageBox
   * 实例：
```javascript

this.fw.elConfirm(this, 
        { title: 'hello', text: '你确定要删除吗', type: 'warning' }
    ).then(() => {
        console.log('选择了删除')
    }).catch(() => {
        console.log('选择了取消')
})

```
---
## 根据权限生成新的路由表
- 原理：
- 1. 在登录完成后向服务器请求权限，服务器返回权限如['admin']管理员权限
- 2. 前端拿到后逐个与所需的权限比较
- 3. 生成路由表
- 4. 无权限者直接输入地址访问将会显示404
- 运用：
- 1. 在router/index.js 的 asyncRoutes 中添加需要权限的路由
- 2. 权限的形式为['权限名']的形式，如['admin'],['editor']
- 3. 在路由的meta中添加需要的权限
- - 例如：
```javascript
{
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, 
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor'] //需要的权限
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'] //在这里也可以添加权限
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
          //不设置权限的话就所有人都可以访问
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      }
    ]
  },
```
---

## js cookie(基于js-cookie)
1. 存入: **fw.setCookie(key,value)**//key:键 value:值
2. 获取: **fw.getCookie(key)**
3. 移除: **fw.removeCookie(key)**



---

## Upload 文件上传(element-ui组件)
1. 官方文档：https://element.eleme.cn/#/zh-CN/component/upload#shou-dong-shang-chuan
2. 使用：```<el-upload></el-upload>```
3. 参数:
4. 
|       参数       |           作用           |  类型   |
| :--------------: | :----------------------: | :-----: |
|      action      |   必选参数，上传的地址   | string  |
|     headers      |    设置上传的请求头部    | object  |
|     multiple     |     是否支持多选文件     | boolean |
|       data       |   上传时附带的额外参数   | object  |
|       name       |     上传的文件字段名     | string  |
| with-credentials | 支持发送 cookie 凭证信息 | boolean |
- 更多请查看[官方文档](https://element.eleme.cn/#/zh-CN/component/)

5. 实例：views/upload/index.vue



---

## 添加页面
1. 在 **src - view** 文件夹中新建 视图.vue 文件
2. 在 **src - components** 文件夹中新建 需要开发的组件.vue文件
3. 在 **src - router**文件夹的 **index.js** 中添加路由 
4. 如需引用布局文件 先 import 所需的布局文件 再在 components:所需的布局 
---
## 添加布局
1. 在 **src - layout - components** 文件夹 中新建文件夹 并新建 index.vue 文件
2. 在 **src - layout - index.js** 文件中 export 新添加的布局文件
> 如：export { default as HeadInfo } from './HeadInfo'
---
## 接口
- 接口文件统一存放在 **src-api**文件夹内 例如：
```javascript
//接口文件内的一个function
export function getList(params) {
  return request({
    url: '/table/list',//请求地址
    method: 'get',//请求类型
    params//携带的参数
  })
}
```
---
## Vuex store 
### 添加数据
- 需要用到的 store模块 统一存储在 **src-store-modules** 文件夹内
- **src - store - getters.js** 单独为一个文件存储所有store数据的getter
- 最后所有的模板通过import引入到 **src - store - index.js** 文件中并添加到store中
```javascript
如：
import getters from './getters'
import app from './modules/app'//在这里引入

const store = new Vuex.Store({
    modules: {
      app//添加到这里
    },
    getters
})
```
### 使用
1. 确保需要使用的数据已添加到 **getter.js**文件内 如：
>    name: state => state.user.name
2. 在所需使用的文件内引入 **import { mapGetters } from 'vuex'**
3. 在文件内的 computed 中  
>   ...mapGetters(['需要使用的数据'])

- 例如：
```html
<!-- src - view - dashboard - index.vue -->
<template>
    <div>
        {{ name }}
    </div>
</template>
```
```javascript
// src - view - dashboard - index.vue
import { mapGetters } from 'vuex'

export default {
    ...,
    computed: {
        ...mapGetters(['name', 'sex', 'age', 'phone', 'token'])
    },
    methods:{
        test(){
            //使用方法与 data 内的数据一样：
            console.log( this.name )
            //使用 user 模块内的 actions 的方法，第一个参数为 模块名/action名 第二个以后的参数为该方法需要传递的参数
            this.$store.dispatch('user/updateInfo', data).then(() => {
                this.oldinfo.name = this.info.name
                this.oldinfo.sex = this.info.sex
                this.oldinfo.age = this.info.age
                this.oldinfo.phone = this.info.phone
            })
        }
    }
}
```
## Mock Data
- 新增:如果你想添加 mock 数据，只要在根本录下找到mock文件，添加对应的路由，对其进行拦截和模拟数据即可。
- 实例:
```javascript
// fetchComments 的 mock
{
  // url 必须能匹配你的接口路由
  // 比如 fetchComments 对应的路由可能是 /article/1/comments 或者 /article/2/comments
  // 所以你需要通过正则来进行匹配
  url: '/article/[A-Za-z0-9]/comments',
  type: 'get', // 必须和你接口定义的类型一样
  response: (req, res) => {
    // 返回的结果
    // req and res detail see
    // https://expressjs.com/zh-cn/api.html#req
    return {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  }
}
```
- 移除:在vue.config.js中移除webpack-dev-server中proxy和after这个Middleware就可以了。(请注意：该操作需要重启服务)
- 修改:最常见的操作就是：你本地模拟了了一些数据，待后端完成接口后，逐步替换掉原先 mock 的接口。只要在mock/???/index.js找到对应的路由，之后将它删除即可。







