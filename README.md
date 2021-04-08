# 真人娱乐管理后台

> 项目基于 vue-admin-template 构建的一套具有权限系统的后台管理系统

[文档](https://panjiachen.gitee.io/vue-element-admin-site/zh/)

# 目录结构

```
| - mock (本地mock数据)
| - public (存放公共静态资源)
| - src
    | - api 接口调用
    | - assets 资源存放目录
    | - components 公用组件
    | - icons 主要存放svg小图标
    | - layout 后台框架组件
    | - router 路由
    | - store 状态共享使用
    | - styles 公共的css目录
    | - utils 公共抽取的工具文件夹
    | - views 页面
        | - components (业务组件)
    | - main.js 主入口
    | - permission.js 权限控制
    | - setting.js 全局配置
```

# 启动服务

```
npm run dev

```

# 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

更多信息请参考 [使用文档](https://panjiachen.github.io/vue-element-admin-site/zh/)
