import { setupServer } from 'msw/node'
import { handlers } from './handlers'
import { http, HttpResponse } from 'msw'

const mswServer = setupServer(...handlers)
export { mswServer, http, HttpResponse }
