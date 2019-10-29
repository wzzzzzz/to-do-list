```
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  entry: './index.js',//入口
  output: {
    filename: './bundle.js'//输出文件
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
			 scss: "vue-style-loader!css-loader!sass-loader",
              sass: "vue-style-loader!css-loader!sass-loader?indentedSyntax"
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
        // 这里：Vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的
        new VueLoaderPlugin()
  ],
  resolve: { 
	alias: { 
		'vue$': 'vue/dist/vue.js' ,
	},
	extensions: ['*', '.js', '.vue', '.json']
  }
};

```

