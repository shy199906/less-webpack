const path = require('path'); //加载path模块
const HtmlWebpackPlugin = require('html-webpack-plugin'); //加载html html-webpack-plugin 插件模块
const miniCssExtractPlugin = require('mini-css-extract-plugin');// 加载css插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');//加载清理模块
module.exports = {
    mode:'production',// 模式 production 生产环境  development 开发环境
    entry: {
        index: './src/index.js',
    }, // 入口
    output: { // 打包出口
        path: path.resolve(__dirname, '../dist/'), // 打包文件输出路径  绝对路径 获取当前的绝对路径
        // filename: 'bundle.js' // 打包文件输出名称
        // filename: '[name].[hash].js' //[name] [hash] hash码
        filename: '[name].js' //[name] [hash] hash码
    },
    devServer: {//开发服务器
        contentBase: path.join(__dirname, "dist"),//输出路径
        compress: true,//是否压缩
        port: 9000,//端口号 开启的服务器的端口
        open:true //是否自动打开浏览器
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    //{loader: 'style-loader'},
                    {
                        loader: miniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [{
                        loader: miniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            },
            {
                test: /\.(sass|scss)$/,
                use: [{
                        loader: miniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            /*
                        {
                            test: /\.(jpg|png|git|webp|jpeg)$/,
                            use: [
                              {loader:'file-loader'}
                            ]
                        },*/
            {
                test: /\.(jpg|png|gif|webp|jpeg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 102400
                    }
                }]
            },
            {
                test: /\.js$/, //匹配js文件
                exclude: /(node_modules|brower_components)/, // babel转换的时候排除 node_modules 和brower_components
                use: [{
                    loader: 'babel-loader', //用babel-loader处理
                    options: { //选项参数
                        presets: ['env'] //预设 es6 转化 es5
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ // 构造函数传参
            title: '网页标题', //网页标题
            template: './src/index.html', //处理html模板路径
            inject: true, //true 默认值，script标签位于html文件的 body 底部； body：script标签位于html文件的 body底部；head： script标签位于html文件的 head中；false：不插入生成的js文件
            minify: {
                removeComments: true, //是否移除注释
                removeAttributeQuotes: true, //是否移除属性的引号
                collapseWhitespace: true //是否移除空白
            },
            chunks:['index'],
            filename: 'index.html'
        }),
        new miniCssExtractPlugin({
            filename: '[name].[hash].css'
        }),
        new CleanWebpackPlugin()
    ]
}