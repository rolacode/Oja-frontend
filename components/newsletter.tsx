import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  return (
    <section className="bg-gray-100 py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-bold mb-4 md:text-3xl">Newsletter</h2>
          <p className="text-muted-foreground mb-6">
            Subscribe To Our Newsletter Get Bonus For The Next Purchase
          </p>
          <form className="flex gap-2">
            <Input
              type="email"
              placeholder="Your Email Address"
              className="flex-1"
            />
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

