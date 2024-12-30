'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { forgotPassword } from '@/app/actions/auth'

export function ForgotPasswordForm() {
  const [message, setMessage] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    const result = await forgotPassword(formData)
    if (result.success) {
      setMessage('')  
    } else {
      setMessage('Password reset instructions have been sent to your email.')
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>Enter your email to reset your password</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="Enter your email" required />
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

