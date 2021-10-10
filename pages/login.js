import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { login } from '../lib/api'
// .: Components
import LoginForm from '../components/LoginForm'

export default function Login () {
  const [userData, setUserData] = useState({ email: '', password: '' })
  const [webToken, setWebToken] = useState('')
  const [error, setError] = useState(false)
  const router = useRouter()
  const Login = async details => {
    setUserData(details)
  }

  const buttonHandler = async () => {
    try {
      console.log('userdata', userData)
      const response = await login(userData)
      const success = response.success
      if (success) {
        const userToken = response.data.token
        window.localStorage.setItem('userToken', userToken)
        // if (token.length <= 0) throw new Error('Token not found')
        const tokenData = atob(userToken.split('.')[1])
        const tokenJson = JSON.parse(tokenData)
        // const tokenjwt = api.parseJwt(tokent)
        const id = tokenJson.id
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