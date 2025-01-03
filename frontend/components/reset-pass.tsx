'use client'

import { useState,useEffect } from 'react'
import { useRouter,useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {  resetPassword, verifypassToken } from '@/app/actions/auth'

export function ResetPasswordForm() {
  const [message, setMessage] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')

  useEffect(() => {
    const verifyToken = async () => {
      console.log("password reset token", token)
      if (!token) {
        setMessage('Invalid token')
      } else {
        const result = await verifypassToken(token)
        if (result.success) {
          setMessage('token verified')
        }else{
          setMessage(result.error ?? 'An error occurred')
        }
      }
    }
    verifyToken()
  }, [token])

  async function handleSubmit(formData: FormData) {
    const result = await resetPassword(formData,token ?? '')


    if (result.success) {
      setMessage('password reset successfully')  
    } else {
      setMessage(result.error ?? 'An error occurred')
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>Enter your new password</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Enter your password" required />
            </div>
          </div>
          {message && <p className={`mt-2 ${message.includes('error') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
          <Button type="submit" className="w-full mt-4">Reset Password</Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="link" onClick={() => router.push('/login')}>Back to Log In</Button>
      </CardFooter>
    </Card>
  )
}

