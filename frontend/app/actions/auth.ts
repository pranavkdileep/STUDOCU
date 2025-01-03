'use server'

import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import { sign, verify } from "jsonwebtoken"
import { connection } from '@/lib/db'

const MAX_AGE = 3000 // 1 minute



export async function signUp(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  let userid = 0

  // Here you would typically:
  // 1. Validate the input
  try {
    if (!email || !password) {
      return { error: 'Email and password are required' }
    }
    else{
      const sql = 'SELECT * FROM "user" WHERE "email" = $1'
      const values = [email]
      const result = await connection.query(sql, values)
      //console.log(result.rows)
      if (result.rows.length > 0) {
        return { error: 'Email already exists' }
      }
    }
  } catch (err) {
    console.log(err)
    return { error: 'Error validating input' }
  }

  // 2. Hash the password
  const hashedPassword = await bcrypt.hash(password, 10)
  console.log(hashedPassword)
  // 3. Store the user in your database
  //users.push({ email, password: hashedPassword })

  try {
    const sql = 'INSERT INTO "user" ("email", "password") VALUES ($1, $2) RETURNING *'
    const values = [email, hashedPassword]
    const result = await connection.query(sql, values)
    console.log(result.rows[0])
    userid = result.rows[0]._id
  } catch (err) {
    console.log(err)
    return { error: 'Error creating user' }
  }

  // 4. Create a session or JWT
  const token = sign({ userid,email }, process.env.JWT_SECRET!, {
    expiresIn: '1m',
  })
    // 5. Set a cookie
    ; (await cookies()).set('token', token, {
      maxAge: MAX_AGE,
      httpOnly: true,
      secure: true,
    })

  return { success: true }
}

export async function logIn(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  let userid = 0

  // Here you would typically:
  // 1. Validate the input
  if (!email || !password) {
    return { error: 'Email and password are required' }
  }
  try{
    const sql = 'SELECT * FROM "user" WHERE "email" = $1'
    const values = [email]
    const result = await connection.query(sql, values)
    console.log(result.rows)
    if (result.rows.length === 0) {
      return { error: 'No User Found' }
    }else{
      const user = result.rows[0]
      const passwordMatch = await bcrypt.compare(password, user.password)
      if (!passwordMatch) {
        return { error: 'Invalid credentials' }
      }else{
        userid = user._id
      }
    }

  }catch(err){
    console.log(err)
    return { error: 'Error validating input' }
  }
  // 2. Check the credentials against your database
  
  // 3. Create a session or JWT
  console.log(userid)
  const token = sign({ userid,email }, process.env.JWT_SECRET!, {
    expiresIn: '1m',
  })
  console.log(token)

    // 4. Set a cookie
    ; (await cookies()).set('token', token, {
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
  try{
    const sql = 'SELECT _id FROM "user" WHERE "email" = $1'
    const values = [formData.get('email')]
    const result = await connection.query(sql, values)
    console.log(result.rows)
    if (result.rows.length === 0) {
      return { error: 'No User Found' }
    }
    const userid = result.rows[0]._id
    const token = sign({ email: formData.get('email') }, process.env.JWT_SECRET!, { expiresIn: '1m' })
    const sql2 = 'INSERT INTO "passwordReset" ("id", "token") VALUES ($1, $2) RETURNING *'
    const values2 = [userid, token]
    const result2 = await connection.query(sql2, values2)
    console.log("resetPassword?token="+result2.rows[0].token)
    return { success: true, token: result2.rows[0].token }


  }catch(err){
    console.log(err)
    return { error: 'Error validating input' }
  }
  // 3. Send an email with reset instructions

  // For demonstration, we'll just return success
  
}

export async function logOut() {
  // Here you would typically:
  // 1. Clear the session or JWT
  // 2. Clear the cookie
  ; (await cookies()).set('token', '', {
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

export async function verifypassToken(token: string) {
  try {
    const decoded = verify(token, process.env.JWT_SECRET!)
    console.log(decoded)
    return { success: true, decoded }
  } catch (error) {
    console.log(error)
    try{const sql3 = 'DELETE FROM "passwordReset" WHERE "token" = $1'
      const values3 = [token]
      const result3 = await connection.query(sql3, values3)
      console.log(result3.rows)
    }catch(err){
      console.log(err)
    }
    return { error: "jwt error" }
  }
}
export async function resetPassword(formData: FormData,token: string) {
  // Here you would typically:
  // 1. Validate the token
  if (!token) {
    return { error: 'Invalid token' }
  }
  try{
    const decoded = verify(token, process.env.JWT_SECRET!)
    console.log(decoded)
    const sql = 'SELECT * FROM "passwordReset" WHERE "token" = $1'
    const values = [token]
    const result = await connection.query(sql, values)
    console.log(result.rows)
    if (result.rows.length === 0) {
      return { error: 'Invalid token' }
    }
    else{
      const hashedPassword = await bcrypt.hash(formData.get('password') as string, 10)
      const sql2 = 'UPDATE "user" SET "password" = $1 WHERE "_id" = $2'
      const values2 = [hashedPassword, result.rows[0].id]
      const result2 = await connection.query(sql2, values2)
      console.log(result2.rows)
    }
  }catch(err){
    console.log(err)
    const sql3 = 'DELETE FROM "passwordReset" WHERE "token" = $1'
    const values3 = [token]
    const result3 = await connection.query(sql3, values3)
    console.log(result3.rows)
    return { error: "database error" }
  }
  // 2. Update the user's password
  // 3. Clear the token
  const sql3 = 'DELETE FROM "passwordReset" WHERE "token" = $1'
  const values3 = [token]
  const result3 = await connection.query(sql3, values3)
  console.log(result3.rows)
  // 4. Send an email confirming the change

  // For demonstration, we'll just return success
  return { success: true }
}
