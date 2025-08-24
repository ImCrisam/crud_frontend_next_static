"use client"

import { useState, useEffect, useCallback } from "react"
import { ApiError, Brand, CreateBrandRequest, UpdateBrandRequest } from "../_models/models"

export interface UseBrandsReturn {
  brands: Brand[]
  loading: boolean
  error: ApiError | null
  createBrand: (brandData: CreateBrandRequest) => Promise<Brand>
  updateBrand: (id: number, brandData: CreateBrandRequest) => Promise<Brand>
  patchBrand: (id: number, brandData: UpdateBrandRequest) => Promise<Brand>
  deleteBrand: (id: number) => Promise<void>
  toggleBrandActive: (id: number) => Promise<Brand>
  refreshBrands: () => Promise<void>
  clearError: () => void
}

export function useBrandsApi(): UseBrandsReturn {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<ApiError | null>(null)

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const refreshBrands = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
    } catch (err) {
      setError(err as ApiError)
    } finally {
      setLoading(false)
    }
  }, [])

  const createBrand = useCallback(async (_brandData: CreateBrandRequest): Promise<Brand> => {
    try {
      setError(null)
    } catch (err) {
      const error = err as ApiError
      setError(error)
      throw error
    }
  }, [])

  const updateBrand = useCallback(async (_id: number, _brandData: CreateBrandRequest): Promise<Brand> => {
    try {
      setError(null)
    } catch (err) {
      const error = err as ApiError
      setError(error)
      throw error
    }
  }, [])

  const patchBrand = useCallback(async (_id: number, _brandData: UpdateBrandRequest): Promise<Brand> => {
    try {
      setError(null)
    } catch (err) {
      const error = err as ApiError
      setError(error)
      throw error
    }
  }, [])

  const deleteBrand = useCallback(async (_id: number): Promise<void> => {
    try {
      setError(null)
    } catch (err) {
      const error = err as ApiError
      setError(error)
      throw error
    }
  }, [])

  const toggleBrandActive = useCallback(async (_id: number): Promise<Brand> => {
    try {
      setError(null)
    } catch (err) {
      const error = err as ApiError
      setError(error)
      throw error
    }
  }, [])

  // Load brands on mount
  useEffect(() => {
    refreshBrands()
  }, [refreshBrands])

  return {
    brands,
    loading,
    error,
    createBrand,
    updateBrand,
    patchBrand,
    deleteBrand,
    toggleBrandActive,
    refreshBrands,
    clearError,
  }
}
