import { ProductCard } from "@/components/product-card"

// This would typically come from an API or database
const products = [
  { id: '1', name: 'Classic T-Shirt', price: 10000, image: '/Images/T-shirts.jpeg' },
  { id: '2', name: 'Denim Jeans', price: 20000, image: '/Images/Denim-Jacket.jpeg' },
  { id: '3', name: 'Sneakers', price: 50000, image: '/Images/Sneakers.jpeg' },
  { id: '4', name: 'Hoodie', price: 30000, image: '/Images/Hoodie.jpeg' },
  { id: '5', name: 'Backpack', price: 20000, image: '/Images/Backpack.jpeg' },
  { id: '6', name: 'Watch', price: 100000, image: '/Images/Wristwatch.jpeg' },
]

export default function ShopPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">In Stock</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  )
}

