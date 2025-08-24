'use client'

import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios"
import { ApiError, Brand, CreateBrandRequest, UpdateBrandRequest } from "../_models/models"

class ApiService {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL:process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
      headers: {
        "Content-Type": "application/json",
        "X-Client-Id": "42",
      },
      timeout: 10000,
    })

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`)
        return config
      },
      (error) => {
        console.error("[API] Request error:", error)
        return Promise.reject(error)
      },
    )

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        console.log(`[API] Response ${response.status}:`, response.data)
        return response
      },
      (error: AxiosError) => {
        const apiError: ApiError = {
          message: error.response?.data?.details || error.message || "An error occurred",
          status: error.response?.status || 500,
          details: error.response?.data,
        }
        console.error("[API] Response error:", apiError)
        return Promise.reject(apiError)
      },
    )
  }

  // Get all brands
  async getBrands(): Promise<Brand[]> {
    try {
      const response: AxiosResponse<Brand[]> = await this.client.get("/brands/")
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Get brand by ID
  async getBrand(id: number): Promise<Brand> {
    try {
      const response: AxiosResponse<Brand> = await this.client.get(`/brands/${id}/`)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Create new brand
  async createBrand(brandData: CreateBrandRequest): Promise<Brand> {
    try {
      const response: AxiosResponse<Brand> = await this.client.post("/brands/", brandData)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Update brand (PUT - full update)
  async updateBrand(id: number, brandData: CreateBrandRequest): Promise<Brand> {
    try {
      const response: AxiosResponse<Brand> = await this.client.put(`/brands/${id}/`, brandData)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Partially update brand (PATCH)
  async patchBrand(id: number, brandData: UpdateBrandRequest): Promise<Brand> {
    try {
      const response: AxiosResponse<Brand> = await this.client.patch(`/brands/${id}/`, brandData)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Delete brand
  async deleteBrand(id: number): Promise<void> {
    try {
      await this.client.delete(`/brands/${id}/`)
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Toggle brand active status
  async toggleBrandActive(id: number): Promise<Brand> {
    try {
      const response: AxiosResponse<Brand> = await this.client.post(`/brands/${id}/toggle-active/`)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  private handleError(error: any): ApiError {
    if (error.status && error.message) {
      // Already processed by interceptor
      return error as ApiError
    }

    // Fallback error handling
    return {
      message: error?.message || "An unexpected error occurred",
      status: error?.status || 500,
      details: error,
    }
  }
}

// Create singleton instance
export const apiService = new ApiService()
export default apiService
