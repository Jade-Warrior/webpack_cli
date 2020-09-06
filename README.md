# 基本webpack搭建
## webpack配置
  > * 环境变量: node_env(DefinePlugin);
## webpack-dev配置
  > * 热更新;
  > * 端口：3000;
## 加入基本依赖：loader，plugins
  > * html: HtmlWebpackPlugin;
  > * css: 支持sass,单独提取css文件(MiniCssExtractPlugin);
  > * babel: 支持es6+;
  > * SplitChunks: js去重和分离 chunk;
  > * img路径: (url-loader,file-loader)不超过10M用base64直接编码,超过了就通过file-loader把这个相对地址变成绝对地址;
## eslint配置
  > * git:
  > * pre-commit: git commit前运行eslint校验;
  > * eslint-config-airbnb-base: airbnb规则包;
