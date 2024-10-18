
import { useUser } from '@/context/UserContext'
import { Redirect } from 'expo-router'
import React from 'react'

const Home = () => {
  const { userLogged } = useUser()

  if (userLogged) {
    console.log("User reconocido - redirigir al home")
    return <Redirect href={'/(root)/(drawer)/(tabs)/home'} />
  }else{
    console.log("User no reconocido - redirigir al login")
    return <Redirect href={'/welcome'} />
  }
}

export default Home