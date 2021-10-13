import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function useAvailableToken () {
  const [isTokenAvailable, setIsTokenAvailable] = useState(false)
  const router = useRouter()
  useEffect(() => {
    const token = localStorage.getItem('userToken')
    setIsTokenAvailable(token)
    !isTokenAvailable && router.push('/login')
  }, [])
}
