import { useState, useEffect } from 'react';

export default function useUserInfo () {
  const [id, setId] = useState(null)
  const [rol, setRol] = useState(null)
  useEffect(() => {
    const userToken = localStorage.getItem('userToken')
    const tokenData = atob(userToken.split('.')[1])
    const tokenJson = JSON.parse(tokenData)
    setId(tokenJson.id)
    setRol(tokenJson.rol)
    console.log(tokenJson.rol)
  }, [id, rol])
  return [id, rol]
}
