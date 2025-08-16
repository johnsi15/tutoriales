import axios from 'axios'

export class APIClient {
  private readonly baseUrl: string

  constructor(baseUrl: string = import.meta.env.API_URL || 'https://dummyjson.com') {
    this.baseUrl = baseUrl
  }

  async get<T>(path: string): Promise<T> {
    const response = await axios.get<T>(`${this.baseUrl}${path}`)
    return response.data
  }

  async post<T, U>(path: string, body: T): Promise<U> {
    const response = await axios.post<U>(`${this.baseUrl}${path}`, body)
    return response.data
  }
}
