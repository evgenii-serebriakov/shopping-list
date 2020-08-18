module.exports = {
  plugins: [
    require("postcss-nested"),
    require("autoprefixer"),
    require("css-mqpacker"),
    require("cssnano")({
      preset: [
        "default",
        {
          discardComments: {
            removeAll: true
          }
        }
      ]
    })
  ]
};
