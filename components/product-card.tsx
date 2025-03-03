"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/components/ui/use-toast"; 
import { useEffect, useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string[]; // Ensure this matches backend response
}

export function ProductCard({ id, name, price, image }: ProductCardProps) {
  const { addItem } = useCart();
  const { addToast } = useToast(); 
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const addToCart = () => {
    if (isClient) {
      addItem({ 
        id, 
        name, 
        price, 
        image: image.length > 0 ? image[0] : "/placeholder.jpg", // Fix here
        quantity: 1 
      });
  
      addToast({
        title: "Added to cart",
        description: `${name} has been added to your cart.`,
      });
    }
  };
  

  if (!isClient) return null; 

  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all hover:shadow-lg">
      <Link href={`/product/${id}`} className="block aspect-square overflow-hidden">
        {image && image.length > 0 && typeof image[0] === "string" ? (
          <Image
            src={image[0]} // Validated image source
            alt={name}
            width={300}
            height={300}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            unoptimized // If images are coming from an API, this might help
          />
        ) : (
          <Image
            src="/placeholder.jpg" // Fallback image
            alt="Placeholder"
            width={300}
            height={300}
            className="h-full w-full object-cover"
          />
        )}
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold">
          <Link href={`/product/${id}`}>{name}</Link>
        </h3>
        <p className="mt-1 text-sm text-gray-500">${price.toFixed(2)}</p>
        <Button className="mt-4 w-full" onClick={addToCart}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
