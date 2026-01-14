# 个性化配置说明

本文档说明如何使用 `my-config.ts` 进行个性化配置。

## 配置原理

`my-config.ts` 中的配置会在应用启动时自动注入到浏览器的 LocalStorage 中，覆盖默认配置。这样即使上游代码更新，你的个性化配置也会保持不变。

## 安全配置指南

### ⚠️ 敏感信息处理

对于包含密钥的配置（如图床的 Access Key、Secret Key），**不要直接写在 `my-config.ts` 中**，因为：

1. 这个仓库是 Fork，无法改为私有
2. 提交到 Git 会暴露你的密钥

**推荐做法**：

1. 在 `my-config.ts` 中只配置非敏感信息（如 bucket、domain）
2. 敏感字段留空（空字符串）
3. 首次运行应用时，在浏览器中手动填写敏感信息

### 如何在浏览器中配置图床

1. 启动应用：`pnpm start`
2. 在编辑器界面，点击右上角的"上传图片"按钮
3. 选择对应的图床标签（如 "Cloudflare R2"）
4. 填写敏感信息：
   - Account ID
   - Access Key
   - Secret Key
5. 点击"保存"

这些配置会保存在浏览器的 LocalStorage 中，不会提交到 Git。

## 当前配置项

### 1. 外观配置

- `theme`: 主题名称
- `primaryColor`: 主色调
- `fontFamily`: 字体
- `fontSize`: 字体大小
- `cssPatch`: 启动时自动合并到“自定义 CSS”编辑器当前方案（适合放长期保留的样式覆盖）

### 2. 图床配置

- `imgHost`: 当前使用的图床类型
- `r2Config`: Cloudflare R2 配置
  - 非敏感：`bucket`, `domain`, `path`
  - 敏感：`accountId`, `accessKey`, `secretKey`（请在浏览器中手动配置）

### 3. 公众号配置

- `mpConfig`: 微信公众号配置（如需使用）

## 配置更新流程

1. 修改 `my-config.ts`
2. 如果添加了新的配置项，记得在 `inject-config.ts` 的 `KEY_MAP` 中添加映射
3. 提交到 `custom-config` 分支
4. 刷新浏览器，配置会自动生效

## 示例：添加新配置

假设你想添加代码块主题配置：

1. 在 `my-config.ts` 中添加：

```typescript
export const MY_CONFIG = {
  // ... 其他配置
  codeBlockTheme: 'github', // 对应 LocalStorage Key: codeBlockTheme
}
```

2. 在 `inject-config.ts` 的 `KEY_MAP` 中添加：

```typescript
const KEY_MAP: Record<keyof typeof MY_CONFIG, string> = {
  // ... 其他映射
  codeBlockTheme: 'codeBlockTheme',
}
```

3. 提交并刷新浏览器即可生效
