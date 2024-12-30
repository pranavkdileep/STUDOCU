'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { logIn } from '@/app/actions/auth'

export function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState<string>('test@t.me')
  const [password, setPassword] = useState<string>('pass')
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    const result = await logIn(formData)
    if (result.error) {
      setError(result.error)
    } else {
      console.log('Logged in!')
      router.push('/home')
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Log In</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="Enter your email" required value={email} onChange={
                (e) => {
                  setEmail(e.target.value)
                  setError(null)
                }
              }/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Enter your password" required value={password} onChange={
                (e) => {
                  setPassword(e.target.value)
                  setError(null)
                }
              }/>
            </div>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <Button type="submit" className="w-full mt-4">Log In</Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button variant="link" onClick={() => router.push('/forgot-password')}>Forgot password?</Button>
        <Button variant="link" onClick={() => router.push('/signup')}>Dont have an account? Sign up</Button>
      </CardFooter>
    </Card>
  )
}

