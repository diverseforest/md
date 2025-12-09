/**
 * 个性化配置文件 (My Config)
 * 
 * 这里的内容会覆盖浏览器的 LocalStorage 配置。
 * 即使上游代码更新，这里的配置也会在应用启动时自动应用。
 */

export const MY_CONFIG = {
  // =========================================================================
  // 1. 外观 & 主题配置
  // =========================================================================
  
  // 主题选择: 'juejin' | 'github' | 'smart-blue' | 'cyanosis' | 'channing-cyan' | 'fancy' ...
  // 对应 LocalStorage Key: MD__theme
  theme: 'juejin', 

  // 主色调 (十六进制)
  // 对应 LocalStorage Key: color
  primaryColor: '#42b983',

  // 字体设置
  // 对应 LocalStorage Key: fonts
  fontFamily: 'Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, "PingFang SC", Cambria, Cochin, Georgia, Times, "Times New Roman", serif',

  // 字体大小 (如 '16px')
  // 对应 LocalStorage Key: size
  fontSize: '16px',

  // =========================================================================
  // 2. 图床配置
  // =========================================================================

  // 当前选用的图床: 'default' | 'github' | 'aliOSS' | 'txCOS' | 'qiniu' | 'minio' | 'mp' | 'r2' ...
  // 对应 LocalStorage Key: imgHost
  imgHost: 'default',

  // GitHub 图床配置
  // 对应 LocalStorage Key: githubConfig
  githubConfig: {
    repo: '',           // 仓库名，如: username/repo
    branch: 'main',     // 分支
    accessToken: ''     // Token (建议公开仓库不填此项，在浏览器手动输入以防泄露)
  },

  // =========================================================================
  // 3. 公众号配置
  // =========================================================================
  
  // 对应 LocalStorage Key: mpConfig
  mpConfig: {
    appID: '',
    appsecret: '',
    proxyOrigin: '' // 代理地址，插件模式下不需要
  }
}
