import { render, screen } from '@testing-library/react'
import { productsHandlerException } from '../api-mocks/handlers'
import { mswServer, http, HttpResponse } from '../api-mocks/msw-server'
import App from '../App'

describe('Component: App', () => {
  it('renders products fetched from the default API mock', async () => {
    render(<App />)

    const displayedProducts = await screen.findAllByTestId(/product-id-\d+/)
    expect(displayedProducts).toHaveLength(2)
    expect(screen.getByText('Essence Mascara Lash Princess')).toBeInTheDocument()
    expect(screen.getByText("L'Oreal Paris Infallible 24H Fresh Wear Foundation")).toBeInTheDocument()
  })

  it('renders products from a custom successful API response', async () => {
    createGetSuccessResponse('/products', [
      {
        id: 1,
        title: 'Essence Mascara Lash Princess',
        description:
          'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
      },
      {
        id: 2,
        title: "L'Oreal Paris Infallible 24H Fresh Wear Foundation",
        description:
          "The L'Oreal Paris Infallible 24H Fresh Wear Foundation is a long-lasting foundation that provides a natural, matte finish. It is designed to stay fresh for up to 24 hours and is suitable for all skin types.",
      },
    ])

    render(<App />)

    const displayedProducts = await screen.findAllByTestId(/product-id-\d+/)
    expect(displayedProducts).toHaveLength(2)
    expect(screen.getByText('Essence Mascara Lash Princess')).toBeInTheDocument()
    expect(screen.getByText("L'Oreal Paris Infallible 24H Fresh Wear Foundation")).toBeInTheDocument()
  })

  // en caso de que quisiera testear un error
  it.skip('displays error message when fetching products raises error', async () => {
    mswServer.use(productsHandlerException)
    render(<App />)

    const errorDisplay = await screen.findByText('Failed to fetch products')
    expect(errorDisplay).toBeInTheDocument()
    const displayedProducts = screen.queryAllByTestId(/product-id-\d+/)
    expect(displayedProducts).toEqual([])
  })
})

function createGetSuccessResponse(path: string, response: Record<string, unknown>[]) {
  const productsHandler = http.get(`https://dummyjson.com${path}`, async () =>
    HttpResponse.json({ products: response })
  )

  mswServer.use(productsHandler)
}
