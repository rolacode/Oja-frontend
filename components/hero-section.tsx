'use client'

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/navigation'

export function HeroSection() {
  const router = useRouter()

  const handleShopNow = () => {
    router.push('/shop')
  }

  return (
    <section className="relative overflow-hidden bg-gray-100 py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="flex flex-col justify-center space-y-4 text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Introducing The New Men's Casual Button Down Denim Jacket Classic Jean Coat
            </h1>
            <p className="text-2xl font-semibold text-red-600 md:text-3xl">
              50% off Discount
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleShopNow}>
                Shop Now
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
              <Button size="lg" variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] md:aspect-[3/2] lg:aspect-[5/3]">
            <Image
              src="/Images/Denim-Jacket.jpeg"
              alt="Denim Jacket"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded-lg"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

