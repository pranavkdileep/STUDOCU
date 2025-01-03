import {Suspense} from 'react'
import { ResetPasswordForm } from '@/components/reset-pass'

function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <ResetPasswordForm />
    </div>
    </Suspense>
  )
}

export default page