const path = require("path");
//로더는 일반적으로 모듈 번들링의 일부로 사용되는 친구들 => 따로 불러오지 않아도 웹팩 친구가 자동적으로 인식을 하고 지가 알아서 로딩하고 적용도 한다.
//플러그인은 빌드하는 프로세스에 추가적으로 기능을 제공해주는 친구이다. 추가적인거라서 웹팩이 인식할수있게 require해줘야한다.

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    entry: './src/index.js',              //시작하는 지점
    output: {
        path : path.resolve(__dirname, 'docs'),
        filename: "[name].bundle.js",
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["@babel/preset-env"],
                            ["@babel/preset-react", {runtime: "automatic"}]  //runtime저거는 거의 필수옵션. 저거 안하면 하얀백지나올거다.
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public", "index.html")
        }),
        new MiniCssExtractPlugin()
    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin()
        ]
    }
}