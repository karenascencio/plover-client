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
  async function Login(details) {
    setUserData(details)
  }

  const buttonHandler = async () => {
    if(userData.email === '' && userData.password === '' ) console.log('cuack')
    try {
      const response = await login(userData)
      const success = response.success
      if (success) {git 
        const userToken = response.data.token
        window.localStorage.setItem('userToken', userToken)
        const tokenData = atob(userToken.split('.')[1])
        const tokenJson = JSON.parse(tokenData)
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