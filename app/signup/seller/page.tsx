'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from 'lucide-react'
import Link from "next/link"
import axios from 'axios'

export default function SellerSignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
    nin: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.businessName) newErrors.businessName = 'Business name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.password) newErrors.password = 'Password is required'
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    if (!formData.location) newErrors.location = 'Location is required'
    else {
      const locationParts = formData.location.split(',');
      if (locationParts.length !== 2 || isNaN(parseFloat(locationParts[0])) || isNaN(parseFloat(locationParts[1]))) {
        newErrors.location = 'Location must be in the format "latitude,longitude"';
      }
    }
    if (!formData.nin) newErrors.nin = 'NIN is required'
    else if (!/^\d{11}$/.test(formData.nin)) newErrors.nin = 'NIN must be 11 digits'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setLoading(true)
      setErrorMessage('')

      try {
        // Convert location string to coordinates (latitude, longitude)
        const [latitude, longitude] = formData.location.split(',').map(coord => parseFloat(coord))

        const response = await axios.post('http://localhost:5000/v1/vendors', {
          ...formData,
          location: { coordinates: [latitude, longitude] }
        })

        if (response.data.success) {
          alert('Signup successful!')
          router.push('/dashboard')
        } else {
          setErrorMessage(response.data.message || 'Signup failed')
        }
      } catch (error) {
        console.error('Error during signup:', error)
        setErrorMessage('An error occurred during signup. Please try again.')
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
            <h2 className="text-2xl font-bold text-center mb-6">Seller Sign Up</h2>
            
            <div className="space-y-2">
              <Label htmlFor="businessName">Username/Business Name</Label>
              <Input
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                required
              />
              {errors.businessName && <p className="text-red-500 text-sm">{errors.businessName}</p>}
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

            <div className="space-y-2">
              <Label htmlFor="location">Location (Latitude, Longitude)</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter location as 'latitude,longitude'"
                required
              />
              {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nin">NIN (National Identification Number)</Label>
              <Input
                id="nin"
                name="nin"
                value={formData.nin}
                onChange={handleChange}
                required
                maxLength={11}
              />
              {errors.nin && <p className="text-red-500 text-sm">{errors.nin}</p>}
            </div>
            
            <Button type="submit" className="w-full bg-green-700 hover:bg-green-800">
              Sign Up as Seller
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
