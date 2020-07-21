### 基本

从name到private都是package的配置信息，也就是我们在脚手架搭建中输入的项目描述。包括 name version description author private

scripts中的子项即是我们在控制台运行的脚本的缩写

dependencies(项目依赖库):在安装时使用--save则写入到dependencies

devDependencies（开发依赖库）：在安装时使用--save-dev将写入到devDependencies

engines是引擎，指定node和npm版本

browserslist限制了浏览器或者客户端需要什么版本才可运行

### eslintConfig

```
"eslintConfig": {
	"root": true, //此项是用来告诉eslint找当前配置文件不能往父级查找
	"env": {
		"node": true  //此项指定环境的全局变量，下面的配置指定为node环境 
	},
	//extends是扩展插件的意思
	"extends": [ 
		"plugin:vue/essential",  //这2个插件必须安装
		"eslint:recommended"  // 此项是用来配置vue.js风格，就是说写代码的时候要规范的写
	],
	"rules": {}, //规则配置
	"parserOptions":{  //此项是用来指定eslint解析器的，
		"parser": "babel-eslint"  
	}
},
```

### postcss

```
"postcss": {
	"plugins": {
		"autoprefixer": {},
		"px-to-viewport": {}
	}
},
```

license