module.exports = {
    //基本路径
    //baseUrl: './',//vue-cli3.3以下版本使用
    publicPath:'./',//vue-cli3.3+新版本使用
    //输出文件目录
    outputDir: 'dist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    assetsDir: 'static',
    //以多页模式构建应用程序。
    pages: undefined,
    //是否使用包含运行时编译器的 Vue 构建版本
    runtimeCompiler: false,
    //是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建，在适当的时候开启几个子进程去并发的执行压缩
    parallel: require('os').cpus().length > 1,
    //生产环境是否生成 sourceMap 文件，一般情况不建议打开
    productionSourceMap: false,
    css: {
        // 启用 CSS modules
        modules: false,
        // 是否使用css分离插件
        extract: true,
        // 开启 CSS source maps，一般不建议开启
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            postcss:{
                plugins:[
                    require("postcss-px-to-viewport")({
                        unitToConvert: "px",//指定需要转换的单位
                        viewport:750,//viewport宽度
                        unitPrecision:5,//px转换成视窗单位的小数位
                        propList: ["*"],//指定需要转化的属性，*表示所有
                        viewportUnit: "vw",//指定需要转换成的视窗单位
                        fontViewportUnit: "vw",//指定字体需要转换成的视窗单位
                        selectorBlackList: [],//指定不转换的类
                        minPixelValue:1,//小于1px就不转换
                        mediaQuery: true,//媒体查询是否转换
                        landscape: true,
                        landscapeUnit: "vw",
                        landscapeWidth: 1500
                    })
                ]
            }
        }
    },
    // webpack-dev-server 相关配置 https://webpack.js.org/configuration/dev-server/
    // devServer: {
    //     host: 'localhost',
    //     // host: "0.0.0.0",
    //     port: 8000, // 端口号
    //     https: false, // https:{type:Boolean}
    //     open: true, //配置自动启动浏览器  http://172.16.1.12:7071/rest/mcdPhoneBar/
    //     hotOnly: true, // 热更新
    //     // proxy: 'http://localhost:8000'   // 配置跨域处理,只有一个代理
    //     //proxy: { //配置自动启动浏览器
    //         // "/rest/*": {
    //         //     target: "http://172.16.1.12:7071",
    //         //     changeOrigin: true,
    //         //     // ws: true,//websocket支持
    //         //     secure: false
    //         // },
    //         // "/pbsevice/*": {
    //         //     target: "http://172.16.1.12:2018",
    //         //     changeOrigin: true,
    //         //     //ws: true,//websocket支持
    //         //     secure: false
    //         // },
    //     //}
    // },
    //
    // // 第三方插件配置 https://www.npmjs.com/package/vue-cli-plugin-style-resources-loader
    // pluginOptions: {
    //     // 'style-resources-loader': {//https://github.com/yenshih/style-resources-loader
    //     //     preProcessor: 'scss',//声明类型
    //     //     'patterns': [
    //     //         //path.resolve(__dirname, './src/assets/scss/_common.scss'),
    //     //     ],
    //     //     //injector: 'append'
    //     // }
    // }
};