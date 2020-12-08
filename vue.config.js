module.exports = {
  configureWebpack: {
    resolve: {
      alias: {  // 别名
        'assets': '@/assets',
        'commons': '@/commons',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        'store': '@/store'
      }
    }
  }
}