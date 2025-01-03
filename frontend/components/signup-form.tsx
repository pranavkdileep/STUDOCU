'use client'


import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { signUp } from '@/app/actions/auth'
import { useState } from 'react'

export function SignUpForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [haveerror, setHaveError] = useState<boolean>(false)

  async function handleSubmit(formData: FormData) {
    const result = await signUp(formData)
    if(result.success){
      alert('Sign up successful')
      router.push('/home')
    }else{
      setError(result.error ?? 'An unknown error occurred')
      setHaveError(true)
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create a new account</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="Enter your email" required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Enter your password" required />
            </div>
          </div>
          
          <Button type="submit" className="w-full mt-4">Sign Up</Button>
        </form>
        {haveerror && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="link" onClick={() => router.push('/login')}>Already have an account? Log in</Button>
      </CardFooter>
    </Card>
  )
}

