import storage from './storage'

export const localStorageApi = new storage()

/**
 * 获取url查询参数
 * 支持？和hash模式
 *
 * @export
 * @param {*} name 获取具体的参数名
 * @returns
 */
export function getUrlParams(name?: string | string[]) {
  let params = []
  const vars: any = {}
  let url = location.search // 获取参数
  if (!url) url = location.hash // 如果没有判断是不是根据hash传参
  const ind = url.indexOf('?')
  if (ind !== -1) {
    // 封装url参数
    url = url.slice(ind).substr(1)
    params = url.split('&')
    for (let i = 0; i < params.length; i++) {
      const param = params[i].split('=')
      vars[param[0]] = decodeURIComponent(param[1])
    }
  }
  // 返回url参数
  if (!name) return vars
  else if (typeof name === 'string') {
    const o: any = {}
    if (vars[name]) o[name] = vars[name]
    return o
  } else if (name instanceof Array) {
    const o: any = {}
    for (let i = 0; i < name.length; i++) {
      if (vars[name[i]]) {
        o[name[i]] = vars[name[i]]
      }
    }
    return o
  }
  return {}
}
