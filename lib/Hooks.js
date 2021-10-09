import { useEffect } from 'react'

export function useBreakToken () {
  useEffect(() => {
    try {
      console.log('este es mi custom hook c:')
      const token = window.localStorage.getItem('token')
      if (token.length <= 0) throw new Error('Token not found')
      const tokenData = atob(token.split('.')[1])
      console.log(tokenData)
    } catch (error) {
      console.log(error)
    }
  }, [])
}
