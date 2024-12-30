"use client";
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, Share2, Users, Search, Menu } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between relative">
        <Link className="flex items-center justify-center" href="#">
          <BookOpen className="h-6 w-6" />
          <span className="ml-2 text-2xl font-bold">StudyShare</span>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-4 sm:gap-6">
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
              Univertys
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
              books
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
              About
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
              Contact
            </Link>
          </nav>
          <Button variant="outline" className="hidden md:inline-flex" onClick={
            () => {
              router.push('/login')
            }
          }>Log in</Button>
          <Button className="hidden md:inline-flex" onClick={
            () => {
              router.push('/signup')
          }}>Sign up</Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
        {isMenuOpen && (
          <div className="absolute top-14 left-0 right-0 bg-white dark:bg-gray-800 p-4 shadow-md md:hidden">
            <nav className="flex flex-col gap-2">
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                Univertys
              </Link>
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                books
              </Link>
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                About
              </Link>
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                Contact
              </Link>
              <Button variant="outline" className="w-full mt-2" onClick={
                () => {
                  router.push('/login')
                }
              }>Log in</Button>
              <Button className="w-full mt-2" onClick={
                () => {
                  router.push('/signup')
                }
              }>Sign up</Button>
            </nav>
          </div>
        )}
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Share Knowledge, Ace Your Studies
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join our community of learners. Share study materials, collaborate on projects, and excel in your academic journey.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                  <Button type="submit">Get Started</Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Start your free trial. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Features</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Share2 className="h-10 w-10 mb-2" />
                <h3 className="text-xl font-bold">Easy Sharing</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Upload and share your study materials with just a few clicks.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Users className="h-10 w-10 mb-2" />
                <h3 className="text-xl font-bold">Collaborative Learning</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Form study groups and collaborate on projects in real-time.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Search className="h-10 w-10 mb-2" />
                <h3 className="text-xl font-bold">Smart Search</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Find the study materials you need with our powerful search feature.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to boost your academic performance?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join thousands of students who are already benefiting from our platform.
                </p>
              </div>
              <Button className="w-full sm:w-auto" size="lg">
                Sign Up Now
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 StudyShare. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

