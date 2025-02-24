import { HeroSection } from "@/components/hero-section"
import { Toaster } from "@/components/toaster"
import { Categories } from "@/components/categories"
import { Newsletter } from "@/components/newsletter"

export default function Home() {
  return (
    <>
      <HeroSection />
      <Categories />
      <Newsletter />

      <Toaster />


    </>
  )
}

