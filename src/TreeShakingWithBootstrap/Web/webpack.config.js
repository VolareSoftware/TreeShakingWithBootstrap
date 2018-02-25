/// <reference path="node_modules/jquery/dist/jquery.slim.min.js" />
/// <reference path="node_modules/jquery/dist/jquery.slim.min.js" />
const webpack = require("webpack");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = () => {
    return {
        entry: {
            index: "index.js"
        },
        output: {
            filename: "[name].js",
            path: path.resolve(__dirname, "dist"),
            publicPath: "/dist"
        },
        devtool: "source-map",
        plugins: [
            new CleanWebpackPlugin(["dist"]),
            new webpack.ProvidePlugin({
                $: "jquery",
                Popper: ["popper.js", "default"],
                Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
                Button: "exports-loader?Button!bootstrap/js/dist/button",
                Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
                Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
                Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
                Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
                Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
                Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
                Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
                Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
                Util: "exports-loader?Util!bootstrap/js/dist/util"
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: "common"
            }),
            new UglifyJsPlugin({
                sourceMap: true,
                uglifyOptions: {
                    dead_code: true
                }
            })
        ],
        resolve: {
            extensions: [
                ".js"
            ],
            modules: [
                path.resolve(__dirname, "scripts"),
                "node_modules"
            ],
            alias: {
                jquery: "jquery/dist/jquery.slim.min.js"
            }
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["env"]
                        }
                    }
                }
            ]
        }
    };
};