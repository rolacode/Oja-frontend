'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const [isClient, setIsClient] = useState(false) // State to manage client-side rendering
  const router = useRouter()

  // Ensure the component runs only after the initial mount (client-side)
  useEffect(() => {
    setIsClient(true)  // Set to true once the component has mounted on the client
  }, [])

  // Early return to prevent rendering on the server
  if (!isClient) return null

  return (
    <div className="min-h-screen bg-background">
      <div className="container relative pt-4">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-4"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-6 w-6" />
          <span className="sr-only">Go back</span>
        </Button>
        
        <div className="flex flex-col items-center justify-center min-h-screen py-12">
          <Link href="/" className="mb-20">
            <h1 className="text-4xl font-bold text-green-700">OJA</h1>
          </Link>
          
          <div className="w-full max-w-sm space-y-4">
            <Button
              className="w-full h-16 text-lg font-semibold bg-green-700 hover:bg-green-800"
              onClick={() => router.push('/signup/seller')}
            >
              Seller
            </Button>
            <Button
              className="w-full h-16 text-lg font-semibold bg-green-700 hover:bg-green-800"
              onClick={() => router.push('/signup/buyer')}
            >
              Buyer
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
