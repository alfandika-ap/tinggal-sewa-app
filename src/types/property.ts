export type PropertyItem = {
  title: string
  address: string
  city: string
  province: string
  description: string
  price: number
  facilities: string
  rules?: string
  contact?: string
  url: string
  image_url?: string
  gender: string
  source: string
}

export type PropertyResponse = {
  results: PropertyItem[]
  success: boolean
  count: number
}

