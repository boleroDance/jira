import qs from 'qs'
import * as auth from '../auth-provider'
import { useAuth } from '../context/auth-context'

const apiUrl = process.env.REACT_APP_API_URL;


interface RequestConfig extends RequestInit {
  data?: object;
  token?: string
}

export const http = async (
  endpoint: string, 
  {data, token, headers, ...customConfig}: RequestConfig = {}
  ) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ?  `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : '',
    },
    ...customConfig
  }

  /** 防止method被customConfig覆盖 */
  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }

  return window.fetch(`${apiUrl}/${endpoint}`, config)
  .then(async response => {
    if (response.status === 401) {
      await auth.logout()
      window.location.reload()
      return Promise.reject({message: '请重新登陆'})
    } 
  
    const data = await response.json()

    if (response.ok) {
      return data 
    } else {
      return Promise.reject(data)
    }
  }).catch (() => {
    // 除非断网，fetch并不会捕获异常，所以此处无效，需手动抛异常
  })
}

export const useHttp = () => {
  const { user } = useAuth()
  // return (...[endpoint, config]: [string, RequestConfig])
  return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, {...config, token: user?.token})
}

/**
 utility type：
 - 用泛型给它传入一个其他变量作为类型，然后utility type对这个类型进行某种操作
 - Parameters操作是取函数的参数作为类型
 - Parameters<typeof http> 就是将http作为类型，取函数的参数类型：string 和 RequestConfig

 - 常见的utility type: Partial Omit

  type Person = {
  name: string,
  age: number
  }

 const jade: Partial<Person> = {name: 'jade'}

 type Partial<T> = {
  [P in keyof T]?: T[P]
 }
 
 */

 
/**
 const client = useHttp()
 client('project', {data: ...})
 */




