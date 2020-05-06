var path = require('path');
const webpack = require('webpack');
const merge = require("webpack-merge");

const Dotenv = require('dotenv-webpack');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const APP_DIR = path.resolve(__dirname, './index.jsx');

// setting module.exports with a function is important
// otherwise, you don't get access to the env variable
module.exports = env => {
  const { PLATFORM, VERSION } = env;
  return merge([

    {
      entry: [
        '@babel/polyfill/noConflict', APP_DIR
      ],
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader'] // allows transpiling JavaScript files using Babel
          },
          {
            test: /\.html$/,
            use: [
              {
                loader: "html-loader", // exports HTML as string. HTML is minimized when the compiler demands.
                options: { minimize: true }
              }
            ]
          },
          {
            test: /\.(gif|png|jpe?g)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 1000000, //files up to 1 mb
                  name: path + '.[ext]', //Path will be assets or image path
                  fallback: 'responsive-loader'
                }
              }
           ],
          },
          {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&mimetype=application/font-woff" // loader for Font Awesome fonts
            // Loads files as `base64` encoded URL
          },
          {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader", // loader for Font Awesome fonts
            // Instructs webpack to emit the required object as file and to return its public URL
            options: {
              name: 'images/[hash]-[name].[ext]',
            }
          },
          {
            test: /\.(css|scss)$/,
            use: [
              // extract the generated CSS into a separate module or inject CSS to page
              // translates CSS into CommonJS modules
              // compiles Sass to CSS
              PLATFORM === 'production' ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'sass-loader',
                {
                  loader: 'postcss-loader', // Run post css actions
                  options: {
                    // parse mixins as custom at-rules & variables as properties
                    parser: "postcss-scss",
                    plugins: function () { // post css plugins, can be exported to postcss.config.js
                      return [
                        require('autoprefixer')
                        //PostCSS plugin to parse CSS and add vendor prefixes to CSS rules using values from Can I Use.
                        //It is recommended by Google and used in Twitter and Taobao.
                      ];
                    }
                  }
                }
            ]
          }
        ]
      },
      resolve: {
        extensions: ['*', '.js', '.jsx']
      },
      output: {
        path: path.resolve(__dirname, '..', 'public'),
        filename: 'bundle.js',
        publicPath: '/' // publicPath allows you to specify the base path for all the assets within your application
      },
      devServer: {
        historyApiFallback: true // historyAPIFallback will redirect 404s to /index.html
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        //Hot Module Replacement (HMR) exchanges, adds, or removes modules while an application is running, without a full reload.
        new webpack.NoEmitOnErrorsPlugin(),
        //Use the NoEmitOnErrorsPlugin to skip the emitting phase whenever there are errors while compiling.
        //This ensures that no assets are emitted that include errors. The emitted flag in the stats is false for all assets.
        new webpack.NamedModulesPlugin(),
        //This plugin will cause the relative path of the module to be displayed when HMR is enabled. Suggested for use in development.
        new HtmlWebpackPlugin({template: './index.html'}),
        //The plugin will generate an HTML5 file for you that includes all your webpack bundles in the body using script tags.

        // The DefinePlugin allows you to create global constants which can be configured at compile time
        new webpack.DefinePlugin({
          'process.env.VERSION': JSON.stringify(env.VERSION),
          'process.env.PLATFORM': JSON.stringify(env.PLATFORM)
        }),
        new CopyWebpackPlugin([ { from: 'assets/images', to: '../public/assets/images' } ]),
        new Dotenv()
      ]
    }

   ])
};


