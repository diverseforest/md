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
  primaryColor: '#5C6BC0',

  // 字体设置
  // 对应 LocalStorage Key: fonts
  fontFamily: 'Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, "PingFang SC", Cambria, Cochin, Georgia, Times, "Times New Roman", serif',

  // 字体大小 (如 '16px')
  // 对应 LocalStorage Key: size
  fontSize: '16px',

  // 自定义 CSS 补丁：启动时自动合并到“自定义 CSS”编辑器的当前方案中
  // 用途：放一些你希望长期保留、且不想改上游主题文件的覆盖样式
  cssPatch: `
/* === my-config.ts: quote font-size === */
blockquote > p {
  font-size: var(--md-font-size);
}
  `.trim(),

  // =========================================================================
  // 2. 图床配置
  // =========================================================================

  // 当前选用的图床: 'default' | 'github' | 'aliOSS' | 'txCOS' | 'qiniu' | 'minio' | 'mp' | 'r2' ...
  // 对应 LocalStorage Key: imgHost
  imgHost: 'r2',

  // GitHub 图床配置
  // 对应 LocalStorage Key: githubConfig
  githubConfig: {
    repo: '', // 仓库名，如: username/repo
    branch: 'main', // 分支
    accessToken: '', // Token (建议公开仓库不填此项，在浏览器手动输入以防泄露)
  },

  // Cloudflare R2 图床配置
  // 对应 LocalStorage Key: r2Config
  // ⚠️ 安全提示：Access Key 和 Secret Key 等敏感信息请在浏览器中手动配置
  // 这样可以避免在公开的 Git 仓库中暴露密钥
  r2Config: {
    accountId: '', // 请在浏览器中手动输入
    accessKey: '', // 请在浏览器中手动输入
    secretKey: '', // 请在浏览器中手动输入
    bucket: 'images', // 非敏感信息可以预填
    domain: 'https://img.diverseforest.press', // 非敏感信息可以预填
    path: '', // 存储路径，留空表示根目录
  },

  // =========================================================================
  // 3. 公众号配置
  // =========================================================================

  // 对应 LocalStorage Key: mpConfig
  mpConfig: {
    appID: '',
    appsecret: '',
    proxyOrigin: '', // 代理地址，插件模式下不需要
  },
}
