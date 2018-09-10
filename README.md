# y

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
# personalmusic
【技术栈】：vue、vuex、vue-router、jsonp、axios、better-scroll、vant组件
  【功能划分】：新歌 排行 歌单 歌手 搜索
  【实现步骤】：
一、准备并测试项目所使用到的接口，过程中有一个问题是因为通过ajax请求酷狗的接口，所以需要代理，在config下的index.js进行代理设置，解决跨域问题。另一个问题因为是所有组件共用的接口，无须在每个组件中重新写接口，所以封装了一个接口的js文件满足各种ajax请求数据。然后使用postman一一进行接口测试。
二、因为要实现单页应用，所以规划路由，其中除了新歌、排行、歌单、歌手、搜索等路由外，还有排行、歌单、歌手的动态路径。同样放在一个单独的文件中，便于添加路由和修改。
三、因为原生滚动条的卡顿等问题。所以使用了better-scroll。新歌页面使用vant组件库，进行了ui布局，然后在created钩子函数中调用封装的函数进行ajax请求，然后将数据渲染在页面中。其中为了性能优化，进行了懒加载和上拉刷新等。
