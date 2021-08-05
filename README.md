
# merchant-manager-web

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
yarn dev

```

# 发布

```bash
# 构建测试环境
yarn build:stage

# 构建生产环境
yarn build:prod
```

## 其它

```bash
# 预览发布环境效果
yarn preview

# 预览发布环境效果 + 静态资源分析
yarn preview -- --report

# 代码格式检查
yarn lint

# 代码格式检查并自动修复
yarn lint -- --fix

# 解决yarn或者npm 不能安装问题
 删除package.lock.json和npm shrinkwarp.json

# 提交代码注释风格检测
build：主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交
ci：主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle等)的提交
docs：文档更新
feat：新增功能
merge：分支合并 Merge branch ? of ?
fix：bug 修复
perf：性能, 体验优化
refactor：重构代码(既没有新增功能，也没有修复 bug)
style：不影响程序逻辑的代码修改(修改空白字符，格式缩进，补全缺失的分号等，没有改变代码逻辑)
test：新增测试用例或是更新现有测试
revert：回滚某个更早之前的提交
chore：不属于以上类型的其他类型
```

