'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, MapPin } from 'lucide-react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

// Comes from backend/database
const orderDetails = {
  buyer: {
    name: "Michael David",
    phone: "+234 1402684557",
    location: {
      address: "36, Igbeyinadun Street, ABEOKUTA, Ogun",
      lat: 7.1475,
      lng: 3.3619
    }
  },
  seller: {
    name: "OJA Fashion Store",
    phone: "+234 1232465698",
    location: {
      address: "123 Fashion Avenue, Lagos",
      lat: 6.5244,
      lng: 3.3792
    }
  }
}

const mapContainerStyle = {
  width: '100%',
  height: '400px'
}

const center = {
  lat: (orderDetails.buyer.location.lat + orderDetails.seller.location.lat) / 2,
  lng: (orderDetails.buyer.location.lng + orderDetails.seller.location.lng) / 2
}

export default function CheckoutSuccessPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // In a real app, you might want to fetch the order details here
    setIsLoaded(true)
  }, [])

  if (!isLoaded) return <div>Loading...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Order Confirmed!</h1>
      
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Buyer Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="font-medium">{orderDetails.buyer.name}</p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <span>{orderDetails.buyer.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{orderDetails.buyer.location.address}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Seller Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="font-medium">{orderDetails.seller.name}</p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <span>{orderDetails.seller.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{orderDetails.seller.location.address}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Delivery Map</CardTitle>
        </CardHeader>
        <CardContent>
          <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={11}
            >
              <Marker
                position={orderDetails.buyer.location}
                label={{ text: "B", color: "white" }}
                title="Buyer Location"
              />
              <Marker
                position={orderDetails.seller.location}
                label={{ text: "S", color: "white" }}
                title="Seller Location"
              />
            </GoogleMap>
          </LoadScript>
        </CardContent>
      </Card>
    </div>
  )
}

