import React, { ReactNode, useEffect, useState } from 'react';
import * as auth from 'auth-provider'
import User from '@types/user.ts'
import { http } from 'utils/http';
import { useMount } from 'utils'
import { useAsync } from 'components/hooks/useAsync';
import { FullPageErrorFallback, FullPageLoading } from 'components/lib';
import { useQueryClient } from 'react-query';

interface AuthForm {
  username: string,
  password: string
}

export const AuthContext = React.createContext<{
  user: User | null,
  login: (form: AuthForm) => Promise<void>,
  register: (form: AuthForm) => Promise<void>,
  logout: () => Promise<void>
} | undefined>(undefined)

AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children } : { children: ReactNode }) => {
  
  const { 
    data: user, 
    error, 
    isLoading, 
    isIdle,  
    isError,
    run,
    setData: setUser
  } = useAsync<User | null>()

  const queryClient = useQueryClient()

  const bootstrapUser = async () => {
    let user = null
    const token = auth.getToken()
    if (token) {
      const data = await http('me', {token})
      console.log(data)
      user = data?.user
    } 
    return user
  }

  // useMount(() => {
  //   bootstrapUser().then(setUser)
  // })

  useMount(() => {
    run(bootstrapUser())
  })

  if (isIdle || isLoading) {
    return <FullPageLoading />
  }

  if (isError) {
    return <FullPageErrorFallback error={error}/>
  }

  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const register = (form: AuthForm) => auth.register(form).then(setUser)
  const logout = () => auth.logout().then(() => {
    setUser(null)
    queryClient.clear()
  })

  return (
      <AuthContext.Provider
      // children={children}
      value={{ user, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
    )
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}