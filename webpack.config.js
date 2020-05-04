/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
var fs= require('fs');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

function getEntryAndHtmlPlugin(){
  var siteArr = ["demo"];
  var re = {entry:{},htmlplugins:[]};
  for(var i=0,j=siteArr.length;i<j;i++){
    var siteName = siteArr[i];
    re.entry[siteName] = "./"+siteName+"/index.tsx";//js多入口字典对象
    re.htmlplugins.push(new HtmlWebpackPlugin({
        filename: siteName+'.html', //打包出来的html名字
        template: './'+siteName+'/index.html', //模版路径
        inject: 'body' ,
        chunks:[siteName],//js注入的名字
        hash:true
      }));
  }
  return re;
}



module.exports = function (env) {

  const action = env.action || 'start';
  const nodeEnv = env && env.prod ? 'production' : 'development';
  const isProd = nodeEnv === 'production';
  var entryAndHtmlPlugin = getEntryAndHtmlPlugin();
  var entry = entryAndHtmlPlugin.entry;
  const isBuild = action === 'build';
  var plugins= [
      new webpack.NamedModulesPlugin(),
      new webpack.LoaderOptionsPlugin({
          minimize: true
      }),
      new webpack.DefinePlugin({
          __DEV__: true,
          huxiaozhong:JSON.stringify("hshsh"),
          SEVER:{
            path:JSON.stringify("22"),
            url:JSON.stringify("1333")
          }
      }),
  ];

  plugins = plugins.concat(entryAndHtmlPlugin.htmlplugins);

  if (isBuild) {
  } else {
    const openurl = env.openurl || '';
    if (openurl.length > 0) {
      plugins.push(new OpenBrowserPlugin({ url: openurl }));
    }
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }
  

return {
  context: path.resolve(__dirname, 'app'),
  entry:entry,
  output: {
    filename: '[name].[hash:8].js',
    chunkFilename: !isProd ? '[name].bundle.js' : '[name].[chunkhash:8].min.js',
    // the output bundle

    path: path.resolve(__dirname, 'dist'),

    publicPath: isProd?'./':'/'
  },
  devtool: isProd ? 'hidden-source-map' : 'eval',

  devServer: {
    hot: true,
    // enable HMR on the server
    contentBase: path.resolve(__dirname, 'dist'),
    // match the output path
    publicPath: isProd?'./':'/',
    setup(app){  
    }
  },
  resolve: {
     mainFiles: ["index.tsx",'index.ts','index'],
     modules: [path.resolve(__dirname, "src"), "node_modules"],
     extensions: ['.tsx','.ts','.js'],
     alias: {
       "star-mobile": path.resolve(__dirname, './index.ts'),
     },
  },


  module: {
    rules: [
        {
            test: /\.tsx?$/,
            use: ['ts-loader'],
            exclude: /node_modules/,
        },
      { 
        test: /\.(png|jpg|jpeg|gif|woff)$/, 
        loader: 'url-loader?limit=6144&name=imgs/[path][name].[ext]'
      },
       {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
            test: /\.less$/,
            use: [{
                loader: "style-loader" 
            }, {
                loader: "css-loader" ,
            }, 
            {
              loader:"postcss-loader",
               options: {
                plugins: (loader) => [
                  require('postcss-import')({ root: loader.resourcePath }),
                  require('autoprefixer')(),
                ]
              }
            },
            {
                loader: "less-loader" 
            }]
      }
    ],
  },

  plugins:plugins,
};
}


