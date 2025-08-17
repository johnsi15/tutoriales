import { http, HttpResponse } from 'msw'
import { type Product } from '../core/products/domain/Product'

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Essence Mascara Lash Princess',
    description:
      'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
    thumbnail: 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp',
    price: 9.99,
  },
  {
    id: 2,
    title: "L'Oreal Paris Infallible 24H Fresh Wear Foundation",
    description:
      "The L'Oreal Paris Infallible 24H Fresh Wear Foundation is a long-lasting foundation that provides a natural, matte finish. It is designed to stay fresh for up to 24 hours and is suitable for all skin types.",
    thumbnail: 'https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp',
    price: 14.99,
  },
  {
    id: 3,
    title: 'Maybelline Fit Me Matte + Poreless Foundation',
    description:
      'The Maybelline Fit Me Matte + Poreless Foundation is a lightweight foundation that provides a natural, matte finish. It is designed to minimize the appearance of pores and is suitable for normal to oily skin types.',
    thumbnail: 'https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp',
    price: 12.99,
  },
]

const API_URL = import.meta.env.API_URL || 'https://dummyjson.com'

// { request, params, requestId } -> https://mswjs.io/docs/concepts/response-resolver#respond-with-a-mocked-response
const productsHandler = http.get(`${API_URL}/products`, async () =>
  HttpResponse.json({ products: mockProducts }, { status: 200 })
)

export const handlers = [productsHandler]

// exporto en caso quiera crear test de una exception
export const productsHandlerException = http.get(`${API_URL}/products`, async () =>
  HttpResponse.json({ message: 'Deliberately broken request' }, { status: 500 })
)
