import type { TaskLogType } from '@/app/services/reportApi'

export const mapPeopleLogs = <T extends object>(data: T) => {
  return Object.entries(data).map(([accountName, tasks]) => {
    const _tasks = typeof tasks === 'object' ? { ...tasks } : {}
    if ('follow' in _tasks && _tasks.follow) {
      _tasks.follow = `Подписано`
    }
    return [accountName, _tasks]
  }) as [string, TaskLogType][]
}

export const mapHashtagLogs = <T extends object>(data: T) => {
  return Object.entries(data).map(([hashtag, obj]) => {
    const nested: [string, object][] = Object.entries(obj)
    return nested.map(([accountName, tasks]) => {
      const _tasks = typeof tasks === 'object' ? { ...tasks } : {}
      if ('follow' in _tasks && _tasks.follow) {
        _tasks.follow = `Подписался на ${accountName}`
      }
      return [hashtag, _tasks]
    })
  })[0] as [string, TaskLogType][]
}

export const mapHashtagErrors = <T extends object>(data: T) => {
  return Object.entries(data).map(([hashtag, error]) => {
    const _error = typeof error === 'string' ? { error } : { ...error }
    console.log(111, hashtag, _error)
    return [hashtag, _error]
  }) as [string, TaskLogType][]
}