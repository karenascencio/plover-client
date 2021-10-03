import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import api from '../lib/api'
// .: Components
import LoginForm from '../components/LoginForm'

export default function Login() {
  const [userData, setUserData] = useState({ email: '', password: '' })
  const [errorLogin, setErrorLogin] = useState(false)
  const [error, setError] = useState('')

  const Login = async details => {
    console.log('login INFO', userData)
    setUserData(details)
  }
  
  const buttonHandler = async () => {
    try {
      console.log('handler', userData)
      const response = await api.login(userData)
      console.log(response)
    }
    catch (error) { 
      setErrorLogin 
      console.log(error.message)
    }
  }

  return (
    <>
      <LoginForm Login={Login} error={error} buttonHandler={buttonHandler} />
    </>
)
}