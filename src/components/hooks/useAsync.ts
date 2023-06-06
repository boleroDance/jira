import { useState, useCallback } from "react";
import { useMountedRef } from "utils";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
  stat: 'idle',
  data: null,
  error: null
}

const defaultConfig = {
  throwOnError: false
}



export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {

  const config = {...defaultConfig, ...initialConfig}

  const mountedRef = useMountedRef()

  const setData = useCallback((data: D) => setState({
    data,
    stat: 'success',
    error: null
  }), [])

  const setError = useCallback((error: Error) => setState({
    error,
    stat: 'error',
    data: null,
  }), [])

  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState
  })

  const [retry, SetRetry] = useState( () => () => {})

  const run = useCallback((promise: Promise<D>, runConfig?: { retry: () => Promise<D>}) => {
    if (!promise || !promise.then) {
      throw new Error('请传入 promise 类型的数据')
    }

    SetRetry(() => () => {
      console.log('retry')
      if(runConfig?.retry) {
        run(runConfig?.retry(), runConfig)
      }
    })

    setState(prevState => ({
      ...prevState,
      stat: 'loading'
    }))

    return promise.then(data => {
      if (mountedRef.current)
      setData(data)
      return data
    }).catch(error => {
      setError(error) 
      // catch 消化了异常，这里主动抛出
      if (config.throwOnError) return Promise.reject(error)
      return error
    })
  }, [config.throwOnError, mountedRef, setData, setError])

  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    /**retry被调用时重新跑一遍run，注意，run应该记住需要再次调用的promise*/
    retry,
    ...state
  }
}