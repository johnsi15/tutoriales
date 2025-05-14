import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Product {
  id: number
  name: string
  price: number
  image: string
}

interface CartListProps {
  products: Product[]
  onRemove: (id: number) => void
}

export function CartList({ products, onRemove }: CartListProps) {
  if (products.length === 0) {
    return <div className='text-muted-foreground text-center py-10'>Tu carrito está vacío.</div>
  }

  return (
    <div className='space-y-4'>
      {products.map(product => (
        <Card key={product.id} className='flex items-center gap-4 p-4'>
          <img src={product.image} alt={product.name} className='h-20 w-20 object-cover rounded-md' />
          <CardContent className='flex-1 p-0'>
            <CardTitle>{product.name}</CardTitle>
            <CardDescription className='text-sm text-muted-foreground'>${product.price.toFixed(2)}</CardDescription>
          </CardContent>
          <Button variant='destructive' className='cursor-pointer' onClick={() => onRemove(product.id)}>
            Quitar
          </Button>
        </Card>
      ))}
    </div>
  )
}
