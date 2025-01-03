import { NextResponse } from "next/server";
import { jwtVerify } from 'jose';
import { NextRequest } from "next/server";
export async function verifyToken2(token: string) {
    try {
      if (!token) {
        console.log('No token')
        return { error: 'No token' }
      }
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret)
      console.log(payload)
      return { success: true, decoded: payload }
    } catch (error: any) {
      return { error: error.code }
    }
  }

export async function middleware(request:NextRequest){
    const token = request.cookies.get('token')
    //console.log(token?.value)
    const result = await verifyToken2(token?.value!)
    console.log(result)
    if(result.success){
        return NextResponse.next()
    }else{ 
        return NextResponse.redirect(new URL('/login',request.url))
    }
}

export const config ={
    matcher: ['/home']
}