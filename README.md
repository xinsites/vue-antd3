XinSiteAntd3 企业级开发框架 (源码可见版)
<div align="center"> <img src="https://www.xinsite.vip/images/logo.png" alt="XinSite Logo" width="100"/> <p><strong>基于 Vue3 + AntDesignVue3.x 的企业级中后台前端解决方案</strong></p> <p> <a href="http://doc.antd3.xinsite.vip/">📖 开发文档</a> | <a href="http://antd3.lite.xinsite.vip/">✨ 在线演示</a> | <a href="https://www.xinsite.vip/">🏠 官方网站</a> </p> <p> <img src="https://img.shields.io/badge/Vue-3.x-brightgreen" alt="Vue 3.x"/> <img src="https://img.shields.io/badge/AntDesignVue-3.x-blue" alt="AntDesignVue 3.x"/> <img src="https://img.shields.io/badge/license-Commercial-red" alt="Commercial License"/> </p> </div>

### 项目简介

XinSiteAntd3 是一款基于 Vue3 + AntDesignVue 3.x 技术栈构建的企业级中后台前端框架，由 XinSite 团队自主研发并持续维护。我们致力于为开发者和企业提供一套开箱即用、代码优雅、易于扩展的前端解决方案。

**重要声明**： 本项目为 商业软件，在Gitee上提供源码可见的公开仓库。您可以查看、学习、下载代码用于内部评估，但将本框架或其任何部分用于商业项目需购买正版授权。

### 自研工作流组件

本框架最大的特色是深度集成了团队完全自主研发的工作流组件：

- **可视化流程设计**：提供直观、易用的拖拽式流程设计器，业务人员也可轻松上手

- **灵活的节点配置**：支持审批节点、条件分支、会签、或签、抄送等多种节点类型

- **复杂的流程逻辑**：满足企业级应用中请假审批、合同评审、报销流程等复杂业务场景

- **前后端无缝衔接**：工作流前端组件与后端API完美配合，开箱即用

- **可扩展性强**：工作流核心代码完全自研，无第三方依赖，可根据业务需求深度定制

## 核心特性

- **最新技术栈**：基于 Vue3、Vite、Pinia、TypeScript，代码结构清晰，模块化设计。

- **40+自研组件**：深度集成 AntDesignVue 3.x，提供丰富的业务组件封装，保持界面优雅。

- **完整权限体系**：内置完善的登录认证、静态路由、动态路由权限控制，支持按钮级细粒度权限。

- **开箱即用**：提供完整的后台管理布局、常用页面模板、工具函数，让您专注业务代码。

- **代码生成器**：配套强大的后端代码生成工具，可快速生成CRUD、多表关联的前后端代码，极大提升开发效率。

- **响应式设计**：完美适配PC、平板、手机等多端屏幕，满足现代办公需求。

- **详尽的文档**：提供步骤清晰的开发文档、API说明和示例，帮助您快速上手。

- **专业售后保障**：购买授权后享受5x8小时在线技术支持，版本持续更新迭代。

## 在线演示

体验地址：http://antd3.lite.xinsite.vip/

演示账号：admin / 123456

本地账号：admin / 123456

您可以通过演示环境直观感受框架的界面交互与功能模块。

## 快速开始

- 安装 node.js >= v16.16.0： https://nodejs.org/en/download/releases

```
# 克隆公开仓库（仅包含核心框架代码）
git clone https://gitee.com/xinsite/vue-antd3.git

# 进入项目目录
cd xinsite-antd3

# 安装依赖
yarn install
或者
npm install

# 启动本地开发服务
npm run dev

# 启动本地开发服务
npm run dev

# 打包发布生产环境
npm run build
```

## 项目结构

```
xinsite-antd3/
├── public/                 # 静态资源
├── src/
│   ├── api/                # API接口管理
│   ├── assets/             # 资源文件
│   ├── components/         # 公共组件
│   ├── config/             # 变量配置
│   ├── i18n/               # 国际化配置
│   ├── layout/             # 布局组件
│   ├── mock/               # mock数据模拟
│   ├── model/              # 对象类型定义
│   ├── plugins/            # 插件函数
│   ├── router/             # 路由配置
│   ├── store/              # Pinia状态管理
│   ├── styles/             # 全局样式
│   ├── utils/              # 工具函数
│   ├── views/              # 页面视图
│   ├── App.vue             # 根组件
│   └── main.ts             # 入口文件
├── .env                    # 环境变量
├── index.html              # HTML模板
├── package.json            # 依赖配置
├── README.md               # 本文档
└── LICENSE                 # 商业授权协议
```

## 开发文档

完整的框架使用指南、API参考和进阶教程请访问官方文档：
👉 http://doc.antd3.xinsite.vip/

## 许可证与商业使用

本项目采用“源码可见”的专有许可证，不是开源软件（Open Source）。

您可以：

✅ 查看：在Gitee上自由浏览本仓库的所有源代码。

✅ 学习：下载代码用于个人学习、研究框架设计思想。

✅ 内部评估：在企业内部部署和运行，评估是否满足业务需求。

✅ 修改：为满足评估需求，对代码进行修改和调试。

您不可以：

❌ 商业使用：未经授权，将本框架或其修改版本用于任何商业项目、生产环境或盈利活动。

❌ 分发与销售：以任何形式（包括但不限于源代码、编译后的文件、二次封装）向任何第三方分发、销售、租赁或转让本框架的全部或部分代码。

❌ 公开分享：将本框架的代码片段或修改版本公开发布（如上传至其他公开仓库、论坛、博客等）。

❌ 提供SaaS服务：基于本框架搭建平台，作为商业SaaS服务对外提供。

如何获取商业授权？
若您或您的企业计划将 XinSiteAntd3 用于商业项目，请访问我们的官方网站 https://www.xinsite.vip/ 查看产品价格与购买流程。购买授权后，您将获得：

✅ 完整的商业使用权利

✅ 优先的技术支持服务

✅ 持续的产品更新与功能扩展

## 联系我们与支持

官网：https://www.xinsite.vip/

文档：http://doc.antd3.xinsite.vip/

演示：http://antd3.lite.xinsite.vip/

邮箱：support@xinsite.vip（购买/商务咨询）

授权用户群：购买后凭订单号加入专属技术交流群

感谢您对XinSite的关注与支持！我们致力于为您打造更高效、更可靠的开发工具。
