export interface Brand {
  id: number
  name: string
  owner: string
  is_active: boolean
  created_at?: string
  updated_at?: string
}

export interface CreateBrandRequest {
  name: string
  owner: string
  is_active?: boolean
}

export interface UpdateBrandRequest {
  name?: string
  owner?: string
  is_active?: boolean
}

export interface ApiResponse<T> {
  data: T
  message?: string
  status: number
}
export interface ApiResponseError {
detail?: string
}

export interface ApiError {
  message: string
  status: number
  details?: unknown
}

export interface PaginatedResponse<T> {
  data: T[]
  count: number
  next?: string
  previous?: string
}
