import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil } from 'lucide-react'

export default function BuyerProfilePage() {
  const accountDetails = {
    name: "Michael David",
    email: "michael.david@example.com",
    address: {
      street: "36, Igbeyinadun Street",
      city: "ABEOKUTA",
      state: "Ogun",
      phone: "+234 1402684557 / +234 1232465698"
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Account Overview</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ACCOUNT DETAILS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="font-medium">{accountDetails.name}</p>
              <p className="text-sm text-gray-500">{accountDetails.email}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ADDRESS BOOK</CardTitle>
            <Button variant="ghost" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="font-medium">Your default shipping address:</p>
              <p className="text-sm text-gray-500">{accountDetails.name}</p>
              <p className="text-sm text-gray-500">{accountDetails.address.street}</p>
              <p className="text-sm text-gray-500">{accountDetails.address.city}, {accountDetails.address.state}</p>
              <p className="text-sm text-gray-500">{accountDetails.address.phone}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

