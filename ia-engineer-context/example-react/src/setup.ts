/// <reference types="vitest" />

import '@testing-library/jest-dom/vitest'

import { mswServer } from './api-mocks/msw-server'

beforeAll(() => mswServer.listen())
afterEach(() => mswServer.resetHandlers())
afterAll(() => mswServer.close())
