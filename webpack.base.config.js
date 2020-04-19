var path = require('path');
const webpack = require('webpack');
const merge = require("webpack-merge");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const APP_DIR = path.resolve(__dirname, './client/index.jsx');

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
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&mimetype=application/font-woff" // loader for Font Awesome fonts
            // Loads files as `base64` encoded URL
          },
          {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader" // loader for Font Awesome fonts
            // Instructs webpack to emit the required object as file and to return its public URL
          },
          {
            test: /\.(css|scss)$/,
            use: [
              PLATFORM === 'production' ? MiniCssExtractPlugin.loader : 'style-loader', //  extract the generated CSS into a separate module or inject CSS to page
                'css-loader', // translates CSS into CommonJS modules
                'sass-loader', // compiles Sass to CSS
                {
                  loader: 'postcss-loader', // Run post css actions
                  options: {
                    plugins: function () { // post css plugins, can be exported to postcss.config.js
                      return [
                        require('precss'), // lets use Sass-like markup and staged CSS features in CSS
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
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        //Hot Module Replacement (HMR) exchanges, adds, or removes modules while an application is running, without a full reload.
        new webpack.NoEmitOnErrorsPlugin(),
        //Use the NoEmitOnErrorsPlugin to skip the emitting phase whenever there are errors while compiling.
        //This ensures that no assets are emitted that include errors. The emitted flag in the stats is false for all assets.
        new webpack.NamedModulesPlugin(),
        //This plugin will cause the relative path of the module to be displayed when HMR is enabled. Suggested for use in development.
        new HtmlWebpackPlugin({template: './client/index.html'}),
        //The plugin will generate an HTML5 file for you that includes all your webpack bundles in the body using script tags.

        // The DefinePlugin allows you to create global constants which can be configured at compile time
        new webpack.DefinePlugin({
          'process.env.VERSION': JSON.stringify(env.VERSION),
          'process.env.PLATFORM': JSON.stringify(env.PLATFORM)
        }),
        new CopyWebpackPlugin([ { from: 'client/static' } ])
      ]
    }

   ])
};


