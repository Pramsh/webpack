 ## Config

 ##### Install dependencies
 ```
 webpack dependency: npm i -D webpack webpack-cli
```
##### Add build script
 "build": "webpack --mode production"


##### webpack.config.js
This is usefull to configure our webpack, the main obj looks like this:
```
const path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        bundle: path.resolve(__dirname, 'src/index.js'),
        can have multiple
    },
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    }
}
```
* **mode**: development/production
* **entry**:
    1. *[name]* (i.e. 'bundle'): which file is to process 
* **output**: 
    1. *path*: indicates the location of the ouotput file
    2. *filename*: is the output file name. It may take the name dinamically with the variable '[name]' (i.e. '[name].js --> name == 'bundle)




### Loaders

#### Configuration

##### Install dependencies
```
npm i -D sass
```

##### Install loaders
```
npm i -D sass style-loader css-loader sass-loader
```


##### Add loader to webpack.config.js
```
module.exports = {
    ... ,
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
}
```


#### HTML plugins

##### Install depenjdency 
```
npm i -D html-webpack-plugin
```

##### import in webpack.config.js
When we have a plugin we declare **plugins**.
```
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    ... ,
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'index.html'
        })
    ]
}
```

##### Add template

```
module.exports = {
    ... ,
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'index.html',
       -->  template: 'src/template.html'
        })
    ]
}
```

### Caching and Hash Setup
Add content to the output filename in webpack.config.js:


```
 mode: 'development',
    entry: {
        bundle: path.resolve(__dirname, 'src/index.js')
    },
    output:{
        path: path.resolve(__dirname, 'dist'),
  -->   filename: '[name][contenthash].js'
    },
    ...,
```
Then  delete the **dist** folder and regenerate through 
```
npm run build
```


### Setup development server

##### Install dependency
```
npm install -D webpack-dev-server
```
Update the **package.json** with a script **dev**:
```
{
  ... ,
  "scripts": {
    "build": "webpack", 
--> "dev": "webpack serve"
  },
  ...
}

```
##### Update webpack.config.js
```
module.exports = {
 ... ,
  output:{
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][contenthash].js'
    },
    devServer:{
        static: {
            directory: path.resolve(__dirname, "dist")
        },
        port: 3000,
        open:true,
        hot: true,
        compress: true,
        historyApiFallback:true
    },
  ...
}

```



### Source maps
Are good for debugging, they provide a map from you disk to production code to your source code. (because the code which is running isn't oc the actual you wrote)
 
##### Update webpack.config.js
```
module.exports = {
 ... ,
  output:{
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][contenthash].js'
    },
--> devtool:'source-map',
    devServer:{
        static: {
            directory: path.resolve(__dirname, "dist")
        },
        port: 3000,
        open:true,
        hot: true,
        compress: true,
        historyApiFallback:true
    },
  ...
}

```

Running **npm run build** a *bundle.map* will be generated within the *dist* folder

### Babel loader for backwards compatibility

##### Install dependencies
```
npm i -D babel-loader @babel/core @babel/preset-env
```

##### Update webpack.config.js
```
module.exports = {
 ... ,
  module: {
        rules: [
            ... ,
   -->      {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                } 
            }
        ]
    },
  ...
}

```


### Load static assets

##### Update webpack.config.js
```
module.exports = {
 ... ,
  output:{
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][contenthash].js',
        clean: true,
   -->  assetModuleFilename: '[name][ext]'
  },
  ...,
  module: {
        rules: [
            ... ,
   -->      {
                test: /\.(jpeg|svg|jpg|png|gif)$/i,
                type: 'assets/resource'
            }
        ]
    },
  ...
}

```

* **assetModuleFilename**: allows to keep the file name consistant, if this is missing an hash will replace the filename.
