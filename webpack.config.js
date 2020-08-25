const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    devServer : {
        contentBase: path.resolve(__dirname, "src"),
        historyApiFallback: true,
    },
    entry: [
        path.resolve(__dirname, './src/index.js'),
        path.resolve(__dirname, './src/scss/main.scss'),
    ],
    module: {
        rules: [
            {
                test: /\.js$|jsx/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                    presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    }, 
                    {
                        loader: "css-loader",
                    },
                    {
                      loader: "postcss-loader"
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass")
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            "@container": path.resolve(__dirname, './src/components/container'),
            "@context": path.resolve(__dirname, './src/components/context'),
            "@hooks": path.resolve(__dirname, './src/components/hooks'),
            "@pages": path.resolve(__dirname, './src/components/pages'),
            "@presentational": path.resolve(__dirname, './src/components/presentational'),
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: "bundle.css"
        })
    ],
    output: {
        filename: "main.bundle.js",
        path: path.resolve(__dirname, 'dist'),
    }
};