'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, BarChart, Package, DollarSign } from 'lucide-react'

export default function SellerProfilePage() {
  const accountDetails = {
    businessName: "OJA Fashion Store",
    email: "ojafashion@example.com",
    location: "Lagos, Nigeria",
    nin: "12345678901",
    stats: {
      totalSales: "₦1,234,567",
      pendingOrders: 12,
      totalProducts: 45,
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Seller Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <BarChart className="w-4 h-4 ml-auto text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accountDetails.stats.totalSales}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Package className="w-4 h-4 ml-auto text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accountDetails.stats.pendingOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <DollarSign className="w-4 h-4 ml-auto text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accountDetails.stats.totalProducts}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">BUSINESS DETAILS</CardTitle>
            <Button variant="ghost" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="font-medium">{accountDetails.businessName}</p>
              <p className="text-sm text-gray-500">{accountDetails.email}</p>
              <p className="text-sm text-gray-500">Location: {accountDetails.location}</p>
              <p className="text-sm text-gray-500">NIN: {accountDetails.nin}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">QUICK ACTIONS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" variant="outline">
              Add New Product
            </Button>
            <Button className="w-full justify-start" variant="outline">
              View Orders
            </Button>
            <Button className="w-full justify-start" variant="outline">
              Manage Inventory
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

