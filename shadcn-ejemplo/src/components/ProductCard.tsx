import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Product {
  id: number
  name: string
  image: string
  price: number
  description: string
}

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className='w-[300px] shadow-md hover:shadow-lg transition-all duration-200'>
      <CardHeader>
        <img src={product.image} alt={product.name} className='h-40 w-full object-cover rounded-md' />
      </CardHeader>
      <CardContent>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription className='text-sm text-muted-foreground mt-1 mb-2'>{product.description}</CardDescription>
        <p className='text-lg font-semibold'>{product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter>
        <Button className='w-full cursor-pointer' onClick={() => onAddToCart(product)}>
          Agregar al carrito
        </Button>
      </CardFooter>
    </Card>
  )
}
