function serialize(val: any) {
  return JSON.stringify(val)
}

function deserialize(val: string | null) {
  if (typeof val !== 'string') {
    return undefined
  }
  try {
    return JSON.parse(val)
  } catch (e) {
    return val || undefined
  }
}

const store = {
  localStorage: window.localStorage,
  sessionStorage: window.sessionStorage,
}
class storage {
  storage = store.localStorage
  disabled = false
  constructor(key = 'local') {
    if (key === 'session') {
      this.storage = store.sessionStorage
    }
    this.disabled = !['local', 'session'].includes(key) && !this.storage
  }

  set(key: string, val: any) {
    if (this.disabled) {
      return
    }
    if (val === undefined) {
      return this.remove(key)
    }
    this.storage.setItem(key, serialize(val))
    return val
  }
  get(key: string, def: any = null) {
    if (this.disabled) {
      return def
    }
    const val = deserialize(this.storage.getItem(key))
    return val === undefined ? def : val
  }
  has(key: string) {
    return this.get(key) !== undefined
  }
  remove(key: string) {
    if (this.disabled) {
      return
    }
    this.storage.removeItem(key)
  }
  clear() {
    if (this.disabled) {
      return
    }
    this.storage.clear()
  }

  getAll() {
    if (this.disabled) {
      return null
    }
    const ret = {} as any
    this.forEach((key, val) => {
      ret[key] = val
    })
    return ret
  }

  forEach(callback: (key: string, data: any) => void) {
    if (this.disabled) {
      return
    }
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i)
      key && callback(key, this.get(key))
    }
  }
}

export default storage
