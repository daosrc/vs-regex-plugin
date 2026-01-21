# VSCode Regex Plugin

一个基于 [any-rule](https://github.com/any86/any-rule) 项目的 VSCode 插件，用于管理和验证正则表达式。

## 功能特性

1. **预置正则表达式管理** - 提供常用的正则表达式模板，如邮箱、手机号、URL等
2. **正则表达式验证** - 验证正则表达式的有效性
3. **正则表达式测试** - 使用自定义文本测试正则表达式的匹配效果

## 安装

1. 克隆或下载此项目
2. 运行 `npm install` 安装依赖
3. 运行 `npm run compile` 编译 TypeScript 代码
4. 在 VSCode 中按 F5 运行插件或使用 "Run and Debug" 面板

## 使用方法

插件提供以下命令：

1. **Regex: Show Predefined List** - 显示预定义的正则表达式列表
2. **Regex: Validate Expression** - 验证正则表达式的有效性
3. **Regex: Test Expression** - 测试正则表达式与文本的匹配情况

可以通过以下方式调用命令：
- 使用 `Ctrl+Shift+P` (Windows/Linux) 或 `Cmd+Shift+P` (Mac) 打开命令面板，然后搜索对应命令
- 在编辑器中右键选择相应命令

## 预定义正则表达式

插件目前包含以下预定义正则表达式：
- 邮箱地址
- 中国手机号码
- URL链接
- 中国身份证号码
- IP地址

## 开发

```bash
# 安装依赖
npm install

# 编译代码
npm run compile

# 监听模式编译
npm run watch
```

## 扩展功能

可以根据需要添加更多预定义的正则表达式，只需在 [regexManager.ts](src/regexManager.ts) 文件中的 `predefinedRules` 数组中添加新的规则即可。

每个规则包含以下属性：
- `id`: 规则唯一标识符
- `name`: 规则名称
- `description`: 规则描述
- `pattern`: 正则表达式模式
- `flags`: 正则表达式标志（可选）
- `testCases`: 测试用例（可选）

## 许可证

MIT