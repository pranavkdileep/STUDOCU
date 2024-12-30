"use client";
import React, { useCallback } from 'react'
import { verifyToken,logOut } from '../actions/auth'
import { useEffect,useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@/interfaces/user';


 function Page() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [validity, setValidity] = useState('')
  const [islogedIn, setIslogedIn] = useState(false)

  const handlelogout = async () => {
    const result = await logOut()
    if (result.success) {
      router.push('/login')
    }
  }

  const handleverifyToken = useCallback(async () => {
    const result = await verifyToken();
    console.log(result);
    if (result.error) {
      router.push('/login');
      setIslogedIn(false);
    } else {
      const user = result.decoded as User;
      setEmail(user.email);
      const normal = new Date(user.exp * 1000);
      setValidity(normal.toString());
      setIslogedIn(true);
    }
  }, [router]);
  
  useEffect( () => {
    handleverifyToken()
  }, [handleverifyToken])



  return (
    <>
    <div>protected dashboard</div>
    <button onClick={handlelogout}>logout</button>
    {islogedIn && (
      <div>
        <h1>Welcome {email}</h1>
        <p>Your token is valid until {validity}</p>
      </div>
    )}
</>
  )
}

export default Page