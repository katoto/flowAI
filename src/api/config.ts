const apiHostMap: Record<string, string> = {
  dev: '/api',
  stg: '//aurora-api-stg.github.cn',
  pre: '//aurora-api-pre.github.cn',
  prod: '//aurora-api.github.cn',
}

export const env = (document.documentElement.dataset.vanEnv || 'dev')
export const apiHost = apiHostMap[env]
