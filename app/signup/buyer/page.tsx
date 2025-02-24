'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from 'lucide-react'
import Link from "next/link"
import axios from 'axios' // Import axios for API requests

export default function BuyerSignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)  // For handling loading state
  const [errorMessage, setErrorMessage] = useState('') // For handling error message
  const [isClient, setIsClient] = useState(false); // Ensuring that this runs only on the client side

  // Ensuring the component is client-side only
  useEffect(() => {
    setIsClient(true);  // Set this to true after the initial render
  }, []);

  if (!isClient) return null; // Don't render until we are on the client.

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.firstName) newErrors.firstName = 'First name is required'
    if (!formData.lastName) newErrors.lastName = 'Last name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.password) newErrors.password = 'Password is required'
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'

    console.log('Form validation errors:', newErrors);  // Debugging line

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setLoading(true)
      setErrorMessage('')  // Clear previous errors
      
      try {
        // Sending data to backend 
        const response = await axios.post('http://localhost:5000/v1/buyers', formData);

        console.log('Signup Response:', response.data); // Log the response

        if (response.data.success) {
          // Handle successful signup (redirect or show success message)
          alert('Signup successful!');
          console.log('Redirecting to /shop...');
          router.push('/shop');
        } else {
          setErrorMessage(response.data.message || 'Signup failed');
        }
      } catch (error) {
        console.error('Error during signup:', error);
        setErrorMessage('An error occurred during signup. Please try again.');
      } finally {
        setLoading(false)
      }
    }
  }

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
          <Link href="/" className="mb-8">
            <h1 className="text-4xl font-bold text-green-700">OJA</h1>
          </Link>
          
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
            <h2 className="text-2xl font-bold text-center mb-6">Buyer Sign Up</h2>
            
            {/* Render input fields here as before */}
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>
            
            {/* Display error message if there's an error */}
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
            
            <Button type="submit" className="w-full bg-green-700 hover:bg-green-800" disabled={loading}>
              {loading ? 'Signing Up...' : 'Sign Up as Buyer'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
