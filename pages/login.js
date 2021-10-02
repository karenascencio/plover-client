import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import api from '../lib/api'
// .: Components
import LoginForm from '../components/LoginForm'

export default function Login() {
  // const [userData, setUserData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const Login = async details => {
    console.log(details)
  }
  
  const buttonHandler = async () => {
    try {
      const response = await api.login(Login)
      console.log(response)
    }
    catch (error) { console.log(error.message) }
  }
  return (
    <>
      <LoginForm Login={Login} error={error} buttonHandler={buttonHandler} />
    </>
)
}