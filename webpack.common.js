const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "./public/js"),
        publicPath: "/js/",
        filename: "app.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"] }
            }
        ]
    },
    mode: 'development',
    devServer: {
        port: 9000
    }
};
