import React, { useState, useEffect } from 'react'
import router, { useRouter } from 'next/router'
import Link from 'next/link'
import api from '../lib/api'
// .: Components
import LoginForm from '../components/LoginForm'

import { login } from '../lib/api'

export default function Login () {
  const [userData, setUserData] = useState({ email: '', password: '' })
  const [webToken, setWebToken] = useState('')
  const [error, setError] = useState(false)
  const router = useRouter()
  const Login = async details => {
    console.log('login INFO', userData)
    setUserData(details)
  }

  const buttonHandler = async () => {
    try {
      console.log('handler', userData)
      const response = await login(userData)
      const success = response.success
      // console.log('response', response.data.token)
      if (success) {
        const tokent = response.data.token
        
        const tokenjwt = api.parseJwt(tokent)
        const { id } = tokenjwt
        router.push(`/dentists/${id}`)
      } else {
        setError(true)
      }
    } catch (error) { console.log(error.message) }
  }
  return (
    <>
      <LoginForm Login={Login} error={error} buttonHandler={buttonHandler} webtoken={webToken} />
    </>
  )
}
