import React, { useState, useEffect } from 'react'
import router, { useRouter } from 'next/router'
import Link from 'next/link'
import api from '../lib/api'
// .: Components
import LoginForm from '../components/LoginForm'

export default function Login () {
  const [userData, setUserData] = useState({ email: '', password: '' })
  const [webToken, setWebToken] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const Login = async details => {
    console.log('login INFO', userData)
    setUserData(details)
  }

  const buttonHandler = async () => {
    try {
      console.log('handler', userData)
      const response = await api.login(userData)
      response.success ? setWebToken(response.data.token) : setWebToken('')
      if (response.success) {
        if (!localStorage.getItem('user-info')) {
          localStorage.setItem('user-info', JSON.stringify(api.parseJwt(response.data.token)))
        }
        router.push('/')
      } else {
        console.log('no hay web token')
      }
    } catch (error) { console.log(error.message) }
  }
  return (
    <>
      <LoginForm Login={Login} error={error} buttonHandler={buttonHandler} webtoken={webToken} />
    </>
  )
}
