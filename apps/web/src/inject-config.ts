import { prefix } from '@md/shared/configs'
import { MY_CONFIG } from './my-config'

/**
 * 键名映射表
 * 将 MY_CONFIG 的可读键名映射为实际的 LocalStorage Key
 */
const KEY_MAP: Partial<Record<keyof typeof MY_CONFIG, string>> = {
  theme: 'MD__theme',
  primaryColor: 'color',
  fontFamily: 'fonts',
  fontSize: 'size',
  imgHost: 'imgHost',
  githubConfig: 'githubConfig',
  r2Config: 'r2Config',
  mpConfig: 'mpConfig',
}

interface CssContentConfig {
  active: string
  tabs: {
    title: string
    name: string
    content: string
  }[]
}

const CSS_CONTENT_CONFIG_KEY = `${prefix}__css_content_config`

function ensureCssContentConfig(value: unknown): CssContentConfig {
  const fallback: CssContentConfig = {
    active: `方案1`,
    tabs: [{ title: `方案1`, name: `方案1`, content: `` }],
  }

  if (!value || typeof value !== `object`) {
    return fallback
  }

  const obj = value as any
  if (!Array.isArray(obj.tabs) || obj.tabs.length === 0) {
    return fallback
  }

  const tabs = obj.tabs
    .filter((t: any) => t && typeof t === `object` && typeof t.name === `string`)
    .map((t: any) => ({
      title: typeof t.title === `string` ? t.title : t.name,
      name: t.name,
      content: typeof t.content === `string` ? t.content : ``,
    }))

  if (tabs.length === 0) {
    return fallback
  }

  const active = typeof obj.active === `string` && obj.active
    ? obj.active
    : tabs[0].name

  return { active, tabs }
}

function mergeCssPatchIntoConfig(patch: string) {
  const trimmedPatch = patch.trim()
  if (!trimmedPatch) {
    return
  }

  let config: CssContentConfig
  const stored = localStorage.getItem(CSS_CONTENT_CONFIG_KEY)
  if (stored) {
    try {
      config = ensureCssContentConfig(JSON.parse(stored))
    }
    catch {
      config = ensureCssContentConfig(null)
    }
  }
  else {
    config = ensureCssContentConfig(null)
  }

  const activeName = config.active || config.tabs[0]!.name
  config.active = activeName

  const activeTab = config.tabs.find(t => t.name === activeName) ?? config.tabs[0]!
  if (!activeTab.content.includes(trimmedPatch)) {
    activeTab.content = [activeTab.content.trim(), trimmedPatch].filter(Boolean).join(`\n\n`)
  }

  localStorage.setItem(CSS_CONTENT_CONFIG_KEY, JSON.stringify(config))
}

/**
 * 注入自定义配置到 LocalStorage
 * 在 Vue 应用挂载前执行
 */
export function injectCustomConfig() {
  console.log('[Config Injection] 开始注入自定义配置...')

  try {
    Object.entries(MY_CONFIG).forEach(([key, value]) => {
      if (key === `cssPatch`) {
        return
      }
      // 1. 获取对应的 Storage Key
      const storageKey = KEY_MAP[key as keyof typeof MY_CONFIG]

      if (!storageKey) {
        console.warn(`[Config Injection] 未找到 key: ${key} 的映射关系，跳过`)
        return
      }

      // 2. 处理值的序列化
      // 如果值是对象（且不是null），需要 JSON.stringify
      // 如果值是字符串或基本类型，直接使用
      let storageValue = ''

      if (typeof value === 'object' && value !== null) {
        // 简单的空值检查：如果用户没填任何东西，可能不想覆盖浏览器的现有缓存？
        // 这里我们采取“强制覆盖”策略，保证 my-config.ts 是单一数据源
        // 但如果用户留空其实是想用“默认值”，这会覆盖掉浏览器里手填的。
        // 既然是“自定义配置”，我们假设用户在文件中定义的就是最终想要的。
        storageValue = JSON.stringify(value)
      }
      else {
        storageValue = String(value)
      }

      // 3. 写入 LocalStorage
      // 注意：如果值为空字符串，是否依然写入？是的，清空也是一种配置。
      localStorage.setItem(storageKey, storageValue)
    })

    mergeCssPatchIntoConfig(MY_CONFIG.cssPatch ?? ``)

    console.log('[Config Injection] ✅ 配置注入完成')
  }
  catch (e) {
    console.error('[Config Injection] ❌ 注入失败:', e)
  }
}
