import { Inter } from 'next/font/google'
import "../styles/globals.css"
import { CartProvider } from '@/contexts/CartContext'
import { Toaster } from "@/components/ui/toast"
import { Header } from "@/components/header" // Import Header
import { Footer } from "@/components/footer" // Import Footer

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "OJA - Online Shopping",
  description: "Your one-stop shop for all products",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
