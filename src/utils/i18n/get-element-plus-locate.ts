// noinspection ES6PreferShortImport: if you use 'element-plus/es/locale', vite will compalin that it can't find files
import { type Language } from 'element-plus/es/locale/index'

const en = (await import('element-plus/es/locale/lang/en')).default
const zhCn = (await import('element-plus/es/locale/lang/zh-cn')).default
const availableElLocates = new Map<string, Language>().set('en', en).set('zh-cn', zhCn)

export default (locateID: string) => availableElLocates.get(locateID)
