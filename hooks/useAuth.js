import { useEffect } from 'react'
import Router from 'next/router'

export function useAuth () {
  useEffect(() => {
    try {
      console.log('este es mi custom hook c:')
      const token = window.localStorage.getItem('userToken')
      if (!token) Router.replace('/login')
      // if (token.length <= 0) throw new Error('Token not found')
      const tokenData = atob(token.split('.')[1])
      const tokenJson = JSON.parse(tokenData)
      return tokenJson
    } catch (error) {
      console.log(error)
    }
  }, [])
}
