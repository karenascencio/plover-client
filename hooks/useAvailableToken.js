import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function useAvailableToken () {
  const router = useRouter()
  useEffect(() => {
    try {
      const token = localStorage.getItem('userToken')
      console.log(token)
      !token && alert('no puedes entrar')
      !token && router.push('/login')
    } catch (error) {
      console.log(error)
    }
  }, [])
}
