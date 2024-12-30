'use server'

import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import { sign,verify } from "jsonwebtoken"

const MAX_AGE = 3000 // 1 minute

const users = [
  {
    email: 'test@t.me',
    password: '$2a$10$nieWtxirWrbV0ezhQKePrOv1nu99qbybX.OrRp4S/cDl4Rdv.OwPq',
  },
]

export async function signUp(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Here you would typically:
  // 1. Validate the input
  if (users.find((user) => user.email === email)) {
    return { error: 'User already exists' }
  }

  // 2. Hash the password
  const hashedPassword = await bcrypt.hash(password, 10)
  console.log(hashedPassword)
  // 3. Store the user in your database
  users.push({ email, password: hashedPassword })
  // 4. Create a session or JWT
  const token = sign({ email }, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  })
  // 5. Set a cookie
  ;(await cookies()).set('token', token, {
    maxAge: MAX_AGE,
    httpOnly: true,
    secure: true,
  })

  return { success: true }
}

export async function logIn(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Here you would typically:
  // 1. Validate the input
  const user = users.find((user) => user.email === email)
  // 2. Check the credentials against your database
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return { error: 'Invalid credentials' }
  }
  // 3. Create a session or JWT
  const token = sign({ email }, process.env.JWT_SECRET!, {
    expiresIn: '1m',
  })

  // 4. Set a cookie
  ;(await cookies()).set('token', token, {
    maxAge: MAX_AGE,
    httpOnly: true,
    secure: true,
  })

  verifyToken()

  return { success: true }
}

export async function forgotPassword(formData: FormData) {
  
  console.log(formData)
  // Here you would typically:
  // 1. Validate the email
  // 2. Generate a password reset token
  // 3. Send an email with reset instructions

  // For demonstration, we'll just return success
  return { success: true }
}

export async function logOut() {
  // Here you would typically:
  // 1. Clear the session or JWT
  // 2. Clear the cookie
  ;(await cookies()).set('token', '', {
    maxAge: 0,
    httpOnly: true,
    secure: true,
  })

  return { success: true }
}

export async function verifyToken() {
  try {
    const token = (await cookies()).get('token')
    if (!token) {
      console.log('No token')
      return { error: 'No token' }
    }
    const ttoken = token.value;
    const decoded = verify(ttoken, process.env.JWT_SECRET!)
    console.log(decoded)
    return { success: true, decoded }
  } catch (error) {
    console.log(error)
    return { error: 'Invalid token' }
  }
}

