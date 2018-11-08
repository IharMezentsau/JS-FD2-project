const path = require('path'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    webpack = require("webpack"),
    autoprefixer = require("autoprefixer"),
    ImageminPlugin = require('imagemin-webpack-plugin').default,
    HtmlWebpackPlugin = require('html-webpack-plugin');

let isProduction = (process.env.NODE_ENV === 'production');

let conf = {
    entry: ['./src/sass/style.sass','./src/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    devServer: {
        contentBase: './src/',
        watchContentBase: true,
        inline: true,
        progress: true,
        compress: true,
        overlay: true
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /\/node_modules\//,
                loader: 'babel-loader'
            },
            {
                test: /\.sass$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: { sourceMap: true }
                        },
                        {
                            loader: 'postcss-loader',
                            options: { sourceMap: true }
                        },
                        {
                            loader: 'sass-loader',
                            options: { sourceMap: true }
                        }
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(png|gif|jpe?g)$/i,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
														context: 'src',
														name: '[path][name].[ext]'
                        }
                    },
                    'img-loader',
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
														context: 'src',
														name: '[path][name].[ext]'
                        }
                    },
                ]
						},
						{
								test: /\.(ogg|mp3|wav|mpe?g)$/i,
								loader: 'file-loader',
								options: {
									context: 'src',
									name: '[path][name].[ext]'
								}
						},
            {
                test: /\.svg$/,
                loader: 'svg-url-loader',
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new ExtractTextPlugin("style.css"),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer()
                ]
            }
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: false,
            template: './src/index.html',
            filename: 'index.html'
        }),
        isProduction ?
            new ImageminPlugin({
                test: /\.(png|gif|jpe?g|svg)$/i
            })
            : false,
        isProduction ?
            new webpack.LoaderOptionsPlugin({
                minimize: true
            })
            : false
    ].filter(Boolean)
};

module.exports = (env, options) => {
    let production = options.mode === 'production';
    conf.devtool = production
        ? false
        : 'inline-source-map';
    return conf;
}
