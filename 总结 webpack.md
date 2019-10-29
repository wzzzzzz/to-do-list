### webpack

npm install webpack -g   当前地址配置webpack

webpack ./src/app.js ./dist/app.bundle.js   转换js文件

npm install css-loader style-loader  用来加载处理css的模块

webpack.config.js  

```
module.exports = {
    entry: "./runoob1.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    }
};
```

`package.json`里面定义的是版本范围（比如`^1.0.0`），具体跑`npm install`的时候安的什么版本，要解析后才能决定，这里面定义的依赖关系树，可以称之为逻辑树（logical tree）。

### CLI

npm install -g @vue/cli-service-global

vue create hello-world  包括package.json和webpack.config.js等都一起打包配好了

npm init  只生成package.json

vue serve

npm run build

压缩打包生成，然后要把绝对路径改成相对路径

版本

一开始初始化项目配置的时候，有两个运行环境配置的版本：Compiler版本、Runtime版本。

runtime版本问题：大意是使用render方法代替template属性，template属性已经不被支持。参照app的渲染方法修改一下就搞定了。

要用template，就把项目配置改成Compiler版本

```
import Vue from 'vue/dist/vue.js'
```

