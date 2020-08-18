const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(sass|scss)$/;
const sassModuleRegex = /\.module\.(sass|scss)$/;

// Environment variables
const isEnvDevelopment = process.env.NODE_ENV === "development";

// Base paths
const PATHS = {
  src: path.join(__dirname, "../src"),
  dist: path.join(__dirname, "../dist"),
  assets: "assets"
};

// Loader options
const additionalData = `
  @import "${PATHS.src}/assets/scss/mixins/_mixins.scss";
  @import "${PATHS.src}/assets/scss/utils/_variables.scss";
`;

// Change filenames
function fileName(name, ext) {
  return isEnvDevelopment ? `${name}.${ext}` : `${name}.[hash:8].${ext}`;
};

function fileLoader(outputPath) {
  return {
    loader: "file-loader",
    options: {
      name: fileName("[name]", "[ext]"),
      outputPath
    }
  }
};

function urlLoader(outputPath) {
  return [
    {
      loader: "url-loader",
      options: {
        limit: 4096,
        fallback: fileLoader(outputPath)
      }
    }
  ]
};

function preProcessor(loader) {
  return {
    loader: loader,
    options: {
      sourceMap: isEnvDevelopment,
      prependData: additionalData
    }
  }
}

function extraOptions() {
  return {
    sourceMap: isEnvDevelopment,
    modules: {
      auto: true,
      localIdentName: isEnvDevelopment
        ? "[local]" : "[local]_[hash:base64:5]"
    }
  }
}

function getStyleLoaders(extraOptions, preProcessor = null) {
  const oneOfLoaders = isEnvDevelopment ? 
  "style-loader" : MiniCssExtractPlugin.loader;

  const loaders = [
    oneOfLoaders,
    {
      loader: "css-loader",
      options: extraOptions
    },
    {
      loader: "postcss-loader",
      options: {
        sourceMap: isEnvDevelopment,
        config: { path: `./postcss.config.js` }
      }
    }
  ];

  return preProcessor ? [...loaders, preProcessor] : loaders;
};

module.exports = {
  externals: {
    paths: PATHS
  },
  entry: {
    app: PATHS.src
  },
  output: {
    filename: `js/${fileName("[name]", "js")}`,
    path: PATHS.dist,
    publicPath: "/"
  },
  optimization: {
    minimize: !isEnvDevelopment,
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: "/node_modules/"
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: urlLoader(`${PATHS.assets}/media`)
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)(\?.*)?$/i,
        use: urlLoader(`${PATHS.assets}/fonts`)
      },
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: urlLoader(`${PATHS.assets}/img`)
      },
      {
        test: /\.(svg)(\?.*)?$/,
        use: [fileLoader(`${PATHS.assets}/img`)]
      },
      {
        test: cssRegex,
        exclude: cssModuleRegex,
        use: getStyleLoaders({ sourceMap: isEnvDevelopment })
      },
      {
        test: cssModuleRegex,
        use: getStyleLoaders(extraOptions())
      },
      {
        test: sassRegex,
        exclude: sassModuleRegex,
        use: getStyleLoaders({ sourceMap: isEnvDevelopment }, preProcessor('sass-loader'))
      },
      {
        test: sassModuleRegex,
        use: getStyleLoaders(extraOptions(), preProcessor('sass-loader'))
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
    alias: {
      "@": PATHS.src
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}/css/${fileName("style", "css")}`,
      chunkFilename: `${PATHS.assets}/css/${fileName("[name]", "css")}`
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: `${PATHS.src}/static`, to: `${PATHS.dist}` }]
    }),
    new HtmlWebpackPlugin(
      Object.assign(
      {},
      {
        inject: true,
        template: `${PATHS.src}/static/index.html`,
      },
      !isEnvDevelopment
        ? {
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            },
          }
        : undefined
      )
    )
  ]
};
