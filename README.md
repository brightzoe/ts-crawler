# ts-crawler

TypeScript + Node + React

## tools

- pnpm
- typescript
- superagent
  nodejs 的网络请求
- cheerio 在服务端分析 html
  - [Cheerio Vs Puppeteer for Web Scraping: Picking the Best Tool for Your Project - DEV Community](https://dev.to/zoltan/cheerio-vs-puppeteer-for-web-scraping-picking-the-best-tool-for-your-project-4dkl)
  - [结合项目来谈谈 Puppeteer - 知乎](https://zhuanlan.zhihu.com/p/76237595)
- ts-node
  node 环境直接执行 ts
- nodemon xx.ts
  nodemon 也可以监听 ts 文件变化,直接执行 ts。前提是也安装了 ts-node
  - [development environment - How to watch and reload ts-node when TypeScript files change - Stack Overflow](https://stackoverflow.com/questions/37979489/how-to-watch-and-reload-ts-node-when-typescript-files-change)
- 并行执行命令 [concurrently - npm](https://www.npmjs.com/package/concurrently)
- parcel 0 配置的打包工具

## 遇到的问题

- 导入模块问题

  ```js
  import path from "path"; //不行。 This module is declared with using 'export =', and can only be used with a default import when using the 'esModuleInterop' flag.

  import * as path from "path"; //use this
  // import path = require("path"); //或者这个
  ```

## 组合设计模式

拆分代码

- 通用 crawler
- 具体页面 analyzer

## 单例模式

一个类只允许有一个实例
