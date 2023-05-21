const path = require('path')
/**自动生成html并引入依赖 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.tsx'
  },
  module: {
    rules: [
      // 解析ts
      {
        test: /\.(tsx?|jsx?)$/,
        use: 'ts-loader',
        // 不能处理node_modules下的依赖文件，否则编译会报错
        exclude: /(node_modules|tests)/
      },
      // 解析css
      {
        test: /\.css$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },  // translates CSS into CommonJS
        ]
      },
      // 解析less
      {
        test: /\.less$/i,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: (resourcePath) => {
                  if (/pure.css$/i.test(resourcePath)) {
                    return "pure";
                  }
                  if (/global.css$/i.test(resourcePath)) {
                    return "global";
                  }
                  return "local";
                },
              }
            }
          },
          { loader: "less-loader" },
        ],
      },

    ]
  },

  resolve: {
    // 解析资源
    extensions: ['.tsx', '.ts', '.js', '.less', 'css'],
    // 设置别名
    alias: {
      utils: path.join(__dirname, 'src/utils/'),
      components: path.join(__dirname, 'src/components/'),
      apis: path.join(__dirname, 'src/apis/'),
      hooks: path.join(__dirname, 'src/hooks/'),
      store: path.join(__dirname, 'src/store/'),
    }
  },

  devtool: 'inline-source-map',
  // 3000端口
  devServer: {
    static: './dist',
    port: 8001,
    hot: true,
  },
  // 默认输出
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  // 指定模板 html
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    })
  ]
}