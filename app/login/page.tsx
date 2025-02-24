'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from 'lucide-react'
import Link from "next/link"
import axios from 'axios'

type Role = 'buyer' | 'vendor' | 'admin'; // Define the role type

export default function LoginPage() {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false); // For ensuring it's running only on the client
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'buyer' as Role,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Make sure to only run this on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    setFormData(prev => ({ ...prev, role: value as Role })) // Ensure value is a valid Role
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.email) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.password) newErrors.password = 'Password is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setLoading(true)
      setErrorMessage('')
      
      const loginEndpoints: Record<Role, string> = {
        buyer: 'http://localhost:5000/v1/buyers/login',
        vendor: 'http://localhost:5000/v1/vendors/login',
        admin: 'http://localhost:5000/v1/admin/login',
      }

      try {
        const response = await axios.post(loginEndpoints[formData.role], formData)

        if (response.data.success) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('role', formData.role);
          console.log('Redirecting to /shop...');
          router.push('/shop');
        } else {
          setErrorMessage(response.data.message || 'Login failed');
        }
      } catch (error) {
        setErrorMessage('An error occurred during login. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  }

  if (!isClient) {
    return null; // Prevent server-side rendering issues
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container relative pt-4">
        <Button variant="ghost" size="icon" className="absolute left-4 top-4" onClick={() => router.back()}>
          <ArrowLeft className="h-6 w-6" />
          <span className="sr-only">Go back</span>
        </Button>

        <div className="flex flex-col items-center justify-center min-h-screen py-12">
          <Link href="/" className="mb-8">
            <h1 className="text-4xl font-bold text-green-700">OJA</h1>
          </Link>

          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            {/* Dropdown to select role */}
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleRoleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="buyer">Buyer</option>
                <option value="vendor">Vendor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}

            <Button type="submit" className="w-full bg-green-700 hover:bg-green-800" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/signup" className="font-medium text-green-700 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
