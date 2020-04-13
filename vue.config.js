module.exports={
    publicPath:'/',
    productionSourceMap:false,
    chainWebpack: (config) => {
        config
          .plugin('html')  
          .tap((args) => {  
            args[0].title = '学生管理系统';
            return args;
          });
      },
}